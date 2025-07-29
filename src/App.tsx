import React, { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import { PersonalizationProvider } from './contexts/PersonalizationContext';

// Layout Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Page Components
import { HeroSection } from './components/HeroSection';
import { PersonalizedHeroSection } from './components/PersonalizedHeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ProcessSection } from './components/ProcessSection';
import { FeaturedJournals } from './components/FeaturedJournals';
import { NewsletterSection } from './components/NewsletterSection';
import { CreatorSection } from './components/CreatorSection';

// Main Pages
import { AboutPage } from './components/AboutPage';
import { CoursesPage } from './components/CoursesPage';
import { JournalPage } from './components/JournalPage';
import { JournalDetail } from './components/JournalDetail';
import { JournalEditor } from './components/JournalEditor';
import { AIPracticePage } from './components/AIPracticePage';
import { MethodologyPage } from './components/MethodologyPage';
import { HelpPage } from './components/HelpPage';
import { SignupPage } from './components/SignupPage';

// Auth Components
import { AuthPage } from './components/auth/AuthPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

// Course Components
import { JejuCourseOverview } from './components/course/JejuCourseOverview';
import { CourseDashboard } from './components/course/CourseDashboard';
import { PhaseLearningPage } from './components/course/PhaseLearningPage';
import { WeeklyLearningPage } from './components/course/WeeklyLearningPage';
import { PhaseSubmissionPage } from './components/course/PhaseSubmissionPage';
import { CourseSubmissionPage } from './components/course/CourseSubmissionPage';
import { CourseFeedbackPage } from './components/course/CourseFeedbackPage';
import { TrialCoursePage } from './components/course/TrialCoursePage';

// Dashboard Components  
import { DashboardRouter } from './components/dashboard/DashboardRouter';

// Academy Components
import { ChooseFormatPage } from './components/academy/ChooseFormatPage';
import { GroupDashboard } from './components/academy/GroupDashboard';
import { PeerReviewPage } from './components/academy/PeerReviewPage';

// Payment Components
import { CoursePayment } from './components/payment/CoursePayment';

// Legal & Info Pages
import { TermsPage } from './components/TermsPage';
import { PrivacyPage } from './components/PrivacyPage';
import { CookiesPage } from './components/CookiesPage';
import { LicensePage } from './components/LicensePage';
import { SiteMapPage } from './components/SiteMapPage';
// import { VersionHistoryPage } from './components/VersionHistoryPage';
import { ComingSoonPage } from './components/ComingSoonPage';

// Utility Components
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { EnvironmentGuide } from './components/EnvironmentGuide';

// Types
type PageType = 
  | 'home'
  | 'about' 
  | 'courses'
  | 'journal'
  | 'journal-detail'
  | 'journal-editor'
  | 'ai-practice'
  | 'methodology'
  | 'help'
  | 'signup'
  | 'auth'
  | 'admin-login'
  | 'admin-dashboard'
  | 'jeju-course'
  | 'course-dashboard'
  | 'phase-learning'
  | 'weekly-learning'
  | 'course-week'
  | 'course-phase'
  | 'phase-submission'
  | 'course-submission'
  | 'course-feedback'
  | 'trial-course'
  | 'dashboard'
  | 'choose-format'
  | 'group-dashboard'
  | 'peer-review'
  | 'payment'
  | 'terms'
  | 'privacy' 
  | 'cookies'
  | 'license'
  | 'sitemap'
  | 'version-history'
  | 'coming-soon';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  user_type: 'guest' | 'member' | 'instructor' | 'admin';
  subscription_status?: 'active' | 'inactive' | 'trial';
  personalizationData?: any;
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');
  const [showEnvGuide, setShowEnvGuide] = useState(false);
  
  // URL parameters for specific pages
  const [journalId, setJournalId] = useState<string | null>(null);
  const [phaseId, setPhaseId] = useState<string | null>(null);
  const [weekId, setWeekId] = useState<string | null>(null);

  // Demo environment detection - safely check for environment variables
  const isDemoMode = (() => {
    try {
      return !import.meta.env?.VITE_SUPABASE_URL && !import.meta.env?.VITE_STRIPE_PUBLIC_KEY;
    } catch {
      // Fallback to demo mode if environment variables are not accessible
      return true;
    }
  })();

  useEffect(() => {
    // Handle URL parameters for admin access
    const handleURLParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      
      if (pageParam === 'admin') {
        setCurrentPage('admin-login');
        // Clean up URL
        window.history.replaceState({}, '', '/');
        return;
      }
    };
    
    handleURLParams();
    
    // Simulate initial load
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Demo user for development
    if (isDemoMode) {
      setCurrentUser({
        id: 'demo-user',
        email: 'demo@ideaworklab.com',
        name: '데모 사용자',
        user_type: 'member',
        subscription_status: 'active',
        personalizationData: {
          learningProgress: {
            enrolledCourses: ['jeju-course'],
            completionRate: 65,
            currentPhase: 2
          },
          behaviorAnalytics: {
            engagementScore: 85,
            learningVelocity: 'fast',
            strongTopics: ['창의적 사고', 'AI 협업']
          },
          aiInteractions: {
            totalConversations: 23,
            strugglingAreas: ['분석적 사고']
          },
          achievements: [
            { id: 1, title: 'First Step', description: '첫 번째 학습 완료' },
            { id: 2, title: 'AI Collaborator', description: 'AI와 10회 대화 완료' }
          ],
          recommendations: {
            nextActions: [
              '제주도 여행 코스 Phase 3 시작하기',
              '분석적 사고 모드로 AI 실습하기'
            ]
          }
        }
      });
    }
  }, [isDemoMode]);

  // Navigation helper
  const navigate = (page: string, journalId?: string, category?: string, week?: number, phase?: number, mode?: 'guided' | 'self-directed') => {
    setCurrentPage(page as PageType);
    if (journalId) setJournalId(journalId);
    if (phase) setPhaseId(phase.toString());
    if (week) setWeekId(week.toString());
  };

  // Authentication helpers
  const login = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('home');
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  // Get user type for personalization
  const userType = currentUser?.user_type || 'guest';

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="min-h-screen">
            {/* Hero Section - Personalized for logged-in users */}
            {currentUser ? (
              <PersonalizedHeroSection 
                user={currentUser}
                onNavigate={navigate}
                language={language}
              />
            ) : (
              <HeroSection 
                onNavigate={navigate}
                language={language}
              />
            )}
            
            {/* Features Section */}
            <FeaturesSection language={language} />
            
            {/* Process Section */}
            <ProcessSection language={language} />
            
            {/* Featured Journals */}
            <FeaturedJournals 
              onNavigate={navigate}
              language={language}
            />
            
            {/* Newsletter Section */}
            <NewsletterSection language={language} />
            
            {/* Creator Section */}
            <CreatorSection language={language} />
          </div>
        );

      case 'about':
        return <AboutPage onNavigate={navigate} language={language} />;

      case 'courses':
        return <CoursesPage onNavigate={navigate} language={language} />;

      case 'journal':
        return (
          <JournalPage 
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'journal-detail':
        return (
          <JournalDetail 
            journalId={journalId}
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'journal-editor':
        return (
          <JournalEditor 
            journalId={journalId}
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'ai-practice':
        return (
          <AIPracticePage 
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'methodology':
        return <MethodologyPage onNavigate={navigate} language={language} />;

      case 'help':
        return <HelpPage onNavigate={navigate} language={language} />;

      case 'signup':
        return (
          <SignupPage 
            onNavigate={navigate}
            onSignup={login}
            language={language}
          />
        );

      case 'auth':
        return (
          <AuthPage 
            onNavigate={navigate}
            onLogin={login}
            language={language}
          />
        );

      case 'admin-login':
        return (
          <AdminLogin 
            onNavigate={navigate}
            onLoginSuccess={async (password) => {
              // Only accept correct password or demo mode
              if (password === 'ideaworklab2024') {
                const adminUser: User = {
                  id: 'admin-user',
                  email: 'admin@ideaworklab.com',
                  name: '관리자',
                  user_type: 'admin'
                };
                login(adminUser);
                navigate('admin-dashboard');
                return true;
              }
              return false;
            }}
            language={language}
          />
        );

      case 'admin-dashboard':
        // Check if user is actually logged in as admin
        if (!currentUser || currentUser.user_type !== 'admin') {
          navigate('admin-login');
          return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  {language === 'ko' ? '관리자 인증이 필요합니다' : 'Admin Authentication Required'}
                </h2>
                <p className="text-gray-500">리다이렉트 중...</p>
              </div>
            </div>
          );
        }
        return (
          <AdminDashboard 
            language={language}
            onNavigate={navigate}
            onLogout={logout}
          />
        );

      case 'jeju-course':
        return (
          <JejuCourseOverview 
            language={language}
            onNavigate={navigate}
          />
        );

      case 'course-dashboard':
        return (
          <CourseDashboard 
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'phase-learning':
      case 'course-phase':
        return (
          <PhaseLearningPage 
            phaseId={phaseId}
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'weekly-learning':
      case 'course-week':
        return (
          <WeeklyLearningPage 
            week={weekId ? parseInt(weekId) : 1}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'phase-submission':
        return (
          <PhaseSubmissionPage 
            phaseId={phaseId}
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'course-submission':
        return (
          <CourseSubmissionPage 
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'course-feedback':
        return (
          <CourseFeedbackPage 
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'trial-course':
        return (
          <TrialCoursePage 
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'dashboard':
        return (
          <DashboardRouter 
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'choose-format':
        return (
          <ChooseFormatPage 
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'group-dashboard':
        return (
          <GroupDashboard 
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'peer-review':
        return (
          <PeerReviewPage 
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'payment':
        return (
          <CoursePayment 
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'terms':
        return <TermsPage onNavigate={navigate} language={language} />;

      case 'privacy':
        return <PrivacyPage onNavigate={navigate} language={language} />;

      case 'cookies':
        return <CookiesPage onNavigate={navigate} language={language} />;

      case 'license':
        return <LicensePage onNavigate={navigate} language={language} />;

      case 'sitemap':
        return <SiteMapPage onNavigate={navigate} language={language} />;

      case 'version-history':
        return <ComingSoonPage onNavigate={navigate} language={language} />;

      case 'coming-soon':
        return <ComingSoonPage onNavigate={navigate} language={language} />;

      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl mb-4">페이지를 찾을 수 없습니다</h1>
              <button 
                onClick={() => navigate('home')}
                className="bg-iwl-gradient text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                홈으로 돌아가기
              </button>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" text="로딩 중..." />
      </div>
    );
  }

  return (
    <AuthProvider>
      <PersonalizationProvider>
        <div className="min-h-screen bg-background text-foreground">
          {/* Header */}
          <Header 
            user={currentUser}
            onNavigate={navigate}
            onLogout={logout}
            language={language}
            onLanguageChange={setLanguage}
          />

          {/* Main Content */}
          <main className="min-h-screen">
            {renderCurrentPage()}
          </main>

          {/* Footer */}
          <Footer 
            onNavigate={navigate}
            language={language}
          />

          {/* Demo Mode Environment Guide */}
          {isDemoMode && (
            <div className="fixed bottom-4 right-4 z-50">
              <button
                onClick={() => setShowEnvGuide(true)}
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full p-2 shadow-sm transition-all duration-200 opacity-50 hover:opacity-100"
                title={language === 'ko' ? '데모 모드 - 설정하기' : 'Demo Mode - Setup'}
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          )}

          {/* Environment Guide Modal */}
          {showEnvGuide && (
            <EnvironmentGuide 
              onClose={() => setShowEnvGuide(false)}
              language={language}
            />
          )}

          {/* Toast Notifications */}
          <Toaster 
            position="top-right"
            richColors
            closeButton
            duration={4000}
            toastOptions={{
              className: 'text-sm',
              style: {
                background: 'var(--iwl-gradient)',
                color: 'white',
                border: 'none'
              }
            }}
          />
        </div>
      </PersonalizationProvider>
    </AuthProvider>
  );
}

export default App;