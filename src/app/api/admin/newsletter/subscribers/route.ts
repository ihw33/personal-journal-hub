import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = createClient();

    const { data: subscribers, error } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) {
      console.error('구독자 목록 조회 오류:', error);
      return NextResponse.json(
        { error: '구독자 목록을 가져올 수 없습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      subscribers: subscribers || [],
    });

  } catch (error) {
    console.error('구독자 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}