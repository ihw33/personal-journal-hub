import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getRateLimiter } from '@/lib/rate-limiter';

// 동적 import로 supabase 클라이언트를 가져와서 빌드 시 환경변수 오류 방지
async function getSupabaseClient() {
  const { supabase } = await import('@/lib/supabase/client');
  return supabase;
}

// 강화된 이메일 검증 스키마 with regex
const emailSchema = z.object({
  email: z.string()
    .min(1, '이메일이 필요합니다.')
    .max(254, '이메일이 너무 깁니다.')
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      '올바른 이메일 형식이 아닙니다.'
    ),
});

// CORS 헤더 설정
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com' 
    : '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// 향상된 IP 추출 함수 (프록시/로드밸런서 환경 고려)
function getClientIP(request: NextRequest): string {
  // Vercel, Netlify 등의 플랫폼에서 사용하는 헤더들
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  const clientIP = request.headers.get('x-client-ip');
  const forwarded = request.headers.get('forwarded');
  
  // x-forwarded-for는 쉼표로 구분된 IP 목록일 수 있음 (첫 번째가 원본 클라이언트 IP)
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    // 첫 번째 IP가 유효한 형태인지 확인
    const firstIP = ips[0];
    if (firstIP && firstIP !== 'unknown') {
      return firstIP;
    }
  }
  
  if (cfConnectingIP && cfConnectingIP !== 'unknown') return cfConnectingIP;
  if (realIP && realIP !== 'unknown') return realIP;
  if (clientIP && clientIP !== 'unknown') return clientIP;
  
  // forwarded 헤더 파싱 (RFC 7239)
  if (forwarded) {
    const forMatch = forwarded.match(/for=([^;,\s]+)/i);
    if (forMatch) {
      return forMatch[1].replace(/["\[\]]/g, '');
    }
  }
  
  // 마지막 수단으로 request.ip 사용
  return request.ip || 'unknown';
}

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let logData: Record<string, any> = {
    timestamp: new Date().toISOString(),
    method: 'POST',
    endpoint: '/api/beta-signup',
    startTime,
  };

  try {
    // IP 주소 가져오기 (향상된 로직 사용)
    const ip = getClientIP(request);
    logData.clientIP = ip;
    logData.userAgent = request.headers.get('user-agent') || '';
    logData.referer = request.headers.get('referer') || '';

    // Rate limiting 체크 (Redis 기반)
    const rateLimiter = getRateLimiter();
    const rateLimit = await rateLimiter.checkLimitRedis(ip, 5, 15 * 60 * 1000);
    
    if (!rateLimit.success) {
      logData.rateLimitExceeded = true;
      logData.rateLimitInfo = rateLimit;
      console.warn('Rate limit exceeded:', JSON.stringify(logData));
      
      return NextResponse.json(
        { 
          error: '너무 많은 요청이 발생했습니다. 15분 후에 다시 시도해주세요.',
          code: 'RATE_LIMIT_EXCEEDED',
          retryAfter: rateLimit.retryAfter
        },
        { 
          status: 429,
          headers: {
            ...corsHeaders,
            'Retry-After': rateLimit.retryAfter?.toString() || '900',
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.reset.toString(),
          }
        }
      );
    }

    logData.rateLimitInfo = rateLimit;

    // 요청 본문 파싱
    const body = await request.json();
    logData.requestBody = { email: body.email ? '[REDACTED]' : null };
    
    // 데이터 검증 (강화된 이메일 regex 포함)
    const validationResult = emailSchema.safeParse(body);
    if (!validationResult.success) {
      logData.validationError = validationResult.error.errors;
      console.warn('Validation failed:', JSON.stringify(logData));
      
      return NextResponse.json(
        { 
          error: validationResult.error.errors[0].message,
          code: 'VALIDATION_ERROR'
        },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    const { email } = validationResult.data;
    logData.emailDomain = email.split('@')[1];

    // 이메일을 소문자로 정규화
    const normalizedEmail = email.toLowerCase().trim();
    logData.normalizedEmail = '[REDACTED]';

    // Supabase에서 중복 이메일 체크
    const supabase = await getSupabaseClient();
    const dbCheckStart = Date.now();
    
    const { data: existingBetaTester, error: checkError } = await supabase
      .from('beta_testers')
      .select('id, email')
      .eq('email', normalizedEmail)
      .single();

    logData.dbCheckDuration = Date.now() - dbCheckStart;

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116은 "결과 없음" 에러이므로 무시
      logData.dbCheckError = {
        code: checkError.code,
        message: checkError.message
      };
      console.error('Database check error:', JSON.stringify(logData));
      
      return NextResponse.json(
        { 
          error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          code: 'DATABASE_ERROR'
        },
        { 
          status: 500,
          headers: corsHeaders
        }
      );
    }

    // 이미 등록된 이메일인 경우
    if (existingBetaTester) {
      logData.duplicateEmail = true;
      console.info('Duplicate email signup attempt:', JSON.stringify(logData));
      
      return NextResponse.json(
        { 
          error: '이미 베타 테스터로 등록된 이메일입니다.',
          code: 'EMAIL_ALREADY_EXISTS'
        },
        { 
          status: 409,
          headers: corsHeaders
        }
      );
    }

    // 새로운 베타 테스터 등록
    const dbInsertStart = Date.now();
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
            referer: request.headers.get('referer') || '',
            submitted_at: new Date().toISOString(),
            rate_limit_info: rateLimit,
          }
        }
      ])
      .select()
      .single();

    logData.dbInsertDuration = Date.now() - dbInsertStart;

    if (insertError) {
      logData.dbInsertError = {
        code: insertError.code,
        message: insertError.message
      };
      console.error('Database insert error:', JSON.stringify(logData));
      
      // 중복 이메일 에러 처리 (트리거에서 발생할 수 있음)
      if (insertError.message?.includes('Email already registered')) {
        return NextResponse.json(
          { 
            error: '이미 베타 테스터로 등록된 이메일입니다.',
            code: 'EMAIL_ALREADY_EXISTS'
          },
          { 
            status: 409,
            headers: corsHeaders
          }
        );
      }
      
      return NextResponse.json(
        { 
          error: '등록 중 오류가 발생했습니다. 다시 시도해주세요.',
          code: 'INSERT_ERROR'
        },
        { 
          status: 500,
          headers: corsHeaders
        }
      );
    }

    // 성공 로깅
    const totalDuration = Date.now() - startTime;
    logData.success = true;
    logData.totalDuration = totalDuration;
    logData.newBetaTesterId = newBetaTester.id;
    
    console.info('Beta tester signup successful:', JSON.stringify(logData));

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
      { 
        status: 201,
        headers: {
          ...corsHeaders,
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.reset.toString(),
        }
      }
    );

  } catch (error) {
    // 에러 로깅 강화
    const totalDuration = Date.now() - startTime;
    logData.error = {
      name: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    };
    logData.success = false;
    logData.totalDuration = totalDuration;
    
    console.error('Beta signup API error:', JSON.stringify(logData));
    
    return NextResponse.json(
      { 
        error: '서버 내부 오류가 발생했습니다.',
        code: 'INTERNAL_SERVER_ERROR'
      },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
}

// GET 요청으로 통계 정보 제공 (관리자용)
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  let logData: Record<string, any> = {
    timestamp: new Date().toISOString(),
    method: 'GET',
    endpoint: '/api/beta-signup',
    startTime,
    clientIP: getClientIP(request),
    userAgent: request.headers.get('user-agent') || '',
  };

  try {
    // 기본적인 인증 체크 (여기서는 간단하게 헤더 체크)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logData.authFailed = true;
      console.warn('Unauthorized access to beta stats:', JSON.stringify(logData));
      
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { 
          status: 401,
          headers: corsHeaders
        }
      );
    }

    // 베타 테스터 통계 조회
    const supabase = await getSupabaseClient();
    const dbQueryStart = Date.now();
    
    const { data: stats, error } = await supabase
      .from('beta_testers')
      .select('status, created_at')
      .order('created_at', { ascending: false });

    logData.dbQueryDuration = Date.now() - dbQueryStart;

    if (error) {
      logData.dbQueryError = {
        code: error.code,
        message: error.message
      };
      console.error('Stats query error:', JSON.stringify(logData));
      
      return NextResponse.json(
        { error: '통계 조회 중 오류가 발생했습니다.' },
        { 
          status: 500,
          headers: corsHeaders
        }
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

    // 성공 로깅
    const totalDuration = Date.now() - startTime;
    logData.success = true;
    logData.totalDuration = totalDuration;
    logData.statsReturned = { totalCount, statusCounts: Object.keys(statusCounts) };
    
    console.info('Beta stats retrieved successfully:', JSON.stringify(logData));

    return NextResponse.json({
      success: true,
      data: {
        total_count: totalCount,
        status_counts: statusCounts,
        daily_signups: dailySignups,
        latest_signups: stats?.slice(0, 10) || [],
      }
    }, { headers: corsHeaders });

  } catch (error) {
    // 에러 로깅 강화
    const totalDuration = Date.now() - startTime;
    logData.error = {
      name: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    };
    logData.success = false;
    logData.totalDuration = totalDuration;
    
    console.error('Beta signup stats API error:', JSON.stringify(logData));
    
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
}