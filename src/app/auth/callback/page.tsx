'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/auth/login?error=callback_error');
          return;
        }

        if (data.session) {
          // 로그인 성공 - 홈페이지로 리다이렉트
          router.push('/');
        } else {
          // 세션이 없는 경우 로그인 페이지로
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        router.push('/auth/login?error=unexpected_error');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-architect-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-h3 font-bold text-architect-gray-900 mb-2">
          로그인 처리 중...
        </h1>
        <p className="text-body text-architect-gray-600">
          잠시만 기다려주세요
        </p>
      </div>
    </div>
  );
}