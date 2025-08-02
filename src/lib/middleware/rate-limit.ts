/**
 * ===================================================================
 * IdeaWorkLab v3.3 Rate Limiting Middleware
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * API 요청 속도 제한 미들웨어 - Upstash Redis 기반
 * ===================================================================
 */

import { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Redis 클라이언트 초기화 (조건부)
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) 
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Rate limit 설정별 인스턴스 (조건부 초기화)
const rateLimiters = redis ? {
  // 일반 API 요청 (분당 60회)
  general: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '1 m'),
    analytics: true,
    prefix: '@upstash/ratelimit:general',
  }),
  
  // 채팅 메시지 전송 (분당 30회)
  chat: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '1 m'),
    analytics: true,
    prefix: '@upstash/ratelimit:chat',
  }),
  
  // 세션 생성 (분당 10회)
  session: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    analytics: true,
    prefix: '@upstash/ratelimit:session',
  }),
  
  // AI 응답 생성 (분당 20회)
  ai: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, '1 m'),
    analytics: true,
    prefix: '@upstash/ratelimit:ai',
  }),
} : null;

export type RateLimitType = 'general' | 'chat' | 'session' | 'ai';

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: Date;
  error?: string;
}

/**
 * Rate limiting 검사 함수
 */
export async function checkRateLimit(
  request: NextRequest,
  type: RateLimitType = 'general'
): Promise<RateLimitResult> {
  try {
    // 클라이언트 IP 주소 추출
    const ip = getClientIP(request);
    const identifier = `${type}:${ip}`;
    
    // Rate limiter 선택
    if (!rateLimiters) {
      // Redis 연결 실패 시 메모리 기반 폴백 사용
      return await checkRateLimitMemory(request, type);
    }
    
    const ratelimiter = rateLimiters[type];
    
    // Rate limit 체크
    const { success, limit, remaining, reset } = await ratelimiter.limit(identifier);
    
    return {
      success,
      limit,
      remaining,
      reset,
    };
  } catch (error) {
    console.error('Rate limiting error:', error);
    
    // Redis 연결 실패 시 기본적으로 허용 (graceful degradation)
    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: new Date(),
      error: 'Rate limiting service unavailable',
    };
  }
}

/**
 * 메모리 기반 폴백 rate limiter (Redis 연결 실패 시)
 */
class MemoryRateLimit {
  private requests: Map<string, { count: number; resetTime: number }> = new Map();
  
  check(identifier: string, limit: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const current = this.requests.get(identifier);
    
    if (!current || now > current.resetTime) {
      // 새로운 윈도우 시작
      this.requests.set(identifier, { count: 1, resetTime: now + windowMs });
      return {
        success: true,
        limit,
        remaining: limit - 1,
        reset: new Date(now + windowMs),
      };
    }
    
    if (current.count >= limit) {
      return {
        success: false,
        limit,
        remaining: 0,
        reset: new Date(current.resetTime),
      };
    }
    
    // 요청 카운트 증가
    current.count++;
    this.requests.set(identifier, current);
    
    return {
      success: true,
      limit,
      remaining: limit - current.count,
      reset: new Date(current.resetTime),
    };
  }
  
  // 만료된 항목 정리 (메모리 누수 방지)
  cleanup() {
    const now = Date.now();
    for (const [key, value] of this.requests.entries()) {
      if (now > value.resetTime) {
        this.requests.delete(key);
      }
    }
  }
}

const memoryRateLimit = new MemoryRateLimit();

// 메모리 정리를 위한 주기적 클린업 (5분마다)
if (typeof window === 'undefined') {
  setInterval(() => {
    memoryRateLimit.cleanup();
  }, 5 * 60 * 1000);
}

/**
 * 메모리 기반 폴백 rate limiting
 */
export async function checkRateLimitMemory(
  request: NextRequest,
  type: RateLimitType = 'general'
): Promise<RateLimitResult> {
  const ip = getClientIP(request);
  const identifier = `${type}:${ip}`;
  
  const limits = {
    general: { limit: 60, window: 60 * 1000 },
    chat: { limit: 30, window: 60 * 1000 },
    session: { limit: 10, window: 60 * 1000 },
    ai: { limit: 20, window: 60 * 1000 },
  };
  
  const config = limits[type];
  return memoryRateLimit.check(identifier, config.limit, config.window);
}

/**
 * 클라이언트 IP 주소 추출
 */
function getClientIP(request: NextRequest): string {
  // Vercel, Cloudflare 등의 프록시 헤더 확인
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  // 로컬 개발환경에서는 고정 IP 사용
  return request.ip || '127.0.0.1';
}

/**
 * Rate limit 헤더 생성
 */
export function createRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.getTime().toString(),
  };
}

/**
 * Rate limit 미들웨어 (HOF 패턴)
 */
export function withRateLimit(type: RateLimitType = 'general') {
  return async function rateLimitMiddleware(request: NextRequest) {
    // 개발 환경에서는 rate limiting 비활성화
    if (process.env.NODE_ENV === 'development') {
      return {
        success: true,
        limit: 1000,
        remaining: 999,
        reset: new Date(Date.now() + 60000),
      };
    }
    
    try {
      // Redis 사용 가능 여부 확인
      if (!rateLimiters) {
        return await checkRateLimitMemory(request, type);
      }
      
      // Redis 기반 rate limiting 시도
      return await checkRateLimit(request, type);
    } catch (error) {
      console.warn('Redis rate limiting failed, falling back to memory:', error);
      // 메모리 기반 폴백
      return await checkRateLimitMemory(request, type);
    }
  };
}

/**
 * Rate limit 응답 생성 헬퍼
 */
export function createRateLimitResponse(result: RateLimitResult) {
  const headers = createRateLimitHeaders(result);
  
  return new Response(
    JSON.stringify({
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Try again in ${Math.ceil((result.reset.getTime() - Date.now()) / 1000)} seconds.`,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset.toISOString(),
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }
  );
}

/**
 * API 엔드포인트에서 사용할 수 있는 간편한 rate limit 체크 함수
 */
export async function enforceRateLimit(
  request: NextRequest,
  type: RateLimitType = 'general'
): Promise<Response | null> {
  const rateLimitCheck = withRateLimit(type);
  const result = await rateLimitCheck(request);
  
  if (!result.success) {
    return createRateLimitResponse(result);
  }
  
  return null; // Rate limit 통과
}

/**
 * 화이트리스트 IP 체크 (관리자 IP 등)
 */
const WHITELIST_IPS = (process.env.RATE_LIMIT_WHITELIST_IPS || '').split(',').filter(Boolean);

export function isWhitelistedIP(request: NextRequest): boolean {
  const ip = getClientIP(request);
  return WHITELIST_IPS.includes(ip);
}

/**
 * Rate limit 통계 수집
 */
export async function getRateLimitStats(type: RateLimitType): Promise<{
  totalRequests: number;
  blockedRequests: number;
  successRate: number;
}> {
  try {
    if (!redis) {
      return {
        totalRequests: 0,
        blockedRequests: 0,
        successRate: 1,
      };
    }
    
    const stats = await redis.hgetall(`@upstash/ratelimit:${type}:stats`);
    
    const totalRequests = parseInt(stats.total || '0');
    const blockedRequests = parseInt(stats.blocked || '0');
    const successRate = totalRequests > 0 ? (totalRequests - blockedRequests) / totalRequests : 1;
    
    return {
      totalRequests,
      blockedRequests,
      successRate,
    };
  } catch (error) {
    console.error('Failed to get rate limit stats:', error);
    return {
      totalRequests: 0,
      blockedRequests: 0,
      successRate: 1,
    };
  }
}