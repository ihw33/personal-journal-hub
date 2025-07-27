'use client';

import { useState } from 'react';
import { HeaderV05 } from '@/components/layout/HeaderV05';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FeaturedJournals } from '@/components/sections/FeaturedJournals';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { Footer } from '@/components/sections/Footer';

export type Language = 'ko' | 'en';
export type Page = 'home' | 'signup' | 'journal' | 'courses' | 'about';

export default function Home() {
  const [language, setLanguage] = useState<Language>('ko');

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  const navigateTo = (page: string) => {
    // This function is no longer needed for Header navigation
    // but kept for HeroSection compatibility
    console.log('Navigate to:', page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header is always visible on all pages */}
      <HeaderV05 
        language={language} 
        onLanguageToggle={toggleLanguage}
      />
      
      {/* Main content area - Home page only */}
      <main className="flex-1">
        <HeroSection language={language} onNavigate={navigateTo} />
        <ProcessSection language={language} />
        <FeaturedJournals language={language} />
        <NewsletterSection language={language} />
      </main>
      
      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
