
'use client';

import { HomePage } from '@/components/HomePage';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  const handleNavigate = (page: string, params?: any) => {
    switch (page) {
      case 'courses':
        if (params?.courseId) {
          router.push(`/courses/${params.courseId}`);
        } else {
          router.push('/courses');
        }
        break;
      case 'journal':
        router.push('/journal');
        break;
      case 'journal-detail':
        if (params?.journalId) {
          router.push(`/journal/${params.journalId}`);
        }
        break;
      case 'trial-course':
        router.push('/trial-course');
        break;
      case 'about':
        router.push('/about');
        break;
      case 'diagnosis':
        router.push('/diagnosis');
        break;
      default:
        router.push('/');
    }
  };

  return <HomePage language="ko" onNavigate={handleNavigate} />;
}
