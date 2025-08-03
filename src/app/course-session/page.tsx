'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CourseSessionPage from '@/components/course/CourseSessionPage';
import { useAuth } from '@/lib/supabase/auth-context';

export default function CourseSessionPageWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  // URL 파라미터에서 세션 정보 추출
  const sessionId = searchParams.get('sessionId') || 'session-1-1';
  const courseId = searchParams.get('courseId') || 'systematic-thinking';
  const targetAudience = searchParams.get('targetAudience') as 'junior' | 'youth' | 'pro' || 'youth';

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

  return (
    <CourseSessionPage
      language="ko"
      user={user}
      onNavigate={handleNavigate}
      sessionId={sessionId}
      courseId={courseId}
      targetAudience={targetAudience}
    />
  );
}