'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Target, Users, Lightbulb, Star, Mail } from 'lucide-react';

export default function AboutPage() {
  const language = 'ko';
  const content = {
    ko: {
      title: 'Idea Work Lab 소개',
      subtitle: 'AI와 함께하는 깊이 있는 사고의 여정',
      mission: '미션',
      vision: '비전',
      values: '가치관',
      story: '우리의 이야기',
      contact: '연락하기',
      missionText: 'AI 기술을 활용하여 개인의 창의적 사고력을 향상시키고, 깊이 있는 인사이트를 발견할 수 있도록 돕는 것입니다.',
      visionText: '모든 사람이 AI와 협력하여 자신만의 독창적인 아이디어를 발전시키고, 의미 있는 변화를 만들어낼 수 있는 세상을 만들어갑니다.',
      valuesItems: [
        {
          title: '깊이 있는 사고',
          description: '표면적인 정보 소비를 넘어서 깊이 있는 사고와 성찰을 추구합니다.',
          icon: Brain
        },
        {
          title: '창의적 협력',
          description: 'AI와 인간의 협력을 통해 새로운 가능성을 발견하고 창의적 해결책을 찾습니다.',
          icon: Lightbulb
        },
        {
          title: '개인화된 성장',
          description: '각 개인의 고유한 사고 패턴과 학습 스타일을 존중하며 맞춤형 성장을 지원합니다.',
          icon: Target
        },
        {
          title: '공유와 연결',
          description: '아이디어와 인사이트를 공유하며 서로에게서 배우는 커뮤니티를 구축합니다.',
          icon: Users
        }
      ],
      storyText: `Idea Work Lab은 AI 시대에 필요한 새로운 형태의 사고 교육을 제공하기 위해 시작되었습니다.

디지털 정보의 홍수 속에서 우리는 종종 깊이 있는 사고를 잃어버리곤 합니다. 빠른 정보 소비에 익숙해진 우리는 복잡한 문제를 단순화하거나, 표면적인 해답에 만족하는 경우가 많습니다.

하지만 AI 기술의 발전은 역설적으로 우리에게 새로운 기회를 제공합니다. AI가 정보 처리와 기계적 작업을 담당하게 되면서, 인간은 더 창의적이고 깊이 있는 사고에 집중할 수 있게 되었습니다.

Idea Work Lab은 이러한 변화에 주목하여, AI를 도구로 활용하면서도 인간의 고유한 창의성과 직관을 발전시키는 방법을 연구하고 있습니다. 우리의 프로그램은 단순히 AI 도구 사용법을 가르치는 것이 아니라, AI와 협력하여 더 나은 사고를 할 수 있는 능력을 기르는 것에 중점을 둡니다.

저희와 함께 AI 시대의 새로운 사고 방식을 탐구해보세요.`,
      features: [
        { title: '개인 맞춤형 학습', description: '각자의 학습 스타일과 목표에 맞춘 프로그램' },
        { title: 'AI 도구 활용', description: '최신 AI 기술을 활용한 창의적 사고 향상' },
        { title: '실습 중심 교육', description: '이론과 실습을 균형 있게 결합한 학습 경험' },
        { title: '커뮤니티 지원', description: '동료 학습자들과의 지속적인 교류와 성장' }
      ],
      stats: [
        { number: '500+', label: '만족한 학습자' },
        { number: '50+', label: '완료된 프로젝트' },
        { number: '98%', label: '만족도' },
        { number: '24/7', label: '지원' }
      ]
    },
    en: {
      title: 'About Idea Work Lab',
      subtitle: 'A journey of deep thinking with AI',
      mission: 'Mission',
      vision: 'Vision',
      values: 'Values',
      story: 'Our Story',
      contact: 'Contact Us',
      missionText: 'To help individuals enhance their creative thinking abilities and discover deep insights by utilizing AI technology.',
      visionText: 'We create a world where everyone can collaborate with AI to develop their own original ideas and create meaningful change.',
      valuesItems: [
        {
          title: 'Deep Thinking',
          description: 'We pursue deep thinking and reflection beyond superficial information consumption.',
          icon: Brain
        },
        {
          title: 'Creative Collaboration',
          description: 'We discover new possibilities and find creative solutions through AI-human collaboration.',
          icon: Lightbulb
        },
        {
          title: 'Personalized Growth',
          description: 'We respect each individuals unique thinking patterns and learning styles, supporting customized growth.',
          icon: Target
        },
        {
          title: 'Sharing & Connection',
          description: 'We build a community where ideas and insights are shared and we learn from each other.',
          icon: Users
        }
      ],
      storyText: `Idea Work Lab was founded to provide a new form of thinking education needed in the AI era.

In the flood of digital information, we often lose deep thinking. Accustomed to rapid information consumption, we often simplify complex problems or settle for superficial answers.

However, advances in AI technology paradoxically provide us with new opportunities. As AI takes over information processing and mechanical tasks, humans can focus more on creative and deep thinking.

Idea Work Lab focuses on this change, researching ways to develop uniquely human creativity and intuition while using AI as a tool. Our programs don't simply teach how to use AI tools, but focus on building the ability to think better in collaboration with AI.

Join us in exploring new ways of thinking in the AI era.`,
      features: [
        { title: 'Personalized Learning', description: 'Programs tailored to individual learning styles and goals' },
        { title: 'AI Tool Integration', description: 'Creative thinking enhancement using the latest AI technology' },
        { title: 'Practice-Centered Education', description: 'Learning experience that balances theory and practice' },
        { title: 'Community Support', description: 'Continuous interaction and growth with fellow learners' }
      ],
      stats: [
        { number: '500+', label: 'Satisfied Learners' },
        { number: '50+', label: 'Completed Projects' },
        { number: '98%', label: 'Satisfaction Rate' },
        { number: '24/7', label: 'Support' }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl text-iwl-gradient mb-4">{t.title}</h1>
            <p className="text-lg text-gray-600">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-0">
            <div className="text-center">
              <div className="w-16 h-16 bg-iwl-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-iwl-purple mb-4">{t.mission}</h3>
              <p className="text-gray-700 leading-relaxed">{t.missionText}</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 border-0">
            <div className="text-center">
              <div className="w-16 h-16 bg-iwl-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-iwl-blue mb-4">{t.vision}</h3>
              <p className="text-gray-700 leading-relaxed">{t.visionText}</p>
            </div>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-iwl-gradient text-center mb-8">{t.values}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.valuesItems.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-iwl-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-gray-800 mb-3">{value.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Story */}
        <Card className="p-8 mb-12">
          <h2 className="text-iwl-gradient mb-6">{t.story}</h2>
          <div className="prose prose-lg max-w-none">
            {t.storyText.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {t.features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-iwl-gradient rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-gray-800 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <Card className="p-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Contact CTA */}
        <Card className="p-8 text-center">
          <h3 className="text-iwl-gradient mb-4">
            {language === 'ko' ? '함께 시작해보세요' : 'Start Your Journey'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {language === 'ko' 
              ? 'AI와 함께하는 깊이 있는 사고의 여정에 참여하고 싶으시다면 언제든 연락주세요.'
              : 'If you want to join the journey of deep thinking with AI, please contact us anytime.'
            }
          </p>
          <Button className="bg-iwl-gradient hover:opacity-90 text-white px-8 py-3">
            <Mail className="w-5 h-5 mr-2" />
            {t.contact}
          </Button>
        </Card>
      </div>
    </div>
  );
}