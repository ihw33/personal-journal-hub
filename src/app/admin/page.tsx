'use client';

import { useState, useEffect } from 'react';
import { Users, BookOpen, FileText, CreditCard, TrendingUp, Activity, Calendar, Settings } from 'lucide-react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const statsData = {
  totalUsers: 1247,
  activeUsers: 523,
  totalRevenue: 45230000,
  monthlyGrowth: 23.5,
  totalCourses: 12,
  totalJournals: 45,
  betaTesters: 189,
  conversionRate: 15.3
};

const recentActivities = [
  { id: 1, type: 'signup', user: 'kim***@gmail.com', time: '10분 전' },
  { id: 2, type: 'payment', user: 'lee***@naver.com', amount: 29900, time: '30분 전' },
  { id: 3, type: 'course', user: 'park***@gmail.com', course: '초등 3학년 ~ 중등 1학년', time: '1시간 전' },
  { id: 4, type: 'signup', user: 'choi***@gmail.com', time: '2시간 전' },
  { id: 5, type: 'payment', user: 'jung***@naver.com', amount: 39900, time: '3시간 전' }
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [dateRange, setDateRange] = useState('week');

  useEffect(() => {
    // Check if user is admin
    if (user && user.user_metadata?.user_type !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-architect-gray-100">
        <div className="text-center">
          <Settings className="w-16 h-16 text-architect-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">접근 권한이 없습니다</h2>
          <p className="text-architect-gray-600 mb-6">관리자 권한이 필요합니다</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-6 py-3 bg-architect-primary text-white rounded-lg font-medium hover:bg-architect-secondary transition-colors"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-architect-gray-100">
      {/* Header */}
      <section className="bg-white border-b border-architect-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">관리자 대시보드</h1>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary focus:border-architect-primary"
            >
              <option value="today">오늘</option>
              <option value="week">이번 주</option>
              <option value="month">이번 달</option>
              <option value="year">올해</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-architect-primary" />
              <span className="text-sm text-green-600 font-medium">+{statsData.monthlyGrowth}%</span>
            </div>
            <div className="text-2xl font-bold">{statsData.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-architect-gray-600">전체 사용자</div>
            <div className="mt-2 text-xs text-architect-gray-500">
              활성: {statsData.activeUsers.toLocaleString()}명
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-10 h-10 text-architect-accent" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold">₩{(statsData.totalRevenue / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-architect-gray-600">총 매출</div>
            <div className="mt-2 text-xs text-architect-gray-500">
              전환율: {statsData.conversionRate}%
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-10 h-10 text-architect-ai-primary" />
              <span className="text-sm font-medium">{statsData.totalCourses}</span>
            </div>
            <div className="text-2xl font-bold">{statsData.betaTesters}</div>
            <div className="text-sm text-architect-gray-600">베타 테스터</div>
            <div className="mt-2 text-xs text-architect-gray-500">
              수업: {statsData.totalCourses}개
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-10 h-10 text-architect-secondary" />
              <span className="text-sm font-medium">{statsData.totalJournals}</span>
            </div>
            <div className="text-2xl font-bold">{statsData.totalJournals}</div>
            <div className="text-sm text-architect-gray-600">저널 콘텐츠</div>
            <div className="mt-2 text-xs text-architect-gray-500">
              이번 달: 8개 추가
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link
            href="/admin/users"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <Users className="w-8 h-8 text-architect-primary" />
            <div>
              <div className="font-medium">사용자 관리</div>
              <div className="text-sm text-architect-gray-600">회원 정보 관리</div>
            </div>
          </Link>

          <Link
            href="/admin/courses"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <BookOpen className="w-8 h-8 text-architect-accent" />
            <div>
              <div className="font-medium">수업 관리</div>
              <div className="text-sm text-architect-gray-600">콘텐츠 편집</div>
            </div>
          </Link>

          <Link
            href="/admin/payments"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <CreditCard className="w-8 h-8 text-architect-ai-primary" />
            <div>
              <div className="font-medium">결제 관리</div>
              <div className="text-sm text-architect-gray-600">매출 현황</div>
            </div>
          </Link>

          <Link
            href="/admin/system"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <Settings className="w-8 h-8 text-architect-secondary" />
            <div>
              <div className="font-medium">시스템 설정</div>
              <div className="text-sm text-architect-gray-600">사이트 관리</div>
            </div>
          </Link>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-architect-gray-200">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity className="w-6 h-6 text-architect-primary" />
              최근 활동
            </h2>
          </div>
          <div className="divide-y divide-architect-gray-200">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-architect-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'signup' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'payment' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {activity.type === 'signup' ? <Users className="w-5 h-5" /> :
                       activity.type === 'payment' ? <CreditCard className="w-5 h-5" /> :
                       <BookOpen className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="font-medium">
                        {activity.type === 'signup' && `새 회원 가입: ${activity.user}`}
                        {activity.type === 'payment' && `결제 완료: ${activity.user} (₩${activity.amount?.toLocaleString()})`}
                        {activity.type === 'course' && `수업 시작: ${activity.user} - ${activity.course}`}
                      </div>
                      <div className="text-sm text-architect-gray-500">{activity.time}</div>
                    </div>
                  </div>
                  <button className="text-architect-primary hover:text-architect-secondary text-sm">
                    상세보기
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 text-center border-t border-architect-gray-200">
            <Link
              href="/admin/activities"
              className="text-architect-primary hover:text-architect-secondary font-medium"
            >
              모든 활동 보기 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}