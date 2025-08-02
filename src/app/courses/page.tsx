'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CourseListPage } from '@/components/course/CourseListPage';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

/**
 * 코스 목록 페이지
 * /courses 경로에서 8단계 사고 확장 시스템의 모든 코스를 표시
 */
export default function CoursesPage() {
  const router = useRouter();

  const handleCourseClick = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  const handleEnroll = (courseId: string) => {
    // 실제 구현에서는 Supabase를 통한 수강 등록 로직
    console.log('Enrolling in course:', courseId);
    
    // 임시로 코스 상세 페이지로 이동
    router.push(`/courses/${courseId}`);
  };

  return (
    <ErrorBoundary>
      <CourseListPage
        onCourseClick={handleCourseClick}
        onEnroll={handleEnroll}
      />
    </ErrorBoundary>
  );
}