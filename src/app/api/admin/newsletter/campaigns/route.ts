import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = createClient();

    const { data: campaigns, error } = await supabase
      .from('newsletter_campaigns')
      .select('*')
      .order('sent_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('캠페인 목록 조회 오류:', error);
      return NextResponse.json(
        { error: '캠페인 목록을 가져올 수 없습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      campaigns: campaigns || [],
    });

  } catch (error) {
    console.error('캠페인 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}