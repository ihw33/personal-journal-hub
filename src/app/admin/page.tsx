'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    // Next.js App Router를 우회하고 커스텀 라우팅으로 리다이렉트
    console.log('🚨 Next.js /admin page accessed - redirecting to custom routing');
    window.location.replace('/');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to admin login...</p>
      </div>
    </div>
  );
}