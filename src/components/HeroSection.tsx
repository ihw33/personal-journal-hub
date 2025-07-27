"use client";

import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowRight, Brain, Zap, TrendingUp, Users, Star, MapPin, MessageCircle } from 'lucide-react';

interface HeroSectionProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

export function HeroSection({ language, onNavigate }: HeroSectionProps) {
  const content = {
    ko: {
      mainTitle: "AI와 함께하는 새로운 생각정리",
      subTitle: "현대인을 위한 AI 강화 사고법",
      description: "AI 기반 도구로 인지적 잠재력을 해제하고, 사고 과정을 증폭시키며, 창의성을 향상시키고, 아이디어를 실행 가능한 통찰력으로 변환하세요",
      startJournal: "저널 시작하기",
      exploreCourses: "제주도 과정 시작하기",
      aiPractice: "AI와 바로 실습하기",
      
      // Featured Course Badge
      featuredBadge: "🔥 인기 강의",
      featuredTitle: "제주도 여행 기획으로 배우는 AI 협업",
      featuredSubtitle: "8주 완성 · 실습 중심 · 342명 수료",
      
      // Stats
      stats: {
        creativity: {
          label: "창작력 향상",
          value: 87,
          suffix: "%"
        },
        insights: {
          label: "통찰 속도",
          value: 3.2,
          suffix: "x"
        },
        completion: {
          label: "과정 완주율",
          value: 94,
          suffix: "%"
        }
      },
      
      // Social Proof
      socialProof: {
        students: "500+ 수강생",
        rating: "4.9/5 만족도",
        completion: "89% 실행률"
      }
    },
    en: {
      mainTitle: "Think Deeper with AI",
      subTitle: "AI-Enhanced Thinking for Modern Minds",
      description: "Unlock your cognitive potential with AI-powered tools. Amplify your thinking process, enhance creativity, and transform ideas into actionable insights.",
      startJournal: "Start Journaling",
      exploreCourses: "Start Jeju Course",
      aiPractice: "Practice with AI Now",
      
      // Featured Course Badge
      featuredBadge: "🔥 Popular Course",
      featuredTitle: "Learn AI Collaboration through Jeju Travel Planning",
      featuredSubtitle: "8 weeks · Hands-on · 342 graduates",
      
      // Stats
      stats: {
        creativity: {
          label: "Creativity Boost",
          value: 87,
          suffix: "%"
        },
        insights: {
          label: "Faster Insights",
          value: 3.2,
          suffix: "x"
        },
        completion: {
          label: "Completion Rate",
          value: 94,
          suffix: "%"
        }
      },
      
      // Social Proof
      socialProof: {
        students: "500+ Students",
        rating: "4.9/5 Rating",
        completion: "89% Execution"
      }
    }
  };

  const t = content[language];

  const handleJejuCourse = () => {
    onNavigate('course-jeju');
  };

  const handleJournal = () => {
    onNavigate('journal');
  };

  const handleAIPractice = () => {
    // TODO: 추후 사용자가 진행 중인 강의로 바로 가기 기능으로 변경 예정
    // 현재는 일반 AI 실습 페이지로 연결 (기본값: 1주차 1페이즈)
    onNavigate('ai-practice');
  };

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-iwl-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-iwl-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Featured Course Badge */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-iwl-purple/20 mb-6">
              <Badge className="bg-iwl-purple text-white text-xs">
                {t.featuredBadge}
              </Badge>
              <MapPin className="w-4 h-4 text-iwl-purple" />
              <span className="text-sm font-medium text-gray-700">{t.featuredTitle}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block">{t.mainTitle.split(' ').slice(0, 2).join(' ')}</span>
              <span className="text-iwl-gradient">{t.mainTitle.split(' ').slice(2).join(' ')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-iwl-purple font-medium mb-4">
              {t.subTitle}
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleJejuCourse}
                  size="lg" 
                  className="bg-iwl-gradient hover:opacity-90 text-white font-semibold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  {t.exploreCourses}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  onClick={handleJournal}
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white font-semibold text-lg px-8 py-4 transition-all"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  {t.startJournal}
                </Button>
              </div>
              
              {/* AI Practice Button - 향후 사용자 진행 중인 강의로 변경 예정 */}
              <Button 
                onClick={handleAIPractice}
                size="lg" 
                className="bg-gradient-to-r from-iwl-blue to-iwl-purple hover:opacity-90 text-white font-semibold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t.aiPractice}
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-iwl-purple" />
                <span>{t.socialProof.students}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>{t.socialProof.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>{t.socialProof.completion}</span>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Dashboard */}
          <div className="relative">
            {/* Main Stats Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">AI 사고 강화 진행률</h3>
                <Badge className="bg-green-100 text-green-700">실시간</Badge>
              </div>

              <div className="space-y-6">
                {/* Creativity Stat */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-iwl-purple" />
                      <span className="font-medium text-gray-700">{t.stats.creativity.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-iwl-purple">
                      {t.stats.creativity.value}{t.stats.creativity.suffix}
                    </span>
                  </div>
                  <Progress value={t.stats.creativity.value} className="h-3" />
                </div>

                {/* Insights Stat */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-iwl-blue" />
                      <span className="font-medium text-gray-700">{t.stats.insights.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-iwl-blue">
                      {t.stats.insights.value}{t.stats.insights.suffix}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-iwl-blue h-3 rounded-full transition-all duration-1000"
                        style={{ width: '80%' }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">더 빠름</span>
                  </div>
                </div>

                {/* Completion Stat */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-gray-700">{t.stats.completion.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-green-500">
                      {t.stats.completion.value}{t.stats.completion.suffix}
                    </span>
                  </div>
                  <Progress value={t.stats.completion.value} className="h-3" />
                </div>
              </div>

              {/* Featured Course Preview */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-iwl-gradient rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.featuredTitle}</div>
                    <div className="text-xs text-gray-500">{t.featuredSubtitle}</div>
                  </div>
                </div>
                <Button 
                  onClick={handleJejuCourse}
                  className="w-full bg-iwl-purple hover:bg-iwl-purple/90 text-white"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  과정 둘러보기
                </Button>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-iwl-purple/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-iwl-blue/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}