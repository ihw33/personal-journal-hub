export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface FooterSection {
  title: string;
  links: NavigationItem[];
}

export interface UserProfile {
  id: string;
  name?: string;
  email: string;
  user_type: 'user' | 'admin' | 'instructor';
  subscription_status?: string;
  avatar_url?: string;
}

export interface LanguageContent {
  nav: {
    home: string;
    about: string;
    methodology: string;
    assessment: string;
    enterprise: string;
    contact: string;
    help: string;
  };
  auth: {
    login: string;
    signup: string;
    logout: string;
    profile: string;
    dashboard: string;
  };
  admin: string;
}

export const languageContent: Record<'ko' | 'en', LanguageContent> = {
  ko: {
    nav: {
      home: '홈',
      about: '소개',
      methodology: '8단계 방법론',
      assessment: '사고력 진단',
      enterprise: '기업 교육',
      contact: '문의',
      help: '도움말'
    },
    auth: {
      login: '로그인',
      signup: '회원가입',
      logout: '로그아웃',
      profile: '프로필',
      dashboard: '대시보드'
    },
    admin: '관리자'
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      methodology: '8-Step Method',
      assessment: 'Assessment',
      enterprise: 'Enterprise',
      contact: 'Contact',
      help: 'Help'
    },
    auth: {
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      profile: 'Profile',
      dashboard: 'Dashboard'
    },
    admin: 'Admin'
  }
};

export const getMainNavigation = (language: 'ko' | 'en' = 'ko', isAuthenticated: boolean = false): NavigationItem[] => {
  if (!isAuthenticated) {
    // 비회원 메뉴
    return [
      { label: language === 'ko' ? 'IWL 소개' : 'About IWL', href: '/about', description: language === 'ko' ? 'IdeaWorkLab 소개' : 'About IdeaWorkLab' },
      { label: language === 'ko' ? '수업' : 'Courses', href: '/courses', description: language === 'ko' ? '수업 목록' : 'Course List' },
      { label: language === 'ko' ? '저널' : 'Journal', href: '/journal', description: language === 'ko' ? '전문가 콘텐츠' : 'Expert Content' },
      { label: language === 'ko' ? 'AI 채팅' : 'AI Chat', href: '/chat', description: language === 'ko' ? 'AI와 함께하는 학습' : 'Learning with AI' }
    ];
  } else {
    // 로그인 후 메뉴
    return [
      { label: language === 'ko' ? '대시보드' : 'Dashboard', href: '/dashboard', description: language === 'ko' ? '개인 대시보드' : 'Personal Dashboard' },
      { label: language === 'ko' ? '내 수업' : 'My Courses', href: '/learn', description: language === 'ko' ? '수강 중인 수업' : 'Enrolled Courses' },
      { label: language === 'ko' ? '저널' : 'Journal', href: '/journal', description: language === 'ko' ? '전문가 콘텐츠' : 'Expert Content' },
      { label: language === 'ko' ? 'AI 채팅' : 'AI Chat', href: '/chat', description: language === 'ko' ? 'AI와 함께하는 학습' : 'Learning with AI' },
      { label: language === 'ko' ? '커뮤니티' : 'Community', href: '/community', description: language === 'ko' ? '학습자 커뮤니티' : 'Learning Community' }
    ];
  }
};

export const mainNavigation: NavigationItem[] = getMainNavigation('ko');

export const socialLinks: SocialLink[] = [
  { platform: 'LinkedIn', href: '#', icon: 'linkedin' },
  { platform: 'Twitter', href: '#', icon: 'twitter' },
  { platform: 'GitHub', href: '#', icon: 'github' }
];

export const footerSections: FooterSection[] = [
  {
    title: '서비스',
    links: [
      { label: '8단계 방법론', href: '/methodology' },
      { label: '사고력 진단', href: '/assessment' },
      { label: '기업 교육', href: '/enterprise' }
    ]
  },
  {
    title: '고객 지원',
    links: [
      { label: '도움말', href: '/help' },
      { label: '문의하기', href: '/contact' },
      { label: 'FAQ', href: '/faq' }
    ]
  },
  {
    title: '회사',
    links: [
      { label: '회사 소개', href: '/about' },
      { label: '팀', href: '/team' },
      { label: '채용', href: '/careers' }
    ]
  },
  {
    title: '법적 고지',
    links: [
      { label: '개인정보처리방침', href: '/privacy' },
      { label: '이용약관', href: '/terms' },
      { label: '쿠키 정책', href: '/cookies' }
    ]
  }
];