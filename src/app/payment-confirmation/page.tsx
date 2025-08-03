'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import PaymentConfirmationPage from '@/components/user/PaymentConfirmationPage';
import { useAuth } from '@/lib/supabase/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

// PaymentConfirmationContent 컴포넌트 - useSearchParams 사용
function PaymentConfirmationContent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isValidating, setIsValidating] = useState(true);

  // 인증 체크
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        // 로그인하지 않은 경우 로그인 페이지로 리디렉션
        redirect('/auth/login');
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
          <p className="text-body text-architect-gray-700">결제 확인을 처리하고 있습니다...</p>
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
      case 'courses':
        router.push('/courses');
        break;
      case 'download-receipt':
        // 영수증 다운로드 로직은 컴포넌트 내부에서 처리
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
      <PaymentConfirmationPage
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
              {err instanceof Error ? err.message : '결제 확인 페이지를 불러오는 중 문제가 발생했습니다.'}
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

// 로딩 컴포넌트
function PaymentConfirmationLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-architect-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-body text-architect-gray-700">결제 확인을 처리하고 있습니다...</p>
      </div>
    </div>
  );
}

// 메인 컴포넌트 - Suspense 경계 제공
export default function PaymentConfirmationPageWrapper() {
  return (
    <Suspense fallback={<PaymentConfirmationLoading />}>
      <PaymentConfirmationContent />
    </Suspense>
  );
}