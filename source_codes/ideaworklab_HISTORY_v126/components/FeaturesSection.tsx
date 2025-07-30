import React from 'react';
import { 
  Brain, 
  MessageCircle, 
  BookOpen, 
  Target, 
  Zap, 
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';

interface FeaturesSectionProps {
  language: 'ko' | 'en';
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ language }) => {
  const content = {
    ko: {
      badge: '핵심 기능',
      title: 'AI와 함께하는 혁신적인 학습 경험',
      subtitle: 'Idea Work Lab의 다양한 기능들로 효과적인 AI 협업 학습을 시작하세요',
      features: [
        {
          icon: Brain,
          title: '창의적 사고 개발',
          description: 'AI 파트너와 함께 브레인스토밍하고 새로운 아이디어를 발견하세요. 다양한 관점에서 문제를 바라보는 능력을 키울 수 있습니다.',
          color: 'purple'
        },
        {
          icon: MessageCircle,
          title: '실시간 AI 대화',
          description: '24/7 언제든지 AI 멘토와 대화할 수 있습니다. 질문하고, 토론하고, 피드백을 받으며 지속적으로 성장하세요.',
          color: 'blue'
        },
        {
          icon: BookOpen,
          title: '체계적인 커리큘럼',
          description: '단계별로 설계된 학습 프로그램으로 기초부터 고급까지 체계적으로 학습할 수 있습니다.',
          color: 'purple'
        },
        {
          icon: Target,
          title: '개인화된 학습',
          description: '당신의 학습 스타일과 목표에 맞춰 개인화된 AI 튜터가 최적의 학습 경로를 제시합니다.',
          color: 'blue'
        },
        {
          icon: TrendingUp,
          title: '진도 추적',
          description: '실시간으로 학습 진도를 확인하고 성취도를 측정하여 목표 달성을 위한 동기를 유지하세요.',
          color: 'purple'
        },
        {
          icon: Users,
          title: '커뮤니티 학습',
          description: '같은 목표를 가진 학습자들과 함께 협력하고 서로의 경험을 공유하며 함께 성장하세요.',
          color: 'blue'
        }
      ],
      highlights: [
        {
          icon: Zap,
          title: '즉시 시작',
          description: '복잡한 설정 없이 바로 AI와 학습을 시작할 수 있습니다'
        },
        {
          icon: Shield,
          title: '안전한 환경',
          description: '개인정보 보호와 안전한 학습 환경을 보장합니다'
        }
      ]
    },
    en: {
      badge: 'Key Features',
      title: 'Revolutionary Learning Experience with AI',
      subtitle: 'Start effective AI collaborative learning with Idea Work Lab\'s diverse features',
      features: [
        {
          icon: Brain,
          title: 'Creative Thinking Development',
          description: 'Brainstorm with your AI partner and discover new ideas. Develop the ability to view problems from various perspectives.',
          color: 'purple'
        },
        {
          icon: MessageCircle,
          title: 'Real-time AI Conversations',
          description: 'Chat with AI mentors 24/7 anytime. Ask questions, discuss, receive feedback, and grow continuously.',
          color: 'blue'
        },
        {
          icon: BookOpen,
          title: 'Systematic Curriculum',
          description: 'Learn systematically from basic to advanced levels with step-by-step designed learning programs.',
          color: 'purple'
        },
        {
          icon: Target,
          title: 'Personalized Learning',
          description: 'A personalized AI tutor tailored to your learning style and goals provides optimal learning paths.',
          color: 'blue'
        },
        {
          icon: TrendingUp,
          title: 'Progress Tracking',
          description: 'Monitor your learning progress in real-time and measure achievements to maintain motivation for goal attainment.',
          color: 'purple'
        },
        {
          icon: Users,
          title: 'Community Learning',
          description: 'Collaborate with learners who share the same goals, share experiences, and grow together.',
          color: 'blue'
        }
      ],
      highlights: [
        {
          icon: Zap,
          title: 'Instant Start',
          description: 'Start learning with AI immediately without complex setup'
        },
        {
          icon: Shield,
          title: 'Safe Environment',
          description: 'Guaranteed privacy protection and safe learning environment'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-iwl-purple-100 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-iwl-purple" />
            <span className="text-sm font-medium text-iwl-purple">{t.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {t.features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-iwl-purple-200 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                feature.color === 'purple' 
                  ? 'bg-iwl-purple-100 group-hover:bg-iwl-purple-200' 
                  : 'bg-iwl-blue-100 group-hover:bg-iwl-blue-200'
              } transition-colors duration-300`}>
                <feature.icon className={`w-6 h-6 ${
                  feature.color === 'purple' ? 'text-iwl-purple' : 'text-iwl-blue'
                }`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Highlights Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {t.highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 rounded-xl border border-iwl-purple-100"
            >
              <div className="w-12 h-12 bg-iwl-gradient rounded-full flex items-center justify-center flex-shrink-0">
                <highlight.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {highlight.title}
                </h4>
                <p className="text-gray-600">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

