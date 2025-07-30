import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Brain, 
  MessageCircle, 
  Target, 
  Lightbulb, 
  Zap, 
  Play,
  ChevronRight,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';

interface AIPracticePageProps {
  user: any;
  onNavigate: (page: string) => void;
  language: 'ko' | 'en';
}

const AIPracticePage: React.FC<AIPracticePageProps> = ({ user, onNavigate, language }) => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const content = {
    ko: {
      hero: {
        badge: 'AI 실습',
        title: 'AI와 함께하는\n실시간 사고 실습',
        subtitle: '4가지 모드로 AI와 함께 생각하는 능력을 체계적으로 발전시켜보세요'
      },
      modes: [
        {
          id: 'free-chat',
          title: '자유 대화',
          description: 'AI와 자연스러운 대화를 통해 편안하게 생각을 나누어보세요',
          icon: MessageCircle,
          color: 'blue',
          features: ['자연어 대화', '편안한 분위기', '기초 AI 협업'],
          difficulty: 'beginner',
          duration: '15-30분',
          participants: user ? '나 + AI' : '로그인 필요'
        },
        {
          id: 'creative-thinking',
          title: '창의적 사고',
          description: 'AI와 함께 브레인스토밍하며 새로운 아이디어를 발견해보세요',
          icon: Lightbulb,
          color: 'purple',
          features: ['아이디어 발산', '창의적 연결', '혁신적 사고'],
          difficulty: 'intermediate',
          duration: '30-45분',
          participants: user ? '나 + AI' : '로그인 필요'
        },
        {
          id: 'analytical-thinking',
          title: '분석적 사고',
          description: '복잡한 문제를 AI와 함께 체계적으로 분석하고 해결해보세요',
          icon: Brain,
          color: 'green',
          features: ['논리적 분석', '체계적 접근', '문제 해결'],
          difficulty: 'advanced',
          duration: '45-60분',
          participants: user ? '나 + AI' : '로그인 필요'
        },
        {
          id: 'problem-solving',
          title: '문제 해결',
          description: '실제 문제를 AI와 함께 단계별로 해결하는 과정을 경험해보세요',
          icon: Target,
          color: 'red',
          features: ['실전 적용', '단계별 해결', '결과 도출'],
          difficulty: 'expert',
          duration: '60-90분',
          participants: user ? '나 + AI' : '로그인 필요'
        }
      ],
      difficulty: {
        beginner: '초급',
        intermediate: '중급',
        advanced: '고급',
        expert: '전문가'
      },
      actions: {
        start: '시작하기',
        login: '로그인하고 시작',
        learn: '자세히 알아보기'
      },
      features: {
        title: 'AI 실습의 특별한 점',
        items: [
          {
            icon: Zap,
            title: '실시간 피드백',
            description: 'AI가 실시간으로 당신의 사고 과정을 분석하고 피드백을 제공합니다'
          },
          {
            icon: TrendingUp,
            title: '개인화된 학습',
            description: '당신의 학습 스타일과 수준에 맞춰 AI가 대화를 조정합니다'
          },
          {
            icon: Users,
            title: '다양한 관점',
            description: 'AI의 다양한 사고 모드를 통해 새로운 관점을 경험할 수 있습니다'
          }
        ]
      },
      stats: {
        title: '실습 통계',
        totalSessions: '총 세션',
        avgDuration: '평균 시간',
        satisfaction: '만족도',
        improvement: '향상도'
      }
    },
    en: {
      hero: {
        badge: 'AI Practice',
        title: 'Real-time Thinking\nPractice with AI',
        subtitle: 'Systematically develop your thinking abilities with AI through 4 different modes'
      },
      modes: [
        {
          id: 'free-chat',
          title: 'Free Conversation',
          description: 'Have natural conversations with AI and share your thoughts comfortably',
          icon: MessageCircle,
          color: 'blue',
          features: ['Natural language', 'Comfortable atmosphere', 'Basic AI collaboration'],
          difficulty: 'beginner',
          duration: '15-30 min',
          participants: user ? 'Me + AI' : 'Login required'
        },
        {
          id: 'creative-thinking',
          title: 'Creative Thinking',
          description: 'Brainstorm with AI and discover new ideas together',
          icon: Lightbulb,
          color: 'purple',
          features: ['Idea generation', 'Creative connections', 'Innovative thinking'],
          difficulty: 'intermediate',
          duration: '30-45 min',
          participants: user ? 'Me + AI' : 'Login required'
        },
        {
          id: 'analytical-thinking',
          title: 'Analytical Thinking',
          description: 'Systematically analyze and solve complex problems with AI',
          icon: Brain,
          color: 'green',
          features: ['Logical analysis', 'Systematic approach', 'Problem solving'],
          difficulty: 'advanced',
          duration: '45-60 min',
          participants: user ? 'Me + AI' : 'Login required'
        },
        {
          id: 'problem-solving',
          title: 'Problem Solving',
          description: 'Experience step-by-step problem solving process with AI',
          icon: Target,
          color: 'red',
          features: ['Practical application', 'Step-by-step solutions', 'Result achievement'],
          difficulty: 'expert',
          duration: '60-90 min',
          participants: user ? 'Me + AI' : 'Login required'
        }
      ],
      difficulty: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        expert: 'Expert'
      },
      actions: {
        start: 'Start Practice',
        login: 'Login to Start',
        learn: 'Learn More'
      },
      features: {
        title: 'What Makes AI Practice Special',
        items: [
          {
            icon: Zap,
            title: 'Real-time Feedback',
            description: 'AI analyzes your thinking process in real-time and provides immediate feedback'
          },
          {
            icon: TrendingUp,
            title: 'Personalized Learning',
            description: 'AI adjusts conversations to match your learning style and level'
          },
          {
            icon: Users,
            title: 'Diverse Perspectives',
            description: 'Experience new perspectives through AI\'s various thinking modes'
          }
        ]
      },
      stats: {
        title: 'Practice Statistics',
        totalSessions: 'Total Sessions',
        avgDuration: 'Avg Duration',
        satisfaction: 'Satisfaction',
        improvement: 'Improvement'
      }
    }
  };

  const t = content[language];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModeColor = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'red': return 'from-red-500 to-red-600';
      default: return 'from-iwl-purple to-iwl-blue';
    }
  };

  const handleStartPractice = (modeId: string) => {
    if (!user) {
      onNavigate('auth');
      return;
    }
    // Navigate to actual practice session
    // This would integrate with the IntegratedChatbot component
    console.log(`Starting ${modeId} practice session`);
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

      {/* Practice Modes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {t.modes.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <Card 
                  key={mode.id}
                  className={`hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                    selectedMode === mode.id ? 'ring-2 ring-iwl-purple shadow-xl' : ''
                  }`}
                  onClick={() => setSelectedMode(mode.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getModeColor(mode.color)} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={getDifficultyColor(mode.difficulty)}>
                        {t.difficulty[mode.difficulty as keyof typeof t.difficulty]}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl text-gray-900 group-hover:text-iwl-purple transition-colors">
                      {mode.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {mode.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">주요 기능</h4>
                      <div className="flex flex-wrap gap-2">
                        {mode.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {mode.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {mode.participants}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartPractice(mode.id);
                      }}
                      className="w-full bg-iwl-gradient hover:opacity-90 text-white group-hover:shadow-lg transition-all"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {user ? t.actions.start : t.actions.login}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-iwl-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.features.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.features.items.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-iwl-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {user && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t.stats.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-iwl-gradient mb-2">
                  23
                </div>
                <div className="text-gray-600">{t.stats.totalSessions}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-iwl-gradient mb-2">
                  34분
                </div>
                <div className="text-gray-600">{t.stats.avgDuration}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-iwl-gradient mb-2">
                  95%
                </div>
                <div className="text-gray-600">{t.stats.satisfaction}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-iwl-gradient mb-2">
                  +47%
                </div>
                <div className="text-gray-600">{t.stats.improvement}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-iwl-purple-600 to-iwl-blue-600">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {user ? 'AI 실습을 시작해보세요' : 'AI 실습에 참여하세요'}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {user 
                ? '지금 바로 AI와 함께 생각하는 능력을 키워보세요' 
                : '회원가입하고 AI와 함께하는 특별한 학습을 경험하세요'
              }
            </p>
            <Button
              onClick={() => user ? handleStartPractice('free-chat') : onNavigate('signup')}
              className="bg-white text-iwl-purple hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {user ? '자유 대화로 시작하기' : '무료로 시작하기'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export { AIPracticePage };
export default AIPracticePage;