'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { WeeklyLearningPage } from '@/components/course/WeeklyLearningPage';

interface Props {
  params: Promise<{
    week: string;
  }>;
}

export default function WeekPage({ params }: Props) {
  const { week } = use(params);
  const router = useRouter();
  const weekNumber = parseInt(week);

  const handleNavigate = (page: string, journalId?: string, category?: string, week?: number, phase?: number, mode?: 'guided' | 'self-directed') => {
    switch (page) {
      case 'course-phase':
        if (phase && mode) {
          router.push(`/course/phase/${phase}?week=${weekNumber}&mode=${mode}`);
        }
        break;
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
      case 'course':
        router.push('/course');
        break;
      case 'home':
        router.push('/');
        break;
      default:
        console.log('Unknown navigation target:', page);
    }
  };

  return <WeeklyLearningPage 
    week={weekNumber} 
    language="ko" 
    onNavigate={handleNavigate} 
  />;
}