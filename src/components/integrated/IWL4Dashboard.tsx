/**
 * IWL 4.0 - Helena & Rio 통합 대시보드
 * 사용자 레벨별 맞춤형 대시보드 with 기존 시스템 호환성
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Brain, BookOpen, Trophy, TrendingUp, Star, 
  Calendar, Clock, Users, Award, Target,
  Play, ArrowRight, Sparkles, CheckCircle
} from 'lucide-react';

// Integration Types - Compatible with existing auth system
interface User {
  id: string;
  email: string;
  name: string;
  user_metadata?: {
    user_type: 'admin' | 'beta_tester' | 'user';
    user_level?: 'junior' | 'youth' | 'adult';
    avatar_url?: string;
  };
}

interface LearningProgress {
  currentPhase: number;
  currentWeek: number;
  totalPhases: number;
  totalWeeks: number;
  completedSessions: number;
  totalSessions: number;
  streakDays: number;
  points: number;
  level: number;
  achievements: string[];
}

interface IWL4DashboardProps {
  user: User;
  userLevel: 'junior' | 'youth' | 'adult' | 'instructor' | 'admin';
  isAuthenticated: boolean;
  onNavigate: (path: string, params?: any) => void;
  onChatStart?: () => void;
  onCourseSelect?: (courseId: string) => void;
}

export const IWL4Dashboard: React.FC<IWL4DashboardProps> = ({
  user,
  userLevel,
  isAuthenticated,
  onNavigate,
  onChatStart,
  onCourseSelect
}) => {
  const [learningProgress, setLearningProgress] = useState<LearningProgress>({
    currentPhase: 2,
    currentWeek: 3,
    totalPhases: 8,
    totalWeeks: 8,
    completedSessions: 15,
    totalSessions: 64,
    streakDays: 7,
    points: 2450,
    level: 3,
    achievements: ['first_session', 'week_complete', 'streak_7']
  });

  // Helena & Rio 레벨별 설정
  const getLevelConfig = () => {
    const configs = {
      junior: {
        theme: 'from-pink-50 via-orange-50 to-yellow-50',
        primary: 'from-pink-400 to-orange-400',
        character: '생각이',
        avatar: '🌱',
        greeting: '안녕! 오늘도 함께 생각놀이 하자!',
        activities: [
          { title: '그림으로 생각하기', desc: '상상을 그림으로 표현해보자', icon: '🎨', action: () => onNavigate('/learn/junior/drawing') },
          { title: '색깔 감정 놀이', desc: '기분을 색깔로 나타내보기', icon: '🌈', action: () => onNavigate('/learn/junior/colors') },
          { title: '친구들과 이야기', desc: '다른 친구들과 생각 나누기', icon: '👫', action: () => onNavigate('/community/junior') }
        ],
        achievements: [
          { name: '첫 놀이 완료', icon: '🎯', unlocked: true },
          { name: '7일 연속 놀이', icon: '🔥', unlocked: true },
          { name: '친구 사귀기', icon: '👫', unlocked: false }
        ]
      },
      youth: {
        theme: 'from-purple-50 via-blue-50 to-cyan-50',
        primary: 'from-purple-500 to-blue-500',
        character: '아키',
        avatar: '⚡',
        greeting: '새로운 도전이 기다리고 있어!',
        activities: [
          { title: 'Speed Challenge', desc: '빠른 사고력 도전하기', icon: '⚡', action: () => onNavigate('/learn/youth/speed') },
          { title: 'Team Battle', desc: '팀으로 문제 해결하기', icon: '👥', action: () => onNavigate('/learn/youth/team') },
          { title: 'Ranking Challenge', desc: '순위를 올려보자', icon: '🏆', action: () => onNavigate('/community/youth/ranking') }
        ],
        achievements: [
          { name: '첫 번째 도전', icon: '🎯', unlocked: true },
          { name: '연승 스트릭', icon: '🔥', unlocked: true },
          { name: '팀 리더', icon: '👑', unlocked: false }
        ]
      },
      adult: {
        theme: 'from-blue-50 via-indigo-50 to-slate-50',
        primary: 'from-blue-600 to-indigo-600',
        character: '아키',
        avatar: '🧠',
        greeting: '체계적인 사고 훈련을 계속해보겠습니다.',
        activities: [
          { title: 'Analysis Lab', desc: '데이터 분석 실습', icon: '📊', action: () => onNavigate('/learn/adult/analysis') },
          { title: 'Strategic Thinking', desc: '전략적 사고 훈련', icon: '🎯', action: () => onNavigate('/learn/adult/strategy') },
          { title: 'Professional Network', desc: '전문가 네트워킹', icon: '🤝', action: () => onNavigate('/community/adult') }
        ],
        achievements: [
          { name: '분석 전문가', icon: '📊', unlocked: true },
          { name: '전략 수립자', icon: '🎯', unlocked: true },
          { name: '멘토 인증', icon: '🏆', unlocked: false }
        ]
      },
      instructor: {
        theme: 'from-green-50 via-emerald-50 to-teal-50',
        primary: 'from-green-600 to-emerald-600',
        character: '아키 (강사모드)',
        avatar: '📚',
        greeting: '강사 도구가 준비되었습니다.',
        activities: [
          { title: '수업 관리', desc: '진행 중인 수업 관리', icon: '📚', action: () => onNavigate('/instructor/classes') },
          { title: '학생 진도', desc: '학생들의 학습 현황', icon: '📈', action: () => onNavigate('/instructor/progress') },
          { title: '콘텐츠 제작', desc: '새로운 학습 자료 만들기', icon: '✏️', action: () => onNavigate('/instructor/content') }
        ],
        achievements: [
          { name: '첫 번째 수업', icon: '🎓', unlocked: true },
          { name: '학생 만족도 높음', icon: '⭐', unlocked: true },
          { name: '콘텐츠 크리에이터', icon: '🏆', unlocked: false }
        ]
      },
      admin: {
        theme: 'from-red-50 via-rose-50 to-pink-50',
        primary: 'from-red-600 to-rose-600',
        character: '시스템 AI',
        avatar: '⚙️',
        greeting: '시스템 관리 모드입니다.',
        activities: [
          { title: '사용자 관리', desc: '전체 사용자 현황', icon: '👥', action: () => onNavigate('/admin/users') },
          { title: '시스템 분석', desc: '플랫폼 사용 통계', icon: '📊', action: () => onNavigate('/admin/analytics') },
          { title: '콘텐츠 검토', desc: '등록된 콘텐츠 관리', icon: '📋', action: () => onNavigate('/admin/content') }
        ],
        achievements: [
          { name: '시스템 관리자', icon: '⚙️', unlocked: true },
          { name: '데이터 전문가', icon: '📊', unlocked: true },
          { name: '플랫폼 운영자', icon: '🏆', unlocked: true }
        ]
      }
    };
    return configs[userLevel] || configs.adult;
  };

  const config = getLevelConfig();

  // 진행률 계산
  const overallProgress = Math.round((learningProgress.completedSessions / learningProgress.totalSessions) * 100);
  const currentPhaseProgress = Math.round(((learningProgress.currentWeek - 1) / learningProgress.totalWeeks) * 100);

  // 레벨별 표시 텍스트
  const getLevelText = () => {
    const texts = {
      junior: '놀이 친구',
      youth: '도전자',
      adult: '전문 학습자',
      instructor: '강사',
      admin: '관리자'
    };
    return texts[userLevel] || '학습자';
  };

  if (!isAuthenticated || !user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-lg font-bold mb-2">로그인이 필요합니다</h3>
          <p className="text-gray-600 mb-4">학습을 계속하려면 로그인해주세요.</p>
          <Button onClick={() => onNavigate('/auth/login')} className="w-full">
            로그인하기
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.theme} p-4`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* 헤더 섹션 */}
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${config.primary} rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg`}>
                  {config.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-800">
                      안녕하세요, {user.name || '학습자'}님!
                    </h1>
                    <Badge className={`bg-gradient-to-r ${config.primary} text-white border-none`}>
                      {getLevelText()}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mt-1">{config.greeting}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>연속 학습 {learningProgress.streakDays}일</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      <span>{learningProgress.points} 포인트</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={onChatStart}
                className={`bg-gradient-to-r ${config.primary} text-white hover:opacity-90`}
              >
                <Brain className="w-5 h-5 mr-2" />
                {config.character}와 대화하기
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* 학습 진행 현황 */}
          <Card className="lg:col-span-2 border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                학습 진행 현황
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* 전체 진도 */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">전체 진도</span>
                  <span className="text-gray-600">{overallProgress}% 완료</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </div>

              {/* 현재 단계 정보 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-800">현재 단계</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">
                    Phase {learningProgress.currentPhase} - Week {learningProgress.currentWeek}
                  </p>
                  <Progress value={currentPhaseProgress} className="h-2 mt-2" />
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-800">완료된 세션</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">
                    {learningProgress.completedSessions} / {learningProgress.totalSessions}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {learningProgress.totalSessions - learningProgress.completedSessions}개 세션 남음
                  </p>
                </div>
              </div>

              {/* 최근 활동 */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">추천 활동</h4>
                <div className="space-y-2">
                  {config.activities.map((activity, index) => (
                    <button
                      key={index}
                      onClick={activity.action}
                      className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                    >
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{activity.title}</div>
                        <div className="text-sm text-gray-600">{activity.desc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 사이드바 - 성취도 & 빠른 액션 */}
          <div className="space-y-6">
            
            {/* 성취도 */}
            <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  성취도
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className={`w-20 h-20 bg-gradient-to-r ${config.primary} rounded-full flex items-center justify-center mx-auto mb-2 text-white text-2xl shadow-lg`}>
                    {config.avatar}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">레벨 {learningProgress.level}</div>
                  <div className="text-sm text-gray-600">{learningProgress.points} 포인트</div>
                </div>

                <div className="space-y-3">
                  {config.achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center gap-3 p-2 rounded-lg ${
                      achievement.unlocked ? 'bg-green-50' : 'bg-gray-50'
                    }`}>
                      <div className={`text-lg ${achievement.unlocked ? 'grayscale-0' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <span className={`text-sm ${achievement.unlocked ? 'text-green-800 font-medium' : 'text-gray-500'}`}>
                        {achievement.name}
                      </span>
                      {achievement.unlocked && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 빠른 액션 */}
            <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  빠른 시작
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => onNavigate('/learn/continue')}
                  className={`w-full bg-gradient-to-r ${config.primary} text-white hover:opacity-90`}
                >
                  <Play className="w-4 h-4 mr-2" />
                  학습 계속하기
                </Button>
                
                <Button
                  onClick={() => onNavigate('/community')}
                  variant="outline"
                  className="w-full"
                >
                  <Users className="w-4 h-4 mr-2" />
                  커뮤니티 참여
                </Button>

                <Button
                  onClick={() => onNavigate('/progress')}
                  variant="outline"
                  className="w-full"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  진도 자세히 보기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IWL4Dashboard;