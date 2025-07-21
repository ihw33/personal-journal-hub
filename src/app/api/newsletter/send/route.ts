import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { resend, emailConfig } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const { subject, content, journalId } = await request.json();

    if (!subject || !content) {
      return NextResponse.json(
        { error: '제목과 내용이 필요합니다.' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // 확인된 활성 구독자 목록 가져오기
    const { data: subscribers, error: subscribersError } = await supabase
      .from('newsletter_subscriptions')
      .select('email, name')
      .eq('is_active', true)
      .eq('is_confirmed', true);

    if (subscribersError) {
      console.error('구독자 조회 오류:', subscribersError);
      return NextResponse.json(
        { error: '구독자 목록을 가져올 수 없습니다.' },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { error: '활성 구독자가 없습니다.' },
        { status: 400 }
      );
    }

    let successCount = 0;
    let failureCount = 0;

    // 이메일 발송
    for (const subscriber of subscribers) {
      try {
        await resend.emails.send({
          from: `${emailConfig.senderName} <${emailConfig.fromEmail}>`,
          to: subscriber.email,
          subject: subject,
          html: `
            <div style="max-width: 600px; margin: 0 auto; font-family: sans-serif; line-height: 1.6;">
              <h1 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                ${subject}
              </h1>
              <div style="margin: 20px 0;">
                ${content.replace(/\n/g, '<br>')}
              </div>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              <p style="color: #6b7280; font-size: 14px;">
                안녕하세요 ${subscriber.name || '구독자'}님,<br>
                개인 저널 허브에서 새로운 소식을 전해드립니다.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">
                더 이상 이메일을 받고 싶지 않으시면 
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8080'}/unsubscribe?email=${encodeURIComponent(subscriber.email)}" 
                   style="color: #6b7280;">구독 취소</a>를 클릭하세요.
              </p>
            </div>
          `,
        });
        successCount++;
      } catch (emailError) {
        console.error(`이메일 발송 실패 (${subscriber.email}):`, emailError);
        failureCount++;
      }
    }

    // 발송 기록 저장
    const { error: campaignError } = await supabase
      .from('newsletter_campaigns')
      .insert([{
        subject,
        content,
        journal_id: journalId || null,
        recipient_count: subscribers.length,
        success_count: successCount,
        failure_count: failureCount,
      }]);

    if (campaignError) {
      console.error('캠페인 기록 저장 오류:', campaignError);
    }

    return NextResponse.json({
      message: '뉴스레터 발송이 완료되었습니다.',
      stats: {
        total: subscribers.length,
        success: successCount,
        failure: failureCount,
      },
    });

  } catch (error) {
    console.error('뉴스레터 발송 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}