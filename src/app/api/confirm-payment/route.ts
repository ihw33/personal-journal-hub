import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

function createStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }
  return new Stripe(secretKey, {
    apiVersion: '2024-11-20.acacia',
  });
}

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json();
    
    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment Intent ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 환경변수 확인
    if (!process.env.STRIPE_SECRET_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: '서버 설정 오류입니다.' },
        { status: 500 }
      );
    }

    // PaymentIntent 정보 조회 (먼저 Stripe에서 검증)
    const stripe = createStripeClient();
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: '결제가 완료되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 메타데이터에서 정보 추출
    const { userId, plan, originalAmount, totalAmount } = paymentIntent.metadata;
    
    if (!userId || !plan || !originalAmount || !totalAmount) {
      return NextResponse.json(
        { error: '결제 메타데이터가 유효하지 않습니다.' },
        { status: 400 }
      );
    }

    // 보안 검증: 현재 인증된 사용자와 결제 정보의 사용자가 일치하는지 확인
    const supabaseAuth = createClient();
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 결제 정보의 사용자 ID와 현재 인증된 사용자 ID가 일치하는지 확인
    if (user.id !== userId) {
      return NextResponse.json(
        { error: '결제 권한이 없습니다.' },
        { status: 403 }
      );
    }

    // Supabase Admin 클라이언트 생성 (Service Role 사용)
    const supabase = createAdminClient();

    // RPC 함수를 통한 원자적 트랜잭션 처리
    // 구독 정보 업데이트와 결제 기록 저장을 하나의 트랜잭션으로 처리
    const { data: rpcResult, error: rpcError } = await supabase.rpc(
      'update_subscription_with_payment',
      {
        p_user_id: userId,
        p_plan: plan,
        p_payment_intent_id: paymentIntentId,
        p_amount: parseInt(originalAmount),
        p_total_amount: parseInt(totalAmount),
        p_stripe_customer_id: paymentIntent.customer as string
      }
    );

    if (rpcError) {
      console.error('RPC 함수 실행 오류:', rpcError);
      return NextResponse.json(
        { error: 'RPC 함수 실행에 실패했습니다: ' + rpcError.message },
        { status: 500 }
      );
    }

    // RPC 함수 결과 확인
    if (!rpcResult || !rpcResult.success) {
      console.error('RPC 함수 실행 실패:', rpcResult);
      return NextResponse.json(
        { error: rpcResult?.message || '구독 및 결제 기록 업데이트에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      result: rpcResult,
      message: '결제가 성공적으로 처리되었습니다.'
    });

  } catch (error) {
    console.error('결제 확인 오류:', error);
    
    return NextResponse.json(
      { error: '결제 확인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}