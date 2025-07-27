import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight, Brain, Lightbulb, Target, Sparkles, Zap, BookOpen } from 'lucide-react';

interface ProcessSectionProps {
  language: 'ko' | 'en';
  onNavigate?: (page: 'courses' | 'journal') => void;
}

export function ProcessSection({ language, onNavigate }: ProcessSectionProps) {
  const content = {
    ko: {
      badge: '체계적인 학습 과정',
      title: 'AI와 함께하는 사고의 진화',
      subtitle: '3단계로 완성하는 깊이 있는 사고력',
      description: '단계별 가이드와 AI 도구로 당신의 사고 능력을 체계적으로 향상시키세요.',
      cta: '여정 시작하기',
      learnMore: '자세히 알아보기',
      processes: [
        {
          step: 1,
          title: 'AI와 함께 시작하기',
          subtitle: 'AI 도구와 친해지기',
          description: 'AI 도구들과 친숙해지고, 기본적인 협력 방법을 익혀 생각정리의 기초를 다집니다.',
          features: ['AI 도구 소개', 'AI와의 첫 대화', '기본 명령어 익히기', '안전한 협력 방법'],
          icon: Brain,
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-600'
        },
        {
          step: 2,
          title: '함께 생각해보기',
          subtitle: 'AI와 함께 깊이 생각하기',
          description: 'AI와의 대화를 통해 더 깊이 있는 사고를 하고, 새로운 관점과 아이디어를 발견합니다.',
          features: ['질문 기법 습득', '토론과 대화', '다각도 분석', '통찰력 발견'],
          icon: Lightbulb,
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-600'
        },
        {
          step: 3,
          title: '멋진 결과 만들기',
          subtitle: '혼자서는 못 만드는 결과',
          description: 'AI와의 협력을 통해 혼자서는 불가능했던 수준의 결과물과 성과를 창출해냅니다.',
          features: ['고품질 결과물', '창의적 솔루션', '효율적 실행', '지속적 개선'],
          icon: Target,
          color: 'from-teal-500 to-teal-600',
          bgColor: 'bg-teal-50',
          textColor: 'text-teal-600'
        }
      ],
      stats: [
        { number: '500+', label: '성공한 학습자', icon: '👥' },
        { number: '98%', label: '만족도', icon: '⭐' },
        { number: '3주', label: '평균 성과 도출', icon: '🚀' },
        { number: '24/7', label: 'AI 지원', icon: '🤖' }
      ]
    },
    en: {
      badge: 'Systematic Learning Process',
      title: 'Evolution of Thinking with AI',
      subtitle: 'Complete deep thinking in 3 steps',
      description: 'Systematically improve your thinking abilities with step-by-step guides and AI tools.',
      cta: 'Start Journey',
      learnMore: 'Learn More',
      processes: [
        {
          step: 1,
          title: 'Start with AI',
          subtitle: 'Getting familiar with AI tools',
          description: 'Get familiar with AI tools and learn basic collaboration methods to build the foundation for organizing thoughts.',
          features: ['AI tool introduction', 'First conversation with AI', 'Learn basic commands', 'Safe collaboration methods'],
          icon: Brain,
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-600'
        },
        {
          step: 2,
          title: 'Think Together',
          subtitle: 'Deep thinking with AI',
          description: 'Through conversations with AI, think more deeply and discover new perspectives and ideas.',
          features: ['Master questioning techniques', 'Discussion and dialogue', 'Multi-angle analysis', 'Insight discovery'],
          icon: Lightbulb,
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-600'
        },
        {
          step: 3,
          title: 'Create Amazing Results',
          subtitle: 'Results impossible to achieve alone',
          description: 'Through collaboration with AI, create results and achievements at a level that would be impossible alone.',
          features: ['High-quality outputs', 'Creative solutions', 'Efficient execution', 'Continuous improvement'],
          icon: Target,
          color: 'from-teal-500 to-teal-600',
          bgColor: 'bg-teal-50',
          textColor: 'text-teal-600'
        }
      ],
      stats: [
        { number: '500+', label: 'Successful Learners', icon: '👥' },
        { number: '98%', label: 'Satisfaction Rate', icon: '⭐' },
        { number: '3 weeks', label: 'Average Results', icon: '🚀' },
        { number: '24/7', label: 'AI Support', icon: '🤖' }
      ]
    }
  };

  const t = content[language];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-iwl-gradient text-white border-0 px-4 py-2 mb-6">
            {t.badge}
          </Badge>
          <h2 className="text-4xl lg:text-5xl text-iwl-gradient mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-4xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {t.processes.map((process, index) => {
            const Icon = process.icon;
            return (
              <div key={process.step} className="relative">
                {/* Connection Line */}
                {index < t.processes.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-12 h-0.5 bg-gradient-to-r from-iwl-purple to-iwl-blue transform -translate-x-6 z-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-iwl-blue" />
                    </div>
                  </div>
                )}

                <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${process.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <CardContent className="p-8">
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 ${process.bgColor} rounded-2xl flex items-center justify-center`}>
                        <Icon className={`w-8 h-8 ${process.textColor}`} />
                      </div>
                      <div className={`text-4xl font-bold ${process.textColor} opacity-20`}>
                        {String(process.step).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <Badge variant="secondary" className={`${process.bgColor} ${process.textColor} border-0`}>
                        Step {process.step}
                      </Badge>
                      
                      <h3 className="text-xl text-gray-900 group-hover:text-iwl-purple transition-colors duration-300">
                        {process.title}
                      </h3>
                      
                      <p className="text-sm text-gray-500 mb-3">
                        {process.subtitle}
                      </p>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {process.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2">
                        {process.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <div className={`w-1.5 h-1.5 rounded-full ${process.bgColor.replace('bg-', 'bg-')} mr-3`} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl text-iwl-purple mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/journal">
              <Button 
                size="lg" 
                className="bg-iwl-gradient hover:opacity-90 text-white px-8 py-4 w-full sm:w-auto"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {t.cta}
              </Button>
            </Link>
            <Link href="/courses">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-iwl-purple text-iwl-purple hover:bg-iwl-purple-50 px-8 py-4 w-full sm:w-auto"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                {t.learnMore}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}