/**
 * IdeaWorkLab v4.0 DiagnosisResultPage
 * 사고 유형 진단 결과 표시 페이지
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  Users, 
  BookOpen, 
  Download, 
  Share2,
  Star,
  CheckCircle,
  ArrowRight,
  BarChart3
} from 'lucide-react';

interface DiagnosisResultPageProps {
  results?: DiagnosisResults;
  onNavigate?: (page: string, params?: any) => void;
  onRetake?: () => void;
}

interface ThinkingStyle {
  name: string;
  description: string;
  strength: string;
  weakness: string;
  color: string;
  gradient: string;
  icon: React.ComponentType<any>;
}

interface DiagnosisResults {
  primaryStyle: string;
  secondaryStyle: string;
  scores: Record<string, number>;
  recommendations: string[];
  growthAreas: string[];
}

const thinkingStyles: Record<string, ThinkingStyle> = {
  '체계적분석가': {
    name: '체계적 분석가',
    description: '논리적이고 구조적인 사고로 문제를 해결하는 전략가입니다.',
    strength: '복잡한 문제를 단계별로 분해하여 체계적으로 해결',
    weakness: '때로는 과도한 분석으로 실행이 늦어질 수 있음',
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    icon: BarChart3
  },
  '창의적탐험가': {
    name: '창의적 탐험가',
    description: '새로운 아이디어와 혁신적인 해결책을 찾아내는 혁신가입니다.',
    strength: '독창적인 아이디어 발굴과 창의적 문제 해결',
    weakness: '때로는 실현 가능성을 간과할 수 있음',
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-500',
    icon: Lightbulb
  },
  '실용적실행가': {
    name: '실용적 실행가',
    description: '아이디어를 현실로 만드는 뛰어난 실행력을 가진 행동가입니다.',
    strength: '빠른 의사결정과 효과적인 실행력',
    weakness: '때로는 충분한 계획 없이 성급하게 행동할 수 있음',
    color: 'text-green-600',
    gradient: 'from-green-500 to-teal-500',
    icon: Target
  },
  '협력적조율가': {
    name: '협력적 조율가',
    description: '팀워크와 소통을 통해 시너지를 만들어내는 리더입니다.',
    strength: '뛰어난 소통 능력과 팀 조율 역량',
    weakness: '때로는 결정을 내리는데 시간이 오래 걸릴 수 있음',
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-red-500',
    icon: Users
  }
};

const categories = [
  { name: '관찰', description: '정보 수집과 패턴 인식' },
  { name: '질문', description: '문제 정의와 탐구' },
  { name: '분석', description: '논리적 사고와 분해' },
  { name: '연결', description: '관계성 파악과 통합' },
  { name: '상상', description: '창의성과 가능성 탐색' },
  { name: '종합', description: '통합적 사고와 판단' },
  { name: '평가', description: '비판적 사고와 검증' },
  { name: '실행', description: '행동 계획과 실천' }
];

const mockResults: DiagnosisResults = {
  primaryStyle: '체계적분석가',
  secondaryStyle: '실용적실행가',
  scores: {
    '관찰': 85,
    '질문': 78,
    '분석': 92,
    '연결': 74,
    '상상': 68,
    '종합': 88,
    '평가': 91,
    '실행': 82
  },
  recommendations: [
    'AI 기반 데이터 분석 강의로 체계적 사고 역량 강화',
    '프로젝트 관리 및 실행 전략 과정 수강',
    '창의적 문제 해결 워크숍으로 상상력 개발',
    '팀 리더십과 소통 스킬 향상 프로그램'
  ],
  growthAreas: [
    '상상력과 창의성 개발',
    '협업과 팀워크 역량 강화',
    '감정 지능과 공감 능력 향상'
  ]
};

export const DiagnosisResultPage: React.FC<DiagnosisResultPageProps> = ({
  results = mockResults,
  onNavigate = () => {},
  onRetake = () => {}
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');

  const primaryStyle = thinkingStyles[results.primaryStyle];
  const secondaryStyle = thinkingStyles[results.secondaryStyle];
  const PrimaryIcon = primaryStyle.icon;
  const SecondaryIcon = secondaryStyle.icon;

  const overallScore = Math.round(
    Object.values(results.scores).reduce((sum, score) => sum + score, 0) / Object.values(results.scores).length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-purple-500 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white/15"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <Brain className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              진단 완료!
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto">
              AI 아키가 분석한 당신의 고유한 사고 패턴을 확인해보세요.
              개인 맞춤형 성장 로드맵도 함께 제공됩니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {}} // TODO: Download functionality
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Download className="w-5 h-5 mr-2" />
                결과 저장하기
              </Button>
              <Button
                onClick={() => {}} // TODO: Share functionality
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Share2 className="w-5 h-5 mr-2" />
                결과 공유하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: '전체 개요', icon: Brain },
              { id: 'detailed', label: '상세 분석', icon: BarChart3 },
              { id: 'recommendations', label: '성장 방향', icon: TrendingUp }
            ].map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-8 md:py-12">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Overall Score */}
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  종합 사고력 지수
                </CardTitle>
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl md:text-5xl font-black text-white">{overallScore}</span>
                </div>
                <p className="text-lg text-gray-600">
                  상위 {100 - Math.floor(overallScore * 0.8)}% 수준의 사고력을 보유하고 있습니다
                </p>
              </CardHeader>
            </Card>

            {/* Primary & Secondary Styles */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${primaryStyle.gradient} rounded-xl flex items-center justify-center`}>
                      <PrimaryIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200 mb-2">
                        주요 유형
                      </Badge>
                      <CardTitle className={`text-xl font-bold ${primaryStyle.color}`}>
                        {primaryStyle.name}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {primaryStyle.description}
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">주요 강점</h4>
                      <p className="text-sm text-gray-600">{primaryStyle.strength}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">개선 포인트</h4>
                      <p className="text-sm text-gray-600">{primaryStyle.weakness}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${secondaryStyle.gradient} rounded-xl flex items-center justify-center`}>
                      <SecondaryIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 mb-2">
                        보조 유형
                      </Badge>
                      <CardTitle className={`text-xl font-bold ${secondaryStyle.color}`}>
                        {secondaryStyle.name}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {secondaryStyle.description}
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">주요 강점</h4>
                      <p className="text-sm text-gray-600">{secondaryStyle.strength}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">개선 포인트</h4>
                      <p className="text-sm text-gray-600">{secondaryStyle.weakness}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                8단계 사고 프로세스 분석
              </CardTitle>
              <p className="text-gray-600">
                각 사고 단계별 상세 점수와 특성을 확인해보세요
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categories.map(category => {
                  const score = results.scores[category.name];
                  return (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-purple-600">{score}</span>
                          <span className="text-sm text-gray-500">/100</span>
                        </div>
                      </div>
                      <Progress value={score} className="h-3" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-8">
            {/* Recommended Courses */}
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  맞춤형 강의 추천
                </CardTitle>
                <p className="text-gray-600">
                  당신의 사고 유형에 최적화된 학습 과정을 제안합니다
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{recommendation}</p>
                      </div>
                      <Button size="sm" variant="outline" className="flex-shrink-0">
                        <BookOpen className="w-4 h-4 mr-1" />
                        보기
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Growth Areas */}
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  집중 성장 영역
                </CardTitle>
                <p className="text-gray-600">
                  다음 영역들을 개발하면 더욱 균형잡힌 사고력을 갖출 수 있습니다
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.growthAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 border border-orange-200 bg-orange-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-900 font-medium">{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button
            onClick={() => onNavigate('courses')}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 font-semibold"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            추천 강의 보기
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button
            onClick={onRetake}
            size="lg"
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 font-semibold"
          >
            <Brain className="w-5 h-5 mr-2" />
            다시 진단하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResultPage;