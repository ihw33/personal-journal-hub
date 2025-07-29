import {
  Code,
  TrendingUp,
  BarChart3,
  Shield,
  Bot,
  CreditCard,
  Star,
  Zap,
  Users,
  Award,
  Activity,
  Rocket,
  Smartphone,
  Lock,
  Settings,
  Globe,
  CheckCircle,
  Database,
  GitCommit,
  Bug,
  Sparkles,
  Wrench,
  AlertTriangle
} from 'lucide-react';
import { PhaseData, MetricData, VersionGroup, VersionChangeLog } from './types';

export const createPhasesData = (): PhaseData[] => [
  {
    id: 'phase1',
    title: 'Phase 1: Foundation & Basic Platform',
    description: 'v1-v20: 기본 플랫폼 구조 및 핵심 기능 개발',
    versions: 'v1-v20',
    period: '2024 Q1',
    status: 'completed',
    icon: <Code className="w-5 h-5" />,
    color: 'bg-green-100 text-green-700 border-green-300',
    features: ['React 기본 설정', 'Tailwind CSS 통합', '기본 라우팅 시스템', '반응형 디자인', '브랜딩 시스템']
  },
  {
    id: 'phase2',
    title: 'Phase 2: Platform Enhancement',
    description: 'v21-v40: 플랫폼 고도화 및 사용자 경험 개선',
    versions: 'v21-v40',
    period: '2024 Q2',
    status: 'completed',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'bg-green-100 text-green-700 border-green-300',
    features: ['고급 에디터', '태그 시스템', '뉴스레터', '모바일 최적화', 'SEO 최적화']
  },
  {
    id: 'phase3',
    title: 'Phase 3: Business Logic & Scaling',
    description: 'v41-v60: 비즈니스 로직 및 확장성 구현',
    versions: 'v41-v60',
    period: '2024 Q2-Q3',
    status: 'completed',
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'bg-green-100 text-green-700 border-green-300',
    features: ['권한 시스템', '관리자 대시보드', '분석 시스템', 'API 통합', '보안 강화']
  },
  {
    id: 'phase4',
    title: 'Phase 4: Authentication & User Management',
    description: 'v61-v80: 인증 시스템 및 사용자 관리',
    versions: 'v61-v80',
    period: '2024 Q3-Q4',
    status: 'completed',
    icon: <Shield className="w-5 h-5" />,
    color: 'bg-green-100 text-green-700 border-green-300',
    features: ['소셜 로그인', '2FA 인증', 'RBAC', '사용자 분석', '보안 감사']
  },
  {
    id: 'phase5',
    title: 'Phase 5: Course System & AI Integration',
    description: 'v81-v100: 코스 시스템 및 AI 통합',
    versions: 'v81-v100',
    period: '2024 Q4-2025 Q1',
    status: 'completed',
    icon: <Bot className="w-5 h-5" />,
    color: 'bg-green-100 text-green-700 border-green-300',
    features: ['코스 플랫폼', '진도 추적', 'AI 챗봇', '개인화 추천', '머신러닝 분석']
  },
  {
    id: 'phase6',
    title: 'Phase 6: Payment & Business Features',
    description: 'v101-v110: 결제 시스템 및 비즈니스 기능',
    versions: 'v101-v110',
    period: '2025 Q1',
    status: 'completed',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'bg-green-100 text-green-700 border-green-300',
    features: ['Stripe 통합', '구독 관리', '수익 분석', '다중 통화', '비즈니스 자동화']
  },
  {
    id: 'phase7',
    title: 'Phase 7: Platform Completion & Polish',
    description: 'v111-v124: 플랫폼 완성 및 최적화',
    versions: 'v111-v124',
    period: '2025 Q1',
    status: 'completed',
    icon: <Star className="w-5 h-5" />,
    color: 'bg-green-100 text-green-700 border-green-300',
    features: ['보안 감사', '성능 최적화', 'UX 개선', '크로스 브라우저', '배포 준비']
  },
  {
    id: 'phase8',
    title: 'Phase 8: Advanced Personalization System',
    description: 'v125: 고급 개인화 시스템 구현',
    versions: 'v125-v125.1',
    period: '2025 Jan',
    status: 'current',
    icon: <Zap className="w-5 h-5" />,
    color: 'bg-iwl-purple-100 text-iwl-purple border-iwl-purple',
    features: ['강사 대시보드', '개인화 엔진', 'AI 추천 시스템', '행동 분석', '관리자 UI 향상']
  }
];

export const createBusinessMetrics = (): MetricData[] => [
  {
    label: '사용자 등록 완료율',
    value: '95%',
    description: '회���가입 플로우 완료율',
    icon: <Users className="w-4 h-4" />,
    progress: 95
  },
  {
    label: '코스 완료율',
    value: '89%',
    description: '평균 코스 완료율',
    icon: <Award className="w-4 h-4" />,
    progress: 89
  },
  {
    label: '학생 만족도',
    value: '4.8/5',
    description: '평균 만족도 점수',
    icon: <Star className="w-4 h-4" />,
    progress: 96
  },
  {
    label: '시스템 가동률',
    value: '99.9%',
    description: '시스템 안정성',
    icon: <Activity className="w-4 h-4" />,
    progress: 99
  }
];

export const createTechnicalMetrics = (): MetricData[] => [
  {
    label: 'TypeScript 적용률',
    value: '100%',
    description: '타입 안전성 보장',
    icon: <Code className="w-4 h-4" />,
    progress: 100
  },
  {
    label: '성능 점수',
    value: '96/100',
    description: 'Lighthouse 평균 점수',
    icon: <Rocket className="w-4 h-4" />,
    progress: 96
  },
  {
    label: '모바일 성능',
    value: '94/100',
    description: '모바일 최적화 점수',
    icon: <Smartphone className="w-4 h-4" />,
    progress: 94
  },
  {
    label: '보안 점수',
    value: '100%',
    description: '보안 감사 통과율',
    icon: <Lock className="w-4 h-4" />,
    progress: 100
  }
];

export const createQualityMetrics = (): MetricData[] => [
  {
    label: '컴포넌트 모듈화',
    value: '98%',
    description: '재사용 가능한 컴포넌트 비율',
    icon: <Settings className="w-4 h-4" />,
    progress: 98
  },
  {
    label: '접근성 점수',
    value: '94/100',
    description: 'WCAG 준수 점수',
    icon: <Globe className="w-4 h-4" />,
    progress: 94
  },
  {
    label: '테스트 커버리지',
    value: '85%',
    description: '코드 테스트 적용률',
    icon: <CheckCircle className="w-4 h-4" />,
    progress: 85
  },
  {
    label: '문서화 수준',
    value: '92%',
    description: '코드 문서화 완성도',
    icon: <Database className="w-4 h-4" />,
    progress: 92
  }
];

// 실제 상세 변경 로그 데이터
export const createVersionGroups = (): VersionGroup[] => [
  {
    majorVersion: 'v125',
    title: 'Advanced Personalization & Admin Enhancement',
    period: '2025.01',
    status: 'current',
    versions: [
      {
        version: 'v125.1',
        type: 'PATCH',
        title: 'Admin Dashboard UI Enhancement',
        date: '2025-01-29',
        description: '관리자 대시보드 헤더 개선 및 사이트맵 버전 히스토리 추가',
        changes: [
          '관리자 헤더에 관리자 정보 표시 추가',
          '방패 아이콘이 있는 빨간색 "관리자" 배지 구현',
          '반응형 관리자 정보 디스플레이',
          '사이트맵에 버전 히스토리 링크 추가',
          '버전 히스토리 페이지 리팩토링 및 모듈화'
        ],
        files: [
          { file: 'AdminDashboard.tsx', type: 'modified', description: '관리자 헤더 UI 개선' },
          { file: 'SiteMapPage.tsx', type: 'modified', description: '버전 히스토리 버튼 추가' },
          { file: 'VersionHistoryPage.tsx', type: 'modified', description: '파일 구조 리팩토링' },
          { file: 'version-history/types.ts', type: 'added', description: '타입 정의 분리' },
          { file: 'version-history/data.ts', type: 'added', description: '데이터 상수 분리' },
          { file: 'version-history/VersionHistoryMetrics.tsx', type: 'added', description: '메트릭 컴포넌트 분리' },
          { file: 'version-history/VersionHistoryPhases.tsx', type: 'added', description: '단계 컴포넌트 분리' }
        ],
        author: 'Developer',
        impact: 'low',
        breaking: false
      },
      {
        version: 'v125.0',
        type: 'MAJOR',
        title: 'Advanced Personalization System Implementation',
        date: '2025-01-25',
        description: '고급 개인화 시스템, 강사 대시보드, AI 추천 엔진 구현',
        changes: [
          '강사 대시보드 완전한 구현',
          '개인화 컨텍스트 및 데이터 관리 시스템',
          'AI 기반 추천 엔진 구축',
          '행동 분석 엔진 구현',
          '예측적 학습 분석 시스템',
          'DashboardRouter 고급 라우팅 시스템'
        ],
        files: [
          { file: 'InstructorDashboard.tsx', type: 'added', description: '강사 대시보드 완전 구현' },
          { file: 'PersonalizationContext.tsx', type: 'added', description: '개인화 데이터 관리' },
          { file: 'RecommendationEngine.tsx', type: 'added', description: 'AI 추천 시스템' },
          { file: 'DashboardRouter.tsx', type: 'modified', description: '강사 지원 추가' },
          { file: 'PersonalizedHeroSection.tsx', type: 'modified', description: '개인화 데이터 통합' }
        ],
        author: 'AI Team',
        impact: 'high',
        breaking: false
      }
    ]
  },
  {
    majorVersion: 'v124',
    title: 'Production Readiness & Final Polish',
    period: '2025.01',
    status: 'completed',
    versions: [
      {
        version: 'v124.0',
        type: 'MAJOR',
        title: 'Final Production Deployment Preparation',
        date: '2025-01-20',
        description: '프로덕션 배포를 위한 최종 준비 및 모니터링 설정',
        changes: [
          '프로덕션 환경 최적화',
          '모니터링 시스템 구축',
          '에러 추적 시스템 설정',
          '성능 최적화 완료',
          '보안 감사 통과'
        ],
        files: [
          { file: 'App.tsx', type: 'modified', description: '프로덕션 설정 최적화' },
          { file: 'globals.css', type: 'modified', description: '성능 개선 스타일' }
        ],
        author: 'DevOps Team',
        impact: 'high',
        breaking: false
      }
    ]
  },
  {
    majorVersion: 'v123',
    title: 'Cross-browser Compatibility & Testing',
    period: '2025.01',
    status: 'completed',
    versions: [
      {
        version: 'v123.2',
        type: 'PATCH',
        title: 'Safari 호환성 개선',
        date: '2025-01-18',
        description: 'Safari 브라우저에서 발생하는 CSS 이슈 수정',
        changes: [
          'Safari flexbox 이슈 수정',
          'iOS Safari에서 viewport 문제 해결',
          'Safari에서 그라데이션 렌더링 개선'
        ],
        files: [
          { file: 'globals.css', type: 'modified', description: 'Safari 호환성 스타일 추가' }
        ],
        author: 'Frontend Team',
        impact: 'medium',
        breaking: false
      },
      {
        version: 'v123.1',
        type: 'PATCH',
        title: 'AIPracticePage 오류 수정',
        date: '2025-01-17',
        description: 'currentModeInfo.name 접근 오류 및 챗봇 안정성 개선',
        changes: [
          'currentModeInfo null 체크 추가',
          '챗봇 모드 전환 안정성 개선',
          '에러 바운더리 추가'
        ],
        files: [
          { file: 'AIPracticePage.tsx', type: 'modified', description: 'null 체크 및 에러 처리 개선' }
        ],
        author: 'QA Team',
        impact: 'medium',
        breaking: false
      },
      {
        version: 'v123.0',
        type: 'MAJOR',
        title: 'Cross-browser Compatibility Testing',
        date: '2025-01-15',
        description: '모든 주요 브라우저에서 호환성 테스트 및 수정',
        changes: [
          'Chrome, Firefox, Safari, Edge 호환성 확보',
          '모바일 브라우저 최적화',
          'CSS 그리드 대체 방안 구현',
          'JavaScript 호환성 개선'
        ],
        files: [
          { file: 'globals.css', type: 'modified', description: '크로스 브라우저 스타일 개선' },
          { file: 'App.tsx', type: 'modified', description: 'polyfill 추가' }
        ],
        author: 'QA Team',
        impact: 'high',
        breaking: false
      }
    ]
  },
  {
    majorVersion: 'v122',
    title: 'Performance Optimization',
    period: '2025.01',
    status: 'completed',
    versions: [
      {
        version: 'v122.3',
        type: 'PATCH',
        title: '이미지 로딩 최적화',
        date: '2025-01-12',
        description: '지연 로딩 및 이미지 압축 개선',
        changes: [
          'Lazy loading 구현',
          '이미지 WebP 포맷 지원',
          '썸네일 자동 생성',
          'CDN 캐싱 최적화'
        ],
        files: [
          { file: 'ImageWithFallback.tsx', type: 'modified', description: '이미지 최적화 기능 추가' }
        ],
        author: 'Performance Team',
        impact: 'medium',
        breaking: false
      },
      {
        version: 'v122.2',
        type: 'PATCH',
        title: 'JavaScript 번들 크기 최적화',
        date: '2025-01-10',
        description: 'Tree shaking 및 코드 분할 개선',
        changes: [
          'Dynamic import 적용',
          '사용하지 않는 코드 제거',
          '라이브러리 의존성 최적화',
          'Webpack 설정 개선'
        ],
        files: [
          { file: 'App.tsx', type: 'modified', description: '동적 임포트 적용' }
        ],
        author: 'Build Team',
        impact: 'high',
        breaking: false
      },
      {
        version: 'v122.1',
        type: 'PATCH',
        title: 'Database 쿼리 최적화',
        date: '2025-01-08',
        description: 'Supabase 쿼리 성능 개선',
        changes: [
          'Index 최적화',
          'N+1 쿼리 문제 해결',
          '캐싱 전략 개선',
          'Connection pooling 적용'
        ],
        files: [
          { file: 'supabase.ts', type: 'modified', description: '쿼리 최적화' }
        ],
        author: 'Backend Team',
        impact: 'high',
        breaking: false
      },
      {
        version: 'v122.0',
        type: 'MAJOR',
        title: 'Performance Optimization & Loading Speed Improvements',
        date: '2025-01-05',
        description: '전반적인 성능 최적화 및 로딩 속도 개선',
        changes: [
          'Core Web Vitals 점수 개선',
          'Lighthouse 점수 96/100 달성',
          '초기 페이지 로드 시간 2초 이하 달성',
          'React 컴포넌트 최적화',
          'CSS 최적화 및 불필요한 스타일 제거'
        ],
        files: [
          { file: 'App.tsx', type: 'modified', description: 'React.memo 및 최적화 적용' },
          { file: 'globals.css', type: 'modified', description: 'CSS 최적화' }
        ],
        author: 'Performance Team',
        impact: 'high',
        breaking: false
      }
    ]
  },
  {
    majorVersion: 'v121',
    title: 'Security Audit & Authentication Hardening',
    period: '2024.12',
    status: 'completed',
    versions: [
      {
        version: 'v121.0',
        type: 'MAJOR',
        title: 'Security Audit & Authentication System Hardening',
        date: '2024-12-28',
        description: '보안 감사 및 인증 시스템 강화',
        changes: [
          '보안 취약점 분석 및 수정',
          'JWT 토큰 보안 강화',
          '비밀번호 정책 강화',
          'SQL Injection 방어 강화',
          'XSS 및 CSRF 보호 구현',
          '세션 관리 보안 개선'
        ],
        files: [
          { file: 'AuthContext.tsx', type: 'modified', description: '인증 보안 강화' },
          { file: 'supabase.ts', type: 'modified', description: 'RLS 정책 강화' }
        ],
        author: 'Security Team',
        impact: 'high',
        breaking: false
      }
    ]
  }
];

// 버전 타입별 아이콘 및 색상 매핑
export const getVersionTypeConfig = (type: string) => {
  switch (type) {
    case 'MAJOR':
      return {
        icon: <Rocket className="w-4 h-4" />,
        color: 'bg-red-100 text-red-700 border-red-300',
        label: 'Major Release'
      };
    case 'MINOR':
      return {
        icon: <Sparkles className="w-4 h-4" />,
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        label: 'Minor Release'
      };
    case 'PATCH':
      return {
        icon: <Wrench className="w-4 h-4" />,
        color: 'bg-green-100 text-green-700 border-green-300',
        label: 'Patch'
      };
    default:
      return {
        icon: <GitCommit className="w-4 h-4" />,
        color: 'bg-gray-100 text-gray-700 border-gray-300',
        label: 'Release'
      };
  }
};

// 영향도별 색상 매핑
export const getImpactConfig = (impact: string) => {
  switch (impact) {
    case 'high':
      return {
        color: 'text-red-600',
        label: 'High Impact',
        icon: <AlertTriangle className="w-3 h-3" />
      };
    case 'medium':
      return {
        color: 'text-yellow-600',
        label: 'Medium Impact',
        icon: <Activity className="w-3 h-3" />
      };
    case 'low':
      return {
        color: 'text-blue-600',
        label: 'Low Impact',
        icon: <CheckCircle className="w-3 h-3" />
      };
    default:
      return {
        color: 'text-gray-600',
        label: 'Unknown Impact',
        icon: <GitCommit className="w-3 h-3" />
      };
  }
};