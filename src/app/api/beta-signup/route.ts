import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// 동적 import로 supabase 클라이언트를 가져와서 빌드 시 환경변수 오류 방지
async function getSupabaseClient() {
  const { supabase } = await import('@/lib/supabase/client');
  return supabase;
}

// 이메일 검증 스키마
const emailSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요.').min(1, '이메일이 필요합니다.'),
});

// Rate limiting을 위한 메모리 캐시 (간단한 구현)
const rateLimitMap: Map<string, { count: number; resetTime: number }> = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15분
const RATE_LIMIT_MAX = 5; // 15분 동안 최대 5회

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // IP 주소 가져오기
    const ip = request.ip || 
               request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Rate limiting 체크
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          error: '너무 많은 요청이 발생했습니다. 15분 후에 다시 시도해주세요.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    
    // 데이터 검증
    const validationResult = emailSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: validationResult.error.errors[0].message,
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // 이메일을 소문자로 정규화
    const normalizedEmail = email.toLowerCase().trim();

    // Supabase에서 중복 이메일 체크
    const supabase = await getSupabaseClient();
    const { data: existingBetaTester, error: checkError } = await supabase
      .from('beta_testers')
      .select('id, email')
      .eq('email', normalizedEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116은 "결과 없음" 에러이므로 무시
      console.error('Database check error:', checkError);
      return NextResponse.json(
        { 
          error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          code: 'DATABASE_ERROR'
        },
        { status: 500 }
      );
    }

    // 이미 등록된 이메일인 경우
    if (existingBetaTester) {
      return NextResponse.json(
        { 
          error: '이미 베타 테스터로 등록된 이메일입니다.',
          code: 'EMAIL_ALREADY_EXISTS'
        },
        { status: 409 }
      );
    }

    // 새로운 베타 테스터 등록
    const { data: newBetaTester, error: insertError } = await supabase
      .from('beta_testers')
      .insert([
        {
          email: normalizedEmail,
          status: 'pending',
          metadata: {
            source: 'coming_soon_page',
            ip_address: ip,
            user_agent: request.headers.get('user-agent') || '',
            submitted_at: new Date().toISOString(),
          }
        }
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      
      // 중복 이메일 에러 처리 (트리거에서 발생할 수 있음)
      if (insertError.message?.includes('Email already registered')) {
        return NextResponse.json(
          { 
            error: '이미 베타 테스터로 등록된 이메일입니다.',
            code: 'EMAIL_ALREADY_EXISTS'
          },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { 
          error: '등록 중 오류가 발생했습니다. 다시 시도해주세요.',
          code: 'INSERT_ERROR'
        },
        { status: 500 }
      );
    }

    // 성공 응답
    return NextResponse.json(
      {
        success: true,
        message: '베타 테스터 등록이 완료되었습니다!',
        data: {
          id: newBetaTester.id,
          email: newBetaTester.email,
          status: newBetaTester.status,
          created_at: newBetaTester.created_at,
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Beta signup API error:', error);
    
    return NextResponse.json(
      { 
        error: '서버 내부 오류가 발생했습니다.',
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}

// GET 요청으로 통계 정보 제공 (관리자용)
export async function GET(request: NextRequest) {
  try {
    // 기본적인 인증 체크 (여기서는 간단하게 헤더 체크)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 베타 테스터 통계 조회
    const supabase = await getSupabaseClient();
    const { data: stats, error } = await supabase
      .from('beta_testers')
      .select('status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Stats query error:', error);
      return NextResponse.json(
        { error: '통계 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 통계 계산
    const totalCount = stats?.length || 0;
    const statusCounts = stats?.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    // 일별 등록 수 계산 (최근 30일)
    const dailySignups = stats?.reduce((acc, item) => {
      const date = new Date(item.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return NextResponse.json({
      success: true,
      data: {
        total_count: totalCount,
        status_counts: statusCounts,
        daily_signups: dailySignups,
        latest_signups: stats?.slice(0, 10) || [],
      }
    });

  } catch (error) {
    console.error('Beta signup stats API error:', error);
    
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}