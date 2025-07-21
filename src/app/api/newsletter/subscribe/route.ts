import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { resend, emailConfig } from '@/lib/resend';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: '이메일이 필요합니다.' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    
    // 확인 토큰 생성
    const confirmationToken = crypto.randomBytes(32).toString('hex');
    const confirmationUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8080'}/api/newsletter/confirm?token=${confirmationToken}`;

    // 기존 구독 확인
    const { data: existingSubscription } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('email', email)
      .single();

    if (existingSubscription) {
      if (existingSubscription.is_confirmed) {
        return NextResponse.json(
          { error: '이미 구독 확인된 이메일입니다.' },
          { status: 409 }
        );
      } else {
        // 확인되지 않은 구독이면 토큰 재발송
        const { error: updateError } = await supabase
          .from('newsletter_subscriptions')
          .update({
            confirmation_token: confirmationToken,
            confirmation_sent_at: new Date().toISOString(),
          })
          .eq('email', email);

        if (updateError) {
          console.error('Update subscription error:', updateError);
          return NextResponse.json(
            { error: '구독 처리 중 오류가 발생했습니다.' },
            { status: 500 }
          );
        }
      }
    } else {
      // 새 구독 생성
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{
          email,
          name,
          confirmation_token: confirmationToken,
          confirmation_sent_at: new Date().toISOString(),
        }])
        .select();

      if (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
          { error: '구독 처리 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }

    // 확인 이메일 발송
    try {
      await resend.emails.send({
        from: `${emailConfig.senderName} <${emailConfig.fromEmail}>`,
        to: email,
        subject: '뉴스레터 구독 확인',
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: sans-serif; line-height: 1.6;">
            <h1 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              구독 확인
            </h1>
            <p>안녕하세요 ${name || '구독자'}님,</p>
            <p>개인 저널 허브 뉴스레터 구독을 신청해 주셔서 감사합니다.</p>
            <p>구독을 완료하려면 아래 버튼을 클릭해주세요:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmationUrl}" 
                 style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                구독 확인하기
              </a>
            </div>
            <p style="color: #6b7280; font-size: 14px;">
              만약 버튼이 작동하지 않으면 다음 링크를 복사하여 브라우저에 붙여넣으세요:<br>
              <a href="${confirmationUrl}" style="color: #2563eb;">${confirmationUrl}</a>
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="color: #9ca3af; font-size: 12px;">
              이 이메일을 요청하지 않으셨다면 무시하셔도 됩니다.
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Confirmation email error:', emailError);
      return NextResponse.json(
        { error: '확인 이메일 발송에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: '구독 신청이 완료되었습니다. 이메일을 확인해주세요.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}