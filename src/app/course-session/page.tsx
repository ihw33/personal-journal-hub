'use client';

import React, { Suspense } from 'react';

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

// 실제 컴포넌트는 동적 import로 분리
const CourseSessionContent = React.lazy(() => import('./CourseSessionContent'));

export default function CourseSessionPage() {
  return (
    <Suspense fallback={<CourseSessionLoading />}>
      <CourseSessionContent />
    </Suspense>
  );
}