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

export const mainNavigation: NavigationItem[] = [
  { label: '홈', href: '/', description: '메인 페이지' },
  { label: '8단계 방법론', href: '/methodology', description: '사고 확장 8단계 모델' },
  { label: '사고력 진단', href: '/assessment', description: '개인 맞춤 사고력 측정' },
  { label: '기업 교육', href: '/enterprise', description: '조직 사고력 향상 프로그램' },
  { label: '문의', href: '/contact', description: '고객 지원 및 문의' }
];

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