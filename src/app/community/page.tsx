'use client';

import { useState } from 'react';
import { MessageSquare, Users, Award, Calendar, Search, Filter, TrendingUp, BookOpen, Coffee, Target } from 'lucide-react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useRouter } from 'next/navigation';

const communityCategories = [
  { id: 'all', label: '전체', count: 1247 },
  { id: 'study', label: '학습 공유', count: 523 },
  { id: 'question', label: '질문 & 답변', count: 412 },
  { id: 'showcase', label: '프로젝트 쇼케이스', count: 189 },
  { id: 'networking', label: '네트워킹', count: 123 }
];

const featuredPosts = [
  {
    id: 1,
    title: '8단계 사고 확장 모델로 프로젝트 성공한 후기',
    author: '김민수',
    avatar: 'KM',
    category: 'showcase',
    likes: 234,
    comments: 45,
    time: '2시간 전',
    preview: 'IWL에서 배운 8단계 모델을 실제 스타트업 프로젝트에 적용해봤습니다. 특히 3단계 분석 및 종합 과정에서...'
  },
  {
    id: 2,
    title: 'AI 멘토 아키와 함께한 첫 수업 후기',
    author: '이서연',
    avatar: 'LS',
    category: 'study',
    likes: 189,
    comments: 32,
    time: '5시간 전',
    preview: '처음엔 AI와 대화하며 학습한다는 게 어색했는데, 아키가 제 수준에 맞춰 차근차근 이끌어주더라고요...'
  },
  {
    id: 3,
    title: '중급 과정 스터디 그룹 모집합니다 (5/8명)',
    author: '박준호',
    avatar: 'PJ',
    category: 'networking',
    likes: 67,
    comments: 23,
    time: '1일 전',
    preview: '매주 화요일 저녁 8시에 온라인으로 모여서 함께 학습하실 분들을 모집합니다. 현재 5명이 모였고...'
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: 'IWL 멘토와의 만남: Klaus Kim',
    date: '2025.08.15',
    time: '19:00',
    type: 'online',
    participants: 127
  },
  {
    id: 2,
    title: '사고력 확장 워크숍',
    date: '2025.08.22',
    time: '14:00',
    type: 'offline',
    participants: 45
  }
];

export default function CommunityPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-architect-gray-100">
        <div className="text-center">
          <Users className="w-16 h-16 text-architect-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">로그인이 필요합니다</h2>
          <p className="text-architect-gray-600 mb-6">커뮤니티는 회원 전용 공간입니다</p>
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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-architect-primary to-architect-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">IWL 커뮤니티</h1>
          <p className="text-xl opacity-90">함께 성장하는 학습자들의 공간</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Search & Filter */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-architect-gray-400" />
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary focus:border-architect-primary"
                  />
                </div>
                <button className="px-4 py-3 bg-architect-gray-100 rounded-lg flex items-center gap-2 hover:bg-architect-gray-200 transition-colors">
                  <Filter className="w-5 h-5" />
                  <span>필터</span>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {communityCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-architect-primary text-white'
                      : 'bg-white text-architect-gray-700 hover:bg-architect-gray-100'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {featuredPosts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-architect-primary rounded-full flex items-center justify-center text-white font-bold">
                        {post.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium">{post.author}</h3>
                        <p className="text-sm text-architect-gray-500">{post.time}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-architect-primary/10 text-architect-primary rounded-full text-sm">
                      {communityCategories.find(c => c.id === post.category)?.label}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 hover:text-architect-primary cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-architect-gray-700 mb-4 line-clamp-2">
                    {post.preview}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-architect-gray-500">
                    <button className="flex items-center gap-1 hover:text-architect-primary transition-colors">
                      <TrendingUp className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-architect-primary transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-architect-primary text-white rounded-lg font-medium hover:bg-architect-secondary transition-colors">
                더 보기
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4">내 활동</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-architect-gray-600">작성한 글</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-architect-gray-600">받은 좋아요</span>
                  <span className="font-medium">234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-architect-gray-600">학습 레벨</span>
                  <span className="font-medium text-architect-primary">중급</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-architect-primary" />
                예정된 이벤트
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border-l-4 border-architect-primary pl-4">
                    <h4 className="font-medium mb-1">{event.title}</h4>
                    <p className="text-sm text-architect-gray-600 mb-1">
                      {event.date} {event.time}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={`px-2 py-0.5 rounded ${
                        event.type === 'online' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {event.type === 'online' ? '온라인' : '오프라인'}
                      </span>
                      <span className="text-architect-gray-500">
                        {event.participants}명 참여
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Topics */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4">인기 토픽</h3>
              <div className="flex flex-wrap gap-2">
                {['AI멘토링', '8단계모델', '사고력확장', '프로젝트관리', '창의성개발'].map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-architect-gray-100 text-architect-gray-700 rounded-full text-sm hover:bg-architect-gray-200 cursor-pointer"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Write Button */}
            <button className="w-full py-3 bg-gradient-to-r from-architect-primary to-architect-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all">
              새 글 작성하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}