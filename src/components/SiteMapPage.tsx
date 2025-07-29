import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Home,
  FileText,
  BookOpen,
  User,
  Settings,
  GraduationCap,
  Clock,
  CheckCircle,
  ExternalLink,
  Globe,
  Shield,
  HelpCircle,
  Users,
  Code,
  Activity,
  Layout,
  Brain,
  BarChart3,
  Newspaper,
  Briefcase,
  Mail,
  ArrowLeft,
  Map,
  Link,
  Calendar,
  Target,
  Upload,
  MessageSquare,
  Zap,
  Rocket,
  AlertTriangle,
  TrendingUp,
  Star,
  Lightbulb,
  Wrench,
  Database,
  Bot,
  CreditCard,
  School,
  GitBranch,
  History
} from 'lucide-react';

interface SiteMapPageProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
  onLanguageToggle: () => void;
  fromAdmin?: boolean; // 관리자 대시보드에서 온 경우를 구분
}

interface PageInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'implemented' | 'coming-soon' | 'admin-only' | 'partial';
  version?: string;
  completionRate?: number;
  children?: PageInfo[];
}

interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  items: string[];
  status: 'current' | 'next' | 'future';
}

interface PriorityItem {
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'nice';
  status: string;
}

export function SiteMapPage({ language, onNavigate, onLanguageToggle, fromAdmin = false }: SiteMapPageProps) {
  const content = {
    ko: {
      title: '프로젝트 사이트맵 & 로드맵',
      subtitle: 'Idea Work Lab 완전한 개발 현황 및 향후 계획',
      backHome: '홈으로 돌아가기',
      backAdmin: '관리자 대시보드로 돌아가기',
      versionHistory: '버전 히스토리',
      viewVersionHistory: '개발 버전 히스토리 보기',
      legend: '범례',
      implemented: '구현 완료',
      comingSoon: '개발 예정',
      adminOnly: '관리자 전용',
      partial: '부분 구현',
      lastUpdated: '마지막 업데이트',
      totalPages: '전체 페이지',
      clickToNavigate: '클릭하여 이동',
      currentVersion: '현재 버전',
      productionReady: 'Production Ready',
      nextGoal: '다음 목표',
      finalGoal: '최종 목표',
      tabs: {
        sitemap: '사이트맵',
        roadmap: '개발 로드맵',
        priority: '우선순위'
      },
      sections: {
        main: '메인 사이트',
        course: '온라인 코스',
        admin: '관리자',
        legal: '법적 문서',
        development: '개발 예정'
      },
      roadmap: {
        phase1: 'Phase 1: v126 - 통합 챗봇 시스템',
        phase1Desc: 'AI 학습 플랫폼의 핵심 기능 완성',
        phase1Time: '예상 기간: 2-3주',
        phase2: 'Phase 2: v127 - 아카데미 & 커뮤니티',
        phase2Desc: '협업 학습 생태계 구축',
        phase2Time: '예상 기간: 3-4주',
        phase3: 'Phase 3: v128 - 고급 AI 기능',
        phase3Desc: 'AI 플랫폼의 차별화된 경쟁력 확보',
        phase3Time: '예상 기간: 4-6주',
        phase4: 'Phase 4: v129-130 - 프리미엄 기능',
        phase4Desc: '프리미엄 서비스 완성 & 시장 확장',
        phase4Time: '예상 기간: 6-8주'
      },
      priority: {
        critical: 'Critical (v126 필수)',
        high: 'High Priority (v127 권장)',
        nice: 'Nice to Have (v128+)'
      }
    },
    en: {
      title: 'Site Map',
      subtitle: 'Complete Idea Work Lab Page Structure',
      backHome: 'Back to Home',
      backAdmin: 'Back to Admin Dashboard',
      versionHistory: 'Version History',
      viewVersionHistory: 'View Development Version History',
      legend: 'Legend',
      implemented: 'Implemented',
      comingSoon: 'Coming Soon',
      adminOnly: 'Admin Only',
      partial: 'Partial',
      lastUpdated: 'Last Updated',
      totalPages: 'Total Pages',
      clickToNavigate: 'Click to Navigate',
      currentVersion: 'Current Version',
      productionReady: 'Production Ready',
      nextGoal: 'Next Goal',
      finalGoal: 'Final Goal',
      tabs: {
        sitemap: 'Site Map',
        roadmap: 'Development Roadmap',
        priority: 'Priority'
      },
      sections: {
        main: 'Main Site',
        course: 'Online Course',
        admin: 'Administration',
        legal: 'Legal Documents',
        development: 'In Development'
      },
      roadmap: {
        phase1: 'Phase 1: v126 - Integrated Chatbot System',
        phase1Desc: 'Complete core functionality of AI learning platform',
        phase1Time: 'Expected Duration: 2-3 weeks',
        phase2: 'Phase 2: v127 - Academy & Community',
        phase2Desc: 'Build collaborative learning ecosystem',
        phase2Time: 'Expected Duration: 3-4 weeks',
        phase3: 'Phase 3: v128 - Advanced AI Features',
        phase3Desc: 'Establish differentiated AI platform competitiveness',
        phase3Time: 'Expected Duration: 4-6 weeks',
        phase4: 'Phase 4: v129-130 - Premium Features',
        phase4Desc: 'Complete premium services & market expansion',
        phase4Time: 'Expected Duration: 6-8 weeks'
      },
      priority: {
        critical: 'Critical (v126 Essential)',
        high: 'High Priority (v127 Recommended)',
        nice: 'Nice to Have (v128+)'
      }
    }
  };

  const t = content[language];

  // 로드맵 데이터
  const roadmapPhases: RoadmapPhase[] = [
    {
      id: 'v126',
      title: t.roadmap.phase1,
      description: t.roadmap.phase1Desc,
      timeframe: t.roadmap.phase1Time,
      priority: 'critical',
      status: 'current',
      items: [
        '💬 통합 챗봇 인터페이스 구현',
        '🧠 Phase별 연속 대화 시스템',
        '📈 학습 진도 실시간 추적',
        '🔧 Redis 세션 관리 구축'
      ]
    },
    {
      id: 'v127',
      title: t.roadmap.phase2,
      description: t.roadmap.phase2Desc,
      timeframe: t.roadmap.phase2Time,
      priority: 'high',
      status: 'next',
      items: [
        '🎓 그룹 학습 대시보드 고도화',
        '🌐 커뮤니티 플랫폼 구축',
        '🤝 피어 리뷰 워크플로우',
        '👥 멘토링 매칭 시스템'
      ]
    },
    {
      id: 'v128',
      title: t.roadmap.phase3,
      description: t.roadmap.phase3Desc,
      timeframe: t.roadmap.phase3Time,
      priority: 'medium',
      status: 'future',
      items: [
        '🧠 학습 스타일 자동 분석',
        '📊 실시간 수익 분석',
        '🌐 외부 개발자 API 제공',
        '🔍 A/B 테스트 플랫폼'
      ]
    },
    {
      id: 'v129-130',
      title: t.roadmap.phase4,
      description: t.roadmap.phase4Desc,
      timeframe: t.roadmap.phase4Time,
      priority: 'low',
      status: 'future',
      items: [
        '💎 1:1 AI 코칭 서비스',
        '🌍 다국어 지원 확대',
        '🚀 마이크로러닝 시스템',
        '🏗️ 블록체인 인증 시스템'
      ]
    }
  ];

  // 우선순위 항목들
  const priorityItems: PriorityItem[] = [
    {
      title: '통합 챗봇 시스템',
      description: '현재 AI Practice가 있지만 완전한 통합 경험 부족',
      priority: 'critical',
      status: '미개발'
    },
    {
      title: 'Phase별 연속 학습',
      description: '현재 Phase별 페이지는 있지만 연결성 부족',
      priority: 'critical',
      status: '미개발'
    },
    {
      title: '학습 상태 영속성',
      description: '새로고침 시 챗봇 대화 내용 유실 문제',
      priority: 'critical',
      status: '미개발'
    },
    {
      title: '아카데미 시스템 완성',
      description: '기본 구조만 있고 실제 기능 미완성',
      priority: 'high',
      status: '기본 구조만'
    },
    {
      title: '커뮤니티 기능 추가',
      description: '현재 Coming Soon 상태로 사용자 요구 높음',
      priority: 'high',
      status: 'Coming Soon 상태'
    },
    {
      title: '고급 분석 대시보드',
      description: '관리자 기능은 있지만 깊이 있는 인사이트 부족',
      priority: 'high',
      status: '기본만'
    }
  ];

  const siteStructure: PageInfo[] = [
    {
      id: 'core-platform',
      name: '🎯 Core Platform',
      description: '메인 플랫폼 (완성도: 95%)',
      icon: <Globe className="w-5 h-5" />,
      status: 'implemented',
      completionRate: 95,
      version: 'v125',
      children: [
        {
          id: 'home',
          name: '홈페이지 (/)',
          description: '개인화 히어로 섹션, AI 추천 시스템, 반응형 디자인',
          icon: <Home className="w-4 h-4" />,
          status: 'implemented',
          version: 'v125'
        },
        {
          id: 'auth',
          name: '인증 시스템 (/auth)',
          description: '소셜 로그인, 이메일/비밀번호 로그인, 역할 기반 권한',
          icon: <Shield className="w-4 h-4" />,
          status: 'implemented',
          version: 'v113'
        },
        {
          id: 'dashboard',
          name: '대시보드 시스템 (/dashboard)',
          description: '멤버/강사 대시보드, 개인화 학습 분석, 성과 추적',
          icon: <BarChart3 className="w-4 h-4" />,
          status: 'implemented',
          version: 'v125'
        },
        {
          id: 'about',
          name: '소개 페이지',
          description: 'Idea Work Lab과 창립자 소개',
          icon: <User className="w-4 h-4" />,
          status: 'implemented'
        },
        {
          id: 'methodology',
          name: '방법론 페이지',
          description: '8단계 사고 확장 모델 및 학습 방법론',
          icon: <Brain className="w-4 h-4" />,
          status: 'implemented'
        },
        {
          id: 'courses',
          name: '강의/코스',
          description: '온라인 강의 및 교육 프로그램 소개',
          icon: <GraduationCap className="w-4 h-4" />,
          status: 'implemented'
        },
        {
          id: 'journal',
          name: '저널 메인',
          description: '개인 저널 및 블로그 포스트 목록',
          icon: <FileText className="w-4 h-4" />,
          status: 'implemented',
          children: [
            {
              id: 'journal-detail',
              name: '저널 상세',
              description: '개별 저널 포스트 상세 보기',
              icon: <FileText className="w-3 h-3" />,
              status: 'implemented'
            },
            {
              id: 'journal-write',
              name: '저널 작성',
              description: '새로운 저널 작성 페이지',
              icon: <FileText className="w-3 h-3" />,
              status: 'coming-soon'
            },
            {
              id: 'journal-category',
              name: '카테고리별 저널',
              description: '주제별 저널 분류 페이지',
              icon: <FileText className="w-3 h-3" />,
              status: 'coming-soon'
            }
          ]
        },
        {
          id: 'signup',
          name: '회원가입',
          description: '신규 사용자 회원가입 페이지',
          icon: <User className="w-4 h-4" />,
          status: 'implemented'
        }
      ]
    },
    {
      id: 'learning-content',
      name: '📚 학습 콘텐츠 시스템',
      description: '코스 관리, AI 실습, 저널 시스템 (완성도: 90%)',
      icon: <BookOpen className="w-5 h-5" />,
      status: 'implemented',
      completionRate: 90,
      version: 'v125',
      children: [
        {
          id: 'courses',
          name: '코스 관리 (/courses)',
          description: '제주도 여행 기획 코스, 체험 코스, Phase별 학습',
          icon: <GraduationCap className="w-4 h-4" />,
          status: 'implemented',
          version: 'v125'
        },
        {
          id: 'ai-practice',
          name: 'AI 실습 시스템 (/ai-practice)',
          description: '4가지 실습 모드, 코스별 맞춤 챗봇, 실시간 AI 대화',
          icon: <Bot className="w-4 h-4" />,
          status: 'implemented',
          version: 'v123'
        },
        {
          id: 'journal',
          name: '저널 시스템 (/journal)',
          description: '저널 작성/편집, 카테고리 관리, 검색 & 필터링',
          icon: <FileText className="w-4 h-4" />,
          status: 'implemented',
          version: 'v115'
        },
        {
          id: 'course-week',
          name: '주차별 학습',
          description: '각 주차별 학습 내용 및 Phase 선택',
          icon: <Calendar className="w-4 h-4" />,
          status: 'implemented'
        },
        {
          id: 'course-phase',
          name: 'Phase별 학습',
          description: '각 Phase별 집중 학습 환경',
          icon: <Target className="w-4 h-4" />,
          status: 'implemented'
        },
        {
          id: 'course-phase-submit',
          name: 'Phase별 제출',
          description: 'Phase별 학습 결과 개별 제출',
          icon: <Upload className="w-4 h-4" />,
          status: 'implemented'
        },
        {
          id: 'course-submit',
          name: '주차별 제출',
          description: '주차별 통합 과제 제출',
          icon: <FileText className="w-4 h-4" />,
          status: 'implemented'
        },
        {
          id: 'course-feedback',
          name: '피드백 확인',
          description: '강사 피드백 및 성과 분석',
          icon: <MessageSquare className="w-4 h-4" />,
          status: 'implemented'
        },
        {
          id: 'course-dashboard',
          name: '코스 대시보드',
          description: '전체 학습 진행률 및 통계',
          icon: <BarChart3 className="w-4 h-4" />,
          status: 'implemented'
        }
      ]
    },
    {
      id: 'ai-system',
      name: '🤖 AI 통합 시스템',
      description: 'AI 엔진, 통합 챗봇, 개인화 추천 (완성도: 60%)',
      icon: <Brain className="w-5 h-5" />,
      status: 'partial',
      completionRate: 60,
      children: [
        {
          id: 'ai-engine',
          name: 'AI 서비스 엔진',
          description: 'OpenAI GPT-4 연동 (부분적), AI 컨텍스트 관리',
          icon: <Wrench className="w-4 h-4" />,
          status: 'partial'
        },
        {
          id: 'integrated-chatbot',
          name: '통합 챗봇 시스템 (v126 핵심)',
          description: 'Phase별 연속 대화, 학습 맥락 누적 (미개발)',
          icon: <MessageSquare className="w-4 h-4" />,
          status: 'coming-soon'
        },
        {
          id: 'personalization',
          name: '개인화 추천 시스템',
          description: '학습 패턴 분석, 콘텐츠 추천 엔진, 행동 기반 개인화',
          icon: <TrendingUp className="w-4 h-4" />,
          status: 'implemented',
          version: 'v125'
        }
      ]
    },
    {
      id: 'payment-membership',
      name: '💳 결제 & 멤버십',
      description: 'Stripe 결제, 멤버십 관리 (완성도: 85%)',
      icon: <CreditCard className="w-5 h-5" />,
      status: 'implemented',
      completionRate: 85,
      children: [
        {
          id: 'stripe-payment',
          name: 'Stripe 결제 시스템',
          description: '코스 결제 처리, 구독 관리, 영수증 시스템',
          icon: <CreditCard className="w-4 h-4" />,
          status: 'implemented',
          version: 'v120'
        },
        {
          id: 'membership-management',
          name: '멤버십 관리 (v126 개발 예정)',
          description: '멤버십 레벨, 혜택 관리, 자동 갱신 (미개발)',
          icon: <Users className="w-4 h-4" />,
          status: 'coming-soon'
        }
      ]
    },
    {
      id: 'academy-system',
      name: '🎓 아카데미 시스템',
      description: '그룹 대시보드, 피어 리뷰, 협업 학습 (v126 개발 예정)',
      icon: <School className="w-5 h-5" />,
      status: 'partial',
      completionRate: 30,
      children: [
        {
          id: 'group-dashboard',
          name: '그룹 대시보드',
          description: '기본 구조만 구현됨',
          icon: <BarChart3 className="w-4 h-4" />,
          status: 'partial'
        },
        {
          id: 'peer-review',
          name: '피어 리뷰 시스템',
          description: '기본 구조만 구현됨',
          icon: <Users className="w-4 h-4" />,
          status: 'partial'
        },
        {
          id: 'collaborative-learning',
          name: '협업 학습 도구',
          description: '미개발 상태',
          icon: <GitBranch className="w-4 h-4" />,
          status: 'coming-soon'
        }
      ]
    },
    {
      id: 'admin-section',
      name: '👨‍💼 관리자 시스템',
      description: '관리자 대시보드, 비즈니스 인텔리전스 (완성도: 90%)',
      icon: <Settings className="w-5 h-5" />,
      status: 'admin-only',
      completionRate: 90,
      children: [
        {
          id: 'admin',
          name: '관리자 대시보드 (/admin)',
          description: '관리자 헤더, 사용자 관리, 콘텐츠 관리, 시스템 모니터링',
          icon: <Shield className="w-4 h-4" />,
          status: 'admin-only',
          version: 'v125.1'
        },
        {
          id: 'business-intelligence',
          name: '비즈니스 인텔리전스 (v126 예정)',
          description: '고급 분석 도구, 수익 분석, 예측 모델링 (미개발)',
          icon: <BarChart3 className="w-4 h-4" />,
          status: 'coming-soon'
        }
      ]
    },
    {
      id: 'support-system',
      name: '🌐 보조 시스템',
      description: '법적 페이지, 고객 지원, 예정 기능 (완성도: 95%)',
      icon: <Shield className="w-5 h-5" />,
      status: 'implemented',
      completionRate: 95,
      children: [
        {
          id: 'legal-pages',
          name: '법적 페이지들',
          description: '개인정보처리방침, 이용약관, 쿠키 정책, 라이선스',
          icon: <Shield className="w-4 h-4" />,
          status: 'implemented',
          version: 'v110'
        },
        {
          id: 'customer-support',
          name: '고객 지원',
          description: '도움말, FAQ 시스템, 사이트맵',
          icon: <HelpCircle className="w-4 h-4" />,
          status: 'implemented',
          version: 'v115'
        },
        {
          id: 'terms',
          name: '이용약관',
          description: '서비스 이용 약관',
          icon: <FileText className="w-4 h-4" />,
          status: 'implemented'
        },
        {
          id: 'cookies',
          name: '쿠키 정책',
          description: '쿠키 사용 정책',
          icon: <Settings className="w-4 h-4" />,
          status: 'implemented'
        },
        {
          id: 'license',
          name: '라이선스',
          description: '오픈소스 라이선스 정보',
          icon: <Code className="w-4 h-4" />,
          status: 'implemented'
        },
        {
          id: 'help',
          name: '도움말',
          description: '자주 묻는 질문 및 도움말',
          icon: <HelpCircle className="w-4 h-4" />,
          status: 'implemented'
        },
        {
          id: 'version-history',
          name: '버전 히스토리 (/version-history)',
          description: '125+ 버전 개발 여정, 성과 지표, 기술 스택 진화 과정',
          icon: <History className="w-4 h-4" />,
          status: 'implemented',
          version: 'v125.1'
        },
        {
          id: 'coming-soon-features',
          name: '예정 기능들',
          description: '커뮤니티, API 문서, 블로그, 템플릿 갤러리, 분석 도구',
          icon: <Clock className="w-4 h-4" />,
          status: 'coming-soon'
        }
      ]
    }
  ];

  // 개발 우선순위별 색상
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'nice':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // 상태별 색상 (기존 함수 확장)
  const getStatusColor = (status: PageInfo['status']) => {
    switch (status) {
      case 'implemented':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'partial':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'coming-soon':
        return 'text-gray-500 bg-gray-50 border-gray-200';
      case 'admin-only':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  // 상태별 배지 (기존 함수 확장)
  const getStatusBadge = (status: PageInfo['status']) => {
    switch (status) {
      case 'implemented':
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            {t.implemented}
          </Badge>
        );
      case 'partial':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {t.partial}
          </Badge>
        );
      case 'coming-soon':
        return (
          <Badge variant="outline" className="border-gray-300 text-gray-600">
            <Clock className="w-3 h-3 mr-1" />
            {t.comingSoon}
          </Badge>
        );
      case 'admin-only':
        return (
          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
            <Settings className="w-3 h-3 mr-1" />
            {t.adminOnly}
          </Badge>
        );
    }
  };

  // 로드맵 렌더링
  const renderRoadmapPhase = (phase: RoadmapPhase) => {
    const isCurrentPhase = phase.status === 'current';
    
    return (
      <Card key={phase.id} className={`border-2 ${isCurrentPhase ? 'border-iwl-purple bg-iwl-purple-50' : 'border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={`flex items-center gap-3 ${isCurrentPhase ? 'text-iwl-purple' : 'text-gray-700'}`}>
              {isCurrentPhase && <Zap className="w-5 h-5" />}
              {phase.status === 'next' && <Rocket className="w-5 h-5" />}
              {phase.status === 'future' && <Star className="w-5 h-5" />}
              <span>{phase.title}</span>
            </CardTitle>
            <Badge className={getPriorityColor(phase.priority)}>
              {phase.priority.toUpperCase()}
            </Badge>
            </div>
          <p className="text-gray-600">{phase.description}</p>
          <p className="text-sm text-gray-500">{phase.timeframe}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {phase.items.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-iwl-purple rounded-full"></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  // 우선순위 아이템 렌더링
  const renderPriorityItem = (item: PriorityItem, index: number) => {
    return (
      <Card key={index} className={`border-2 ${getPriorityColor(item.priority)}`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {item.priority === 'critical' && <Zap className="w-4 h-4 text-red-500" />}
                {item.priority === 'high' && <TrendingUp className="w-4 h-4 text-orange-500" />}
                {item.priority === 'nice' && <Lightbulb className="w-4 h-4 text-blue-500" />}
                <h4 className="font-medium text-gray-900">{item.title}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <Badge variant="outline" className="text-xs">
                상태: {item.status}
              </Badge>
            </div>
            <Badge className={getPriorityColor(item.priority)}>
              {item.priority === 'critical' && t.priority.critical.split(' ')[0]}
              {item.priority === 'high' && t.priority.high.split(' ')[0]}
              {item.priority === 'nice' && t.priority.nice.split(' ')[0]}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  };

  const handlePageClick = (pageId: string, status: PageInfo['status']) => {
    if (status === 'implemented' || status === 'admin-only') {
      onNavigate(pageId);
    }
  };

  // 전체 통계 계산 (향상된 버전)
  const calculateStats = () => {
    let totalSystems = 0;
    let completedSystems = 0;
    let partialSystems = 0;
    let plannedSystems = 0;
    let totalCompletionRate = 0;

    siteStructure.forEach(system => {
      totalSystems++;
      if (system.status === 'implemented') {
        completedSystems++;
        totalCompletionRate += system.completionRate || 100;
      } else if (system.status === 'partial') {
        partialSystems++;
        totalCompletionRate += system.completionRate || 50;
      } else if (system.status === 'admin-only') {
        completedSystems++;
        totalCompletionRate += system.completionRate || 100;
      } else {
        plannedSystems++;
      }
    });

    return {
      totalSystems,
      completedSystems,
      partialSystems,
      plannedSystems,
      overallCompletion: Math.round(totalCompletionRate / totalSystems)
    };
  };

  const stats = calculateStats();

  // 시스템 아이템 렌더링 (새로운 구조에 맞게 개선)
  const renderSystemItem = (system: PageInfo, level: number = 0) => {
    const canNavigate = system.status === 'implemented' || system.status === 'admin-only';
    const marginLeft = level * 20;

    return (
      <div key={system.id} className="mb-6">
        <Card className={`border-2 ${getStatusColor(system.status)}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                {system.icon}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{system.name}</span>
                    {system.version && (
                      <Badge variant="outline" className="text-xs">
                        {system.version}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 font-normal mt-1">{system.description}</p>
                </div>
              </CardTitle>
              <div className="flex items-center gap-2">
                {getStatusBadge(system.status)}
                {system.completionRate && (
                  <div className="text-right">
                    <div className="text-sm font-medium">{system.completionRate}%</div>
                    <Progress value={system.completionRate} className="w-16 h-2" />
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          
          {system.children && system.children.length > 0 && (
            <CardContent className="pt-0">
              <div className="space-y-2">
                {system.children.map(child => (
                  <div 
                    key={child.id} 
                    className={`p-3 rounded-lg border ${getStatusColor(child.status)} ${
                      (child.status === 'implemented' || child.status === 'admin-only') 
                        ? 'cursor-pointer hover:shadow-sm' 
                        : 'cursor-not-allowed opacity-75'
                    }`}
                    onClick={() => {
                      if (child.status === 'implemented' || child.status === 'admin-only') {
                        handlePageClick(child.id, child.status);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {child.icon}
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-sm">{child.name}</h5>
                            {child.version && (
                              <Badge variant="outline" className="text-xs">
                                {child.version}
                              </Badge>
                            )}
                            {(child.status === 'implemented' || child.status === 'admin-only') && (
                              <ExternalLink className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                          <p className="text-xs text-gray-600">{child.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(child.status)}
                        {(child.status === 'implemented' || child.status === 'admin-only') && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => onNavigate('admin')}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.backAdmin}
                </Button>
                <span className="text-gray-300">|</span>
                <Button 
                  variant="ghost" 
                  onClick={() => onNavigate('home')}
                  className="gap-2 text-sm"
                >
                  <Home className="w-4 h-4" />
                  {t.backHome}
                </Button>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Map className="w-6 h-6 text-iwl-purple" />
                  {t.title}
                </h1>
                <p className="text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => onNavigate('version-history')}
                className="bg-iwl-gradient hover:opacity-90 text-white gap-2"
              >
                <History className="w-4 h-4" />
                {t.versionHistory}
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={onLanguageToggle}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === 'ko' ? 'EN' : '한국어'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 프로젝트 현재 상태 오버뷰 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-iwl-purple/20 bg-iwl-purple-50">
              <CardHeader className="text-center">
                <CardTitle className="text-iwl-purple flex items-center justify-center gap-2">
                  <Database className="w-5 h-5" />
                  {t.currentVersion}
                </CardTitle>
                <div className="text-3xl font-bold text-iwl-purple">v125.1</div>
                <p className="text-sm text-iwl-purple/70">{t.productionReady}</p>
              </CardHeader>
            </Card>
            
            <Card className="border-2 border-iwl-blue/20 bg-iwl-blue-50">
              <CardHeader className="text-center">
                <CardTitle className="text-iwl-blue flex items-center justify-center gap-2">
                  <Rocket className="w-5 h-5" />
                  {t.nextGoal}
                </CardTitle>
                <div className="text-2xl font-bold text-iwl-blue">v126</div>
                <p className="text-sm text-iwl-blue/70">통합 챗봇 시스템</p>
              </CardHeader>
            </Card>
            
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <CardTitle className="text-green-700 flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  전체 완성도
                </CardTitle>
                <div className="text-3xl font-bold text-green-700">{stats.overallCompletion}%</div>
                <Progress value={stats.overallCompletion} className="mt-2" />
              </CardHeader>
            </Card>
          </div>

          {/* 탭 시스템 */}
          <Tabs defaultValue="sitemap" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="sitemap" className="flex items-center gap-2">
                <Map className="w-4 h-4" />
                {t.tabs.sitemap}
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                {t.tabs.roadmap}
              </TabsTrigger>
              <TabsTrigger value="priority" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {t.tabs.priority}
              </TabsTrigger>
            </TabsList>

            {/* 사이트맵 탭 */}
            <TabsContent value="sitemap" className="space-y-6">
              {/* 시스템 통계 */}
              <Card className="border-2 border-iwl-blue/20 bg-iwl-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-iwl-blue">
                    <BarChart3 className="w-5 h-5" />
                    시스템 구성 현황
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{stats.totalSystems}</div>
                      <div className="text-sm text-gray-600">총 시스템</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{stats.completedSystems}</div>
                      <div className="text-sm text-gray-600">완성 시스템</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{stats.partialSystems}</div>
                      <div className="text-sm text-gray-600">부분 구현</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-500">{stats.plannedSystems}</div>
                      <div className="text-sm text-gray-600">개발 예정</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 전체 시스템 구조 */}
              <div className="space-y-6">
                {siteStructure.map(system => renderSystemItem(system))}
              </div>
            </TabsContent>

            {/* 로드맵 탭 */}
            <TabsContent value="roadmap" className="space-y-6">
              <div className="grid gap-6">
                {roadmapPhases.map(phase => renderRoadmapPhase(phase))}
              </div>
            </TabsContent>

            {/* 우선순위 탭 */}
            <TabsContent value="priority" className="space-y-6">
              <div className="space-y-4">
                <Card className="border-2 border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      <Zap className="w-5 h-5" />
                      {t.priority.critical}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {priorityItems.filter(item => item.priority === 'critical').map((item, index) => renderPriorityItem(item, index))}
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-700">
                      <TrendingUp className="w-5 h-5" />
                      {t.priority.high}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {priorityItems.filter(item => item.priority === 'high').map((item, index) => renderPriorityItem(item, index))}
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Lightbulb className="w-5 h-5" />
                      {t.priority.nice}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>다중 AI 모델 지원</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>글로벌 확장 기능</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>프리미엄 서비스</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>혁신적 학습 기술</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer Info */}
          <Card className="border-iwl-purple/20">
            <CardContent className="p-6 text-center">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  {t.lastUpdated}: {new Date().toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US')}
                </p>
                <p className="text-xs text-gray-500">
                  🎯 결론: v126 통합 챗봇 시스템을 우선 개발하여 플랫폼의 핵심 가치를 완성하는 것이 최우선 과제입니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}