'use client';

import { useState } from 'react';
import { BookOpen, Clock, CheckCircle, PlayCircle, Lock, TrendingUp, Award, Calendar } from 'lucide-react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const myCourses = [
  {
    id: 'course-1',
    title: '초등 3학년 ~ 중등 1학년',
    subtitle: '놀이를 통해 자연스럽게 사고력을 기르는 과정',
    mentor: '장난감 정리의 마법',
    progress: 65,
    totalSessions: 10,
    completedSessions: 6,
    nextSession: '7단계: 실행 관리',
    status: 'in_progress',
    lastAccessed: '2시간 전',
    thumbnail: '🎯'
  },
  {
    id: 'course-2',
    title: '중등 2학년 ~ 고등 3학년',
    subtitle: '실생활 문제를 체계적으로 해결하는 사고 훈련',
    mentor: '나만의 유튜브 채널 기획',
    progress: 30,
    totalSessions: 12,
    completedSessions: 3,
    nextSession: '4단계: 통찰적 영감',
    status: 'in_progress',
    lastAccessed: '어제',
    thumbnail: '🚀'
  },
  {
    id: 'course-3',
    title: '대학생 ~ 직장인',
    subtitle: '전문적 사고 기술을 활용한 고급 문제 해결',
    mentor: '창업 아이디어 검증과 실행',
    progress: 100,
    totalSessions: 16,
    completedSessions: 16,
    nextSession: null,
    status: 'completed',
    lastAccessed: '1주일 전',
    thumbnail: '💡'
  }
];

const learningStats = {
  totalHours: 24,
  weeklyStreak: 5,
  completedCourses: 1,
  averageScore: 85
};

export default function LearnPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed'>('all');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-architect-gray-100">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-architect-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">로그인이 필요합니다</h2>
          <p className="text-architect-gray-600 mb-6">수업을 수강하려면 로그인이 필요합니다</p>
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

  const filteredCourses = myCourses.filter(course => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  return (
    <div className="min-h-screen bg-architect-gray-100">
      {/* Hero Section */}
      <section className="bg-white border-b border-architect-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">내 수업</h1>
              <p className="text-architect-gray-600">AI 멘토 아키와 함께하는 맞춤형 학습 여정</p>
            </div>
            <Link
              href="/courses"
              className="px-6 py-3 bg-architect-primary text-white rounded-lg font-medium hover:bg-architect-secondary transition-colors"
            >
              새 수업 둘러보기
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Stats */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Clock className="w-8 h-8 text-architect-primary mb-2" />
            <div className="text-2xl font-bold">{learningStats.totalHours}시간</div>
            <div className="text-sm text-architect-gray-600">총 학습 시간</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <TrendingUp className="w-8 h-8 text-architect-accent mb-2" />
            <div className="text-2xl font-bold">{learningStats.weeklyStreak}일</div>
            <div className="text-sm text-architect-gray-600">연속 학습</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <div className="text-2xl font-bold">{learningStats.completedCourses}개</div>
            <div className="text-sm text-architect-gray-600">완료한 수업</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Award className="w-8 h-8 text-architect-ai-primary mb-2" />
            <div className="text-2xl font-bold">{learningStats.averageScore}점</div>
            <div className="text-sm text-architect-gray-600">평균 점수</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-architect-primary text-white'
                : 'bg-white text-architect-gray-700 hover:bg-architect-gray-100'
            }`}
          >
            전체 ({myCourses.length})
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'in_progress'
                ? 'bg-architect-primary text-white'
                : 'bg-white text-architect-gray-700 hover:bg-architect-gray-100'
            }`}
          >
            진행 중 ({myCourses.filter(c => c.status === 'in_progress').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-architect-primary text-white'
                : 'bg-white text-architect-gray-700 hover:bg-architect-gray-100'
            }`}
          >
            완료 ({myCourses.filter(c => c.status === 'completed').length})
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{course.thumbnail}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                      <p className="text-sm text-architect-gray-600">{course.subtitle}</p>
                    </div>
                  </div>
                  {course.status === 'completed' && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      완료
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-architect-gray-600">진행률</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-architect-gray-200 rounded-full h-2">
                    <div
                      className="bg-architect-primary h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-architect-gray-500">
                    <span>{course.completedSessions}/{course.totalSessions} 세션 완료</span>
                    <span>최근 학습: {course.lastAccessed}</span>
                  </div>
                </div>

                <div className="bg-architect-gray-100 p-4 rounded-lg mb-4">
                  <div className="text-sm text-architect-gray-600 mb-1">현재 과제</div>
                  <div className="font-medium">{course.mentor}</div>
                  {course.nextSession && (
                    <div className="text-sm text-architect-primary mt-2">
                      다음: {course.nextSession}
                    </div>
                  )}
                </div>

                <Link
                  href={`/learn/${course.id}`}
                  className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                    course.status === 'completed'
                      ? 'bg-architect-gray-100 text-architect-gray-700 hover:bg-architect-gray-200'
                      : 'bg-architect-primary text-white hover:bg-architect-secondary'
                  }`}
                >
                  {course.status === 'completed' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      다시 보기
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-5 h-5" />
                      학습 계속하기
                    </>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-architect-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">수강 중인 수업이 없습니다</h3>
            <p className="text-architect-gray-600 mb-6">새로운 수업을 시작해보세요!</p>
            <Link
              href="/courses"
              className="inline-block px-6 py-3 bg-architect-primary text-white rounded-lg font-medium hover:bg-architect-secondary transition-colors"
            >
              수업 둘러보기
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}