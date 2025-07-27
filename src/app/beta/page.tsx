// v116: 베타 런치 페이지
"use client";

import { useState } from 'react';
import { BetaLaunchPage } from '../../components/beta/BetaLaunchPage';
import { BetaOnboarding } from '../../components/beta/BetaOnboarding';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function BetaPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // 로그인된 베타 사용자가 온보딩을 완료하지 않은 경우 (SSR 안전)
  const shouldShowOnboarding = user && typeof window !== 'undefined' && !localStorage.getItem('beta-onboarding-completed');

  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    router.push('/trial'); // 온보딩 완료 후 체험강의로 이동
  };

  if (shouldShowOnboarding || showOnboarding) {
    return (
      <BetaOnboarding
        language="ko"
        onComplete={handleOnboardingComplete}
        onNavigate={handleNavigate}
      />
    );
  }

  return (
    <BetaLaunchPage
      language="ko"
      onNavigate={handleNavigate}
    />
  );
}