'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { auth } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User as UserIcon, BookOpen, Brain, Trophy, Settings } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { user, error } = await auth.getUser();
      
      if (error || !user) {
        router.push('/auth/login');
        return;
      }
      
      setUser(user);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-architect-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-body text-architect-gray-700">로딩 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b border-architect-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-architect-gradient-main rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-h3 font-bold text-architect-gray-900">
                  IdeaWorkLab 대시보드
                </h1>
                <p className="text-small text-architect-gray-600">
                  사고와 재능의 설계자
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-architect-gray-600" />
                <span className="text-body text-architect-gray-700">
                  {user?.user_metadata?.name || user?.email}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-h2 font-bold text-architect-gray-900 mb-2">
            안녕하세요, {user?.user_metadata?.name || '사용자'}님! 👋
          </h2>
          <p className="text-body-lg text-architect-gray-700">
            IdeaWorkLab에 오신 것을 환영합니다. 체계적인 사고력 향상 여정을 시작해보세요.
          </p>
        </div>

        {/* 사용자 정보 카드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-architect-gray-300/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-architect-primary" />
                프로필 정보
              </CardTitle>
              <CardDescription>
                계정 기본 정보
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-small text-architect-gray-600">이메일</span>
                <p className="text-body font-medium text-architect-gray-900">
                  {user?.email}
                </p>
              </div>
              <div>
                <span className="text-small text-architect-gray-600">가입일</span>
                <p className="text-body font-medium text-architect-gray-900">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString('ko-KR') : '-'}
                </p>
              </div>
              <div>
                <span className="text-small text-architect-gray-600">이메일 인증</span>
                <p className={`text-body font-medium ${
                  user?.email_confirmed_at ? 'text-architect-success' : 'text-architect-warning'
                }`}>
                  {user?.email_confirmed_at ? '인증 완료' : '인증 대기 중'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-architect-gray-300/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-architect-accent" />
                학습 진도
              </CardTitle>
              <CardDescription>
                현재 학습 상황
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-small text-architect-gray-600">진행 중인 코스</span>
                <p className="text-body font-medium text-architect-gray-900">
                  8단계 사고력 개발 프로그램
                </p>
              </div>
              <div>
                <span className="text-small text-architect-gray-600">진행률</span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 bg-architect-gray-200 rounded-full h-2">
                    <div className="bg-architect-gradient-main h-2 rounded-full w-1/4"></div>
                  </div>
                  <span className="text-small font-medium text-architect-gray-700">25%</span>
                </div>
              </div>
              <div>
                <span className="text-small text-architect-gray-600">다음 단계</span>
                <p className="text-body font-medium text-architect-gray-900">
                  2주차: 분석적 사고
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-architect-gray-300/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-architect-success" />
                성취 현황
              </CardTitle>
              <CardDescription>
                학습 성과 및 배지
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-small text-architect-gray-600">완료한 단계</span>
                <p className="text-body font-medium text-architect-gray-900">
                  2개 단계
                </p>
              </div>
              <div>
                <span className="text-small text-architect-gray-600">획득 배지</span>
                <p className="text-body font-medium text-architect-gray-900">
                  첫 걸음 🏆
                </p>
              </div>
              <div>
                <span className="text-small text-architect-gray-600">학습 시간</span>
                <p className="text-body font-medium text-architect-gray-900">
                  12시간 30분
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 빠른 액션 버튼들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={() => router.push('/courses')}
            className="h-16 flex flex-col items-center gap-2"
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-small">코스 계속하기</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push('/diagnosis')}
            className="h-16 flex flex-col items-center gap-2"
          >
            <Brain className="w-6 h-6" />
            <span className="text-small">사고력 진단</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push('/journal')}
            className="h-16 flex flex-col items-center gap-2"
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-small">학습 일지</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push('/settings')}
            className="h-16 flex flex-col items-center gap-2"
          >
            <Settings className="w-6 h-6" />
            <span className="text-small">설정</span>
          </Button>
        </div>

        {/* 환영 메시지 */}
        <Card className="mt-8 bg-architect-gradient-main text-white border-0">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <h3 className="text-h3 font-bold">
                🎉 IdeaWorkLab에 성공적으로 로그인되었습니다!
              </h3>
              <p className="text-body-lg opacity-90">
                체계적인 사고력 개발 프로그램을 통해 창의적이고 논리적인 사고 능력을 기르세요.
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => router.push('/courses')}
                  className="bg-white text-architect-primary hover:bg-white/90"
                >
                  학습 시작하기
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/')}
                  className="border-white text-white hover:bg-white/10"
                >
                  홈으로 돌아가기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}