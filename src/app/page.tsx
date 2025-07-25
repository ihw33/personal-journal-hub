'use client';

import { useState } from 'react';
import { HeaderV05 } from '@/components/layout/HeaderV05';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FeaturedJournals } from '@/components/sections/FeaturedJournals';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { Footer } from '@/components/sections/Footer';
import JournalPage from '@/app/journal/page';
import CoursesPage from '@/app/courses/page';
import AboutPage from '@/app/about/page';

export type Language = 'ko' | 'en';
export type Page = 'home' | 'signup' | 'journal' | 'courses' | 'about';

export default function Home() {
  const [language, setLanguage] = useState<Language>('ko');
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  // Render page content based on current page
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSection language={language} onNavigate={navigateTo} />
            <ProcessSection language={language} />
            <FeaturedJournals language={language} />
            <NewsletterSection language={language} />
          </>
        );
      case 'journal':
        return <JournalPage />;
      case 'courses':
        return <CoursesPage />;
      case 'about':
        return <AboutPage />;
      default:
        return (
          <>
            <HeroSection language={language} onNavigate={navigateTo} />
            <ProcessSection language={language} />
            <FeaturedJournals language={language} />
            <NewsletterSection language={language} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header is always visible on all pages */}
      <HeaderV05 
        language={language} 
        onLanguageToggle={toggleLanguage} 
        currentPage={currentPage} 
        onNavigate={navigateTo} 
      />
      
      {/* Main content area */}
      <main className="flex-1">
        {renderPageContent()}
      </main>
      
      {/* Footer only on home page */}
      {currentPage === 'home' && <Footer language={language} />}
    </div>
  );
}
