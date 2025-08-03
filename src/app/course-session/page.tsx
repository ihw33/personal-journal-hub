'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { redirect } from 'next/navigation';
import CourseSessionPage from '@/components/course/CourseSessionPage';
import { useAuth } from '@/lib/supabase/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { getCurrentSafeUrl } from '@/lib/security/redirectSecurity';

// 타입 정의
type TargetAudience = 'junior' | 'youth' | 'pro';

interface SessionParams {
  sessionId: string;
  courseId: string;
  targetAudience: TargetAudience;
}

// 기본값 설정
const DEFAULT_PARAMS: SessionParams = {
  sessionId: 'session-1-1',
  courseId: 'systematic-thinking',
  targetAudience: 'youth'
};

// 타입 안전성을 위한 검증 함수
function validateTargetAudience(value: string | null): TargetAudience {
  const validValues: TargetAudience[] = ['junior', 'youth', 'pro'];
  if (value && validValues.includes(value as TargetAudience)) {
    return value as TargetAudience;
  }
  return DEFAULT_PARAMS.targetAudience; // 기본값 반환
}

// 파라미터 검증 함수
function validateParams(searchParams: URLSearchParams): SessionParams {
  const sessionId = searchParams.get('sessionId') || DEFAULT_PARAMS.sessionId;
  const courseId = searchParams.get('courseId') || DEFAULT_PARAMS.courseId;
  const targetAudience = validateTargetAudience(searchParams.get('targetAudience'));
  
  return {
    sessionId,
    courseId,
    targetAudience
  };
}

// CourseSessionContent 컴포넌트 - useSearchParams 사용
function CourseSessionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [isValidating, setIsValidating] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          <p className="text-body text-architect-gray-700">세션을 준비하고 있습니다...</p>
        </div>
      </div>
    );
  }

  // 네비게이션 핸들러
  const handleNavigate = (page: string, params?: any) => {
    switch (page) {
      case 'course-dashboard':
        router.push('/courses');
        break;
      case 'course-detail':
        router.push(`/courses/${params?.courseId || courseId}`);
        break;
      case 'dashboard':
        router.push('/dashboard');
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
    // 파라미터 검증
    const params = validateParams(searchParams);
    
    return (
      <CourseSessionPage
        language="ko"
        user={user}
        onNavigate={handleNavigate}
        sessionId={params.sessionId}
        courseId={params.courseId}
        targetAudience={params.targetAudience}
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
              {err instanceof Error ? err.message : '세션을 불러오는 중 문제가 발생했습니다.'}
            </p>
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => router.push('/courses')}
                className="w-full"
              >
                코스 목록으로 돌아가기
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
function CourseSessionLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-architect-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-body text-architect-gray-700">세션을 준비하고 있습니다...</p>
      </div>
    </div>
  );
}

// 메인 컴포넌트 - Suspense 경계 제공
export default function CourseSessionPageWrapper() {
  return (
    <Suspense fallback={<CourseSessionLoading />}>
      <CourseSessionContent />
    </Suspense>
  );
}