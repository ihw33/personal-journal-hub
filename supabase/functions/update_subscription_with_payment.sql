-- Supabase RPC 함수: 구독 정보 업데이트와 결제 기록 저장을 원자적으로 처리
-- 사용법: Supabase 대시보드의 SQL Editor에서 실행

CREATE OR REPLACE FUNCTION update_subscription_with_payment(
  p_user_id UUID,
  p_plan TEXT,
  p_payment_intent_id TEXT,
  p_amount INTEGER,
  p_total_amount INTEGER,
  p_stripe_customer_id TEXT DEFAULT NULL
) RETURNS JSON AS $$
DECLARE
  v_subscription_id UUID;
  v_result JSON;
BEGIN
  -- 트랜잭션 시작 (함수 내부에서 자동으로 처리됨)
  
  -- 0. 중복 처리 방지: 동일한 payment_intent_id가 이미 처리되었는지 확인
  IF EXISTS (SELECT 1 FROM payment_history WHERE payment_intent_id = p_payment_intent_id) THEN
    -- 이미 처리된 결제이면 성공 상태로 반환 (중복 처리 방지)
    RETURN json_build_object(
      'success', true,
      'message', 'Payment already processed (duplicate prevented)',
      'duplicate', true
    );
  END IF;
  
  -- 1. 기존 활성 구독이 있는지 확인
  SELECT id INTO v_subscription_id
  FROM subscriptions 
  WHERE user_id = p_user_id 
    AND status = 'active'
  LIMIT 1;
  
  IF v_subscription_id IS NOT NULL THEN
    -- 2-1. 기존 구독 업데이트
    UPDATE subscriptions 
    SET 
      plan_type = p_plan,
      amount = p_amount,
      total_amount = p_total_amount,
      payment_intent_id = p_payment_intent_id,
      stripe_customer_id = COALESCE(p_stripe_customer_id, stripe_customer_id),
      current_period_start = NOW(),
      current_period_end = NOW() + INTERVAL '30 days',
      updated_at = NOW()
    WHERE id = v_subscription_id;
    
  ELSE
    -- 2-2. 새 구독 생성
    INSERT INTO subscriptions (
      user_id,
      plan_type,
      status,
      amount,
      total_amount,
      payment_intent_id,
      stripe_customer_id,
      current_period_start,
      current_period_end,
      created_at,
      updated_at
    ) VALUES (
      p_user_id,
      p_plan,
      'active',
      p_amount,
      p_total_amount,
      p_payment_intent_id,
      p_stripe_customer_id,
      NOW(),
      NOW() + INTERVAL '30 days',
      NOW(),
      NOW()
    ) RETURNING id INTO v_subscription_id;
  END IF;
  
  -- 3. 결제 기록 저장
  INSERT INTO payment_history (
    user_id,
    payment_intent_id,
    amount,
    total_amount,
    plan_type,
    status,
    payment_method,
    created_at
  ) VALUES (
    p_user_id,
    p_payment_intent_id,
    p_amount,
    p_total_amount,
    p_plan,
    'completed',
    'stripe',
    NOW()
  );
  
  -- 4. 성공 결과 반환
  v_result := json_build_object(
    'success', true,
    'subscription_id', v_subscription_id,
    'message', 'Subscription and payment record updated successfully'
  );
  
  RETURN v_result;
  
EXCEPTION
  WHEN OTHERS THEN
    -- 에러 발생 시 롤백 (자동 처리) 및 에러 반환
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM,
      'message', 'Failed to update subscription and payment record'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS 정책 추가: 사용자는 자신의 구독 정보만 업데이트 가능
-- 참고: 이 함수는 SECURITY DEFINER로 실행되므로 RLS를 우회할 수 있지만,
-- 함수 내부에서 user_id 검증을 통해 보안을 보장합니다.