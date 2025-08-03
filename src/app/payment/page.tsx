'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import PaymentPage from '@/components/user/PaymentPage';
import { useAuth } from '@/lib/supabase/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { getCurrentSafeUrl } from '@/lib/security/redirectSecurity';

export default function PaymentPageWrapper() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isValidating, setIsValidating] = useState(true);

  // 인증 체크
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        // 로그인하지 않은 경우 로그인 페이지로 리디렉션
        const safeRedirectUrl = getCurrentSafeUrl();
        redirect(`/auth/login?redirect=${encodeURIComponent(safeRedirectUrl)}`);
      } else {
        setIsValidating(false);
      }
    }
  }, [user, authLoading]);

  // 로딩 상태 표시
  if (authLoading || isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-architect-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-body text-architect-gray-700">결제 페이지를 준비하고 있습니다...</p>
        </div>
      </div>
    );
  }

  // 네비게이션 핸들러
  const handleNavigate = (page: string, params?: any) => {
    switch (page) {
      case 'dashboard':
        router.push('/dashboard');
        break;
      case 'payment-confirmation':
        // URL 파라미터로 결제 정보 전달
        const queryParams = new URLSearchParams();
        if (params?.plan) queryParams.set('plan', params.plan);
        if (params?.amount) queryParams.set('amount', params.amount.toString());
        if (params?.paymentMethod) queryParams.set('paymentMethod', params.paymentMethod);
        
        router.push(`/payment-confirmation?${queryParams.toString()}`);
        break;
      case 'courses':
        router.push('/courses');
        break;
      case 'home':
        router.push('/');
        break;
      default:
        router.push('/');
        break;
    }
  };

  try {
    return (
      <PaymentPage
        user={user}
        onNavigate={handleNavigate}
      />
    );
  } catch (err) {
    // 에러 발생 시 친절한 에러 화면 표시
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-error/5">
        <Card className="max-w-md w-full border-architect-error/20 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-architect-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-architect-error" />
            </div>
            <h2 className="text-h3 font-bold text-architect-gray-900 mb-2">
              오류 발생
            </h2>
            <p className="text-body text-architect-gray-700 mb-6">
              {err instanceof Error ? err.message : '결제 페이지를 불러오는 중 문제가 발생했습니다.'}
            </p>
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => router.push('/dashboard')}
                className="w-full"
              >
                대시보드로 돌아가기
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.reload()}
                className="w-full"
              >
                다시 시도
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}