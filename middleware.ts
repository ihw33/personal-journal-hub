
import { NextRequest, NextResponse } from 'next/server';
import { rateLimiter } from './src/lib/rate-limiter';

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';

  const { success, pending, limit, reset, remaining } = await rateLimiter.limit(ip);

  if (!success) {
    return new NextResponse('Too many requests', { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
