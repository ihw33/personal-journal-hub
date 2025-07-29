import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles, Brain, MessageCircle, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
  language: 'ko' | 'en';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, language }) => {
  const content = {
    ko: {
      badge: '🚀 AI 협업 학습 플랫폼',
      title: 'AI와 함께하는\n새로운 생각정리',
      subtitle: 'Idea Work Lab에서 AI 파트너와 함께 깊이 있는 사고를 경험하고,\n체계적인 학습을 통해 창의적 문제해결 능력을 키워보세요.',
      cta: {
        primary: 'AI 학습 시작하기',
        secondary: '더 알아보기'
      },
      features: [
        {
          icon: Brain,
          title: '창의적 사고',
          description: 'AI와 함께 새로운 관점 발견'
        },
        {
          icon: MessageCircle,
          title: '실시간 협업',
          description: '24/7 AI 멘토와 대화'
        },
        {
          icon: BookOpen,
          title: '체계적 학습',
          description: '단계별 맞춤 커리큘럼'
        }
      ],
      stats: {
        users: '1,000+',
        usersLabel: '학습자',
        sessions: '10,000+',
        sessionsLabel: 'AI 대화',
        satisfaction: '95%',
        satisfactionLabel: '만족도'
      }
    },
    en: {
      badge: '🚀 AI Collaboration Learning Platform',
      title: 'Think Deeper\nwith AI',
      subtitle: 'Experience profound thinking with your AI partner at Idea Work Lab.\nDevelop creative problem-solving skills through systematic learning.',
      cta: {
        primary: 'Start AI Learning',
        secondary: 'Learn More'
      },
      features: [
        {
          icon: Brain,
          title: 'Creative Thinking',
          description: 'Discover new perspectives with AI'
        },
        {
          icon: MessageCircle,
          title: 'Real-time Collaboration',
          description: '24/7 AI mentor conversations'
        },
        {
          icon: BookOpen,
          title: 'Systematic Learning',
          description: 'Personalized step-by-step curriculum'
        }
      ],
      stats: {
        users: '1,000+',
        usersLabel: 'Learners',
        sessions: '10,000+',
        sessionsLabel: 'AI Conversations',
        satisfaction: '95%',
        satisfactionLabel: 'Satisfaction'
      }
    }
  };

  const t = content[language];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-iwl-purple-100 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-iwl-blue-100 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-iwl-gradient rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-iwl-purple-200 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-iwl-purple" />
              <span className="text-sm font-medium text-iwl-purple">{t.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.title.split('\n').map((line, index) => (
                <div key={index} className={index === 1 ? 'text-iwl-gradient' : ''}>
                  {line}
                </div>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              {t.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                onClick={() => onNavigate('signup')}
                className="bg-iwl-gradient hover:opacity-90 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t.cta.primary}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('about')}
                className="border-2 border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white px-8 py-4 text-lg rounded-xl transition-all duration-300"
              >
                {t.cta.secondary}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-iwl-gradient mb-1">
                  {t.stats.users}
                </div>
                <div className="text-sm text-gray-600">{t.stats.usersLabel}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-iwl-gradient mb-1">
                  {t.stats.sessions}
                </div>
                <div className="text-sm text-gray-600">{t.stats.sessionsLabel}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-iwl-gradient mb-1">
                  {t.stats.satisfaction}
                </div>
                <div className="text-sm text-gray-600">{t.stats.satisfactionLabel}</div>
              </div>
            </div>
          </div>

          {/* Right Content - Features Grid */}
          <div className="relative">
            <div className="grid gap-6">
              {t.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  style={{ 
                    transform: `translateY(${index * 20}px)`,
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-iwl-gradient rounded-xl shadow-md">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating AI Assistant Preview */}
            <div className="absolute -top-10 -right-10 hidden xl:block">
              <div className="bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-iwl-gradient rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">AI 멘토</div>
                    <div className="text-xs text-green-500 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      온라인
                    </div>
                  </div>
                </div>
                <div className="bg-iwl-purple-50 rounded-lg p-3 text-sm text-gray-700">
                  안녕하세요! 오늘은 어떤 주제로 함께 생각해볼까요? 🤖✨
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

