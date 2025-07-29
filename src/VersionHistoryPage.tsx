import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { 
  ArrowLeft,
  Home,
  GitBranch,
  Target,
  Award,
  Lightbulb
} from 'lucide-react';
import { VersionHistoryPageProps } from './version-history/types';
import { VersionHistoryMetrics } from './version-history/VersionHistoryMetrics';
import { VersionHistoryPhases } from './version-history/VersionHistoryPhases';
import { VersionHistoryChangelog } from './version-history/VersionHistoryChangelog';
import { 
  createPhasesData,
  createBusinessMetrics,
  createTechnicalMetrics,
  createQualityMetrics,
  createVersionGroups
} from './version-history/data';

export function VersionHistoryPage({ language, onNavigate }: VersionHistoryPageProps) {
  const content = {
    ko: {
      title: '버전 히스토리',
      subtitle: 'Idea Work Lab의 125+ 버전 개발 여정',
      backToSitemap: '사이트맵으로 돌아가기',
      backHome: '홈으로 돌아가기',
      currentVersion: '현재 버전',
      totalVersions: '총 버전 수',
      developmentTime: '개발 기간',
      codeLines: '코드 라인 수',
      productionReady: 'Production Ready'
    },
    en: {
      title: 'Version History',
      subtitle: 'Idea Work Lab\'s 125+ Version Development Journey',
      backToSitemap: 'Back to Sitemap',
      backHome: 'Back to Home',
      currentVersion: 'Current Version',
      totalVersions: 'Total Versions',
      developmentTime: 'Development Period',
      codeLines: 'Lines of Code',
      productionReady: 'Production Ready'
    }
  };

  const t = content[language];

  // Initialize data
  const phases = createPhasesData();
  const businessMetrics = createBusinessMetrics();
  const technicalMetrics = createTechnicalMetrics();
  const qualityMetrics = createQualityMetrics();
  const versionGroups = createVersionGroups();

  return (
    <div className="min-h-screen bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => onNavigate('sitemap')}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.backToSitemap}
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
                  <GitBranch className="w-6 h-6 text-iwl-purple" />
                  {t.title}
                </h1>
                <p className="text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-iwl-gradient text-white">
                v125.1 Current
              </Badge>
              <Badge variant="outline" className="border-green-500 text-green-700">
                {t.productionReady}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* 전체 개요 */}
        <div className="mb-12">
          <Card className="border-2 border-iwl-purple-200 bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl text-iwl-purple flex items-center gap-2">
                <Target className="w-6 h-6" />
                Idea Work Lab v125.1 - Complete AI Learning Platform
              </CardTitle>
              <p className="text-gray-700">
                {language === 'ko' 
                  ? '개념부터 포괄적인 AI 학습 플랫폼까지 125+ 반복 개발의 결과물! 각 버전별 상세 변경사항과 파일 수정 내역을 확인하세요.' 
                  : 'From concept to comprehensive AI learning platform in 125+ iterations! Check detailed changes and file modifications for each version.'}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-iwl-purple">v125.1</div>
                  <div className="text-sm text-gray-600">{t.currentVersion}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-iwl-blue">125+</div>
                  <div className="text-sm text-gray-600">{t.totalVersions}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">12M</div>
                  <div className="text-sm text-gray-600">{t.developmentTime}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">50K+</div>
                  <div className="text-sm text-gray-600">{t.codeLines}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 상세 변경 로그 */}
        <VersionHistoryChangelog language={language} versionGroups={versionGroups} />

        {/* 개발 단계 */}
        <VersionHistoryPhases language={language} phases={phases} />

        {/* 성과 지표 */}
        <VersionHistoryMetrics 
          language={language}
          businessMetrics={businessMetrics}
          technicalMetrics={technicalMetrics}
          qualityMetrics={qualityMetrics}
        />

        {/* 핵심 성과 요약 */}
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-xl text-green-700 flex items-center gap-2">
              <Award className="w-6 h-6" />
              {language === 'ko' ? '프로덕션 준비 완료 - 주요 성과' : 'Production Ready - Key Achievements'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-500" />
                  {language === 'ko' ? '완성된 시스템' : 'Completed Systems'}
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• {language === 'ko' ? '완전한 사용자 인증 및 권한 관리' : 'Complete user authentication & authorization'}</li>
                  <li>• {language === 'ko' ? 'AI 통합 코스 플랫폼' : 'AI-integrated course platform'}</li>
                  <li>• {language === 'ko' ? '고급 강사 대시보드' : 'Advanced instructor dashboard'}</li>
                  <li>• {language === 'ko' ? 'Stripe 결제 시스템' : 'Stripe payment system'}</li>
                  <li>• {language === 'ko' ? 'AI 개인화 추천 엔진' : 'AI personalization engine'}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-iwl-purple" />
                  {language === 'ko' ? '기술 우수성' : 'Technical Excellence'}
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• {language === 'ko' ? 'TypeScript 100% 적용' : '100% TypeScript implementation'}</li>
                  <li>• {language === 'ko' ? '96점 Lighthouse 성능 점수' : '96/100 Lighthouse performance'}</li>
                  <li>• {language === 'ko' ? '100+ 재사용 가능 컴포넌트' : '100+ reusable components'}</li>
                  <li>• {language === 'ko' ? '99.9% 시스템 안정성' : '99.9% system uptime'}</li>
                  <li>• {language === 'ko' ? '완전한 반응형 디자인' : 'Fully responsive design'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}