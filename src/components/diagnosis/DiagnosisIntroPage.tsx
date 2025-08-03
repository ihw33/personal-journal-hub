/**
 * IdeaWorkLab v4.0 DiagnosisIntroPage
 * 사고 유형 진단 소개 페이지
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Brain, Target, Lightbulb, TrendingUp, Clock, Users, ChevronRight } from 'lucide-react';

interface DiagnosisIntroPageProps {
  onStartDiagnosis?: () => void;
  onNavigate?: (page: string, params?: any) => void;
}

const features = [
  {
    icon: Brain,
    title: '8단계 사고 분석',
    description: '관찰→질문→분석→연결→상상→종합→평가→실행 단계별 사고력 측정',
    gradient: 'from-architect-primary to-architect-secondary'
  },
  {
    icon: Target,
    title: '개인 맞춤 진단',
    description: '당신만의 고유한 사고 패턴과 강점을 정확히 파악',
    gradient: 'from-architect-secondary to-architect-ai-primary'
  },
  {
    icon: Lightbulb,
    title: 'AI 기반 분석',
    description: '최신 AI 기술로 정밀하고 객관적인 사고력 평가',
    gradient: 'from-architect-ai-primary to-architect-ai-secondary'
  },
  {
    icon: TrendingUp,
    title: '성장 로드맵 제공',
    description: '진단 결과를 바탕으로 한 구체적인 발전 방향 제시',
    gradient: 'from-architect-ai-secondary to-architect-success'
  }
];

const stats = [
  { label: '소요 시간', value: '약 15분', icon: Clock },
  { label: '참여자 수', value: '10,000+', icon: Users },
  { label: '정확도', value: '95%+', icon: Target }
];

export const DiagnosisIntroPage: React.FC<DiagnosisIntroPageProps> = ({
  onStartDiagnosis = () => {},
  onNavigate = () => {}
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-iwl-primary-50 to-iwl-blue-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 md:mb-8">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-architect-primary to-architect-secondary rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl">
                <Brain className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 md:mb-6 leading-tight">
              나의 사고 유형을 
              <span className="bg-gradient-to-r from-architect-primary to-architect-secondary bg-clip-text text-transparent"> 정확히 </span>
              알아보세요
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto">
              AI 파트너 '아키'와 함께하는 과학적인 사고력 진단 테스트로 
              당신만의 고유한 사고 패턴과 무한한 잠재력을 발견해보세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16">
              <Button 
                size="lg"
                onClick={onStartDiagnosis}
                className="bg-gradient-to-r from-architect-primary to-architect-secondary hover:from-architect-primary hover:to-architect-secondary hover:opacity-90 text-white px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Brain className="w-6 h-6 mr-3" />
                무료 진단 시작하기
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate('about')}
                className="border-architect-primary text-architect-primary hover:bg-architect-gray-50 px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-semibold w-full sm:w-auto"
              >
                더 자세히 알아보기
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto mb-16">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 shadow-lg">
                      <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-architect-primary" />
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              왜 IdeaWorkLab 진단 테스트인가요?
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              단순한 성격 테스트가 아닌, 과학적 근거와 AI 기술을 바탕으로 한 정밀한 사고력 분석입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group cursor-pointer overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${feature.gradient} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                      <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-architect-primary transition-colors leading-tight">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              진단 과정
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              간단한 3단계로 나만의 사고 유형을 정확히 파악할 수 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-architect-primary to-architect-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-xl md:text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">질문 응답</h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                20개의 시나리오 기반 질문에 직관적으로 답변하세요
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-architect-secondary to-architect-ai-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-xl md:text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">AI 분석</h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                AI 아키가 8단계 사고 프로세스를 기반으로 정밀 분석
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-architect-ai-primary to-architect-ai-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-xl md:text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">결과 확인</h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                상세한 분석 리포트와 개인 맞춤 성장 로드맵 제공
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-architect-primary to-architect-secondary">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-black mb-4 md:mb-6">
              지금 시작하면 무료로 체험할 수 있습니다
            </h2>
            <p className="text-lg md:text-xl mb-8 md:mb-12 opacity-90 leading-relaxed">
              당신의 사고력 여정이 여기서 시작됩니다. 
              AI 파트너 '아키'와 함께 새로운 자신을 발견해보세요.
            </p>
            
            <Button 
              size="lg"
              onClick={onStartDiagnosis}
              className="bg-white text-architect-primary hover:bg-gray-100 px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Brain className="w-6 h-6 mr-3" />
              진단 테스트 시작하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiagnosisIntroPage;