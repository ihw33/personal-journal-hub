// v116: 베타 런치 전용 랜딩 페이지
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Rocket, 
  Users, 
  Star, 
  Gift, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Clock,
  Mail,
  User,
  Target,
  Zap,
  Award,
  MessageSquare,
  Lightbulb,
  Globe,
  Shield,
  Heart,
  BookOpen,
  Brain,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';

interface BetaLaunchPageProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

export function BetaLaunchPage({ language, onNavigate }: BetaLaunchPageProps) {
  const { user, signUp, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [betaStats, setBetaStats] = useState({
    registered: 0,
    active: 0,
    satisfaction: 0
  });

  const content = {
    ko: {
      heroTitle: "AI와 함께하는 새로운 학습의 시작",
      heroSubtitle: "제주도 여행 기획을 통해 AI 협업을 배우는 혁신적인 학습 플랫폼",
      betaLabel: "공개 베타",
      joinBeta: "베타 테스트 참여하기",
      alreadyMember: "이미 회원이신가요?",
      signInLink: "로그인하기",
      limitedSpots: "선착순 100명 한정",
      freeAccess: "무료 체험",
      features: {
        title: "🚀 베타 테스터만의 특별 혜택",
        items: [
          {
            icon: Gift,
            title: "얼리버드 혜택",
            description: "정식 출시 시 프리미엄 6개월 무료"
          },
          {
            icon: Users,
            title: "베타 커뮤니티",
            description: "베타 테스터 전용 커뮤니티 참여"
          },
          {
            icon: MessageSquare,
            title: "직접 소통",
            description: "개발팀과 직접 피드백 교환"
          },
          {
            icon: Award,
            title: "베타 테스터 인증",
            description: "베타 테스터 전용 배지 및 인증서"
          }
        ]
      },
      howItWorks: {
        title: "🎯 베타 테스트 과정",
        steps: [
          {
            step: "1",
            title: "베타 신청",
            description: "이메일과 간단한 정보로 베타 테스트 신청"
          },
          {
            step: "2", 
            title: "초대 승인",
            description: "24시간 내 베타 테스트 초대 메일 발송"
          },
          {
            step: "3",
            title: "체험 시작",
            description: "AI와 함께하는 제주도 여행 기획 체험"
          },
          {
            step: "4",
            title: "피드백 제공",
            description: "사용 경험을 공유하고 서비스 개선에 참여"
          }
        ]
      },
      testimonials: [
        {
          name: "김민지",
          role: "UI/UX 디자이너",
          content: "AI와 대화하며 여행을 계획하니 정말 새로운 경험이었어요. 혼자서는 생각하지 못했던 아이디어들이 나와서 놀랐습니다!",
          rating: 5
        },
        {
          name: "박준호", 
          role: "대학생",
          content: "처음에는 AI가 어려울 것 같았는데, 단계별로 친절하게 안내해줘서 금방 익숙해졌어요. 실제로 제주도 여행도 가게 되었습니다!",
          rating: 5
        },
        {
          name: "이서연",
          role: "마케터",
          content: "업무에서도 AI 협업이 필요한데, 여행 계획을 통해 자연스럽게 AI 사용법을 배울 수 있어서 좋았어요.",
          rating: 5
        }
      ],
      formLabels: {
        name: "이름",
        email: "이메일",
        inviteCode: "초대 코드 (선택사항)",
        submit: "베타 테스트 신청하기",
        submitting: "신청 중..."
      },
      stats: {
        registered: "베타 등록자",
        active: "활성 사용자", 
        satisfaction: "만족도"
      }
    },
    en: {
      heroTitle: "Start Your New Learning Journey with AI",
      heroSubtitle: "Revolutionary learning platform where you learn AI collaboration through Jeju travel planning",
      betaLabel: "Public Beta",
      joinBeta: "Join Beta Test",
      alreadyMember: "Already a member?",
      signInLink: "Sign In",
      limitedSpots: "Limited to first 100 users",
      freeAccess: "Free Access"
    }
  };

  const t = content[language];

  // 베타 통계 업데이트 (시뮬레이션)
  useEffect(() => {
    const updateStats = () => {
      setBetaStats({
        registered: Math.floor(Math.random() * 30) + 45, // 45-75 사이
        active: Math.floor(Math.random() * 20) + 30, // 30-50 사이
        satisfaction: 4.6 + Math.random() * 0.3 // 4.6-4.9 사이
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 30000); // 30초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  // 베타 등록 처리
  const handleBetaSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast.error('이름과 이메일을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 베타 사용자로 회원가입
      const { error } = await signUp(email, 'temp-password-' + Date.now(), {
        name: name.trim(),
        beta_tester: true,
        invite_code: inviteCode.trim() || null,
        signup_source: 'beta_launch'
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('이미 등록된 이메일입니다. 로그인해주세요.');
        } else {
          throw error;
        }
        return;
      }

      // 베타 등록 성공
      toast.success('🎉 베타 테스트 신청이 완료되었습니다!');
      toast.info('이메일을 확인하여 계정을 활성화해주세요.');
      
      // 베타 대기 목록에 추가
      const betaWaitlist = JSON.parse(localStorage.getItem('beta-waitlist') || '[]');
      betaWaitlist.push({
        name: name.trim(),
        email: email.trim(),
        inviteCode: inviteCode.trim() || null,
        registeredAt: new Date().toISOString(),
        status: 'pending'
      });
      localStorage.setItem('beta-waitlist', JSON.stringify(betaWaitlist));

      // 폼 리셋
      setName('');
      setEmail('');
      setInviteCode('');

    } catch (error) {
      console.error('Beta signup error:', error);
      toast.error('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 이미 로그인된 사용자인 경우
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">베타 테스터로 환영합니다!</h2>
            <p className="text-gray-600 mb-6">
              이미 베타 테스트에 참여하고 계십니다. 지금 바로 AI와 함께하는 학습을 시작해보세요.
            </p>
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => onNavigate('trial')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              >
                <Rocket className="w-4 h-4 mr-2" />
                체험강의 시작하기
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('home')}
              >
                홈으로 이동
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="container mx-auto px-6 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Beta Badge */}
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg px-6 py-2">
              <Rocket className="w-4 h-4 mr-2" />
              {t.betaLabel} - {t.limitedSpots}
            </Badge>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{betaStats.registered}</div>
                <div className="text-sm text-gray-600">{t.stats?.registered}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{betaStats.active}</div>
                <div className="text-sm text-gray-600">{t.stats?.active}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{betaStats.satisfaction.toFixed(1)}★</div>
                <div className="text-sm text-gray-600">{t.stats?.satisfaction}</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 text-lg"
                onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Gift className="w-5 h-5 mr-2" />
                {t.joinBeta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <div className="text-sm text-gray-600">
                {t.alreadyMember}{' '}
                <button 
                  onClick={() => onNavigate('auth')}
                  className="text-purple-600 hover:underline font-medium"
                >
                  {t.signInLink}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t.features?.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features?.items.map((feature, index) => (
              <Card key={index} className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t.howItWorks?.title}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {t.howItWorks?.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {step.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            베타 테스터들의 후기
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-purple-100">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-4 italic">
                  "{t.testimonials?.[currentTestimonial]?.content}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {t.testimonials?.[currentTestimonial]?.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t.testimonials?.[currentTestimonial]?.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center gap-2 mt-6">
              {t.testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial 
                      ? 'bg-purple-600' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup-form" className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-gray-900 mb-2">
                  🚀 베타 테스트 신청
                </CardTitle>
                <p className="text-gray-600">
                  지금 신청하고 AI 학습의 새로운 경험을 시작하세요
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBetaSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.formLabels?.name}
                    </label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="홍길동"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.formLabels?.email}
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.formLabels?.inviteCode}
                    </label>
                    <Input
                      type="text"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      placeholder="BETA2024"
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {t.formLabels?.submitting}
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4 mr-2" />
                        {t.formLabels?.submit}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}