import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  ArrowRight, 
  Brain, 
  Zap, 
  TrendingUp, 
  Users, 
  Star, 
  MapPin, 
  MessageCircle,
  BookOpen,
  Calendar,
  Target,
  Award,
  Settings,
  BarChart3,
  CheckCircle,
  Clock,
  Lightbulb,
  FileText,
  PlusCircle,
  Play,
  Coffee,
  Sparkles,
  Rocket,
  Globe,
  Shield,
  Database,
  Activity,
  DollarSign,
  AlertCircle,
  HelpCircle,
  Gift
} from 'lucide-react';

interface PersonalizedHeroSectionProps {
  language: 'ko' | 'en';
  onNavigate?: (page: string, journalId?: string, category?: string, week?: number, phase?: number, mode?: 'guided' | 'self-directed') => void;
  userType: 'guest' | 'member';
  userData?: {
    name?: string;
    email?: string;
    currentCourse?: string;
    progress?: number;
    completedPhases?: number;
    totalPhases?: number;
    lastLoginDate?: string;
    streak?: number;
    achievements?: string[];
  };
}

export function PersonalizedHeroSection({ 
  language, 
  onNavigate, 
  userType, 
  userData 
}: PersonalizedHeroSectionProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (language === 'ko') {
      if (hour < 12) return '좋은 아침이에요';
      if (hour < 18) return '좋은 오후에요';
      return '좋은 저녁이에요';
    } else {
      if (hour < 12) return 'Good morning';
      if (hour < 18) return 'Good afternoon';
      return 'Good evening';
    }
  };

  const content = {
    ko: {
      // Guest User Content
      guest: {
        title: 'AI와 함께하는 새로운 생각정리',
        subtitle: '현대인을 위한 AI 강화 사고법',
        description: 'AI 기반 도구로 인지적 잠재력을 해제하고, 사고 과정을 증폭시키며, 창의성을 향상시키고, 아이디어를 실행 가능한 통찰력으로 변환하세요',
        startJourney: '여정 시작하기',
        exploreCourses: '제주도 과정 시작하기',
        learnMore: '더 알아보기',
        stats: {
          students: '500+ 수강생',
          satisfaction: '4.9/5 만족도',
          completion: '89% 완주율'
        },
        benefits: [
          { icon: Brain, title: '창의적 사고력', desc: '87% 향상' },
          { icon: Zap, title: '문제 해결 속도', desc: '3.2배 빠름' },
          { icon: Target, title: '목표 달성률', desc: '94% 성공' }
        ]
      },
      // Member User Content
      member: {
        welcomeBack: `${getGreeting()}, {{name}}님!`,
        continueJourney: '학습 여정을 계속해보세요',
        currentProgress: '현재 진행 상황',
        nextTask: '다음 과제',
        achievements: '성취',
        streak: '연속 학습',
        days: '일',
        resumeLearning: '학습 재개',
        viewDashboard: '대시보드 보기',
        quickActions: '빠른 실행',
        aiPractice: 'AI 연습',
        weeklyGoal: '주간 목표',
        recentActivity: '최근 활동'
      },
      actions: {
        continueCourse: '강의 계속하기',
        startAIPractice: 'AI 연습 시작',
        viewProgress: '진도 확인',
        exploreContent: '콘텐츠 탐색',
        joinCommunity: '커뮤니티 참여'
      }
    },
    en: {
      // Guest User Content
      guest: {
        title: 'Think Deeper with AI',
        subtitle: 'AI-Enhanced Thinking for Modern Minds',
        description: 'Unlock your cognitive potential with AI-powered tools. Amplify your thinking process, enhance creativity, and transform ideas into actionable insights.',
        startJourney: 'Start Journey',
        exploreCourses: 'Start Jeju Course',
        learnMore: 'Learn More',
        stats: {
          students: '500+ Students',
          satisfaction: '4.9/5 Rating',
          completion: '89% Completion'
        },
        benefits: [
          { icon: Brain, title: 'Creative Thinking', desc: '87% improvement' },
          { icon: Zap, title: 'Problem Solving', desc: '3.2x faster' },
          { icon: Target, title: 'Goal Achievement', desc: '94% success' }
        ]
      },
      // Member User Content
      member: {
        welcomeBack: `${getGreeting()}, {{name}}!`,
        continueJourney: 'Continue your learning journey',
        currentProgress: 'Current Progress',
        nextTask: 'Next Task',
        achievements: 'Achievements',
        streak: 'Learning Streak',
        days: 'days',
        resumeLearning: 'Resume Learning',
        viewDashboard: 'View Dashboard',
        quickActions: 'Quick Actions',
        aiPractice: 'AI Practice',
        weeklyGoal: 'Weekly Goal',
        recentActivity: 'Recent Activity'
      },
      actions: {
        continueCourse: 'Continue Course',
        startAIPractice: 'Start AI Practice',
        viewProgress: 'View Progress',
        exploreContent: 'Explore Content',
        joinCommunity: 'Join Community'
      }
    }
  };

  const t = content[language];

  // Guest User Hero Section
  if (userType === 'guest') {
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="block">{t.guest.title.split(' ').slice(0, 2).join(' ')}</span>
                <span className="text-iwl-gradient">{t.guest.title.split(' ').slice(2).join(' ')}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-iwl-purple font-medium mb-4">
                {t.guest.subtitle}
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t.guest.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/course">
                  <Button 
                    size="lg" 
                    className="bg-iwl-gradient hover:opacity-90 text-white font-semibold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    {t.guest.exploreCourses}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/journal">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white font-semibold text-lg px-8 py-4 transition-all w-full sm:w-auto"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    {t.guest.startJourney}
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-iwl-purple" />
                  <span>{t.guest.stats.students}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{t.guest.stats.satisfaction}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>{t.guest.stats.completion}</span>
                </div>
              </div>
            </div>

            {/* Right Content - Benefits */}
            <div className="relative">
              <div className="grid gap-6">
                {t.guest.benefits.map((benefit, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-iwl-gradient rounded-lg flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                        <p className="text-iwl-purple font-medium">{benefit.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Member User Dashboard Section
  return (
    <section className="py-12 bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50">
      <div className="container mx-auto px-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t.member.welcomeBack.replace('{{name}}', userData?.name || 'User')}
          </h1>
          <p className="text-lg text-gray-600">{t.member.continueJourney}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Progress Card */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-iwl-purple" />
                    {t.member.currentProgress}
                  </CardTitle>
                  <Badge className="bg-iwl-gradient text-white">
                    {userData?.currentCourse || '제주도 여행 기획 과정'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>전체 진도</span>
                      <span>{userData?.progress || 45}%</span>
                    </div>
                    <Progress value={userData?.progress || 45} className="h-3" />
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>완료: {userData?.completedPhases || 12}/{userData?.totalPhases || 24} 단계</span>
                    <span>예상 완료: 3주</span>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Link href="/course/week/3" className="flex-1">
                      <Button className="w-full bg-iwl-gradient">
                        <Play className="w-4 h-4 mr-2" />
                        {t.actions.continueCourse}
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button variant="outline">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        {t.member.viewDashboard}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 mt-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{t.member.quickActions}</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="grid md:grid-cols-3 gap-4">
                  <Link href="/ai-practice">
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-iwl-purple/20 hover:border-iwl-purple">
                      <div className="flex items-center space-x-3">
                        <Brain className="w-8 h-8 text-iwl-purple" />
                        <div>
                          <h4 className="font-medium">{t.member.aiPractice}</h4>
                          <p className="text-xs text-gray-500">AI와 대화하며 연습</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                  
                  <Link href="/journal">
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-iwl-blue/20 hover:border-iwl-blue">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-iwl-blue" />
                        <div>
                          <h4 className="font-medium">저널 작성</h4>
                          <p className="text-xs text-gray-500">생각을 정리해보세요</p>
                        </div>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/community">
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-green-200 hover:border-green-400">
                      <div className="flex items-center space-x-3">
                        <Users className="w-8 h-8 text-green-500" />
                        <div>
                          <h4 className="font-medium">커뮤니티</h4>
                          <p className="text-xs text-gray-500">동료들과 소통</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Streak Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  {t.member.streak}
                </h3>
                <Badge variant="secondary">{userData?.streak || 7} {t.member.days}</Badge>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-iwl-purple mb-2">{userData?.streak || 7}</div>
                <p className="text-sm text-gray-600">연속 학습 중! 🔥</p>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-iwl-purple" />
                {t.member.achievements}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">첫 번째 단계 완료</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">1주 연속 학습</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI 대화 10회</span>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </Card>

            {/* Next Task */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-iwl-purple" />
                {t.member.nextTask}
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-iwl-purple-50 rounded-lg">
                  <h4 className="text-sm font-medium">3주차 2단계</h4>
                  <p className="text-xs text-gray-600">AI와 숙박 계획 세우기</p>
                </div>
                <Link href="/course/week/3/phase/2">
                  <Button size="sm" className="w-full bg-iwl-gradient">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    시작하기
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}