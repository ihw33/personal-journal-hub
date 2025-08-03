'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Settings, 
  TrendingUp, 
  Clock, 
  Target,
  Award,
  ChevronRight,
  Play,
  BarChart3,
  Users,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface DashboardPageProps {
  user: User;
  onNavigate?: (page: string, params?: any) => void;
}

interface UserStats {
  totalCourses: number;
  completedCourses: number;
  currentStreak: number;
  totalStudyTime: number;
  completedSessions: number;
  achievementBadges: number;
  currentLevel: string;
  overallProgress: number;
}

interface RecentActivity {
  id: string;
  type: 'course_complete' | 'session_complete' | 'achievement' | 'diagnosis';
  title: string;
  description: string;
  timestamp: Date;
  icon: any;
  color: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  onNavigate
}) => {
  const router = useRouter();
  const [userStats, setUserStats] = useState<UserStats>({
    totalCourses: 3,
    completedCourses: 1,
    currentStreak: 7,
    totalStudyTime: 1250, // minutes
    completedSessions: 8,
    achievementBadges: 3,
    currentLevel: '분석적 사고',
    overallProgress: 35
  });

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'session_complete',
      title: '세션 완료',
      description: '2단계: 분석적 사고 - 세션 3 완료',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: Play,
      color: 'text-architect-success'
    },
    {
      id: '2',
      type: 'achievement',
      title: '배지 획득',
      description: '연속 학습 7일 달성',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      icon: Award,
      color: 'text-architect-warning'
    },
    {
      id: '3',
      type: 'course_complete',
      title: '코스 완료',
      description: '1단계: 기초 사고력 완료',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      icon: Trophy,
      color: 'text-architect-primary'
    }
  ]);

  const formatStudyTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    return '방금 전';
  };

  const handleNavigation = (page: string, params?: any) => {
    if (onNavigate) {
      onNavigate(page, params);
    } else {
      switch (page) {
        case 'courses':
          router.push('/courses');
          break;
        case 'diagnosis':
          router.push('/diagnosis');
          break;
        case 'journal':
          router.push('/journal');
          break;
        case 'settings':
          router.push('/settings');
          break;
        case 'payment':
          router.push('/payment');
          break;
        default:
          router.push('/');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-50 to-white">
      {/* 대시보드 헤더 */}
      <div className="bg-gradient-to-r from-architect-primary to-architect-secondary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-h1 font-black mb-2">
                안녕하세요, {user?.user_metadata?.name || '학습자'}님! 👋
              </h1>
              <p className="text-body-lg opacity-90">
                오늘도 멋진 사고 여정을 시작해보세요
              </p>
            </div>
            <div className="text-right">
              <div className="text-h2 font-bold">{userStats.overallProgress}%</div>
              <div className="text-small opacity-80">전체 진행률</div>
            </div>
          </div>

          {/* 진행률 바 */}
          <div className="w-full bg-white/20 rounded-full h-3 mb-4">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-300"
              style={{ width: `${userStats.overallProgress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-small opacity-80">
            <span>현재 단계: {userStats.currentLevel}</span>
            <span>{userStats.completedCourses}/{userStats.totalCourses} 코스 완료</span>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-8">
        {/* 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-architect-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-small text-architect-gray-600 mb-1">완료한 세션</p>
                  <p className="text-h3 font-bold text-architect-gray-900">{userStats.completedSessions}</p>
                </div>
                <div className="w-12 h-12 bg-architect-primary/10 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-architect-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-architect-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-small text-architect-gray-600 mb-1">연속 학습</p>
                  <p className="text-h3 font-bold text-architect-gray-900">{userStats.currentStreak}일</p>
                </div>
                <div className="w-12 h-12 bg-architect-success/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-architect-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-architect-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-small text-architect-gray-600 mb-1">총 학습 시간</p>
                  <p className="text-h3 font-bold text-architect-gray-900">{formatStudyTime(userStats.totalStudyTime)}</p>
                </div>
                <div className="w-12 h-12 bg-architect-warning/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-architect-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-architect-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-small text-architect-gray-600 mb-1">획득 배지</p>
                  <p className="text-h3 font-bold text-architect-gray-900">{userStats.achievementBadges}</p>
                </div>
                <div className="w-12 h-12 bg-architect-accent/10 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-architect-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 빠른 액션 */}
          <div className="lg:col-span-2">
            <Card className="border-architect-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-architect-primary" />
                  빠른 액션
                </CardTitle>
                <CardDescription>
                  자주 사용하는 기능들을 바로 실행하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleNavigation('courses')}
                    className="h-20 flex flex-col items-center gap-2 bg-architect-primary hover:bg-architect-primary/90"
                  >
                    <Play className="w-6 h-6" />
                    <span>학습 계속하기</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleNavigation('diagnosis')}
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <Brain className="w-6 h-6" />
                    <span>사고력 진단</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleNavigation('journal')}
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <BookOpen className="w-6 h-6" />
                    <span>학습 일지</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleNavigation('payment')}
                    className="h-20 flex flex-col items-center gap-2 border-architect-accent text-architect-accent hover:bg-architect-accent/5"
                  >
                    <Trophy className="w-6 h-6" />
                    <span>프리미엄 업그레이드</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 최근 활동 */}
            <Card className="mt-6 border-architect-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-architect-accent" />
                  최근 활동
                </CardTitle>
                <CardDescription>
                  최근 학습 활동과 성취를 확인하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 bg-architect-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-body font-semibold text-architect-gray-900">{activity.title}</h4>
                      <p className="text-small text-architect-gray-600">{activity.description}</p>
                    </div>
                    <div className="text-small text-architect-gray-500">
                      {formatTimeAgo(activity.timestamp)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 현재 코스 진행 상황 */}
            <Card className="border-architect-gray-200">
              <CardHeader>
                <CardTitle className="text-h5">현재 코스</CardTitle>
                <CardDescription>8단계 사고력 개발 프로그램</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-small text-architect-gray-600">진행률</span>
                    <span className="text-small font-medium">{userStats.overallProgress}%</span>
                  </div>
                  <Progress value={userStats.overallProgress} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-architect-gray-100">
                    <span className="text-small">기초 사고력</span>
                    <Badge variant="secondary" className="bg-architect-success/10 text-architect-success">완료</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-architect-gray-100">
                    <span className="text-small">분석적 사고</span>
                    <Badge variant="secondary" className="bg-architect-primary/10 text-architect-primary">진행중</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-small">창의적 사고</span>
                    <Badge variant="outline">대기중</Badge>
                  </div>
                </div>

                <Button 
                  onClick={() => handleNavigation('courses')}
                  className="w-full"
                >
                  학습 계속하기
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* 이번 주 목표 */}
            <Card className="border-architect-gray-200">
              <CardHeader>
                <CardTitle className="text-h5 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  이번 주 목표
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-small">세션 완료</span>
                  <span className="text-small font-medium">3/5</span>
                </div>
                <Progress value={60} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-small">학습 시간</span>
                  <span className="text-small font-medium">4h 30m/6h</span>
                </div>
                <Progress value={75} className="h-2" />
              </CardContent>
            </Card>

            {/* 추천 액션 */}
            <Card className="bg-gradient-to-br from-architect-primary/5 to-architect-accent/5 border-architect-primary/20">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-architect-primary mx-auto mb-4" />
                <h3 className="text-h5 font-semibold text-architect-gray-900 mb-2">
                  프리미엄으로 업그레이드
                </h3>
                <p className="text-small text-architect-gray-600 mb-4">
                  더 많은 코스와 개인 맞춤 피드백을 받아보세요
                </p>
                <Button
                  onClick={() => handleNavigation('payment')}
                  className="w-full bg-architect-primary hover:bg-architect-primary/90"
                >
                  업그레이드하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;