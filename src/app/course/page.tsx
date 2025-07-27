'use client';

import { useRouter } from 'next/navigation';
import { JejuCourseOverview } from '@/components/course/JejuCourseOverview';

export default function CoursePage() {
  const router = useRouter();

  const handleNavigate = (page: string, journalId?: string, category?: string, week?: number) => {
    switch (page) {
      case 'course-week':
        if (week) {
          router.push(`/course/week/${week}`);
        }
        break;
      case 'course-submission':
        if (week) {
          router.push(`/course/week/${week}/submission`);
        }
        break;
      case 'course-feedback':
        if (week) {
          router.push(`/course/week/${week}/feedback`);
        }
        break;
      case 'courses':
        router.push('/courses');
        break;
      default:
        console.log('Unknown navigation target:', page);
    }
  };

  return <JejuCourseOverview language="ko" onNavigate={handleNavigate} />;
}