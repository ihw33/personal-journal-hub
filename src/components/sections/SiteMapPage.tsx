import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
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
  Layout, // Changed from FileTemplate to Layout
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
  MessageSquare
} from 'lucide-react';

interface SiteMapPageProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
  onLanguageToggle: () => void;
}

interface PageInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'implemented' | 'coming-soon' | 'admin-only';
  children?: PageInfo[];
}

export function SiteMapPage({ language, onNavigate, onLanguageToggle }: SiteMapPageProps) {
  const content = {
    ko: {
      title: '사이트 맵',
      subtitle: 'Idea Work Lab 전체 페이지 구조',
      backHome: '홈으로 돌아가기',
      legend: '범례',
      implemented: '구현 완료',
      comingSoon: '개발 예정',
      adminOnly: '관리자 전용',
      lastUpdated: '마지막 업데이트',
      totalPages: '전체 페이지',
      clickToNavigate: '클릭하여 이동',
      sections: {
        main: '메인 사이트',
        course: '온라인 코스',
        admin: '관리자',
        legal: '법적 문서',
        development: '개발 예정'
      }
    },
    en: {
      title: 'Site Map',
      subtitle: 'Complete Idea Work Lab Page Structure',
      backHome: 'Back to Home',
      legend: 'Legend',
      implemented: 'Implemented',
      comingSoon: 'Coming Soon',
      adminOnly: 'Admin Only',
      lastUpdated: 'Last Updated',
      totalPages: 'Total Pages',
      clickToNavigate: 'Click to Navigate',
      sections: {
        main: 'Main Site',
        course: 'Online Course',
        admin: 'Administration',
        legal: 'Legal Documents',
        development: 'In Development'
      }
    }
  };

  const t = content[language];

  const siteStructure: PageInfo[] = [
    {
      id: 'main-section',
      name: t.sections.main,
      description: '메인 웹사이트의 핵심 페이지들',
      icon: <Globe className="w-5 h-5" />,
      status: 'implemented',
      children: [
        {
          id: 'home',
          name: '홈페이지',
          description: 'AI와 함께하는 새로운 생각정리 메인 페이지',
          icon: <Home className="w-4 h-4" />,
          status: 'implemented'
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
      id: 'course-section',
      name: t.sections.course,
      description: '제주도 여행 계획 AI 협력 학습 코스',
      icon: <BookOpen className="w-5 h-5" />,
      status: 'implemented',
      children: [
        {
          id: 'course-jeju',
          name: '제주 코스 개요',
          description: '8주 제주도 여행 계획 코스 소개',
          icon: <Map className="w-4 h-4" />,
          status: 'implemented'
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
      id: 'admin-section',
      name: t.sections.admin,
      description: '관리자 전용 시스템',
      icon: <Settings className="w-5 h-5" />,
      status: 'admin-only',
      children: [
        {
          id: 'admin',
          name: '관리자 로그인',
          description: '관리자 인증 페이지',
          icon: <Shield className="w-4 h-4" />,
          status: 'admin-only'
        },
        {
          id: 'admin-dashboard',
          name: '관리자 대시보드',
          description: '사이트 관리 및 통계 대시보드',
          icon: <BarChart3 className="w-4 h-4" />,
          status: 'admin-only'
        }
      ]
    },
    {
      id: 'legal-section',
      name: t.sections.legal,
      description: '법적 문서 및 정책',
      icon: <Shield className="w-5 h-5" />,
      status: 'implemented',
      children: [
        {
          id: 'privacy',
          name: '개인정보처리방침',
          description: '개인정보 보호 정책',
          icon: <Shield className="w-4 h-4" />,
          status: 'implemented'
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
        }
      ]
    },
    {
      id: 'development-section',
      name: t.sections.development,
      description: '개발 예정인 기능들',
      icon: <Clock className="w-5 h-5" />,
      status: 'coming-soon',
      children: [
        {
          id: 'auth',
          name: '로그인/인증',
          description: '사용자 로그인 및 인증 시스템',
          icon: <User className="w-4 h-4" />,
          status: 'coming-soon'
        },
        {
          id: 'community',
          name: '커뮤니티',
          description: '사용자 간 소통 및 협업 공간',
          icon: <Users className="w-4 h-4" />,
          status: 'coming-soon'
        },
        {
          id: 'docs',
          name: 'API 문서',
          description: '개발자를 위한 API 문서',
          icon: <Code className="w-4 h-4" />,
          status: 'coming-soon'
        },
        {
          id: 'status',
          name: '서비스 상태',
          description: '시스템 상태 및 점검 정보',
          icon: <Activity className="w-4 h-4" />,
          status: 'coming-soon'
        },
        {
          id: 'templates',
          name: '템플릿',
          description: '학습 및 저널 작성 템플릿',
          icon: <Layout className="w-4 h-4" />, // Fixed: Changed from FileTemplate to Layout
          status: 'coming-soon'
        },
        {
          id: 'ai-tools',
          name: 'AI 도구',
          description: 'AI 기반 생각정리 도구',
          icon: <Brain className="w-4 h-4" />,
          status: 'coming-soon'
        },
        {
          id: 'analytics',
          name: '분석',
          description: '학습 패턴 및 성과 분석',
          icon: <BarChart3 className="w-4 h-4" />,
          status: 'coming-soon'
        },
        {
          id: 'blog',
          name: '블로그',
          description: '공식 블로그 및 업데이트',
          icon: <Newspaper className="w-4 h-4" />,
          status: 'coming-soon'
        },
        {
          id: 'careers',
          name: '채용',
          description: '팀원 채용 및 협업 기회',
          icon: <Briefcase className="w-4 h-4" />,
          status: 'coming-soon'
        },
        {
          id: 'contact',
          name: '연락처',
          description: '문의 및 상담 페이지',
          icon: <Mail className="w-4 h-4" />,
          status: 'coming-soon'
        }
      ]
    }
  ];

  const getStatusColor = (status: PageInfo['status']) => {
    switch (status) {
      case 'implemented':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'coming-soon':
        return 'text-gray-500 bg-gray-50 border-gray-200';
      case 'admin-only':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadge = (status: PageInfo['status']) => {
    switch (status) {
      case 'implemented':
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            {t.implemented}
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

  const handlePageClick = (pageId: string, status: PageInfo['status']) => {
    if (status === 'implemented' || status === 'admin-only') {
      onNavigate(pageId);
    }
  };

  const countPages = (pages: PageInfo[]): { total: number; implemented: number; comingSoon: number; adminOnly: number } => {
    let total = 0;
    let implemented = 0;
    let comingSoon = 0;
    let adminOnly = 0;

    const count = (pageList: PageInfo[]) => {
      pageList.forEach(page => {
        if (page.id.endsWith('-section')) {
          // Section headers don't count as pages
        } else {
          total++;
          switch (page.status) {
            case 'implemented':
              implemented++;
              break;
            case 'coming-soon':
              comingSoon++;
              break;
            case 'admin-only':
              adminOnly++;
              break;
          }
        }
        
        if (page.children) {
          count(page.children);
        }
      });
    };

    count(pages);
    return { total, implemented, comingSoon, adminOnly };
  };

  const stats = countPages(siteStructure);

  const renderPageItem = (page: PageInfo, level: number = 0) => {
    const isSection = page.id.endsWith('-section');
    const canNavigate = page.status === 'implemented' || page.status === 'admin-only';
    const marginLeft = level * 20;

    if (isSection) {
      return (
        <div key={page.id} className="mb-6">
          <Card className="border-2 border-iwl-purple/20 bg-iwl-purple-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-iwl-purple">
                {page.icon}
                <span className="text-lg">{page.name}</span>
                {getStatusBadge(page.status)}
              </CardTitle>
              <p className="text-iwl-purple/70 text-sm">{page.description}</p>
            </CardHeader>
          </Card>
          {page.children && (
            <div className="mt-4 space-y-2">
              {page.children.map(child => renderPageItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={page.id}>
        <Card 
          className={`transition-all duration-200 border-2 ${getStatusColor(page.status)} ${
            canNavigate ? 'cursor-pointer hover:shadow-md hover:-translate-y-1' : 'cursor-not-allowed opacity-75'
          }`}
          style={{ marginLeft: `${marginLeft}px` }}
          onClick={() => handlePageClick(page.id, page.status)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {page.icon}
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{page.name}</h4>
                    {canNavigate && (
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{page.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(page.status)}
                {canNavigate && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {page.children && (
          <div className="mt-2 space-y-2">
            {page.children.map(child => renderPageItem(child, level + 1))}
          </div>
        )}
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
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('home')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.backHome}
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Map className="w-6 h-6 text-iwl-purple" />
                  {t.title}
                </h1>
                <p className="text-gray-600">{t.subtitle}</p>
              </div>
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Overview Stats */}
          <Card className="border-2 border-iwl-blue/20 bg-iwl-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-iwl-blue">
                <BarChart3 className="w-5 h-5" />
                페이지 통계
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">{t.totalPages}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.implemented}</div>
                  <div className="text-sm text-gray-600">{t.implemented}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.adminOnly}</div>
                  <div className="text-sm text-gray-600">{t.adminOnly}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-500">{stats.comingSoon}</div>
                  <div className="text-sm text-gray-600">{t.comingSoon}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                {t.legend}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">{t.implemented} - {t.clickToNavigate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">{t.adminOnly} - {t.clickToNavigate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  <span className="text-sm">{t.comingSoon}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Site Structure */}
          <div className="space-y-6">
            {siteStructure.map(section => renderPageItem(section))}
          </div>

          {/* Footer Info */}
          <Card className="border-iwl-purple/20">
            <CardContent className="p-6 text-center">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  {t.lastUpdated}: {new Date().toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US')}
                </p>
                <p className="text-xs text-gray-500">
                  이 사이트맵은 자동으로 생성되며 실시간으로 업데이트됩니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}