import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MemberDashboard } from './MemberDashboard';
import { InstructorDashboard } from './InstructorDashboard';
import { AdminDashboard } from '../AdminDashboard';
import { Language, Page } from '../../App';

interface DashboardRouterProps {
  language: Language;
  onNavigate: (page: Page, ...args: any[]) => void;
}

export const DashboardRouter: React.FC<DashboardRouterProps> = ({
  language,
  onNavigate
}) => {
  const { user, getUserType, isAdminLoggedIn } = useAuth();

  // 관리자가 로그인한 경우 관리자 대시보드
  if (isAdminLoggedIn) {
    return (
      <AdminDashboard 
        language={language} 
        onNavigate={onNavigate}
        onLogout={() => {
          // AdminDashboard에서 로그아웃 처리
        }}
      />
    );
  }

  // 사용자가 로그인하지 않은 경우
  if (!user) {
    onNavigate('auth');
    return null;
  }

  const userType = getUserType();

  // 사용자 타입별 대시보드 라우팅
  switch (userType) {
    case 'member':
      return <MemberDashboard language={language} onNavigate={onNavigate} />;
    
    case 'instructor':
      return <InstructorDashboard language={language} onNavigate={onNavigate} />;
    
    case 'admin':
      return (
        <AdminDashboard 
          language={language} 
          onNavigate={onNavigate}
          onLogout={() => onNavigate('home')}
        />
      );
    
    default:
      // 권한이 없는 경우 인증 페이지로 리다이렉트
      onNavigate('auth');
      return null;
  }
};