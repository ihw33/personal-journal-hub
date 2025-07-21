import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: '이메일이 필요합니다.' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    const { error } = await supabase
      .from('newsletter_subscriptions')
      .update({ 
        is_active: false, 
        unsubscribed_at: new Date().toISOString() 
      })
      .eq('email', email)
      .eq('is_active', true);

    if (error) {
      console.error('구독 취소 오류:', error);
      return NextResponse.json(
        { error: '구독 취소 처리 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: '구독이 취소되었습니다.',
    });

  } catch (error) {
    console.error('구독 취소 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.redirect('/');
  }

  try {
    const supabase = createClient();

    const { error } = await supabase
      .from('newsletter_subscriptions')
      .update({ 
        is_active: false, 
        unsubscribed_at: new Date().toISOString() 
      })
      .eq('email', email)
      .eq('is_active', true);

    if (error) {
      console.error('구독 취소 오류:', error);
    }

    return new Response(`
      <html>
        <head>
          <title>구독 취소 완료</title>
          <meta charset="utf-8">
        </head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1>구독 취소가 완료되었습니다</h1>
          <p>더 이상 뉴스레터를 받지 않으실 것입니다.</p>
          <p>언제든지 다시 구독하실 수 있습니다.</p>
          <a href="/" style="color: #2563eb;">홈으로 돌아가기</a>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });

  } catch (error) {
    console.error('구독 취소 오류:', error);
    return new Response('오류가 발생했습니다.', { status: 500 });
  }
}