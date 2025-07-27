'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PersonalizedHeroSection } from '@/components/PersonalizedHeroSection';
import { ProcessSection } from '@/components/ProcessSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { CreatorSection } from '@/components/CreatorSection';
import { FeaturedJournals } from '@/components/FeaturedJournals';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Footer } from '@/components/Footer';

export type Language = 'ko' | 'en';
export type Page = 'home' | 'signup' | 'journal' | 'courses' | 'about';

export default function Home() {
  const [language, setLanguage] = useState<Language>('ko');
  const [userType, setUserType] = useState<'guest' | 'member'>('guest'); // 현재는 기본값으로 guest

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  const navigateTo = (page: string) => {
    // This function is no longer needed for Header navigation
    // but kept for HeroSection compatibility
    console.log('Navigate to:', page);
  };

  // 임시 사용자 데이터 (실제로는 인증 시스템에서 가져옴)
  const mockUserData = {
    name: '김철수',
    email: 'user@example.com',
    currentCourse: '제주도 여행 기획 과정',
    progress: 45,
    completedPhases: 12,
    totalPhases: 24,
    lastLoginDate: '2025-01-27',
    streak: 7,
    achievements: ['첫 번째 단계 완료', '1주 연속 학습']
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header is always visible on all pages */}
      <Header 
        language={language} 
        onLanguageToggle={toggleLanguage}
      />
      
      {/* Main content area - Home page only */}
      <main className="flex-1">
        {/* 사용자 타입에 따라 다른 히어로 섹션 표시 */}
        {userType === 'member' ? (
          <PersonalizedHeroSection 
            language={language} 
            onNavigate={navigateTo}
            userType={userType}
            userData={mockUserData}
          />
        ) : (
          <HeroSection language={language} onNavigate={navigateTo} />
        )}
        
        <FeaturesSection language={language} />
        <ProcessSection language={language} />
        <CreatorSection language={language} />
        <FeaturedJournals language={language} />
        <NewsletterSection language={language} />
        
        {/* 개발/테스트용 버튼 - 나중에 제거 */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setUserType(userType === 'guest' ? 'member' : 'guest')}
            className="bg-iwl-purple text-white px-4 py-2 rounded-lg shadow-lg text-sm"
          >
            {userType === 'guest' ? 'Member View' : 'Guest View'}
          </button>
        </div>
      </main>
      
      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
