'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { JejuCourseOverview } from '../../components/course/JejuCourseOverview';

export default function CourseJejuPage() {
  const router = useRouter();

  const handleNavigate = (page: string, journalId?: string, category?: string, week?: number) => {
    switch (page) {
      case 'home':
        router.push('/');
        break;
      case 'auth':
        router.push('/auth');
        break;
      case 'course':
        router.push('/course');
        break;
      case 'course-week':
        if (week) {
          router.push(`/course/week/${week}`);
        }
        break;
      case 'dashboard':
        router.push('/dashboard');
        break;
      default:
        router.push('/');
    }
  };

  return (
    <JejuCourseOverview 
      language="ko"
      onNavigate={handleNavigate}
    />
  );
}