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

    // 구독 정보를 데이터베이스에 저장
    const subscriptionData = {
      user_id: user.id,
      plan_type: plan,
      status: 'active',
      amount: parseInt(originalAmount),
      total_amount: parseInt(totalAmount),
      payment_intent_id: paymentIntentId,
      stripe_customer_id: paymentIntent.customer as string,
      current_period_start: new Date(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30일 후
      created_at: new Date(),
      updated_at: new Date()
    };

    // 기존 활성 구독이 있는지 확인
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (existingSubscription) {
      // 기존 구독 업데이트
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({
          plan_type: plan,
          amount: parseInt(originalAmount),
          total_amount: parseInt(totalAmount),
          payment_intent_id: paymentIntentId,
          current_period_start: new Date(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          updated_at: new Date()
        })
        .eq('id', existingSubscription.id);

      if (updateError) {
        console.error('구독 업데이트 오류:', updateError);
        return NextResponse.json(
          { error: '구독 업데이트에 실패했습니다.' },
          { status: 500 }
        );
      }
    } else {
      // 새 구독 생성
      const { error: insertError } = await supabase
        .from('subscriptions')
        .insert(subscriptionData);

      if (insertError) {
        console.error('구독 생성 오류:', insertError);
        return NextResponse.json(
          { error: '구독 생성에 실패했습니다.' },
          { status: 500 }
        );
      }
    }

    // 결제 기록 저장
    const { error: paymentRecordError } = await supabase
      .from('payment_history')
      .insert({
        user_id: user.id,
        payment_intent_id: paymentIntentId,
        amount: parseInt(originalAmount),
        total_amount: parseInt(totalAmount),
        plan_type: plan,
        status: 'completed',
        payment_method: 'stripe',
        created_at: new Date()
      });

    if (paymentRecordError) {
      console.warn('결제 기록 저장 실패:', paymentRecordError);
      // 결제 기록 저장 실패는 치명적이지 않으므로 계속 진행
    }

    return NextResponse.json({
      success: true,
      subscription: subscriptionData
    });

  } catch (error) {
    console.error('결제 확인 오류:', error);
    
    return NextResponse.json(
      { error: '결제 확인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}