'use client';

import { use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PhaseLearningPage } from '@/components/course/PhaseLearningPage';

interface Props {
  params: Promise<{
    phase: string;
  }>;
}

export default function PhasePage({ params }: Props) {
  const { phase } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const phaseNumber = parseInt(phase);
  const week = parseInt(searchParams.get('week') || '1');
  const mode = (searchParams.get('mode') || 'self-directed') as 'guided' | 'self-directed';

  const handleNavigate = (page: string, journalId?: string, category?: string, weekParam?: number, phaseParam?: number, modeParam?: 'guided' | 'self-directed') => {
    switch (page) {
      case 'course-phase':
        if (phaseParam && modeParam) {
          router.push(`/course/phase/${phaseParam}?week=${week}&mode=${modeParam}`);
        }
        break;
      case 'course-week':
        if (weekParam) {
          router.push(`/course/week/${weekParam}`);
        } else {
          router.push(`/course/week/${week}`);
        }
        break;
      case 'course-submission':
        if (weekParam) {
          router.push(`/course/week/${weekParam}/submission`);
        } else {
          router.push(`/course/week/${week}/submission`);
        }
        break;
      case 'course-feedback':
        if (weekParam) {
          router.push(`/course/week/${weekParam}/feedback`);
        } else {
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

  return <PhaseLearningPage 
    phase={phaseNumber} 
    language="ko" 
    week={week} 
    mode={mode} 
    onNavigate={handleNavigate} 
  />;
}