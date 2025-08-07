'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { ThemeAwareButton } from '@/components/ui/theme-aware/ThemeAwareButton';
import { ThemeAwareCard, ThemeAwareCardContent, ThemeAwareCardHeader, ThemeAwareCardTitle } from '@/components/ui/theme-aware/ThemeAwareCard';
import { ThemeAwareInput } from '@/components/ui/theme-aware/ThemeAwareInput';
import { AI_CHARACTERS } from './CharacterSelector';
import type { IWL4ChatSession } from './IWL4ChatInterface';
import type { UserLevel } from '@/types/iwl4-integration';

export interface SessionManagerProps {
  onSessionSelect: (session: IWL4ChatSession) => void;
  onNewSession: () => void;
  currentSessionId?: string;
  className?: string;
}

export function SessionManager({
  onSessionSelect,
  onNewSession,
  currentSessionId,
  className = ''
}: SessionManagerProps) {
  const { currentLevel } = useTheme();
  const [sessions, setSessions] = useState<IWL4ChatSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<IWL4ChatSession[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // 세션 목록 로드
  useEffect(() => {
    loadSessions();
  }, []);

  // 필터링 적용
  useEffect(() => {
    let filtered = sessions;

    // 검색어 필터링
    if (searchQuery.trim()) {
      filtered = filtered.filter(session =>
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        AI_CHARACTERS[session.characterId]?.name.includes(searchQuery)
      );
    }

    // 상태 필터링
    if (filterStatus !== 'all') {
      filtered = filtered.filter(session => session.status === filterStatus);
    }

    setFilteredSessions(filtered);
  }, [sessions, searchQuery, filterStatus]);

  const loadSessions = async () => {
    setIsLoading(true);
    try {
      const allSessions: IWL4ChatSession[] = [];
      
      // 로컬스토리지에서 모든 세션 로드
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('iwl4-session-')) {
          try {
            const sessionData = localStorage.getItem(key);
            if (sessionData) {
              const session: IWL4ChatSession = JSON.parse(sessionData);
              allSessions.push(session);
            }
          } catch (error) {
            console.warn(`세션 로드 실패: ${key}`, error);
          }
        }
      }

      // 최근 수정일 기준으로 정렬
      allSessions.sort((a, b) => b.updatedAt - a.updatedAt);
      setSessions(allSessions);
    } catch (error) {
      console.error('세션 목록 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = (sessionId: string) => {
    if (window.confirm('정말로 이 세션을 삭제하시겠습니까?')) {
      localStorage.removeItem(`iwl4-session-${sessionId}`);
      setSessions(prev => prev.filter(session => session.id !== sessionId));
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) { // 1분 미만
      return '방금 전';
    } else if (diff < 3600000) { // 1시간 미만
      return `${Math.floor(diff / 60000)}분 전`;
    } else if (diff < 86400000) { // 1일 미만
      return `${Math.floor(diff / 3600000)}시간 전`;
    } else if (diff < 604800000) { // 1주 미만
      return `${Math.floor(diff / 86400000)}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusInfo = {
      active: { color: '#10B981', text: '진행중', emoji: '🟢' },
      paused: { color: '#F59E0B', text: '일시정지', emoji: '🟡' },
      completed: { color: '#6B7280', text: '완료', emoji: '✅' }
    };
    
    const info = statusInfo[status as keyof typeof statusInfo] || statusInfo.active;
    
    return (
      <span 
        className="px-2 py-1 rounded-full text-xs font-medium"
        style={{
          backgroundColor: info.color + '20',
          color: info.color
        }}
      >
        {info.emoji} {info.text}
      </span>
    );
  };

  if (isLoading) {
    return (
      <ThemeAwareCard useIWLTheme variant="iwl" className={className}>
        <ThemeAwareCardContent useIWLTheme className="flex items-center justify-center py-8">
          <div className="animate-spin w-8 h-8 border-2 rounded-full" 
               style={{ 
                 borderColor: 'var(--iwl-primary)20',
                 borderTopColor: 'var(--iwl-primary)'
               }}>
          </div>
          <span className="ml-2" style={{ color: 'var(--iwl-text-muted)' }}>
            세션을 불러오는 중...
          </span>
        </ThemeAwareCardContent>
      </ThemeAwareCard>
    );
  }

  return (
    <ThemeAwareCard useIWLTheme variant="iwl" className={className}>
      <ThemeAwareCardHeader useIWLTheme>
        <ThemeAwareCardTitle useIWLTheme>
          학습 세션 관리
        </ThemeAwareCardTitle>
        <p className="text-sm" style={{ color: 'var(--iwl-text-muted)' }}>
          총 {sessions.length}개의 세션 • {filteredSessions.length}개 표시중
        </p>
      </ThemeAwareCardHeader>

      <ThemeAwareCardContent useIWLTheme>
        {/* 컨트롤 영역 */}
        <div className="space-y-4 mb-6">
          {/* 새 세션 버튼 */}
          <ThemeAwareButton
            useIWLTheme
            variant="iwl"
            onClick={onNewSession}
            className="w-full"
          >
            ✨ 새로운 학습 세션 시작하기
          </ThemeAwareButton>

          {/* 검색 및 필터 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <ThemeAwareInput
              useIWLTheme
              variant="iwl"
              placeholder="세션 제목이나 AI 캐릭터로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            
            <div className="flex gap-2">
              {(['all', 'active', 'completed'] as const).map((status) => (
                <ThemeAwareButton
                  key={status}
                  variant={filterStatus === status ? 'iwl' : 'outline'}
                  useIWLTheme={filterStatus === status}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                >
                  {status === 'all' ? '전체' : status === 'active' ? '진행중' : '완료'}
                </ThemeAwareButton>
              ))}
            </div>
          </div>
        </div>

        {/* 세션 목록 */}
        {filteredSessions.length === 0 ? (
          <div 
            className="text-center py-8"
            style={{ color: 'var(--iwl-text-muted)' }}
          >
            {searchQuery || filterStatus !== 'all' ? (
              <div>
                <p className="text-lg mb-2">🔍</p>
                <p>조건에 맞는 세션이 없습니다.</p>
                <p className="text-sm mt-1">검색어나 필터를 다시 확인해보세요.</p>
              </div>
            ) : (
              <div>
                <p className="text-lg mb-2">📚</p>
                <p>아직 학습 세션이 없습니다.</p>
                <p className="text-sm mt-1">새로운 세션을 시작해보세요!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSessions.map((session) => {
              const character = AI_CHARACTERS[session.characterId];
              const isSelected = session.id === currentSessionId;
              
              return (
                <div
                  key={session.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    isSelected ? 'scale-102' : 'hover:scale-101'
                  }`}
                  style={{
                    borderColor: isSelected ? 'var(--iwl-primary)' : 'var(--iwl-border)',
                    backgroundColor: isSelected 
                      ? 'var(--iwl-primary)10' 
                      : 'var(--iwl-surface)',
                    boxShadow: isSelected 
                      ? 'var(--iwl-shadow-md)'
                      : 'var(--iwl-shadow-sm)'
                  }}
                  onClick={() => onSessionSelect(session)}
                >
                  {/* 세션 헤더 */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {character && (
                        <span 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                          style={{ backgroundColor: character.color + '20' }}
                        >
                          {character.emoji}
                        </span>
                      )}
                      <h3 
                        className="font-medium truncate"
                        style={{ color: 'var(--iwl-text)' }}
                      >
                        {session.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getStatusBadge(session.status)}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                        className="text-red-500 hover:bg-red-50 rounded p-1"
                        title="세션 삭제"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* 세션 정보 */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4" style={{ color: 'var(--iwl-text-muted)' }}>
                      <span>{session.week}주차 {session.phase}단계</span>
                      <span>{session.mode === 'guided' ? '🎯 가이드' : '🎨 자유'}</span>
                      <span>{character?.name}</span>
                      <span>{session.messages.length}개 메시지</span>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--iwl-text-muted)' }}>
                      {formatDate(session.updatedAt)}
                    </span>
                  </div>

                  {/* 마지막 메시지 미리보기 */}
                  {session.messages.length > 0 && (
                    <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--iwl-border)' }}>
                      <p 
                        className="text-sm truncate"
                        style={{ color: 'var(--iwl-text-muted)' }}
                      >
                        {session.messages[session.messages.length - 1].content.slice(0, 100)}
                        {session.messages[session.messages.length - 1].content.length > 100 && '...'}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </ThemeAwareCardContent>
    </ThemeAwareCard>
  );
}