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
import { FullScreenChatbot } from './components/course/FullScreenChatbot';

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
import { VersionHistoryPage } from './components/VersionHistoryPage';
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

// Test users for demo mode
const TEST_USERS: Record<string, User> = {
  demo: {
    id: 'demo-user',
    email: 'demo@ideaworklab.com',
    name: '데모 사용자',
    user_type: 'member',
    subscription_status: 'trial',
    personalizationData: {
      learningProgress: {
        enrolledCourses: [],
        completionRate: 0,
        currentPhase: 1
      },
      behaviorAnalytics: {
        engagementScore: 20,
        learningVelocity: 'slow',
        strongTopics: []
      },
      aiInteractions: {
        totalConversations: 0,
        strugglingAreas: []
      },
      achievements: [],
      recommendations: {
        nextActions: [
          '제주도 여행 코스 시작하기',
          '저널 작성하기'
        ]
      }
    }
  },
  member: {
    id: 'member-user',
    email: 'member@ideaworklab.com',
    name: '일반 회원',
    user_type: 'member',
    subscription_status: 'active',
    personalizationData: {
      learningProgress: {
        enrolledCourses: ['jeju-course'],
        completionRate: 35,
        currentPhase: 2
      },
      behaviorAnalytics: {
        engagementScore: 65,
        learningVelocity: 'normal',
        strongTopics: ['창의적 사고']
      },
      aiInteractions: {
        totalConversations: 12,
        strugglingAreas: ['분석적 사고']
      },
      achievements: [
        { id: 1, title: 'First Step', description: '첫 번째 학습 완료' }
      ],
      recommendations: {
        nextActions: [
          '제주도 여행 코스 Phase 2 계속하기',
          '저널에서 학습 내용 정리하기'
        ]
      }
    }
  },
  enrolled: {
    id: 'enrolled-user',
    email: 'enrolled@ideaworklab.com',
    name: '강의 수강생',
    user_type: 'member',
    subscription_status: 'active',
    personalizationData: {
      learningProgress: {
        enrolledCourses: ['jeju-course'],
        completionRate: 65,
        currentPhase: 3
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
        { id: 2, title: 'AI Collaborator', description: 'AI와 10회 대화 완료' },
        { id: 3, title: 'Phase Master', description: '2개 Phase 완료' }
      ],
      recommendations: {
        nextActions: [
          '제주도 여행 코스 Phase 3 시작하기',
          '저널에서 학습 성과 기록하기'
        ]
      }
    }
  },
  instructor: {
    id: 'instructor-user',
    email: 'instructor@ideaworklab.com',
    name: '강사',
    user_type: 'instructor',
    subscription_status: 'active',
    personalizationData: {
      learningProgress: {
        enrolledCourses: ['jeju-course'],
        completionRate: 100,
        currentPhase: 3
      },
      behaviorAnalytics: {
        engagementScore: 95,
        learningVelocity: 'expert',
        strongTopics: ['창의적 사고', 'AI 협업', '분석적 사고', '문제 해결']
      },
      aiInteractions: {
        totalConversations: 50,
        strugglingAreas: []
      },
      achievements: [
        { id: 1, title: 'Course Master', description: '전체 코스 완료' },
        { id: 2, title: 'AI Expert', description: 'AI 협업 전문가' },
        { id: 3, title: 'Instructor', description: '강사 자격 획득' }
      ],
      recommendations: {
        nextActions: [
          '새로운 강의 콘텐츠 개발하기',
          '학생들의 학습 진도 관리하기'
        ]
      }
    }
  },
  admin: {
    id: 'admin-user',
    email: 'admin@ideaworklab.com',
    name: '관리자',
    user_type: 'admin',
    subscription_status: 'active',
    personalizationData: {
      learningProgress: {
        enrolledCourses: ['jeju-course'],
        completionRate: 100,
        currentPhase: 3
      },
      behaviorAnalytics: {
        engagementScore: 100,
        learningVelocity: 'expert',
        strongTopics: ['창의적 사고', 'AI 협업', '분석적 사고', '문제 해결']
      },
      aiInteractions: {
        totalConversations: 100,
        strugglingAreas: []
      },
      achievements: [
        { id: 1, title: 'Platform Master', description: '플랫폼 관리자' },
        { id: 2, title: 'System Admin', description: '시스템 관리 권한' }
      ],
      recommendations: {
        nextActions: [
          '플랫폼 사용자 분석하기',
          '새로운 기능 기획하기'
        ]
      }
    }
  }
};

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');
  const [showEnvGuide, setShowEnvGuide] = useState(false);
  const [showUserSelector, setShowUserSelector] = useState(false);
  
  // URL parameters for specific pages
  const [journalId, setJournalId] = useState<string | null>(null);
  const [phaseId, setPhaseId] = useState<string | null>(null);
  const [weekId, setWeekId] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  // Demo environment detection - Always true for development/testing
  // 개발 및 테스트를 위해 항상 true로 설정
  const isDemoMode = true;

  useEffect(() => {
    // Simulate initial load
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // No automatic login - start with guest state
    // Users can select test users via developer panel
  }, []);

  // Navigation helper with enhanced support for course-phase
  const navigate = (
    page: PageType, 
    params?: { journalId?: string; phaseId?: string; weekId?: string },
    userId?: string,
    week?: number,
    phase?: number,
    mode?: string
  ) => {
    setCurrentPage(page);
    
    // 페이지 전환 시 항상 최상단으로 스크롤
    window.scrollTo(0, 0);
    
    // Set URL parameters
    if (params?.journalId) setJournalId(params.journalId);
    if (params?.phaseId) setPhaseId(params.phaseId);
    if (params?.weekId) setWeekId(params.weekId);
    
    // Set course-phase specific parameters
    if (week !== undefined) setWeekId(week.toString());
    if (phase !== undefined) setPhaseId(phase.toString());
    if (mode) setSelectedMode(mode);
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

  // Test user selection (Demo mode only)
  const selectTestUser = (userKey: string) => {
    const user = TEST_USERS[userKey];
    if (user) {
      setCurrentUser(user);
      setShowUserSelector(false);
    }
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
              // Demo mode - accept any password for development
              if (password === 'ideaworklab2024' || isDemoMode) {
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
            user={currentUser}
            language={language}
            onNavigate={navigate}
          />
        );

      case 'course-dashboard':
        // 강의 대시보드는 로그인한 사용자만 접근 가능
        if (!currentUser) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="text-center">
                <h2 className="text-xl mb-4">로그인이 필요합니다</h2>
                <p className="text-gray-600 mb-4">강의 대시보드에 접근하려면 먼저 로그인해주세요.</p>
                <button 
                  onClick={() => navigate('auth')}
                  className="bg-iwl-gradient text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  로그인하러 가기
                </button>
              </div>
            </div>
          );
        }
        
        return (
          <CourseDashboard 
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'phase-learning':
        // Phase 학습 페이지는 로그인한 사용자만 접근 가능
        if (!currentUser) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="text-center">
                <h2 className="text-xl mb-4">로그인이 필요합니다</h2>
                <p className="text-gray-600 mb-4">Phase 학습에 접근하려면 먼저 로그인해주세요.</p>
                <button 
                  onClick={() => navigate('auth')}
                  className="bg-iwl-gradient text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  로그인하러 가기
                </button>
              </div>
            </div>
          );
        }
        
        return (
          <PhaseLearningPage 
            week={weekId ? parseInt(weekId) : 1}
            phase={phaseId ? parseInt(phaseId) : 1}
            mode={selectedMode === 'guided' || selectedMode === 'self-directed' ? selectedMode : null}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'weekly-learning':
        // 주차별 학습 페이지는 로그인한 사용자만 접근 가능
        if (!currentUser) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="text-center">
                <h2 className="text-xl mb-4">로그인이 필요합니다</h2>
                <p className="text-gray-600 mb-4">주차별 학습에 접근하려면 먼저 로그인해주세요.</p>
                <button 
                  onClick={() => navigate('auth')}
                  className="bg-iwl-gradient text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  로그인하러 가기
                </button>
              </div>
            </div>
          );
        }
        
        return (
          <WeeklyLearningPage 
            week={weekId ? parseInt(weekId) : 1}
            user={currentUser}
            onNavigate={navigate}
            language={language}
          />
        );

      case 'course-phase':
        // AI 실습 강의는 로그인한 사용자만 접근 가능 - 전체 화면으로 변경
        if (!currentUser) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="text-center">
                <h2 className="text-xl mb-4">로그인이 필요합니다</h2>
                <p className="text-gray-600 mb-4">AI 실습 강의에 접근하려면 먼저 로그인해주세요.</p>
                <button 
                  onClick={() => navigate('auth')}
                  className="bg-iwl-gradient text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  로그인하러 가기
                </button>
              </div>
            </div>
          );
        }
        
        return (
          <FullScreenChatbot 
            week={weekId ? parseInt(weekId) : 1}
            phase={phaseId ? parseInt(phaseId) : 1}
            mode={selectedMode === 'guided' || selectedMode === 'self-directed' ? selectedMode : 'guided'}
            user={currentUser}
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
        // 사용자가 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        if (!currentUser) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="text-center">
                <h2 className="text-xl mb-4">로그인이 필요합니다</h2>
                <p className="text-gray-600 mb-4">대시보드에 접근하려면 먼저 로그인해주세요.</p>
                <button 
                  onClick={() => navigate('auth')}
                  className="bg-iwl-gradient text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  로그인하러 가기
                </button>
              </div>
            </div>
          );
        }
        
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
        return <VersionHistoryPage onNavigate={navigate} language={language} />;

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
          {/* Header - AI 실습 페이지에서는 숨김 */}
          {currentPage !== 'course-phase' && (
            <Header 
              user={currentUser}
              onNavigate={navigate}
              onLogout={logout}
              language={language}
              onLanguageChange={setLanguage}
            />
          )}

          {/* Main Content */}
          <main className="min-h-screen">
            {renderCurrentPage()}
          </main>

          {/* Footer - AI 실습 페이지에서는 숨김 */}
          {currentPage !== 'course-phase' && (
            <Footer 
              onNavigate={navigate}
              language={language}
            />
          )}

          {/* Demo Mode Developer Tools - AI 실습 페이지에서는 숨김 */}
          {isDemoMode && currentPage !== 'course-phase' && (
            <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
              {/* User Selector Button - 보라색 그라데이션 버튼 */}
              <button
                onClick={() => setShowUserSelector(true)}
                className="bg-iwl-gradient hover:opacity-90 text-white rounded-full p-3 shadow-lg transition-all duration-200 fab-animation"
                title={language === 'ko' ? '테스트 사용자 선택' : 'Select Test User'}
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Environment Guide Button - 회색 버튼 */}
              <button
                onClick={() => setShowEnvGuide(true)}
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full p-2 shadow-sm transition-all duration-200 opacity-50 hover:opacity-100"
                title={language === 'ko' ? '데모 모드 - 설정하기' : 'Demo Mode - Setup'}
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Debug Info Badge */}
              <div className="bg-yellow-100 border border-yellow-300 rounded-full px-2 py-1 text-xs text-yellow-800 font-medium">
                v126
              </div>
            </div>
          )}

          {/* Test User Selector Modal */}
          {showUserSelector && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-iwl-gradient">
                    {language === 'ko' ? '테스트 사용자 선택' : 'Select Test User'}
                  </h2>
                  <button
                    onClick={() => setShowUserSelector(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Guest State */}
                  <button
                    onClick={() => {
                      setCurrentUser(null);
                      setShowUserSelector(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      !currentUser 
                        ? 'border-iwl-purple bg-iwl-purple-50' 
                        : 'border-gray-200 hover:border-iwl-purple'
                    }`}
                  >
                    <div className="font-medium">👤 비로그인 사용자</div>
                    <div className="text-sm text-gray-600">Guest State</div>
                  </button>

                  {/* Test Users */}
                  {Object.entries(TEST_USERS).map(([key, user]) => (
                    <button
                      key={key}
                      onClick={() => selectTestUser(key)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        currentUser?.id === user.id 
                          ? 'border-iwl-purple bg-iwl-purple-50' 
                          : 'border-gray-200 hover:border-iwl-purple'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            {key === 'demo' && '🧪 '}
                            {key === 'member' && '👤 '}
                            {key === 'enrolled' && '🎓 '}
                            {key === 'instructor' && '👨‍🏫 '}
                            {key === 'admin' && '⚙️ '}
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {user.user_type} • {user.subscription_status}
                          </div>
                          <div className="text-xs text-iwl-purple">
                            학습 진도: {user.personalizationData?.learningProgress?.completionRate || 0}%
                          </div>
                        </div>
                        {currentUser?.id === user.id && (
                          <div className="text-iwl-purple">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600">
                    {language === 'ko' 
                      ? '현재 사용자' 
                      : 'Current User'
                    }: {currentUser ? currentUser.name : '비로그인'}
                  </div>
                </div>
              </div>
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