import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new Response(`
      <html>
        <head>
          <title>오류 - 개인 저널 허브</title>
          <meta charset="utf-8">
        </head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #dc2626;">잘못된 요청입니다</h1>
          <p>유효하지 않은 확인 링크입니다.</p>
          <a href="/" style="color: #2563eb;">홈으로 돌아가기</a>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      status: 400,
    });
  }

  try {
    const supabase = createClient();

    // 토큰으로 구독 정보 찾기
    const { data: subscription, error: findError } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('confirmation_token', token)
      .single();

    if (findError || !subscription) {
      return new Response(`
        <html>
          <head>
            <title>오류 - 개인 저널 허브</title>
            <meta charset="utf-8">
          </head>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #dc2626;">확인 링크가 유효하지 않습니다</h1>
            <p>링크가 만료되었거나 이미 사용된 링크입니다.</p>
            <a href="/" style="color: #2563eb;">홈으로 돌아가기</a>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
        status: 404,
      });
    }

    if (subscription.is_confirmed) {
      return new Response(`
        <html>
          <head>
            <title>이미 확인됨 - 개인 저널 허브</title>
            <meta charset="utf-8">
          </head>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #059669;">이미 구독이 확인되었습니다</h1>
            <p>감사합니다! 뉴스레터를 계속 받아보실 수 있습니다.</p>
            <a href="/" style="color: #2563eb;">홈으로 돌아가기</a>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // 구독 확인 처리
    const { error: confirmError } = await supabase
      .from('newsletter_subscriptions')
      .update({
        is_confirmed: true,
        is_active: true,
        confirmed_at: new Date().toISOString(),
        confirmation_token: null, // 토큰 무효화
      })
      .eq('confirmation_token', token);

    if (confirmError) {
      console.error('Confirmation error:', confirmError);
      return new Response(`
        <html>
          <head>
            <title>오류 - 개인 저널 허브</title>
            <meta charset="utf-8">
          </head>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #dc2626;">확인 처리 중 오류가 발생했습니다</h1>
            <p>잠시 후 다시 시도해주세요.</p>
            <a href="/" style="color: #2563eb;">홈으로 돌아가기</a>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
        status: 500,
      });
    }

    return new Response(`
      <html>
        <head>
          <title>구독 확인 완료 - 개인 저널 허브</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #f9fafb;">
          <div style="max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
            <h1 style="color: #059669; margin-bottom: 20px;">구독이 확인되었습니다!</h1>
            <p style="color: #6b7280; margin-bottom: 30px;">
              감사합니다! 이제 최신 저널과 소식을 이메일로 받아보실 수 있습니다.
            </p>
            <a href="/" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">
              홈으로 돌아가기
            </a>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });

  } catch (error) {
    console.error('Newsletter confirmation error:', error);
    return new Response(`
      <html>
        <head>
          <title>오류 - 개인 저널 허브</title>
          <meta charset="utf-8">
        </head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #dc2626;">서버 오류가 발생했습니다</h1>
          <p>잠시 후 다시 시도해주세요.</p>
          <a href="/" style="color: #2563eb;">홈으로 돌아가기</a>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      status: 500,
    });
  }
}