'use client';

import { useRouter } from 'next/navigation';
import { AuthPage } from '@/components/auth/AuthPage';

export default function AuthPageRoute() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'home':
        router.push('/');
        break;
      case 'dashboard':
        router.push('/dashboard');
        break;
      case 'course-trial':
        router.push('/trial');
        break;
      default:
        console.log('Unknown navigation target:', page);
    }
  };

  return <AuthPage language="ko" onNavigate={handleNavigate} />;
}