import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Supabase 클라이언트 생성
  const supabase = createMiddlewareClient({ req, res });

  // 현재 세션 확인
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 보호된 라우트 정의
  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/settings',
    '/learning',
    '/workspace'
  ];

  // 인증 페이지 경로 정의
  const authRoutes = [
    '/auth/login',
    '/auth/signup',
    '/auth/password-reset',
    '/auth/reset-password'
  ];

  const pathname = req.nextUrl.pathname;

  // 보호된 라우트에 접근하려는 경우
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // 세션이 없으면 로그인 페이지로 리다이렉트
    if (!session) {
      const redirectUrl = new URL('/auth/login', req.url);
      redirectUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 이미 로그인된 사용자가 인증 페이지에 접근하려는 경우
  if (session && authRoutes.some(route => pathname.startsWith(route))) {
    // redirectTo 파라미터가 있으면 해당 페이지로, 없으면 홈으로
    const redirectTo = req.nextUrl.searchParams.get('redirectTo') || '/';
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  return res;
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};