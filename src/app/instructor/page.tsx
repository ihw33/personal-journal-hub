'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useDesignMode } from '@/components/design-mode/DesignModeProvider';
import { DesignModeCard, DesignModeButton } from '@/components/design-mode/DesignModeAwareComponent';
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Calendar, 
  MessageSquare, 
  Settings,
  PlayCircle,
  FileText,
  TrendingUp,
  Award,
  Clock,
  Target
} from 'lucide-react';

export default function InstructorPage() {
  const { user, userProfile } = useAuth();
  const { currentMode } = useDesignMode();
  const [activeTab, setActiveTab] = useState('overview');

  // 강사 권한 확인
  if (userProfile?.role !== 'instructor' && userProfile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <DesignModeCard className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--iwl-design-text)' }}>
            강사 권한이 필요합니다
          </h1>
          <p style={{ color: 'var(--iwl-design-text-muted)' }}>
            이 페이지는 강사 계정으로만 접근할 수 있습니다.
          </p>
        </DesignModeCard>
      </div>
    );
  }

  const stats = [
    { label: '총 학생 수', value: '124', icon: Users, color: 'blue' },
    { label: '진행 중인 수업', value: '8', icon: BookOpen, color: 'green' },
    { label: '이번 주 세션', value: '32', icon: Calendar, color: 'purple' },
    { label: '평균 참여도', value: '89%', icon: TrendingUp, color: 'orange' }
  ];

  const recentSessions = [
    { id: 1, title: '논리적 사고 - 3단계', students: 15, time: '14:00-15:30', status: 'ongoing' },
    { id: 2, title: '창의적 문제해결', students: 12, time: '16:00-17:30', status: 'scheduled' },
    { id: 3, title: '비판적 분석', students: 18, time: '19:00-20:30', status: 'completed' }
  ];

  const studentProgress = [
    { name: '김민수', level: 'Adult', phase: 5, progress: 78, lastActive: '2시간 전' },
    { name: '이지은', level: 'Youth', phase: 3, progress: 85, lastActive: '30분 전' },
    { name: '박재현', level: 'Adult', phase: 4, progress: 92, lastActive: '1시간 전' },
    { name: '최수정', level: 'Youth', phase: 6, progress: 67, lastActive: '4시간 전' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--iwl-design-surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 헤더 */}
        <div className="mb-8">
          <h1 
            className="text-3xl font-bold mb-2 design-mode-transition"
            style={{ color: 'var(--iwl-design-text)' }}
          >
            강사 대시보드
          </h1>
          <p 
            className="text-lg design-mode-transition"
            style={{ color: 'var(--iwl-design-text-muted)' }}
          >
            {userProfile?.full_name || user?.email}님, 환영합니다! ({currentMode === 'helena' ? 'Helena' : 'Rio'} 모드)
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <DesignModeCard key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p 
                    className="text-sm font-medium design-mode-transition"
                    style={{ color: 'var(--iwl-design-text-muted)' }}
                  >
                    {stat.label}
                  </p>
                  <p 
                    className="text-2xl font-bold mt-2 design-mode-transition"
                    style={{ color: 'var(--iwl-design-text)' }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div 
                  className="p-3 rounded-lg design-mode-transition"
                  style={{ backgroundColor: 'var(--iwl-design-primary)' }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </DesignModeCard>
          ))}
        </div>

        {/* 탭 네비게이션 */}
        <div className="mb-8">
          <div className="flex space-x-1 border-b" style={{ borderColor: 'var(--iwl-design-border)' }}>
            {[
              { id: 'overview', label: '개요', icon: BarChart3 },
              { id: 'sessions', label: '수업 관리', icon: BookOpen },
              { id: 'students', label: '학생 관리', icon: Users },
              { id: 'analytics', label: '분석', icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'border-current' 
                    : 'border-transparent hover:border-gray-300'
                }`}
                style={{ 
                  color: activeTab === tab.id 
                    ? 'var(--iwl-design-primary)' 
                    : 'var(--iwl-design-text-muted)' 
                }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="space-y-8">
          
          {/* 개요 탭 */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* 오늘의 세션 */}
              <DesignModeCard className="p-6">
                <h3 
                  className="text-xl font-semibold mb-4 flex items-center gap-2 design-mode-transition"
                  style={{ color: 'var(--iwl-design-text)' }}
                >
                  <Calendar className="w-5 h-5" />
                  오늘의 세션
                </h3>
                <div className="space-y-3">
                  {recentSessions.map((session) => (
                    <div 
                      key={session.id}
                      className="flex items-center justify-between p-3 rounded-lg design-mode-transition"
                      style={{ backgroundColor: 'var(--iwl-design-surface-elevated)' }}
                    >
                      <div>
                        <h4 
                          className="font-medium design-mode-transition"
                          style={{ color: 'var(--iwl-design-text)' }}
                        >
                          {session.title}
                        </h4>
                        <p 
                          className="text-sm design-mode-transition"
                          style={{ color: 'var(--iwl-design-text-muted)' }}
                        >
                          {session.students}명 · {session.time}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        session.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                        session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {session.status === 'ongoing' ? '진행 중' :
                         session.status === 'scheduled' ? '예정' : '완료'}
                      </span>
                    </div>
                  ))}
                </div>
                <DesignModeButton className="w-full mt-4">
                  모든 세션 보기
                </DesignModeButton>
              </DesignModeCard>

              {/* 학생 진도 현황 */}
              <DesignModeCard className="p-6">
                <h3 
                  className="text-xl font-semibold mb-4 flex items-center gap-2 design-mode-transition"
                  style={{ color: 'var(--iwl-design-text)' }}
                >
                  <Target className="w-5 h-5" />
                  학생 진도 현황
                </h3>
                <div className="space-y-4">
                  {studentProgress.map((student, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 
                            className="font-medium design-mode-transition"
                            style={{ color: 'var(--iwl-design-text)' }}
                          >
                            {student.name}
                          </h4>
                          <p 
                            className="text-xs design-mode-transition"
                            style={{ color: 'var(--iwl-design-text-muted)' }}
                          >
                            {student.level} · {student.phase}단계 · {student.lastActive}
                          </p>
                        </div>
                        <span 
                          className="text-sm font-medium design-mode-transition"
                          style={{ color: 'var(--iwl-design-primary)' }}
                        >
                          {student.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full design-mode-transition"
                          style={{ 
                            width: `${student.progress}%`,
                            backgroundColor: 'var(--iwl-design-primary)' 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <DesignModeButton className="w-full mt-4">
                  전체 학생 관리
                </DesignModeButton>
              </DesignModeCard>
            </div>
          )}

          {/* 수업 관리 탭 */}
          {activeTab === 'sessions' && (
            <DesignModeCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 
                  className="text-xl font-semibold design-mode-transition"
                  style={{ color: 'var(--iwl-design-text)' }}
                >
                  수업 관리
                </h3>
                <DesignModeButton className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4" />
                  새 세션 시작
                </DesignModeButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: '라이브 세션', desc: '실시간 화상 수업 진행', icon: PlayCircle },
                  { title: '과제 관리', desc: '학습 과제 생성 및 관리', icon: FileText },
                  { title: '진도 추적', desc: '학생별 학습 진도 확인', icon: BarChart3 },
                  { title: '피드백 작성', desc: '개별 학습 피드백 제공', icon: MessageSquare },
                  { title: '성과 분석', desc: '학습 성과 데이터 분석', icon: TrendingUp },
                  { title: '수업 설정', desc: '수업 환경 및 규칙 설정', icon: Settings },
                ].map((feature, index) => (
                  <DesignModeCard key={index} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div 
                        className="p-2 rounded-lg design-mode-transition"
                        style={{ backgroundColor: 'var(--iwl-design-primary)' }}
                      >
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 
                          className="font-medium design-mode-transition"
                          style={{ color: 'var(--iwl-design-text)' }}
                        >
                          {feature.title}
                        </h4>
                        <p 
                          className="text-sm design-mode-transition"
                          style={{ color: 'var(--iwl-design-text-muted)' }}
                        >
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </DesignModeCard>
                ))}
              </div>
            </DesignModeCard>
          )}

          {/* 다른 탭들도 비슷하게 구현할 수 있습니다 */}
          {activeTab === 'students' && (
            <DesignModeCard className="p-6">
              <h3 
                className="text-xl font-semibold mb-4 design-mode-transition"
                style={{ color: 'var(--iwl-design-text)' }}
              >
                학생 관리
              </h3>
              <p style={{ color: 'var(--iwl-design-text-muted)' }}>
                학생 관리 기능이 여기에 표시됩니다.
              </p>
            </DesignModeCard>
          )}

          {activeTab === 'analytics' && (
            <DesignModeCard className="p-6">
              <h3 
                className="text-xl font-semibold mb-4 design-mode-transition"
                style={{ color: 'var(--iwl-design-text)' }}
              >
                분석
              </h3>
              <p style={{ color: 'var(--iwl-design-text-muted)' }}>
                학습 분석 데이터가 여기에 표시됩니다.
              </p>
            </DesignModeCard>
          )}
        </div>
      </div>
    </div>
  );
}