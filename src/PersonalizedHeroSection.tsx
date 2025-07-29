import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowRight, 
  BookOpen, 
  MessageCircle, 
  TrendingUp, 
  Star,
  Clock,
  Target,
  Brain
} from 'lucide-react';

interface PersonalizedHeroSectionProps {
  user: any;
  onNavigate: (page: string) => void;
  language: 'ko' | 'en';
}

export const PersonalizedHeroSection: React.FC<PersonalizedHeroSectionProps> = ({
  user,
  onNavigate,
  language
}) => {
  const content = {
    ko: {
      welcome: '안녕하세요',
      welcomeBack: '님, 다시 오신 것을 환영합니다!',
      subtitle: 'AI와 함께 새로운 학습을 계속해보세요',
      currentProgress: '현재 진도',
      nextAction: '다음 단계',
      quickStats: {
        conversations: 'AI 대화',
        achievements: '달성 성과',
        learningTime: '학습 시간'
      },
      recommendations: {
        title: '추천 학습',
        subtitle: '당신을 위한 맞춤 학습 경로'
      },
      recentActivity: {
        title: '최근 활동',
        subtitle: '지난 활동을 확인하세요'
      },
      actions: {
        continueLearning: '학습 계속하기',
        aiPractice: 'AI 실습하기',
        viewProgress: '진도 보기',
        exploreCourses: '강의 둘러보기'
      },
      achievements: {
        title: '최근 성과',
        viewAll: '모두 보기'
      }
    },
    en: {
      welcome: 'Welcome back',
      welcomeBack: '!',
      subtitle: 'Continue your AI-powered learning journey',
      currentProgress: 'Current Progress',
      nextAction: 'Next Step',
      quickStats: {
        conversations: 'AI Conversations',
        achievements: 'Achievements',
        learningTime: 'Learning Time'
      },
      recommendations: {
        title: 'Recommended Learning',
        subtitle: 'Personalized learning path for you'
      },
      recentActivity: {
        title: 'Recent Activity',
        subtitle: 'Check your latest activities'
      },
      actions: {
        continueLearning: 'Continue Learning',
        aiPractice: 'AI Practice',
        viewProgress: 'View Progress',
        exploreCourses: 'Explore Courses'
      },
      achievements: {
        title: 'Recent Achievements',
        viewAll: 'View All'
      }
    }
  };

  const t = content[language];

  // Extract personalized data
  const personalizedData = user?.personalizationData ? {
    name: user.name,
    email: user.email,
    currentCourse: user.personalizationData.learningProgress?.enrolledCourses?.[0],
    progress: user.personalizationData.learningProgress?.completionRate || 0,
    engagementScore: user.personalizationData.behaviorAnalytics?.engagementScore || 0,
    learningVelocity: user.personalizationData.behaviorAnalytics?.learningVelocity,
    aiInteractions: user.personalizationData.aiInteractions?.totalConversations || 0,
    achievements: user.personalizationData.achievements || [],
    nextActions: user.personalizationData.recommendations?.nextActions || [],
    strugglingAreas: user.personalizationData.aiInteractions?.strugglingAreas || [],
    strongTopics: user.personalizationData.behaviorAnalytics?.strongTopics || []
  } : null;

  const quickStats = [
    {
      icon: MessageCircle,
      label: t.quickStats.conversations,
      value: personalizedData?.aiInteractions || 0,
      color: 'text-iwl-purple'
    },
    {
      icon: Star,
      label: t.quickStats.achievements,
      value: personalizedData?.achievements?.length || 0,
      color: 'text-iwl-blue'
    },
    {
      icon: Clock,
      label: t.quickStats.learningTime,
      value: `${Math.floor((personalizedData?.progress || 0) * 2.4)}h`,
      color: 'text-iwl-purple'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50 min-h-[80vh]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Welcome Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Header */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-iwl-purple-200 rounded-full px-4 py-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-iwl-purple">활성 사용자</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {t.welcome}{' '}
                <span className="text-iwl-gradient">
                  {personalizedData?.name || user?.name || '사용자'}
                </span>
                {t.welcomeBack}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {t.subtitle}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {quickStats.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className={`w-8 h-8 mx-auto mb-2 ${stat.color}`}>
                      <stat.icon className="w-full h-full" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Progress Card */}
            <Card className="bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 border-iwl-purple-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-iwl-gradient">
                      {t.currentProgress}
                    </CardTitle>
                    <CardDescription>
                      {personalizedData?.currentCourse || '제주도 AI 협업 여행'}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-iwl-purple-100 text-iwl-purple">
                    Phase {personalizedData?.progress ? Math.floor(personalizedData.progress / 33) + 1 : 1}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>진도율</span>
                    <span className="font-medium">{personalizedData?.progress || 0}%</span>
                  </div>
                  <Progress 
                    value={personalizedData?.progress || 0} 
                    className="h-2"
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => onNavigate('course-dashboard')}
                      className="bg-iwl-gradient hover:opacity-90 text-white flex-1"
                    >
                      {t.actions.continueLearning}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => onNavigate('ai-practice')}
                      className="border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white"
                    >
                      {t.actions.aiPractice}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => onNavigate('dashboard')}
                className="h-12 border-iwl-blue text-iwl-blue hover:bg-iwl-blue hover:text-white"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                {t.actions.viewProgress}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate('courses')}
                className="h-12 border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                {t.actions.exploreCourses}
              </Button>
            </div>
          </div>

          {/* Sidebar - Recommendations & Recent Activity */}
          <div className="space-y-6">
            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-iwl-purple" />
                  {t.recommendations.title}
                </CardTitle>
                <CardDescription>{t.recommendations.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {personalizedData?.nextActions?.slice(0, 3).map((action, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-2 h-2 bg-iwl-gradient rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{action}</p>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-4 text-gray-500">
                      <Brain className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">맞춤 추천을 준비 중입니다</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-iwl-blue" />
                  {t.achievements.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {personalizedData?.achievements?.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-iwl-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-iwl-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="w-4 h-4 text-iwl-blue" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-4 text-gray-500">
                      <Star className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">첫 번째 성과를 달성해보세요!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

