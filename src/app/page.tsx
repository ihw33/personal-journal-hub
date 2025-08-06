
'use client';

import ComingSoonPage from '@/components/ComingSoonPage';

export default function Home() {
  const handleEmailSubmit = async (email: string) => {
    try {
      const response = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '등록 중 오류가 발생했습니다.');
      }

      return data;
    } catch (error) {
      console.error('Email submission error:', error);
      throw error;
    }
  };

  return <ComingSoonPage onEmailSubmit={handleEmailSubmit} />;
}
