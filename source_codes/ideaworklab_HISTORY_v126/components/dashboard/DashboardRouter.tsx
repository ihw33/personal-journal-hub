import React, { useEffect } from 'react';
import { MemberDashboard } from './MemberDashboard';
import { InstructorDashboard } from './InstructorDashboard';
import { AdminDashboard } from '../AdminDashboard';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  user_type: 'guest' | 'member' | 'instructor' | 'admin';
  subscription_status?: 'active' | 'inactive' | 'trial';
  personalizationData?: any;
}

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

interface DashboardRouterProps {
  user: User | null;
  language: 'ko' | 'en';
  onNavigate: (page: PageType, params?: any, userId?: string, week?: number, phase?: number, mode?: string) => void;
}

export const DashboardRouter: React.FC<DashboardRouterProps> = ({
  user,
  language,
  onNavigate
}) => {
  // 사용자가 로그인하지 않은 경우 안전하게 리다이렉트
  useEffect(() => {
    if (!user) {
      onNavigate('auth');
    }
  }, [user, onNavigate]);

  // 로딩 상태 또는 사용자가 없는 경우
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-iwl-purple mx-auto mb-4"></div>
          <p className="text-gray-600">로그인 확인 중...</p>
        </div>
      </div>
    );
  }

  const userType = user.user_type;

  // 사용자 타입별 대시보드 라우팅
  switch (userType) {
    case 'member':
      return (
        <MemberDashboard 
          user={user}
          language={language} 
          onNavigate={onNavigate} 
        />
      );
    
    case 'instructor':
      return (
        <InstructorDashboard 
          user={user}
          language={language} 
          onNavigate={onNavigate} 
        />
      );
    
    case 'admin':
      return (
        <AdminDashboard 
          language={language} 
          onNavigate={onNavigate}
          onLogout={() => onNavigate('home')}
        />
      );
    
    case 'guest':
    default:
      // 권한이 없는 경우 useEffect로 안전하게 리다이렉트
      useEffect(() => {
        onNavigate('auth');
      }, [onNavigate]);
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h2 className="text-xl mb-4">접근 권한이 필요합니다</h2>
            <p className="text-gray-600 mb-4">로그인 페이지로 이동합니다...</p>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-iwl-purple mx-auto"></div>
          </div>
        </div>
      );
  }
};