import React from 'react';
import { ArrowRight, MessageCircle, Brain, Target, CheckCircle } from 'lucide-react';

interface ProcessSectionProps {
  language: 'ko' | 'en';
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ language }) => {
  const content = {
    ko: {
      badge: '학습 프로세스',
      title: 'AI와 함께하는 3단계 학습법',
      subtitle: '체계적이고 효과적인 AI 협업 학습을 위한 단계별 프로세스',
      steps: [
        {
          number: '01',
          icon: MessageCircle,
          title: '자유 대화',
          subtitle: 'AI와 친해지기',
          description: 'AI 파트너와 자연스러운 대화를 통해 편안한 관계를 형성하고, 기본적인 AI 협업 방식을 익힙니다.',
          features: [
            '자연어 대화 연습',
            'AI 성향 파악',
            '기초 협업 스킬'
          ]
        },
        {
          number: '02',
          icon: Brain,
          title: '구조적 사고',
          subtitle: '체계적 분석',
          description: 'AI와 함께 문제를 체계적으로 분석하고 구조화하는 방법을 학습하여 논리적 사고력을 발전시킵니다.',
          features: [
            '문제 분해 기법',
            '논리적 구조화',
            '체계적 접근법'
          ]
        },
        {
          number: '03',
          icon: Target,
          title: '창의적 솔루션',
          subtitle: '혁신적 해결',
          description: 'AI의 창의적 능력과 인간의 직관을 결합하여 혁신적이고 실용적인 해결책을 도출합니다.',
          features: [
            '아이디어 융합',
            '창의적 발상',
            '실행 가능한 솔루션'
          ]
        }
      ],
      cta: {
        title: '지금 바로 AI 학습을 시작해보세요',
        description: '체계적인 프로세스로 AI와의 협업 능력을 키우고 새로운 가능성을 발견하세요',
        button: 'AI 학습 시작하기'
      }
    },
    en: {
      badge: 'Learning Process',
      title: '3-Step Learning Method with AI',
      subtitle: 'Step-by-step process for systematic and effective AI collaborative learning',
      steps: [
        {
          number: '01',
          icon: MessageCircle,
          title: 'Free Conversation',
          subtitle: 'Getting to know AI',
          description: 'Build a comfortable relationship through natural conversations with your AI partner and learn basic AI collaboration methods.',
          features: [
            'Natural language practice',
            'Understanding AI personality',
            'Basic collaboration skills'
          ]
        },
        {
          number: '02',
          icon: Brain,
          title: 'Structured Thinking',
          subtitle: 'Systematic Analysis',
          description: 'Learn to systematically analyze and structure problems with AI to develop logical thinking skills.',
          features: [
            'Problem decomposition techniques',
            'Logical structuring',
            'Systematic approaches'
          ]
        },
        {
          number: '03',
          icon: Target,
          title: 'Creative Solutions',
          subtitle: 'Innovative Resolution',
          description: 'Combine AI\'s creative capabilities with human intuition to derive innovative and practical solutions.',
          features: [
            'Idea fusion',
            'Creative thinking',
            'Executable solutions'
          ]
        }
      ],
      cta: {
        title: 'Start AI Learning Right Now',
        description: 'Develop AI collaboration skills through systematic processes and discover new possibilities',
        button: 'Start AI Learning'
      }
    }
  };

  const t = content[language];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-iwl-blue-100 rounded-full px-4 py-2 mb-6">
            <Brain className="w-4 h-4 text-iwl-blue" />
            <span className="text-sm font-medium text-iwl-blue">{t.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-32 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="flex justify-between items-center">
              <div className="w-1/3 h-0.5 bg-iwl-gradient"></div>
              <div className="w-1/3 h-0.5 bg-iwl-gradient"></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {t.steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8">
                    <div className="w-12 h-12 bg-iwl-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 mt-4">
                    <div className="w-16 h-16 bg-iwl-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-iwl-purple-200 transition-colors duration-300">
                      <step.icon className="w-8 h-8 text-iwl-purple" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <div className="text-iwl-gradient font-medium mb-4">
                      {step.subtitle}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-iwl-purple flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow for desktop */}
                  {index < t.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-iwl-gradient" />
                    </div>
                  )}
                </div>

                {/* Arrow for mobile */}
                {index < t.steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-8">
                    <div className="w-8 h-8 bg-iwl-gradient rounded-full flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-white transform rotate-90" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 rounded-2xl p-8 md:p-12 border border-iwl-purple-100">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.cta.title}
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>
            <button className="bg-iwl-gradient hover:opacity-90 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2">
              {t.cta.button}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

