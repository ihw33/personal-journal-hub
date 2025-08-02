/**
 * IdeaWorkLab v4.0 HomePage
 * 완전한 메인 페이지 - 6개 섹션 통합 구성 (수정버전 v2)
 * 기존 컴포넌트들을 import하여 방문자를 '무료 데모 신청'으로 유도
 */

import React from 'react';
// import { HeroSectionV3 } from './HeroSectionV3'; // TODO: HeroSectionV3 컴포넌트 생성 필요
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Brain, Users, Star, Award, CheckCircle, Sparkles, 
  ArrowRight, BookOpen, Lightbulb, Target, Compass,
  TrendingUp, Zap, Heart, ChevronRight, Clock, Eye,
  ThumbsUp, Calendar, User, Play, Building, PenTool,
  Layers, Code, Wand2, Rocket, Shield, Cpu
} from 'lucide-react';

interface HomePageProps {
  language?: 'ko' | 'en';
  onNavigate?: (page: string, params?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language = 'ko',
  onNavigate = () => {}
}) => {

  // 대표 강의 데이터
  const featuredCourses = [
    {
      id: 'level-1-3',
      title: 'Level 1-3: 체계적 사고 기초',
      description: '생각이와 함께 시작하는 사고의 첫 걸음. 체계적으로 생각하는 방법을 익히고 논리적 추론 능력을 기릅니다.',
      level: '초급',
      duration: '3주',
      students: '1,200+',
      rating: 4.9,
      icon: Brain,
      progress: 85,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'level-4-6', 
      title: 'Level 4-6: AI 협업 사고법',
      description: '아키와 함께하는 고급 사고 전략. AI와 효과적으로 협업하여 창조적 문제 해결 능력을 키웁니다.',
      level: '중급',
      duration: '3주', 
      students: '800+',
      rating: 4.8,
      icon: Lightbulb,
      progress: 72,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'level-7-9',
      title: 'Level 7-9: 사고 설계 전문가',
      description: '반짝이와 미루미를 극복하며 완성하는 전문가 과정. 복잡한 문제를 체계적으로 설계하고 해결합니다.',
      level: '고급',
      duration: '3주',
      students: '500+', 
      rating: 5.0,
      icon: Target,
      progress: 58,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  // 전문가 저널 데이터
  const featuredJournals = [
    {
      id: 'thinking-methodology-research',
      title: '체계적 사고력 개발 방법론 연구',
      excerpt: '8단계 사고 확장 모델의 이론적 배경과 실증적 검증 결과를 통해 체계적 사고력 개발의 새로운 패러다임을 제시합니다.',
      author: '김사고 박사',
      readTime: '12분',
      category: '사고력 연구',
      publishedAt: '2024.01.20',
      views: '3,500+',
      likes: 287,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop'
    },
    {
      id: 'ai-collaboration-study',
      title: 'AI 협업 기반 학습 효과성 분석',
      excerpt: 'AI 학습 파트너와의 상호작용이 학습자의 메타인지 능력과 창의적 사고력 향상에 미치는 영향을 실증적으로 분석했습니다.',
      author: '이혁신 연구원',
      readTime: '15분',
      category: 'AI 교육',
      publishedAt: '2024.01.15',
      views: '4,200+',
      likes: 356,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop'
    },
    {
      id: 'personalized-learning-framework',
      title: '개인화 학습 시스템 설계 프레임워크',
      excerpt: '개별 학습자의 인지 특성과 학습 패턴을 분석하여 최적화된 개인 맞춤형 학습 경로를 제공하는 시스템을 소개합니다.',
      author: '박미래 교수',
      readTime: '18분',
      category: '교육 기술',
      publishedAt: '2024.01.10',
      views: '2,800+',
      likes: 198,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Section 1: Hero Section */}
      <section className="relative">
        {/* TODO: HeroSectionV3 컴포넌트 생성 후 주석 해제 */}
        {/* <HeroSectionV3 
          language={language}
          onNavigate={onNavigate}
        /> */}
        {/* 임시 Hero Section */}
        <div className="min-h-[60vh] bg-architect-gradient flex items-center justify-center text-white">
          <div className="container mx-auto text-center">
            <h1 className="text-architect-h1 font-architect-black mb-4">
              사고력의 새로운 차원을 경험하세요
            </h1>
            <p className="text-architect-body-lg mb-8 max-w-2xl mx-auto">
              AI와 함께하는 체계적 사고력 학습 플랫폼 IdeaWorkLab
            </p>
            <Button 
              size="lg"
              onClick={() => onNavigate('trial-course')}
              className="bg-white text-architect-primary hover:bg-white/90"
            >
              무료 데모 체험하기
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2: Social Proof (사회적 증거) */}
      <section className="py-12 md:py-16 bg-architect-gray-100/30">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-architect-h3 md:text-architect-h2 font-architect-bold text-architect-gray-900 mb-4">
              검증된 성과로 증명하는 신뢰
            </h2>
            <p className="text-architect-body text-architect-gray-700 max-w-2xl mx-auto leading-architect-relaxed">
              실제 사용자들이 경험한 성과와 전문가들의 검증을 통해 확인된 학습 효과를 확인해보세요.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {/* 사용자 만족도 */}
            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-architect-gradient rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-architect-lg">
                <Heart className="w-5 h-5 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-architect-h4 md:text-architect-h2 font-architect-black text-architect-primary mb-1 md:mb-2">98%</div>
              <div className="text-architect-small md:text-architect-body font-architect-semibold text-architect-gray-900 mb-1">사용자 만족도</div>
              <div className="text-architect-xs md:text-architect-small text-architect-gray-700">실제 사용자 피드백 기반</div>
            </div>

            {/* 전문가 검증 */}
            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-architect-accent-gradient rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-architect-lg">
                <Award className="w-5 h-5 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-architect-h4 md:text-architect-h2 font-architect-black text-architect-accent mb-1 md:mb-2">1,000+</div>
              <div className="text-architect-small md:text-architect-body font-architect-semibold text-architect-gray-900 mb-1">전문가 검증</div>
              <div className="text-architect-xs md:text-architect-small text-architect-gray-700">교육·심리학 전문가 협력</div>
            </div>

            {/* 학습 완료율 */}
            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-architect-future-gradient rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-architect-ai">
                <TrendingUp className="w-5 h-5 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-architect-h4 md:text-architect-h2 font-architect-black text-architect-ai-primary mb-1 md:mb-2">92%</div>
              <div className="text-architect-small md:text-architect-body font-architect-semibold text-architect-gray-900 mb-1">학습 완료율</div>
              <div className="text-architect-xs md:text-architect-small text-architect-gray-700">업계 평균 대비 3배 높음</div>
            </div>

            {/* 활성 사용자 */}
            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-architect-lg">
                <Users className="w-5 h-5 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-architect-h4 md:text-architect-h2 font-architect-black text-emerald-600 mb-1 md:mb-2">5,000+</div>
              <div className="text-architect-small md:text-architect-body font-architect-semibold text-architect-gray-900 mb-1">활성 사용자</div>
              <div className="text-architect-xs md:text-architect-small text-architect-gray-700">매일 함께 성장하는 학습자</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: '왜 IdeaWorkLab인가?' */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-architect-h2 md:text-architect-h1 font-architect-black text-architect-gray-900 mb-4">
              왜 IdeaWorkLab인가?
            </h2>
            <p className="text-architect-body md:text-architect-body-lg text-architect-gray-700 max-w-3xl mx-auto leading-architect-relaxed">
              단순한 학습을 넘어서, AI와 함께하는 체계적 사고력 구축 시스템으로 
              당신의 잠재력을 완전히 새로운 차원으로 끌어올립니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
            
            {/* 사고 확장 9단계 모델 */}
            <div className="text-center lg:col-span-1">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-architect-gradient rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-architect-xl">
                <Building className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-architect-h4 md:text-architect-h3 font-architect-bold text-architect-gray-900 mb-3 md:mb-4">
                사고 확장 9단계 모델
              </h3>
              <p className="text-architect-small md:text-architect-body text-architect-gray-700 leading-architect-relaxed mb-4 md:mb-6">
                <strong className="text-architect-primary">당신이 성장할 경로입니다.</strong><br/>
                체계적이고 단계적인 사고력 발전 로드맵으로, 
                각자의 수준에 맞는 맞춤형 학습 경로를 제공합니다.
              </p>
              
              {/* 9단계 모델 다이어그램 placeholder */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 md:p-6 border-2 border-architect-primary/20">
                <div className="text-architect-small font-architect-medium text-architect-primary mb-3">
                  9단계 사고 확장 모델
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {Array.from({ length: 9 }, (_, i) => (
                    <div key={i} className="text-center">
                      <div 
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto mb-1 text-white text-architect-xs md:text-architect-small font-architect-semibold ${
                          i < 3 ? 'bg-architect-gradient' : 
                          i < 6 ? 'bg-architect-future-gradient' : 
                          'bg-architect-accent-gradient'
                        }`}
                      >
                        {i + 1}
                      </div>
                      <div className="text-architect-xs text-architect-gray-600">
                        {i < 3 ? '기초' : i < 6 ? '심화' : '전문'}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-architect-xs text-architect-gray-600">
                  모델 다이어그램이 들어갈 자리
                </div>
              </div>
            </div>

            {/* 캐릭터 세계관 */}
            <div className="text-center lg:col-span-1">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-architect-future-gradient rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-architect-ai">
                <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-architect-h4 md:text-architect-h3 font-architect-bold text-architect-gray-900 mb-3 md:mb-4">
                캐릭터 세계관
              </h3>
              <p className="text-architect-small md:text-architect-body text-architect-gray-700 leading-architect-relaxed mb-4 md:mb-6">
                <strong className="text-architect-ai-primary">당신의 성장을 도울 파트너들입니다.</strong><br/>
                생각이, 아키, 미루미, 반짝이 - 각각 고유한 역할을 가진 
                AI 캐릭터들이 당신의 학습 여정을 함께합니다.
              </p>
              
              {/* 캐릭터 소개 영역 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 md:p-6 border-2 border-architect-ai-primary/20">
                <div className="text-architect-small font-architect-medium text-architect-ai-primary mb-3">
                  AI 학습 파트너들
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="text-architect-xs md:text-architect-small font-architect-medium">생각이</div>
                    <div className="text-architect-xs text-architect-gray-600">논리적 사고</div>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Wand2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="text-architect-xs md:text-architect-small font-architect-medium">아키</div>
                    <div className="text-architect-xs text-architect-gray-600">설계 전문가</div>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Layers className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="text-architect-xs md:text-architect-small font-architect-medium">미루미</div>
                    <div className="text-architect-xs text-architect-gray-600">극복 도우미</div>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="text-architect-xs md:text-architect-small font-architect-medium">반짝이</div>
                    <div className="text-architect-xs text-architect-gray-600">창의적 영감</div>
                  </div>
                </div>
                <div className="mt-4 text-architect-xs text-architect-gray-600">
                  캐릭터 소개가 들어갈 영역
                </div>
              </div>
            </div>

            {/* AI 협력 시스템 */}
            <div className="text-center md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-architect-accent-gradient rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-architect-xl">
                <Cpu className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-architect-h4 md:text-architect-h3 font-architect-bold text-architect-gray-900 mb-3 md:mb-4">
                AI 협력 시스템
              </h3>
              <p className="text-architect-small md:text-architect-body text-architect-gray-700 leading-architect-relaxed mb-4 md:mb-6">
                <strong className="text-architect-accent">AI를 '사고 파트너'로 활용하는 실습 중심의 데모를 경험해보세요.</strong><br/>
                최첨단 AI 기술과 검증된 교육 방법론이 결합된 세계 최초의 사고력 전문 학습 플랫폼입니다.
              </p>
              
              {/* AI 기능 미리보기 */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 md:p-6 border-2 border-architect-accent/20">
                <div className="text-architect-small font-architect-medium text-architect-accent mb-3">
                  AI 협력 시스템 특징
                </div>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center gap-2 text-architect-xs md:text-architect-small text-architect-gray-700">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-architect-ai-primary flex-shrink-0" />
                    <span>실시간 AI 대화 학습</span>
                  </div>
                  <div className="flex items-center gap-2 text-architect-xs md:text-architect-small text-architect-gray-700">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-architect-ai-primary flex-shrink-0" />
                    <span>개인화된 학습 피드백</span>
                  </div>
                  <div className="flex items-center gap-2 text-architect-xs md:text-architect-small text-architect-gray-700">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-architect-ai-primary flex-shrink-0" />
                    <span>적응형 난이도 조절</span>
                  </div>
                  <div className="flex items-center gap-2 text-architect-xs md:text-architect-small text-architect-gray-700">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-architect-ai-primary flex-shrink-0" />
                    <span>감정 지능 기반 상호작용</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 대표 강의 소개 */}
      <section className="py-16 md:py-24 bg-architect-gray-100/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-architect-h2 md:text-architect-h1 font-architect-black text-architect-gray-900 mb-4">
              게임처럼 즐겁게, 전문가처럼 깊이있게 성장하세요
            </h2>
            <p className="text-architect-body md:text-architect-body-lg text-architect-gray-700 max-w-3xl mx-auto leading-architect-relaxed">
              단계별로 설계된 체계적 커리큘럼으로 재미있으면서도 깊이 있는 사고력 학습을 경험해보세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {featuredCourses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <Card 
                  key={course.id}
                  className="card-architect-hover group cursor-pointer overflow-hidden bg-white border border-architect-gray-300"
                  onClick={() => onNavigate('courses', { courseId: course.id })}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${course.gradient} rounded-xl md:rounded-2xl flex items-center justify-center shadow-architect-lg`}>
                        <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className="bg-white/80 backdrop-blur-sm border-architect-gray-300 text-architect-gray-700 font-architect-medium text-architect-xs md:text-architect-small"
                      >
                        {course.level}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-architect-body-lg md:text-architect-h4 font-architect-bold text-architect-gray-900 group-hover:text-architect-primary transition-colors leading-architect-tight">
                      {course.title}
                    </CardTitle>
                    
                    <CardDescription className="text-architect-small md:text-architect-body text-architect-gray-700 leading-architect-relaxed">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-architect-xs md:text-architect-small text-architect-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                        <span>{course.students}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current flex-shrink-0" />
                        <span className="text-architect-xs md:text-architect-small font-architect-semibold text-architect-gray-900">
                          {course.rating}
                        </span>
                      </div>
                      
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-architect-gray-400 group-hover:text-architect-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => onNavigate('courses')}
              size="lg"
              className="btn-architect-secondary px-6 md:px-8 py-3 md:py-4 text-architect-small md:text-architect-body font-architect-semibold"
            >
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              모든 레벨 살펴보기
            </Button>
          </div>
        </div>
      </section>

      {/* Section 5: 전문가 저널 맛보기 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-architect-h2 md:text-architect-h1 font-architect-black text-architect-gray-900 mb-4">
              우리의 방법론은 깊이 있는 연구에 기반합니다
            </h2>
            <p className="text-architect-body md:text-architect-body-lg text-architect-gray-700 max-w-3xl mx-auto leading-architect-relaxed">
              국내외 교육 전문가들의 최신 연구와 실제 적용 사례를 통해 검증된 학습 방법론을 만나보세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {featuredJournals.map((journal, index) => (
              <Card 
                key={journal.id}
                className="card-architect-hover group cursor-pointer overflow-hidden bg-white border border-architect-gray-300"
                onClick={() => onNavigate('journal-detail', { journalId: journal.id })}
              >
                {/* 저널 이미지 */}
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback 
                    src={journal.image} 
                    alt={journal.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant="outline" 
                      className="bg-architect-primary/5 text-architect-primary border-architect-primary/20 font-architect-medium text-architect-xs md:text-architect-small"
                    >
                      {journal.category}
                    </Badge>
                    <div className="text-architect-xs text-architect-gray-500">
                      {journal.publishedAt}
                    </div>
                  </div>
                  
                  <CardTitle className="text-architect-body-lg md:text-architect-h4 font-architect-bold text-architect-gray-900 group-hover:text-architect-primary transition-colors leading-architect-tight">
                    {journal.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-architect-small md:text-architect-body text-architect-gray-700 leading-architect-relaxed mb-4 line-clamp-3">
                    {journal.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-architect-xs md:text-architect-small text-architect-gray-600 mb-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 flex-shrink-0" />
                        <span>{journal.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>{journal.readTime} 읽기</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-4 text-architect-xs text-architect-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3 flex-shrink-0" />
                        <span>{journal.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 flex-shrink-0" />
                        <span>{journal.likes}</span>
                      </div>
                    </div>
                    
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-architect-gray-400 group-hover:text-architect-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => onNavigate('journal')}
              size="lg"
              variant="outline"
              className="border-architect-primary text-architect-primary hover:bg-architect-primary hover:text-white px-6 md:px-8 py-3 md:py-4 text-architect-small md:text-architect-body font-architect-semibold transition-colors"
            >
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              더 많은 인사이트 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Section 6: 최종 CTA (행동 유도) */}
      <section className="py-16 md:py-24 bg-architect-gradient relative overflow-hidden">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 rounded-full bg-white/20"></div>
          <div className="absolute top-32 right-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/15"></div>
          <div className="absolute bottom-20 left-32 w-24 h-24 md:w-40 md:h-40 rounded-full bg-white/10"></div>
          <div className="absolute bottom-32 right-10 w-18 h-18 md:w-28 md:h-28 rounded-full bg-white/25"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 md:mb-8">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 backdrop-blur-sm">
                <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>

            <h2 className="text-architect-h2 md:text-architect-h1 font-architect-black text-white mb-4 md:mb-6 leading-architect-tight">
              지금 바로 AI 파트너 '아키'를 만나보세요
            </h2>
            
            <p className="text-architect-body md:text-architect-body-lg text-white/90 mb-6 md:mb-8 leading-architect-relaxed max-w-2xl mx-auto">
              단 15분의 무료 데모 세션으로 당신의 사고력이 어떻게 체계적으로 발전할 수 있는지 직접 경험해보세요. 
              개인 맞춤형 AI 멘토 '아키'가 당신을 기다리고 있습니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-8">
              <Button 
                size="lg"
                onClick={() => onNavigate('trial-course')}
                className="bg-white text-architect-primary hover:bg-white/90 px-6 md:px-8 py-3 md:py-4 text-architect-body md:text-architect-body-lg font-architect-bold shadow-architect-xl hover:shadow-architect-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Play className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                무료 데모 세션 신청하기
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate('about')}
                className="border-white/40 text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 text-architect-small md:text-architect-body font-architect-semibold backdrop-blur-sm w-full sm:w-auto"
              >
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                더 자세히 알아보기
              </Button>
            </div>

            {/* 신뢰 지표 */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto text-white/80 mb-6 md:mb-12">
              <div className="text-center">
                <div className="text-architect-h4 md:text-architect-h3 font-architect-bold text-white mb-1">100%</div>
                <div className="text-architect-xs md:text-architect-small">무료 체험</div>
              </div>
              <div className="text-center">
                <div className="text-architect-h4 md:text-architect-h3 font-architect-bold text-white mb-1">24/7</div>
                <div className="text-architect-xs md:text-architect-small">AI 지원</div>
              </div>
              <div className="text-center">
                <div className="text-architect-h4 md:text-architect-h3 font-architect-bold text-white mb-1">15분</div>
                <div className="text-architect-xs md:text-architect-small">빠른 시작</div>
              </div>
            </div>

            {/* 추가 혜택 안내 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
              <h3 className="text-architect-body-lg md:text-architect-h4 font-architect-semibold text-white mb-3 md:mb-4">
                무료 데모 세션에서 경험할 수 있는 것들
              </h3>
              <div className="grid md:grid-cols-3 gap-3 md:gap-4 text-architect-xs md:text-architect-small text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white flex-shrink-0" />
                  <span>개인 맞춤 사고력 진단</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white flex-shrink-0" />
                  <span>AI 아키와의 실제 대화</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white flex-shrink-0" />
                  <span>맞춤형 학습 계획 제안</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;