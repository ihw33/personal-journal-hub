'use client';

import React, { useState, useCallback } from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { IWL4ChatInterface, type IWL4ChatSession } from '@/components/chat/IWL4ChatInterface';
import { CharacterSelector } from '@/components/chat/CharacterSelector';
import { SessionManager } from '@/components/chat/SessionManager';
import { ThemeAwareButton } from '@/components/ui/theme-aware/ThemeAwareButton';
import { ThemeAwareCard, ThemeAwareCardContent, ThemeAwareCardHeader, ThemeAwareCardTitle } from '@/components/ui/theme-aware/ThemeAwareCard';

export default function ChatPage() {
  const { currentLevel } = useTheme();
  const [currentStep, setCurrentStep] = useState<'character' | 'session' | 'chat'>('session');
  const [selectedCharacterId, setSelectedCharacterId] = useState('생각이');
  const [currentSession, setCurrentSession] = useState<IWL4ChatSession | null>(null);
  const [chatConfig, setChatConfig] = useState({
    week: 1,
    phase: 1,
    mode: 'guided' as const
  });

  const handleCharacterSelect = useCallback((characterId: string) => {
    setSelectedCharacterId(characterId);
    setCurrentStep('session');
  }, []);

  const handleNewSession = useCallback(() => {
    setCurrentSession(null);
    setCurrentStep('chat');
  }, []);

  const handleSessionSelect = useCallback((session: IWL4ChatSession) => {
    setCurrentSession(session);
    setSelectedCharacterId(session.characterId);
    setChatConfig({
      week: session.week,
      phase: session.phase,
      mode: session.mode
    });
    setCurrentStep('chat');
  }, []);

  const handleSessionCreate = useCallback((session: IWL4ChatSession) => {
    setCurrentSession(session);
  }, []);

  const handleBackToSessions = useCallback(() => {
    setCurrentStep('session');
  }, []);

  const handleBackToCharacterSelect = useCallback(() => {
    setCurrentStep('character');
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--iwl-text)' }}>
          IWL 4.0 AI 학습 채팅
        </h1>
        <p className="text-xl" style={{ color: 'var(--iwl-text-muted)' }}>
          AI 파트너와 함께 사고력을 키우는 개인 맞춤형 학습 경험
        </p>
      </div>

      {/* 진행 단계 표시 */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[
            { step: 'character', label: 'AI 파트너 선택', emoji: '🤖' },
            { step: 'session', label: '세션 관리', emoji: '📚' },
            { step: 'chat', label: '학습 채팅', emoji: '💬' }
          ].map(({ step, label, emoji }, index) => {
            const isActive = currentStep === step;
            const isCompleted = 
              (step === 'character' && (currentStep === 'session' || currentStep === 'chat')) ||
              (step === 'session' && currentStep === 'chat');

            return (
              <div key={step} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      isActive ? 'ring-4 ring-opacity-30' : ''
                    }`}
                    style={{
                      backgroundColor: isCompleted 
                        ? 'var(--iwl-success)' 
                        : isActive 
                        ? 'var(--iwl-primary)' 
                        : 'var(--iwl-surface)',
                      color: isCompleted || isActive ? 'white' : 'var(--iwl-text-muted)',
                      border: !isCompleted && !isActive ? '2px solid var(--iwl-border)' : 'none',
                      ringColor: isActive ? 'var(--iwl-primary)' : undefined
                    }}
                  >
                    {isCompleted ? '✓' : emoji}
                  </div>
                  <span 
                    className={`ml-2 text-sm ${isActive ? 'font-medium' : ''}`}
                    style={{ 
                      color: isActive ? 'var(--iwl-primary)' : 'var(--iwl-text-muted)' 
                    }}
                  >
                    {label}
                  </span>
                </div>
                {index < 2 && (
                  <div 
                    className="w-8 h-0.5 mx-4"
                    style={{ 
                      backgroundColor: isCompleted 
                        ? 'var(--iwl-success)' 
                        : 'var(--iwl-border)' 
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-6xl mx-auto">
        {currentStep === 'character' && (
          <div className="space-y-6">
            <CharacterSelector
              selectedCharacterId={selectedCharacterId}
              onCharacterChange={handleCharacterSelect}
              showRecommendation={true}
            />
            
            {selectedCharacterId && (
              <div className="text-center">
                <ThemeAwareButton
                  useIWLTheme
                  variant="iwl"
                  size="lg"
                  onClick={() => setCurrentStep('session')}
                >
                  다음 단계로 진행
                </ThemeAwareButton>
              </div>
            )}
          </div>
        )}

        {currentStep === 'session' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 세션 관리 */}
            <div className="lg:col-span-2">
              <SessionManager
                onSessionSelect={handleSessionSelect}
                onNewSession={handleNewSession}
                currentSessionId={currentSession?.id}
              />
            </div>

            {/* 사이드바 - 학습 설정 */}
            <div className="space-y-6">
              <ThemeAwareCard useIWLTheme variant="iwl">
                <ThemeAwareCardHeader useIWLTheme>
                  <ThemeAwareCardTitle useIWLTheme>
                    학습 설정
                  </ThemeAwareCardTitle>
                </ThemeAwareCardHeader>
                <ThemeAwareCardContent useIWLTheme>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--iwl-text)' }}>
                        학습 주차
                      </label>
                      <select
                        value={chatConfig.week}
                        onChange={(e) => setChatConfig(prev => ({ ...prev, week: Number(e.target.value) }))}
                        className="w-full p-2 border rounded-lg"
                        style={{
                          borderColor: 'var(--iwl-border)',
                          backgroundColor: 'var(--iwl-surface)',
                          color: 'var(--iwl-text)'
                        }}
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}주차
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--iwl-text)' }}>
                        학습 단계
                      </label>
                      <select
                        value={chatConfig.phase}
                        onChange={(e) => setChatConfig(prev => ({ ...prev, phase: Number(e.target.value) }))}
                        className="w-full p-2 border rounded-lg"
                        style={{
                          borderColor: 'var(--iwl-border)',
                          backgroundColor: 'var(--iwl-surface)',
                          color: 'var(--iwl-text)'
                        }}
                      >
                        {Array.from({ length: 8 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}단계
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--iwl-text)' }}>
                        학습 모드
                      </label>
                      <div className="flex gap-2">
                        <ThemeAwareButton
                          variant={chatConfig.mode === 'guided' ? 'iwl' : 'outline'}
                          useIWLTheme={chatConfig.mode === 'guided'}
                          size="sm"
                          onClick={() => setChatConfig(prev => ({ ...prev, mode: 'guided' }))}
                          className="flex-1"
                        >
                          🎯 가이드
                        </ThemeAwareButton>
                        <ThemeAwareButton
                          variant={chatConfig.mode === 'self-directed' ? 'iwl' : 'outline'}
                          useIWLTheme={chatConfig.mode === 'self-directed'}
                          size="sm"
                          onClick={() => setChatConfig(prev => ({ ...prev, mode: 'self-directed' }))}
                          className="flex-1"
                        >
                          🎨 자유
                        </ThemeAwareButton>
                      </div>
                    </div>
                  </div>
                </ThemeAwareCardContent>
              </ThemeAwareCard>

              <div className="flex flex-col gap-3">
                <ThemeAwareButton
                  variant="outline"
                  onClick={handleBackToCharacterSelect}
                  className="w-full"
                >
                  AI 파트너 다시 선택
                </ThemeAwareButton>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'chat' && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* 채팅 영역 */}
            <div className="xl:col-span-3 h-[600px]">
              <IWL4ChatInterface
                sessionId={currentSession?.id}
                week={chatConfig.week}
                phase={chatConfig.phase}
                mode={chatConfig.mode}
                characterId={selectedCharacterId}
                onSessionCreate={handleSessionCreate}
                className="h-full"
              />
            </div>

            {/* 사이드바 */}
            <div className="space-y-4">
              {/* 현재 설정 */}
              <ThemeAwareCard useIWLTheme variant="iwl">
                <ThemeAwareCardHeader useIWLTheme>
                  <ThemeAwareCardTitle useIWLTheme>
                    현재 설정
                  </ThemeAwareCardTitle>
                </ThemeAwareCardHeader>
                <ThemeAwareCardContent useIWLTheme>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--iwl-text-muted)' }}>AI 파트너:</span>
                      <span style={{ color: 'var(--iwl-text)' }}>{selectedCharacterId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--iwl-text-muted)' }}>학습 주차:</span>
                      <span style={{ color: 'var(--iwl-text)' }}>{chatConfig.week}주차</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--iwl-text-muted)' }}>학습 단계:</span>
                      <span style={{ color: 'var(--iwl-text)' }}>{chatConfig.phase}단계</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--iwl-text-muted)' }}>모드:</span>
                      <span style={{ color: 'var(--iwl-text)' }}>
                        {chatConfig.mode === 'guided' ? '🎯 가이드' : '🎨 자유'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--iwl-text-muted)' }}>레벨:</span>
                      <span style={{ color: 'var(--iwl-text)' }}>{currentLevel}</span>
                    </div>
                  </div>
                </ThemeAwareCardContent>
              </ThemeAwareCard>

              {/* 액션 버튼 */}
              <div className="flex flex-col gap-3">
                <ThemeAwareButton
                  variant="outline"
                  onClick={handleBackToSessions}
                  className="w-full"
                >
                  세션 관리로 돌아가기
                </ThemeAwareButton>
                
                <ThemeAwareButton
                  variant="outline"
                  onClick={handleNewSession}
                  className="w-full"
                >
                  새 세션 시작하기
                </ThemeAwareButton>
              </div>

              {/* 도움말 */}
              <ThemeAwareCard useIWLTheme variant="iwl">
                <ThemeAwareCardContent useIWLTheme>
                  <div className="text-sm space-y-2">
                    <p className="font-medium" style={{ color: 'var(--iwl-text)' }}>
                      💡 채팅 팁
                    </p>
                    <ul className="space-y-1 text-xs" style={{ color: 'var(--iwl-text-muted)' }}>
                      <li>• Enter로 메시지 전송</li>
                      <li>• Shift+Enter로 줄바꿈</li>
                      <li>• AI가 실시간으로 응답합니다</li>
                      <li>• 세션은 자동 저장됩니다</li>
                    </ul>
                  </div>
                </ThemeAwareCardContent>
              </ThemeAwareCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}