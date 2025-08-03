'use client';

import { useAuth } from '@/lib/supabase/auth-context';
import ArchitectHeader from './ArchitectHeader';
import { useState } from 'react';

export default function HeaderWithAuth() {
  const { user, signOut } = useAuth();
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');

  // 사용자 정보를 ArchitectHeader 형식에 맞게 변환
  const userProfile = user ? {
    id: user.id,
    name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    avatar: user.user_metadata?.avatar_url || null,
    role: 'user' as const
  } : null;

  const handleLanguageChange = (lang: 'ko' | 'en') => {
    setLanguage(lang);
    // 필요시 언어 설정을 저장하거나 다른 로직 추가
  };

  const handleLogout = async () => {
    try {
      await signOut();
      // 로그아웃 후 홈페이지로 리다이렉트는 AuthContext에서 자동 처리됨
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <ArchitectHeader
      user={userProfile}
      language={language}
      onLanguageChange={handleLanguageChange}
      onLogout={handleLogout}
    />
  );
}