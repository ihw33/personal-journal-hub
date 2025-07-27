import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  ArrowRight, 
  Brain, 
  Zap, 
  TrendingUp, 
  Users, 
  Star, 
  MapPin, 
  MessageCircle,
  BookOpen,
  Calendar,
  Target,
  Award,
  Settings,
  BarChart3,
  CheckCircle,
  Clock,
  Lightbulb,
  FileText,
  PlusCircle,
  Play,
  Coffee,
  Sparkles,
  Rocket,
  Globe,
  Shield,
  Database,
  Activity,
  DollarSign,
  AlertCircle,
  HelpCircle,
  Gift
} from 'lucide-react';

interface PersonalizedHeroSectionProps {
  language: 'ko' | 'en';
  onNavigate: (page: string, journalId?: string, category?: string, week?: number, phase?: number, mode?: 'guided' | 'self-directed') => void;
  userType: 'guest' | 'member';
  userData?: {
    name?: string;
    email?: string;
    currentCourse?: string;
    progress?: number;
    completedPhases?: number;
    totalPhases?: number;
    lastActivity?: string;
    streak?: number;
    enrollmentDate?: string;
    membershipLevel?: 'free' | 'basic' | 'premium' | 'vip';
  };
}

export const PersonalizedHeroSection = React.memo(({ 
  language, 
  onNavigate, 
  userType, 
  userData 
}: PersonalizedHeroSectionProps) => {
  
  // v118: 메모이제이션으로 성능 최적화
  const HeroComponent = useMemo(() => {
    // 🔥 신규 사용자 (Guest) 버전
    if (userType === 'guest') {
      return <GuestHeroSection language={language} onNavigate={onNavigate} />;
    }
    
    // 👤 일반 회원 버전
    if (userType === 'member') {
      return <MemberHeroSection language={language} onNavigate={onNavigate} userData={userData} />;
    }

    return null;
  }, [language, userType, userData, onNavigate]);

  return HeroComponent;
});

// 🔥 신규 사용자 히어로 섹션 (v118: 성능 최적화)
const GuestHeroSection = React.memo(({ language, onNavigate }: { language: 'ko' | 'en', onNavigate: (page: string) => void }) => {
  // v118: 콘텐츠 메모이제이션
  const content = useMemo(() => ({
    ko: {
      badge: "🔥 인기 강의",
      course: "제주도 여행 기획으로 배우는 AI 협업",
      title1: "AI와 함께하는",
      title2: "새로운 생각정리",
      subtitle: "현대인을 위한 AI 강화 사고법",
      description: "AI 기반 도구로 인지적 잠재력을 해제하고, 사고 과정을 증폭시키며, 창의성을 향상시키고, 아이디어를 실행 가능한 통찰력으로 변환하세요",
      startCourse: "제주도 과정 시작하기",
      freeSignup: "무료 회원가입",

      stats: {
        students: "500+ 수강생",
        satisfaction: "4.9/5 만족도", 
        implementation: "89% 실행률"
      },
      features: {
        process: "3단계 학습 프로세스",
        step1: {
          title: "AI와 함께 시작하기",
          items: ["AI 도구 소개", "AI와의 첫 대화", "기본 명령어 익히기", "안전한 협력 방법"]
        },
        step2: {
          title: "함께 생각해보기",
          items: ["질문 기법 습득", "토론과 대화", "다각도 분석", "통찰력 발견"]
        },
        step3: {
          title: "멋진 결과 만들기",
          items: ["고품질 결과물", "창의적 솔루션", "효율적 실행", "지속적 개선"]
        }
      },
      testimonials: {
        title: "실제 후기",
        review1: {
          text: "3주 만에 창의적 아이디어가 3배 늘었어요",
          name: "김○○ (마케팅 매니저)",
          result: "브레인스토밍 효율 300% 향상"
        },
        review2: {
          text: "AI와 함께하니 혼자서는 불가능한 결과물이",
          name: "박○○ (프리랜서 디자이너)",
          result: "프로젝트 기획 시간 50% 단축"
        },
        review3: {
          text: "체계적인 방법론으로 사고력이 확장됐어요",
          name: "정○○ (대학원생)",
          result: "논문 아이디어 발굴 및 구조화"
        }
      },
      pricing: {
        basic: {
          title: "기본 과정",
          price: "₩299,000",
          duration: "8주",
          features: ["AI 협업 완전 마스터", "주차별 실습 프로젝트", "커뮤니티 평생 멤버십", "수료 후 3개월 지원"]
        },
        premium: {
          title: "프리미엄",
          price: "₩399,000", 
          duration: "8주",
          features: ["모든 기본 과정 포함", "1:1 개인 코칭 (주 1회)", "개인별 맞춤 피드백", "수료 후 6개월 지원"]
        },
        free: {
          title: "무료 체험",
          price: "₩0",
          duration: "1주",
          features: ["1주차 전체 과정 체험", "AI 도구 기초 사용법", "샘플 프로젝트 진행", "커뮤니티 1주 체험"]
        }
      },
      offers: {
        earlybird: "🎁 얼리버드 30% 할인 (선착순 50명)",
        guarantee: "💯 100% 환불 보장 (14일 내)", 
        materials: "📚 무료 추가 자료 (PDF 가이드북)",
        certificate: "🏆 수료증 발급 (디지털 배지)"
      },
      cta: {
        start: "🚀 지금 무료 체험 시작하기",
        contact: "💬 궁금한 점 문의하기"
      }
    },
    en: {
      badge: "🔥 Popular Course",
      course: "Learn AI Collaboration through Jeju Travel Planning",
      title1: "Think Deeper",
      title2: "with AI",
      subtitle: "AI-Enhanced Thinking for Modern Minds",
      description: "Unlock your cognitive potential with AI-powered tools, amplify your thinking process, enhance creativity, and transform ideas into actionable insights",
      startCourse: "Start Jeju Course",
      freeSignup: "Free Sign Up",

      stats: {
        students: "500+ Learners",
        satisfaction: "4.9/5 Rating",
        implementation: "89% Success Rate"
      }
    }
  }), []);

  const t = content[language];

  // v118: 콜백 메모이제이션
  const handleNavigateAuth = useCallback(() => onNavigate('auth'), [onNavigate]);
  const handleNavigateHelp = useCallback(() => onNavigate('help'), [onNavigate]);

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50 overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-iwl-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-iwl-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-iwl-purple/5 to-iwl-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* 메인 히어로 섹션 */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-iwl-purple/20 mb-6">
            <Badge className="bg-iwl-gradient text-white text-xs font-medium">{t.badge}</Badge>
            <MapPin className="w-4 h-4 text-iwl-purple" />
            <span className="text-sm font-medium text-gray-700">{t.course}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block">{t.title1}</span>
            <span className="text-iwl-gradient">{t.title2}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-iwl-purple font-medium mb-4">
            {t.subtitle}
          </p>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
            <Button 
              onClick={() => onNavigate('course-jeju')}
              size="lg" 
              className="bg-iwl-gradient hover:opacity-90 text-white font-semibold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all"
            >
              <MapPin className="w-5 h-5 mr-2" />
              {t.startCourse}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={() => onNavigate('auth')}
              variant="outline" 
              size="lg" 
              className="border-2 border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white font-semibold text-lg px-8 py-4 transition-all"
            >
              <Brain className="w-5 h-5 mr-2" />
              {t.freeSignup}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-600 flex-wrap">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-iwl-purple" />
              <span>{t.stats.students}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{t.stats.satisfaction}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>{t.stats.implementation}</span>
            </div>
          </div>
        </div>

        {/* 3단계 프로세스 섹션 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t.features.process}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="border-2 border-iwl-purple/20 hover:border-iwl-purple/40 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-iwl-gradient rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {t.features.step1.title}
                </h3>
                <ul className="space-y-2">
                  {t.features.step1.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-2 border-iwl-blue/20 hover:border-iwl-blue/40 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-iwl-blue to-iwl-purple rounded-full flex items-center justify-center mb-6 mx-auto">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {t.features.step2.title}
                </h3>
                <ul className="space-y-2">
                  {t.features.step2.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-2 border-green/20 hover:border-green/40 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {t.features.step3.title}
                </h3>
                <ul className="space-y-2">
                  {t.features.step3.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 실제 후기 섹션 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t.testimonials.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.values(t.testimonials).slice(1).map((testimonial: any, index) => (
              <Card key={index} className="border border-gray-200 hover:border-iwl-purple/30 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-iwl-purple font-medium">{testimonial.result}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 가격 및 등록 섹션 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            명확한 가격 정보
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 무료 체험 */}
            <Card className="border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  추천
                </div>
                <CardTitle className="text-2xl">{t.pricing.free.title}</CardTitle>
                <div className="text-3xl font-bold text-green-600">{t.pricing.free.price}</div>
                <div className="text-gray-600">{t.pricing.free.duration}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {t.pricing.free.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => onNavigate('auth')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  무료 체험 시작
                </Button>
              </CardContent>
            </Card>

            {/* 기본 과정 */}
            <Card className="border-2 border-iwl-purple/30 hover:border-iwl-purple transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{t.pricing.basic.title}</CardTitle>
                <div className="text-3xl font-bold text-iwl-purple">{t.pricing.basic.price}</div>
                <div className="text-gray-600">{t.pricing.basic.duration}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {t.pricing.basic.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-iwl-purple mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => onNavigate('course-jeju')}
                  className="w-full bg-iwl-gradient hover:opacity-90 text-white"
                >
                  과정 시작하기
                </Button>
              </CardContent>
            </Card>

            {/* 프리미엄 */}
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  인기
                </div>
                <CardTitle className="text-2xl">{t.pricing.premium.title}</CardTitle>
                <div className="text-3xl font-bold text-blue-600">{t.pricing.premium.price}</div>
                <div className="text-gray-600">{t.pricing.premium.duration}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {t.pricing.premium.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => onNavigate('course-jeju')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  프리미엄 시작
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 특별 혜택 */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl mb-2">🎁</div>
              <div className="text-sm font-medium text-orange-700">{t.offers.earlybird}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">💯</div>
              <div className="text-sm font-medium text-green-700">{t.offers.guarantee}</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">📚</div>
              <div className="text-sm font-medium text-blue-700">{t.offers.materials}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm font-medium text-purple-700">{t.offers.certificate}</div>
            </div>
          </div>

          {/* 최종 CTA */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleNavigateAuth}
                size="lg"
                className="bg-iwl-gradient hover:opacity-90 text-white font-semibold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all"
              >
                <Rocket className="w-5 h-5 mr-2" />
                {t.cta.start}
              </Button>
              <Button 
                onClick={handleNavigateHelp}
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-lg px-8 py-4 transition-all"
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                {t.cta.contact}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 👤 일반 회원 히어로 섹션 (v118: 성능 최적화)
const MemberHeroSection = React.memo(({ 
  language, 
  onNavigate, 
  userData 
}: { 
  language: 'ko' | 'en', 
  onNavigate: (page: string) => void,
  userData?: any
}) => {
  // v118: 메모이제이션으로 SSR 안전성 및 성능 개선
  const safeUserData = useMemo(() => ({
    name: userData?.name || '회원',
    membershipLevel: userData?.membershipLevel || 'free',
    enrollmentDate: userData?.enrollmentDate || new Date().toISOString().split('T')[0],
    currentCourse: userData?.currentCourse || '제주도 여행 기획 코스',
    progress: userData?.progress || 0,
    completedPhases: userData?.completedPhases || 0,
    totalPhases: userData?.totalPhases || 8,
    streak: userData?.streak || 0
  }), [userData]);
  // v118: 멤버십 배지 색상 메모이제이션
  const membershipBadgeColors = useMemo(() => ({
    free: 'bg-gray-100 text-gray-700',
    basic: 'bg-blue-100 text-blue-700', 
    premium: 'bg-purple-100 text-purple-700',
    vip: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
  }), []);
  
  // v118: 콜백 메모이제이션
  const handleCourseTrial = useCallback(() => onNavigate('course-trial'), [onNavigate]);
  const handleCourseDashboard = useCallback(() => onNavigate('course-dashboard'), [onNavigate]);
  const handleCourseJeju = useCallback(() => onNavigate('course-jeju'), [onNavigate]);
  const handleJournal = useCallback(() => onNavigate('journal'), [onNavigate]);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 개인화된 환영 메시지 */}
          <div>
            <div className="inline-flex items-center gap-2 bg-iwl-gradient rounded-full px-4 py-2 text-white mb-6">
              <Brain className="w-4 h-4" />
              <span className="text-sm font-medium">환영합니다, {safeUserData.name}님!</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block">학습을 이어서</span>
              <span className="text-iwl-gradient">계속해보세요</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              현재 진행 중인 코스를 계속하거나 새로운 AI 실습을 시작해보세요
            </p>

            {/* 멤버십 정보 */}
            <div className="flex items-center gap-3 mb-8">
              <Badge className={membershipBadgeColors[safeUserData.membershipLevel as keyof typeof membershipBadgeColors]}>
                {safeUserData.membershipLevel.toUpperCase()} 멤버
              </Badge>
              <div className="text-sm text-gray-600">
                가입일: {safeUserData.enrollmentDate}
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              {/* 체험강의 버튼 - 무료 멤버십에게 우선 표시 */}
              {safeUserData.membershipLevel === 'free' && (
                <Button 
                  onClick={() => onNavigate('course-trial')}
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white font-semibold text-lg px-8 py-4 border-2 border-transparent hover:scale-105 transition-all"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  무료 체험강의 시작하기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
              
              <Button 
                onClick={() => onNavigate('course-dashboard')}
                size="lg" 
                className="bg-iwl-gradient hover:opacity-90 text-white font-semibold text-lg px-8 py-4"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                학습 이어가기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
            </div>

            {/* 빠른 액세스 버튼들 */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => onNavigate('journal')}
                variant="outline" 
                className="flex items-center gap-2 justify-start"
              >
                <FileText className="w-4 h-4" />
                내 저널
              </Button>
              <Button 
                onClick={() => onNavigate('courses')}
                variant="outline"
                className="flex items-center gap-2 justify-start"
              >
                <BookOpen className="w-4 h-4" />
                강의 보기
              </Button>
            </div>
          </div>

          {/* 학습 진도 대시보드 */}
          <div className="space-y-6">
            {/* 무료 체험 안내 카드 (무료 멤버십) */}
            {userData?.membershipLevel === 'free' && (
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all cursor-pointer" onClick={() => onNavigate('course-trial')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-green-500" />
                    🎁 무료 체험강의 준비됨!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    AI 협업의 매력을 30분 체험으로 경험해보세요
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-green-600">30분</div>
                      <div className="text-xs text-gray-600">완전 무료</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-green-600">4단계</div>
                      <div className="text-xs text-gray-600">체험 과정</div>
                    </div>
                  </div>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    지금 체험하기 →
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* 현재 코스 진행률 */}
            <Card className="border-2 border-iwl-purple/20 bg-gradient-to-br from-white to-iwl-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-iwl-purple" />
                  현재 학습 현황
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">현재 코스</span>
                    <Badge className="bg-iwl-gradient text-white">진행 중</Badge>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {safeUserData.currentCourse}
                  </div>
                  <Progress value={safeUserData.progress} className="h-3 mb-2" />
                  <div className="text-sm text-gray-500">
                    {safeUserData.progress}% 완료 • {safeUserData.completedPhases}/{safeUserData.totalPhases} 페이즈
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-iwl-purple/20">
                    <div className="text-2xl font-bold text-iwl-purple mb-1">
                      {safeUserData.streak}일
                    </div>
                    <div className="text-sm text-gray-600">연속 학습</div>
                    <div className="text-lg mt-1">🔥</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-iwl-blue/20">
                    <div className="text-2xl font-bold text-iwl-blue mb-1">
                      {safeUserData.completedPhases}개
                    </div>
                    <div className="text-sm text-gray-600">완료 페이즈</div>
                    <div className="text-lg mt-1">🎯</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 최근 활동 */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  최근 활동
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Phase 2 완료</div>
                      <div className="text-sm text-gray-600">2시간 전 • 제주도 상세 분석</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">AI와 대화 완료</div>
                      <div className="text-sm text-gray-600">어제 • 창의적 아이디어 발굴</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <Star className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">새 배지 획득</div>
                      <div className="text-sm text-gray-600">3일 전 • 꾸준한 실행자</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 추천 활동 */}
            <Card className="border-2 border-dashed border-iwl-purple/30 bg-gradient-to-br from-iwl-purple-50 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-iwl-purple" />
                  오늘의 추천
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-iwl-purple/20 hover:border-iwl-purple/40 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-iwl-gradient rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">3주차 Phase 3 시작</div>
                      <div className="text-sm text-gray-600">예상 소요 시간: 30분</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-iwl-purple/40 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">AI 실습 계속하기</div>
                      <div className="text-sm text-gray-600">지난 대화 이어서 진행</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}