import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PersonalizedHeroSection } from './components/PersonalizedHeroSection';
import { ProcessSection } from './components/ProcessSection';
import { FeaturedJournals } from './components/FeaturedJournals';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { SignupPage } from './components/SignupPage';
import { JournalPage } from './components/JournalPage';
import { JournalDetail } from './components/JournalDetail';
import { CoursesPage } from './components/CoursesPage';
import { AboutPage } from './components/AboutPage';
import { MethodologyPage } from './components/MethodologyPage';
import { ComingSoonPage } from './components/ComingSoonPage';
import { SiteMapPage } from './components/SiteMapPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

// New Auth & Dashboard Components
import { AuthPage } from './components/auth/AuthPage';
import { DashboardRouter } from './components/dashboard/DashboardRouter';

// Course Pages
import { JejuCourseOverview } from './components/course/JejuCourseOverview';
import { WeeklyLearningPage } from './components/course/WeeklyLearningPage';
import { PhaseLearningPage } from './components/course/PhaseLearningPage';
import { PhaseSubmissionPage } from './components/course/PhaseSubmissionPage';
import { CourseSubmissionPage } from './components/course/CourseSubmissionPage';
import { CourseFeedbackPage } from './components/course/CourseFeedbackPage';
import { CourseDashboard } from './components/course/CourseDashboard';

// Trial Course Components
import { TrialCoursePage } from './components/course/TrialCoursePage';

// Legal Pages
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { CookiesPage } from './components/CookiesPage';
import { LicensePage } from './components/LicensePage';
import { HelpPage } from './components/HelpPage';

// AI Practice Page
import { AIPracticePage } from './components/AIPracticePage';

// Toast notifications
import { Toaster } from './components/ui/sonner';
import { EnvironmentGuide } from './components/EnvironmentGuide';

export type Language = 'ko' | 'en';
export type Page = 
  | 'home' | 'signup' | 'journal' | 'journal-detail' | 'journal-write' | 'journal-category'
  | 'courses' | 'about' | 'methodology' | 'auth' | 'dashboard'
  | 'course-jeju' | 'course-trial' | 'course-week' | 'course-phase' | 'course-phase-submit' | 'course-submit' | 'course-feedback' | 'course-dashboard'
  | 'privacy' | 'terms' | 'cookies' | 'license'
  | 'help' | 'community' | 'docs' | 'status'
  | 'templates' | 'ai-tools' | 'analytics' | 'blog' | 'careers' | 'contact'
  | 'sitemap' | 'ai-practice' | 'admin' | 'beta';

// 메인 앱 컴포넌트를 AuthProvider로 감싸기 위해 별도 컴포넌트로 분리
function AppContent() {
  const { user, getUserType, isAdminLoggedIn, adminLogin, adminLogout } = useAuth();
  const [language, setLanguage] = useState<Language>('ko');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedJournalId, setSelectedJournalId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  const [selectedMode, setSelectedMode] = useState<'guided' | 'self-directed' | null>(null);
  const [showEnvGuide, setShowEnvGuide] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  // Custom navigation event listener for browser compatibility
  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      navigateTo(event.detail as Page);
    };

    window.addEventListener('navigate', handleNavigation as EventListener);
    return () => {
      window.removeEventListener('navigate', handleNavigation as EventListener);
    };
  }, []);

  // 사용자 언어 설정 동기화
  useEffect(() => {
    if (user?.personalizationData?.preferences?.language) {
      setLanguage(user.personalizationData.preferences.language);
    }
  }, [user]);

  // navigateTo 함수에 phase와 mode 파라미터 포함
  const navigateTo = (page: Page, journalId?: string, category?: string, week?: number, phase?: number, mode?: 'guided' | 'self-directed') => {
    setCurrentPage(page);
    if (journalId) {
      setSelectedJournalId(journalId);
    }
    if (category) {
      setSelectedCategory(category);
    }
    if (week !== undefined) {
      setSelectedWeek(week);
    }
    if (phase !== undefined) {
      setSelectedPhase(phase);
    }
    if (mode) {
      setSelectedMode(mode);
    }
  };

  // Page name mapping for Coming Soon pages
  const getPageName = (page: Page) => {
    const pageNames = {
      ko: {
        'journal-write': '저널 작성',
        'journal-category': '카테고리별 저널',
        'community': '커뮤니티',
        'docs': 'API 문서',
        'status': '서비스 상태',
        'templates': '템플릿',
        'ai-tools': 'AI 도구',
        'analytics': '분석',
        'blog': '블로그',
        'careers': '채용',
        'contact': '연락처'
      },
      en: {
        'journal-write': 'Journal Writing',
        'journal-category': 'Journal Category',
        'community': 'Community',
        'docs': 'API Documentation',
        'status': 'Service Status',
        'templates': 'Templates',
        'ai-tools': 'AI Tools',
        'analytics': 'Analytics',
        'blog': 'Blog',
        'careers': 'Careers',
        'contact': 'Contact'
      }
    };
    return pageNames[language][page as keyof typeof pageNames[typeof language]] || page;
  };

  // Coming Soon pages list
  const comingSoonPages = [
    'journal-write', 'journal-category', 'community', 'docs', 'status',
    'templates', 'ai-tools', 'analytics', 'blog', 'careers', 'contact'
  ];

  // 🎯 개인화된 홈페이지 렌더링 함수
  const renderPersonalizedHomePage = () => {
    const userType = getUserType();
    
    // 개인화 데이터 준비
    const personalizedData = user?.personalizationData ? {
      name: user.name,
      email: user.email,
      currentCourse: user.personalizationData.learningProgress.enrolledCourses[0] || '제주도 여행 기획 코스',
      progress: user.personalizationData.learningProgress.completionRate,
      completedPhases: user.personalizationData.learningProgress.completedPhases,
      totalPhases: user.personalizationData.learningProgress.totalPhases,
      lastActivity: user.lastActivity?.toLocaleDateString('ko-KR'),
      streak: user.personalizationData.achievements.streak,
      enrollmentDate: user.enrollmentDate,
      membershipLevel: user.membershipLevel
    } : undefined;

    return (
      <>
        <PersonalizedHeroSection
          language={language}
          onNavigate={navigateTo}
          userType={userType}
          userData={personalizedData}
        />
        
        {/* 신규 방문자가 아닌 경우에만 추가 섹션 표시 */}
        {userType !== 'guest' && (
          <>
            <ProcessSection language={language} onNavigate={navigateTo} />
            <FeaturedJournals language={language} onJournalClick={(id) => navigateTo('journal-detail', id)} />
            <NewsletterSection language={language} />
          </>
        )}
        
        <Footer language={language} onNavigate={navigateTo} />
      </>
    );
  };

  // Render page content based on current page
  const renderPageContent = () => {

    switch (currentPage) {
      case 'home':
        // 🎯 개인화된 홈페이지 시스템 적용
        return renderPersonalizedHomePage();
        
      case 'signup':
        return <SignupPage language={language} onNavigate={navigateTo} />;
      case 'auth':
        return <AuthPage language={language} onNavigate={navigateTo} />;
      case 'dashboard':
        return <DashboardRouter language={language} onNavigate={navigateTo} />;
      case 'journal':
        return <JournalPage language={language} onNavigate={navigateTo} onJournalClick={(id) => navigateTo('journal-detail', id)} />;
      case 'journal-detail':
        return <JournalDetail language={language} journalId={selectedJournalId} onNavigate={navigateTo} />;
      case 'courses':
        return <CoursesPage language={language} onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage language={language} />;
      case 'methodology':
        return <MethodologyPage language={language} onNavigate={navigateTo} />;
      case 'sitemap':
        return <SiteMapPage language={language} onNavigate={navigateTo} onLanguageToggle={toggleLanguage} />;
      
      // Course Pages
      case 'course-jeju':
        return <JejuCourseOverview language={language} onNavigate={navigateTo} />;
      case 'course-trial':
        return <TrialCoursePage language={language} onNavigate={navigateTo} />;
      case 'course-week':
        return <WeeklyLearningPage language={language} week={selectedWeek} onNavigate={navigateTo} />;
      case 'course-phase':
        return (
          <PhaseLearningPage 
            language={language} 
            week={selectedWeek} 
            phase={selectedPhase}
            mode={selectedMode}
            onNavigate={navigateTo} 
          />
        );
      case 'course-phase-submit':
        return (
          <PhaseSubmissionPage
            language={language}
            week={selectedWeek}
            phase={selectedPhase}
            mode={selectedMode!}
            onNavigate={navigateTo}
          />
        );
      case 'course-submit':
        return <CourseSubmissionPage language={language} week={selectedWeek} onNavigate={navigateTo} />;
      case 'course-feedback':
        return <CourseFeedbackPage language={language} week={selectedWeek} onNavigate={navigateTo} />;
      case 'course-dashboard':
        return <CourseDashboard language={language} onNavigate={navigateTo} />;
      
      // Legal Pages
      case 'privacy':
        return <PrivacyPage language={language} onNavigate={navigateTo} />;
      case 'terms':
        return <TermsPage language={language} onNavigate={navigateTo} />;
      case 'cookies':
        return <CookiesPage language={language} onNavigate={navigateTo} />;
      case 'license':
        return <LicensePage language={language} onNavigate={navigateTo} />;
      case 'help':
        return <HelpPage language={language} onNavigate={navigateTo} />;
      
      // AI Practice Page
      case 'ai-practice':
        return (
          <AIPracticePage 
            language={language} 
            onNavigate={navigateTo}
            week={selectedWeek}
            phase={selectedPhase}
            mode={selectedMode}
          />
        );
      
      // Beta Page
      case 'beta':
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
            <div className="container mx-auto px-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">베타 테스트</h1>
                <p className="text-lg text-gray-600">새로운 기능을 미리 체험해보세요!</p>
              </div>
              <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">준비 중입니다</h2>
                <p className="text-gray-600 mb-6">베타 테스트 기능이 곧 출시됩니다. 조금만 기다려주세요!</p>
                <button
                  onClick={() => navigateTo('home')}
                  className="w-full bg-iwl-gradient text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                >
                  홈으로 돌아가기
                </button>
              </div>
            </div>
          </div>
        );
      
      // Admin Page
      case 'admin':
        if (!isAdminLoggedIn) {
          return (
            <AdminLogin 
              language={language} 
              onNavigate={navigateTo}
              onLoginSuccess={async (password) => {
                const result = await adminLogin(password);
                return !result.error;
              }}
            />
          );
        } else {
          return (
            <AdminDashboard 
              language={language} 
              onNavigate={navigateTo}
              onLogout={() => {
                adminLogout();
                navigateTo('home');
              }}
            />
          );
        }
      
      // Coming Soon Pages
      default:
        if (comingSoonPages.includes(currentPage)) {
          return (
            <ComingSoonPage 
              language={language} 
              pageName={getPageName(currentPage)} 
              pageKey={currentPage}
              onNavigate={navigateTo}
              onLanguageToggle={toggleLanguage}
              currentPage={currentPage}
            />
          );
        }
        return renderPersonalizedHomePage();
    }
  };

  // Pages that don't show header
  const pagesWithoutHeader = [
    'sitemap', 
    'dashboard',
    'auth',
    'ai-practice',
    'course-trial',
    'admin',
    ...comingSoonPages
  ];

  // 현재 페이지 상태 관리

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header는 특정 페이지에서만 숨김 */}
      {!pagesWithoutHeader.includes(currentPage) && (
        <Header 
          language={language} 
          onLanguageToggle={toggleLanguage} 
          currentPage={currentPage} 
          onNavigate={navigateTo} 
        />
      )}
      
      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1">
        {renderPageContent()}
      </main>

      {/* Environment Guide Modal */}
      {showEnvGuide && (
        <EnvironmentGuide 
          language={language} 
          onClose={() => setShowEnvGuide(false)} 
        />
      )}

      {/* Demo Mode Indicator - Minimized */}
      {(!process.env.REACT_APP_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL === 'your_supabase_project_url_here') && (
        <div className="fixed bottom-4 right-4 z-40">
          <button
            onClick={() => setShowEnvGuide(true)}
            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full p-2 shadow-sm transition-all duration-200 opacity-50 hover:opacity-100"
            title={language === 'ko' ? '데모 모드 - 설정하기' : 'Demo Mode - Setup'}
          >
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          </button>
        </div>
      )}

      {/* Toast 알림 */}
      <Toaster 
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}