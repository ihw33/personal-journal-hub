import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Brain, 
  MessageCircle, 
  Users, 
  Target, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Globe,
  Heart,
  Shield,
  Zap
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  language: 'ko' | 'en';
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, language }) => {
  const content = {
    ko: {
      hero: {
        badge: '소개',
        title: 'AI와 함께하는\n새로운 생각정리',
        subtitle: 'Idea Work Lab에서 AI 파트너와 함께 깊이 있는 사고를 경험하고, 창의적 문제해결 능력을 키워보세요.',
        cta: '지금 시작하기'
      },
      mission: {
        title: '우리의 미션',
        description: 'AI와 인간이 협력하여 더 깊이 있고 창의적인 사고를 할 수 있는 세상을 만들어갑니다.',
        values: [
          {
            icon: Brain,
            title: '깊이 있는 사고',
            description: 'AI와 함께 표면적 정보를 넘어 본질적 통찰을 얻습니다'
          },
          {
            icon: Users,
            title: '협력적 학습',
            description: '인간과 AI가 상호 보완하며 시너지를 창출합니다'
          },
          {
            icon: Globe,
            title: '접근 가능한 교육',
            description: '누구나 쉽게 AI 협업 학습을 시작할 수 있도록 합니다'
          }
        ]
      },
      vision: {
        title: '우리의 비전',
        description: 'Where AI Meets Deep Thinking',
        details: 'AI 기술이 단순한 도구가 아닌 진정한 사고의 파트너가 되어, 인간의 창의성과 논리적 사고력을 동시에 향상시키는 혁신적인 학습 경험을 제공합니다.'
      },
      features: {
        title: '핵심 기능',
        items: [
          {
            icon: MessageCircle,
            title: '실시간 AI 대화',
            description: '24/7 언제든지 AI 멘토와 대화하며 학습할 수 있습니다'
          },
          {
            icon: BookOpen,
            title: '체계적 커리큘럼',
            description: '단계별로 설계된 학습 프로그램으로 체계적인 성장을 지원합니다'
          },
          {
            icon: Target,
            title: '개인화된 학습',
            description: '개인의 학습 스타일과 목표에 맞춘 맞춤형 AI 튜터링을 제공합니다'
          },
          {
            icon: TrendingUp,
            title: '진도 추적',
            description: '실시간으로 학습 진도를 확인하고 성취도를 측정할 수 있습니다'
          }
        ]
      },
      stats: {
        title: '성과 지표',
        items: [
          { number: '1,000+', label: '학습자' },
          { number: '10,000+', label: 'AI 대화' },
          { number: '95%', label: '만족도' },
          { number: '24/7', label: '지원' }
        ]
      },
      cta: {
        title: '지금 바로 시작해보세요',
        description: 'AI와 함께하는 새로운 학습 경험을 체험해보세요',
        button: 'AI 학습 시작하기'
      }
    },
    en: {
      hero: {
        badge: 'About Us',
        title: 'Think Deeper\nwith AI',
        subtitle: 'Experience profound thinking with your AI partner at Idea Work Lab and develop creative problem-solving skills.',
        cta: 'Get Started Now'
      },
      mission: {
        title: 'Our Mission',
        description: 'Creating a world where AI and humans collaborate to achieve deeper and more creative thinking.',
        values: [
          {
            icon: Brain,
            title: 'Deep Thinking',
            description: 'Gaining essential insights beyond surface information with AI'
          },
          {
            icon: Users,
            title: 'Collaborative Learning',
            description: 'Humans and AI complement each other to create synergy'
          },
          {
            icon: Globe,
            title: 'Accessible Education',
            description: 'Making AI collaborative learning easy for everyone to start'
          }
        ]
      },
      vision: {
        title: 'Our Vision',
        description: 'Where AI Meets Deep Thinking',
        details: 'Providing innovative learning experiences where AI technology becomes a true thinking partner, not just a tool, enhancing both human creativity and logical thinking abilities.'
      },
      features: {
        title: 'Key Features',
        items: [
          {
            icon: MessageCircle,
            title: 'Real-time AI Conversations',
            description: 'Chat with AI mentors 24/7 anytime for continuous learning'
          },
          {
            icon: BookOpen,
            title: 'Systematic Curriculum',
            description: 'Step-by-step designed learning programs for systematic growth'
          },
          {
            icon: Target,
            title: 'Personalized Learning',
            description: 'Customized AI tutoring tailored to individual learning styles and goals'
          },
          {
            icon: TrendingUp,
            title: 'Progress Tracking',
            description: 'Monitor learning progress and measure achievements in real-time'
          }
        ]
      },
      stats: {
        title: 'Performance Metrics',
        items: [
          { number: '1,000+', label: 'Learners' },
          { number: '10,000+', label: 'AI Conversations' },
          { number: '95%', label: 'Satisfaction' },
          { number: '24/7', label: 'Support' }
        ]
      },
      cta: {
        title: 'Start Your Journey Today',
        description: 'Experience the new learning journey with AI',
        button: 'Start AI Learning'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-iwl-purple-100 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-iwl-purple" />
              <span className="text-sm font-medium text-iwl-purple">{t.hero.badge}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.hero.title.split('\n').map((line, index) => (
                <div key={index} className={index === 1 ? 'text-iwl-gradient' : ''}>
                  {line}
                </div>
              ))}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>
            
            <Button
              onClick={() => onNavigate('signup')}
              className="bg-iwl-gradient hover:opacity-90 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.mission.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.mission.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.mission.values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-gray-100">
                <CardHeader>
                  <div className="w-16 h-16 bg-iwl-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.vision.title}
            </h2>
            <div className="text-2xl text-iwl-gradient font-medium mb-8">
              {t.vision.description}
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t.vision.details}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.features.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.items.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-gray-100">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-iwl-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-iwl-purple" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.stats.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.items.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-iwl-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-iwl-purple-600 to-iwl-blue-600">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t.cta.description}
            </p>
            <Button
              onClick={() => onNavigate('signup')}
              className="bg-white text-iwl-purple hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t.cta.button}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

