import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/admin';

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
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    let event: Stripe.Event;

    try {
      const stripe = createStripeClient();
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 웹훅 이벤트 처리
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);

        // 결제 성공 시 RPC 함수를 통한 원자적 처리
        const { userId, plan, originalAmount, totalAmount } = paymentIntent.metadata;
        
        if (userId && plan && originalAmount && totalAmount) {
          const { data: rpcResult, error: rpcError } = await supabase.rpc(
            'update_subscription_with_payment',
            {
              p_user_id: userId,
              p_plan: plan,
              p_payment_intent_id: paymentIntent.id,
              p_amount: parseInt(originalAmount),
              p_total_amount: parseInt(totalAmount),
              p_stripe_customer_id: paymentIntent.customer as string
            }
          );

          if (rpcError) {
            console.error('Webhook RPC 함수 실행 오류:', rpcError);
            // Webhook에서는 에러가 발생해도 계속 진행 (Stripe가 재시도함)
          } else if (rpcResult?.duplicate) {
            console.log('중복 처리 방지됨:', paymentIntent.id);
          } else {
            console.log('Webhook 처리 성공:', paymentIntent.id);
          }
        } else {
          console.error('결제 메타데이터 불완전:', paymentIntent.metadata);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', paymentIntent.id);

        // 결제 실패 시 구독 상태 업데이트 (중복 처리 방지 포함)
        const { userId } = paymentIntent.metadata;
        
        if (userId) {
          // 이미 결제 성공한 기록이 있는지 확인 (중복 처리 방지)
          const { data: existingPayment } = await supabase
            .from('payment_history')
            .select('id')
            .eq('payment_intent_id', paymentIntent.id)
            .eq('status', 'completed')
            .single();

          if (existingPayment) {
            console.log('이미 성공 처리된 결제, 실패 이벤트 무시:', paymentIntent.id);
            break;
          }

          // 구독 상태를 실패로 업데이트
          const { error } = await supabase
            .from('subscriptions')
            .update({
              status: 'payment_failed',
              updated_at: new Date()
            })
            .eq('user_id', userId)
            .eq('payment_intent_id', paymentIntent.id);

          if (error) {
            console.error('구독 상태 업데이트 실패:', error);
          } else {
            console.log('결제 실패 처리 완료:', paymentIntent.id);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscription.id);
        
        // 구독 변경 시 처리 로직
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription cancelled:', subscription.id);
        
        // 구독 취소 시 처리 로직
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment succeeded:', invoice.id);
        
        // 정기 결제 성공 시 구독 연장 처리
        if (invoice.customer && invoice.subscription) {
          const { error } = await supabase
            .from('subscriptions')
            .update({
              status: 'active',
              current_period_end: new Date((invoice.period_end || 0) * 1000),
              updated_at: new Date()
            })
            .eq('stripe_customer_id', invoice.customer as string);

          if (error) {
            console.error('정기결제 구독 업데이트 실패:', error);
          } else {
            console.log('정기결제 구독 연장 완료:', invoice.subscription);
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment failed:', invoice.id);
        
        // 정기 결제 실패 시 구독 상태 업데이트
        if (invoice.customer) {
          const { error } = await supabase
            .from('subscriptions')
            .update({
              status: 'payment_failed',
              updated_at: new Date()
            })
            .eq('stripe_customer_id', invoice.customer as string);

          if (error) {
            console.error('정기결제 실패 상태 업데이트 실패:', error);
          } else {
            console.log('정기결제 실패 처리 완료:', invoice.subscription);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}