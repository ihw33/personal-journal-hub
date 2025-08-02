'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CourseDetailPage } from '@/components/course/CourseDetailPage';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

/**
 * 개별 코스 상세 페이지
 * /courses/[id] 경로에서 특정 코스의 상세 정보와 학습 진행 상황을 표시
 */
export default function CourseDetailPageRoute() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const handleSessionStart = (sessionId: string) => {
    // 실제 구현에서는 세션 시작 로직
    console.log('Starting session:', sessionId);
    
    // 세션 페이지로 이동하거나 모달 열기 등
    // router.push(`/courses/${courseId}/sessions/${sessionId}`);
  };

  const handleSessionComplete = (sessionId: string) => {
    // 실제 구현에서는 Supabase를 통한 진행 상황 업데이트
    console.log('Completing session:', sessionId);
  };

  const handleEnroll = (courseId: string) => {
    // 실제 구현에서는 Supabase를 통한 수강 등록 로직
    console.log('Enrolling in course:', courseId);
    
    // 등록 후 페이지 새로고침 또는 상태 업데이트
    window.location.reload();
  };

  if (!courseId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-h3 font-bold text-architect-gray-900 mb-2">
            잘못된 접근입니다
          </h1>
          <p className="text-architect-gray-600 mb-4">
            올바르지 않은 코스 ID입니다.
          </p>
          <button 
            onClick={() => router.push('/courses')}
            className="px-4 py-2 bg-architect-primary text-white rounded-lg hover:bg-architect-primary/90"
          >
            코스 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <CourseDetailPage
        courseId={courseId}
        onSessionStart={handleSessionStart}
        onSessionComplete={handleSessionComplete}
        onEnroll={handleEnroll}
      />
    </ErrorBoundary>
  );
}