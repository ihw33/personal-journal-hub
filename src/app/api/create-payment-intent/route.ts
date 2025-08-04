import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
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
    const { plan, amount } = await request.json();
    
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

    // 입력값 검증
    if (!plan || !amount) {
      return NextResponse.json(
        { error: '플랜과 금액이 필요합니다.' },
        { status: 400 }
      );
    }

    // 허용된 플랜과 금액 검증
    const validPlans = {
      basic: 29000,
      premium: 49000,
      pro: 89000
    };

    if (!validPlans[plan as keyof typeof validPlans] || validPlans[plan as keyof typeof validPlans] !== amount) {
      return NextResponse.json(
        { error: '유효하지 않은 플랜 또는 금액입니다.' },
        { status: 400 }
      );
    }

    // 부가세 포함 총 금액 계산 (10%)
    const totalAmount = Math.round(amount * 1.1);

    // Stripe PaymentIntent 생성
    const stripe = createStripeClient();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'krw',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: user.id,
        userEmail: user.email || '',
        plan: plan,
        originalAmount: amount.toString(),
        totalAmount: totalAmount.toString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error('결제 인텐트 생성 오류:', error);
    
    return NextResponse.json(
      { error: '결제 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}