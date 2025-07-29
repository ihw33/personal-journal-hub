import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Brain, 
  MessageCircle, 
  Target, 
  Lightbulb, 
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  BookOpen,
  Zap
} from 'lucide-react';

interface MethodologyPageProps {
  onNavigate: (page: string) => void;
  language: 'ko' | 'en';
}

const MethodologyPage: React.FC<MethodologyPageProps> = ({ onNavigate, language }) => {
  const content = {
    ko: {
      hero: {
        badge: 'AI 협업 방법론',
        title: 'AI와 함께하는\n체계적 사고법',
        subtitle: 'Idea Work Lab만의 검증된 AI 협업 방법론으로 깊이 있는 사고력을 체계적으로 발전시켜보세요.'
      },
      methodology: {
        title: '3단계 AI 협업 방법론',
        description: '단계별로 설계된 체계적 접근법으로 AI와의 효과적인 협업을 학습합니다.',
        phases: [
          {
            phase: 'Phase 1',
            title: '기초 사고법과 AI 협업 이해',
            description: 'AI와의 자연스러운 대화를 통해 기본적인 협업 방식을 익히고 사고의 기초를 다집니다.',
            duration: '2-3주',
            difficulty: '초급',
            skills: ['자연어 대화', 'AI 이해', '기초 질문법', '사고 정리'],
            objectives: [
              'AI와 편안한 대화 관계 형성',
              '명확한 질문 방법 학습',
              '기본적인 사고 구조화 연습',
              'AI 피드백 수용 및 활용'
            ]
          },
          {
            phase: 'Phase 2',
            title: '창의적 사고 개발 및 아이디어 발산',
            description: 'AI와 함께 브레인스토밍하며 창의적 아이디어를 발산하고 새로운 관점을 발견합니다.',
            duration: '3-4주',
            difficulty: '중급',
            skills: ['창의적 발상', '브레인스토밍', '연상 기법', '아이디어 확장'],
            objectives: [
              '다양한 관점에서 문제 바라보기',
              'AI와의 창의적 브레인스토밍',
              '아이디어 연결 및 확장 기법',
              '창의적 질문 개발'
            ]
          },
          {
            phase: 'Phase 3',
            title: '분석적 사고와 체계적 문제해결',
            description: '복잡한 문제를 AI와 함께 체계적으로 분석하고 실행 가능한 해결책을 도출합니다.',
            duration: '4-5주',
            difficulty: '고급',
            skills: ['논리적 분석', '체계적 접근', '문제 해결', '의사결정'],
            objectives: [
              '복잡한 문제의 구조화',
              '논리적 사고 과정 개발',
              '근거 기반 의사결정',
              '실행 계획 수립'
            ]
          }
        ]
      },
      principles: {
        title: '핵심 원칙',
        items: [
          {
            icon: Brain,
            title: '인간-AI 협력',
            description: 'AI를 도구가 아닌 사고의 파트너로 인식하고 상호 보완적 협력 관계를 구축합니다.'
          },
          {
            icon: MessageCircle,
            title: '대화형 학습',
            description: '일방향적 정보 전달이 아닌 쌍방향 대화를 통해 깊이 있는 학습을 실현합니다.'
          },
          {
            icon: Target,
            title: '단계적 발전',
            description: '개인의 수준에 맞춰 단계별로 사고력을 발전시키는 체계적 접근을 제공합니다.'
          },
          {
            icon: Lightbulb,
            title: '실용적 적용',
            description: '학습한 내용을 실제 상황에 적용할 수 있는 실용적 방법론을 제시합니다.'
          }
        ]
      },
      benefits: {
        title: '기대 효과',
        description: 'AI 협업 방법론을 통해 얻을 수 있는 구체적인 성과입니다.',
        items: [
          {
            category: '사고력 향상',
            benefits: [
              '창의적 문제 해결 능력 +67%',
              '논리적 분석 능력 +54%',
              '다각적 사고 능력 +71%'
            ]
          },
          {
            category: '업무 효율성',
            benefits: [
              '업무 처리 속도 +43%',
              '의사결정 정확도 +58%',
              '아이디어 생성량 +89%'
            ]
          },
          {
            category: '학습 성과',
            benefits: [
              '학습 이해도 +62%',
              '지식 응용 능력 +49%',
              '자기주도 학습 +76%'
            ]
          }
        ]
      },
      tools: {
        title: '활용 도구 및 기법',
        description: '각 단계에서 사용하는 구체적인 도구와 기법들입니다.',
        categories: [
          {
            title: '질문 기법',
            tools: [
              '5W1H 질문법',
              '가정 반박 질문',
              '관점 전환 질문',
              '깊이 탐구 질문'
            ]
          },
          {
            title: '사고 도구',
            tools: [
              '마인드맵',
              '로직트리',
              'SWOT 분석',
              '시나리오 플래닝'
            ]
          },
          {
            title: 'AI 협업 기법',
            tools: [
              '역할 설정',
              '컨텍스트 제공',
              '반복 개선',
              '피드백 순환'
            ]
          }
        ]
      },
      cta: {
        title: 'AI 협업 방법론을 직접 경험해보세요',
        description: '체계적인 학습 프로그램으로 AI와의 효과적인 협업 능력을 발전시켜보세요',
        primaryAction: 'AI 실습 시작하기',
        secondaryAction: '강의 둘러보기'
      }
    },
    en: {
      hero: {
        badge: 'AI Collaboration Methodology',
        title: 'Systematic Thinking\nwith AI',
        subtitle: 'Systematically develop deep thinking skills with Idea Work Lab\'s proven AI collaboration methodology.'
      },
      methodology: {
        title: '3-Phase AI Collaboration Methodology',
        description: 'Learn effective AI collaboration through systematic, step-by-step approach.',
        phases: [
          {
            phase: 'Phase 1',
            title: 'Basic Thinking Methods and AI Collaboration Understanding',
            description: 'Build foundational thinking skills through natural conversations with AI and learn basic collaboration methods.',
            duration: '2-3 weeks',
            difficulty: 'Beginner',
            skills: ['Natural Language Conversation', 'AI Understanding', 'Basic Questioning', 'Thought Organization'],
            objectives: [
              'Form comfortable conversational relationship with AI',
              'Learn clear questioning methods',
              'Practice basic thought structuring',
              'Accept and utilize AI feedback'
            ]
          },
          {
            phase: 'Phase 2',
            title: 'Creative Thinking Development and Idea Generation',
            description: 'Brainstorm with AI to generate creative ideas and discover new perspectives.',
            duration: '3-4 weeks',
            difficulty: 'Intermediate',
            skills: ['Creative Thinking', 'Brainstorming', 'Association Techniques', 'Idea Expansion'],
            objectives: [
              'View problems from various perspectives',
              'Creative brainstorming with AI',
              'Idea connection and expansion techniques',
              'Develop creative questioning'
            ]
          },
          {
            phase: 'Phase 3',
            title: 'Analytical Thinking and Systematic Problem Solving',
            description: 'Systematically analyze complex problems with AI and derive actionable solutions.',
            duration: '4-5 weeks',
            difficulty: 'Advanced',
            skills: ['Logical Analysis', 'Systematic Approach', 'Problem Solving', 'Decision Making'],
            objectives: [
              'Structure complex problems',
              'Develop logical thinking processes',
              'Evidence-based decision making',
              'Establish execution plans'
            ]
          }
        ]
      },
      principles: {
        title: 'Core Principles',
        items: [
          {
            icon: Brain,
            title: 'Human-AI Collaboration',
            description: 'Recognize AI as a thinking partner, not just a tool, and build mutually complementary collaborative relationships.'
          },
          {
            icon: MessageCircle,
            title: 'Conversational Learning',
            description: 'Achieve deep learning through bidirectional dialogue rather than one-way information delivery.'
          },
          {
            icon: Target,
            title: 'Progressive Development',
            description: 'Provide systematic approach to develop thinking skills step-by-step according to individual levels.'
          },
          {
            icon: Lightbulb,
            title: 'Practical Application',
            description: 'Present practical methodologies that can be applied to real-world situations.'
          }
        ]
      },
      benefits: {
        title: 'Expected Outcomes',
        description: 'Concrete results you can achieve through AI collaboration methodology.',
        items: [
          {
            category: 'Thinking Improvement',
            benefits: [
              'Creative problem solving +67%',
              'Logical analysis ability +54%',
              'Multi-perspective thinking +71%'
            ]
          },
          {
            category: 'Work Efficiency',
            benefits: [
              'Task processing speed +43%',
              'Decision-making accuracy +58%',
              'Idea generation volume +89%'
            ]
          },
          {
            category: 'Learning Outcomes',
            benefits: [
              'Learning comprehension +62%',
              'Knowledge application +49%',
              'Self-directed learning +76%'
            ]
          }
        ]
      },
      tools: {
        title: 'Tools and Techniques',
        description: 'Specific tools and techniques used in each phase.',
        categories: [
          {
            title: 'Questioning Techniques',
            tools: [
              '5W1H Method',
              'Assumption Challenge Questions',
              'Perspective Shift Questions',
              'Deep Exploration Questions'
            ]
          },
          {
            title: 'Thinking Tools',
            tools: [
              'Mind Mapping',
              'Logic Trees',
              'SWOT Analysis',
              'Scenario Planning'
            ]
          },
          {
            title: 'AI Collaboration Techniques',
            tools: [
              'Role Setting',
              'Context Provision',
              'Iterative Improvement',
              'Feedback Loops'
            ]
          }
        ]
      },
      cta: {
        title: 'Experience AI Collaboration Methodology',
        description: 'Develop effective AI collaboration skills through systematic learning programs',
        primaryAction: 'Start AI Practice',
        secondaryAction: 'Explore Courses'
      }
    }
  };

  const t = content[language];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '초급':
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case '중급':
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case '고급':
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-iwl-gradient rounded-full px-4 py-2 mb-6">
              <Brain className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">{t.hero.badge}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.hero.title.split('\n').map((line, index) => (
                <div key={index} className={index === 0 ? 'text-iwl-gradient' : ''}>
                  {line}
                </div>
              ))}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Phases */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.methodology.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.methodology.description}
            </p>
          </div>

          <div className="space-y-12">
            {t.methodology.phases.map((phase, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-iwl-gradient text-white text-lg px-4 py-2">
                      {phase.phase}
                    </Badge>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Brain className="w-4 h-4" />
                        {phase.duration}
                      </div>
                      <Badge className={getDifficultyColor(phase.difficulty)}>
                        {phase.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-iwl-gradient mb-2">
                    {phase.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-700">
                    {phase.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Skills */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-iwl-purple" />
                        핵심 스킬
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="border-iwl-purple text-iwl-purple">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Objectives */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-iwl-blue" />
                        학습 목표
                      </h4>
                      <ul className="space-y-2">
                        {phase.objectives.map((objective, objIndex) => (
                          <li key={objIndex} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle className="w-4 h-4 text-iwl-purple mt-1 flex-shrink-0" />
                            <span className="text-sm">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.principles.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.principles.items.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-iwl-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg text-gray-900">
                      {principle.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.benefits.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.benefits.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.benefits.items.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-iwl-gradient text-center">
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.tools.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.tools.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.tools.categories.map((category, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-iwl-gradient">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-iwl-gradient rounded-full"></div>
                        <span className="text-gray-700">{tool}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onNavigate('ai-practice')}
                className="bg-white text-iwl-purple hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t.cta.primaryAction}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('courses')}
                className="border-2 border-white text-white hover:bg-white hover:text-iwl-purple px-8 py-4 text-lg rounded-xl transition-all duration-300"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                {t.cta.secondaryAction}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { MethodologyPage };