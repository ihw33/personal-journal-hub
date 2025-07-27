// v117: Admin 시스템 완전 통합 - 접근 제어 유틸리티
import { UserRole } from '../contexts/AuthContext';

export interface PageAccessConfig {
  page: string;
  guestAccess: boolean;
  memberAccess: boolean;
  adminAccess: boolean;
  redirectPage?: string;
  requiresAuth?: boolean;
}

// v117: 페이지별 접근 권한 설정
export const PAGE_ACCESS_CONFIG: Record<string, PageAccessConfig> = {
  // 공개 페이지
  'home': {
    page: 'home',
    guestAccess: true,
    memberAccess: true,
    adminAccess: true
  },
  'about': {
    page: 'about',
    guestAccess: true,
    memberAccess: true,
    adminAccess: true
  },
  'auth': {
    page: 'auth',
    guestAccess: true,
    memberAccess: true,
    adminAccess: true
  },
  
  // 멤버 전용 페이지
  'journal': {
    page: 'journal',
    guestAccess: false,
    memberAccess: true,
    adminAccess: true,
    redirectPage: 'auth',
    requiresAuth: true
  },
  'dashboard': {
    page: 'dashboard',
    guestAccess: false,
    memberAccess: true,
    adminAccess: true,
    redirectPage: 'auth',
    requiresAuth: true
  },
  
  // 강의 관련 페이지 (멤버 전용)
  'course-jeju': {
    page: 'course-jeju',
    guestAccess: false,
    memberAccess: true,
    adminAccess: true,
    redirectPage: 'auth',
    requiresAuth: true
  },
  'course-week': {
    page: 'course-week',
    guestAccess: false,
    memberAccess: true,
    adminAccess: true,
    redirectPage: 'auth',
    requiresAuth: true
  },
  'course-phase': {
    page: 'course-phase',
    guestAccess: false,
    memberAccess: true,
    adminAccess: true,
    redirectPage: 'auth',
    requiresAuth: true
  },
  'ai-practice': {
    page: 'ai-practice',
    guestAccess: false,
    memberAccess: true,
    adminAccess: true,
    redirectPage: 'auth',
    requiresAuth: true
  },
  
  // v116: 베타 관련 페이지 (공개)
  'beta-landing': {
    page: 'beta-landing',
    guestAccess: true,
    memberAccess: true,
    adminAccess: true
  },
  'beta-signup': {
    page: 'beta-signup',
    guestAccess: true,
    memberAccess: true,
    adminAccess: true
  },
  'beta-waitlist': {
    page: 'beta-waitlist',
    guestAccess: true,
    memberAccess: true,
    adminAccess: true
  },
  
  // 관리자 전용 페이지
  'admin': {
    page: 'admin',
    guestAccess: false,
    memberAccess: false,
    adminAccess: true,
    redirectPage: 'home',
    requiresAuth: true
  },
  'beta-admin': {
    page: 'beta-admin',
    guestAccess: false,
    memberAccess: false,
    adminAccess: true,
    redirectPage: 'home',
    requiresAuth: true
  }
};

// v117: 페이지 접근 권한 체크
export function checkPageAccess(page: string, userRole: UserRole): {
  hasAccess: boolean;
  redirectPage?: string;
  reason?: string;
} {
  const config = PAGE_ACCESS_CONFIG[page];
  
  if (!config) {
    // 설정되지 않은 페이지는 기본적으로 접근 허용
    return { hasAccess: true };
  }
  
  switch (userRole) {
    case 'admin':
      if (config.adminAccess) {
        return { hasAccess: true };
      }
      break;
      
    case 'member':
      if (config.memberAccess) {
        return { hasAccess: true };
      }
      break;
      
    case 'guest':
      if (config.guestAccess) {
        return { hasAccess: true };
      }
      break;
  }
  
  // 접근 권한이 없는 경우
  return {
    hasAccess: false,
    redirectPage: config.redirectPage || 'home',
    reason: config.requiresAuth ? 'REQUIRES_AUTH' : 'INSUFFICIENT_PERMISSIONS'
  };
}

// v117: 컴포넌트 레벨 접근 제어 (별도 컴포넌트 파일에서 사용)
export function createAccessControlWrapper() {
  // HOC 또는 wrapper 사용 시 React 컴포넌트 파일에서 구현
  return {
    message: 'Access control wrapper available - implement in React component files'
  };
}

// v117: 관리자 기능 접근 제어
export function isAdminFunction(userRole: UserRole): boolean {
  return userRole === 'admin';
}

// v117: 베타 기능 접근 제어
export function canAccessBetaFeatures(userRole: UserRole): boolean {
  return userRole === 'admin' || userRole === 'member';
}

// v117: Toast 알림을 위한 액세스 거부 메시지
export function getAccessDeniedMessage(reason: string, userRole: UserRole): string {
  switch (reason) {
    case 'REQUIRES_AUTH':
      return '로그인이 필요한 기능입니다. 회원가입 또는 로그인 후 이용해주세요.';
    case 'INSUFFICIENT_PERMISSIONS':
      if (userRole === 'guest') {
        return '회원 전용 기능입니다. 로그인 후 이용해주세요.';
      }
      return '관리자 권한이 필요한 기능입니다.';
    default:
      return '접근 권한이 없습니다.';
  }
}

// React imports removed - utility functions only