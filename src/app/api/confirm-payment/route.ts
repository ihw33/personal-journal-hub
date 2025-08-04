import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json();
    
    // 요청 헤더에서 사용자 정보 추출
    const headersList = headers();
    const authorization = headersList.get('authorization');
    
    if (!authorization) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // Supabase 클라이언트 생성
    const supabase = createClient();
    
    // 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: '유효하지 않은 사용자입니다.' },
        { status: 401 }
      );
    }

    // PaymentIntent 정보 조회
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: '결제가 완료되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 메타데이터에서 정보 추출
    const { userId, plan, originalAmount, totalAmount } = paymentIntent.metadata;
    
    if (userId !== user.id) {
      return NextResponse.json(
        { error: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    // RPC 함수를 통한 원자적 트랜잭션 처리
    // 구독 정보 업데이트와 결제 기록 저장을 하나의 트랜잭션으로 처리
    const { data: rpcResult, error: rpcError } = await supabase.rpc(
      'update_subscription_with_payment',
      {
        p_user_id: user.id,
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