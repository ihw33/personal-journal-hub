'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { ThemeAwareCard, ThemeAwareCardContent, ThemeAwareCardHeader, ThemeAwareCardTitle } from '@/components/ui/theme-aware/ThemeAwareCard';
import { AI_CHARACTERS_DETAILED } from '@/lib/ai/character-personality';
import type { UserLevel } from '@/lib/theme/theme-system';
import type { IWL4ChatMessage } from './IWL4ChatInterface';

export interface CharacterProgress {
  characterId: string;
  totalSessions: number;
  totalMessages: number;
  averageSessionLength: number;
  lastInteraction: number;
  progressByPhase: Record<number, number>; // phase -> progress percentage
  achievements: string[];
  learningStats: {
    questionsAsked: number;
    problemsSolved: number;
    creativityScore: number;
    analyticalScore: number;
    empathyScore: number;
    motivationScore: number;
  };
  strengths: string[];
  improvements: string[];
}

export interface CharacterProgressTrackerProps {
  messages?: IWL4ChatMessage[];
  currentCharacter: string;
  userLevel: UserLevel;
  onProgressUpdate?: (progress: CharacterProgress) => void;
  className?: string;
}

// 로컬스토리지 키
const PROGRESS_STORAGE_KEY = 'iwl4-character-progress';

export function CharacterProgressTracker({
  messages = [],
  currentCharacter,
  userLevel,
  onProgressUpdate,
  className = ''
}: CharacterProgressTrackerProps) {
  const { currentLevel } = useTheme();
  const [progressData, setProgressData] = useState<Record<string, CharacterProgress>>({});
  const [selectedCharacter, setSelectedCharacter] = useState(currentCharacter);

  // 진도 데이터 로드
  useEffect(() => {
    const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (savedProgress) {
      try {
        setProgressData(JSON.parse(savedProgress));
      } catch (error) {
        console.error('진도 데이터 로드 실패:', error);
        setProgressData({});
      }
    }
  }, []);

  // 메시지 업데이트 시 진도 계산
  useEffect(() => {
    if (messages.length > 0) {
      updateCharacterProgress(currentCharacter, messages);
    }
  }, [messages, currentCharacter]);

  // 캐릭터 진도 업데이트
  const updateCharacterProgress = (characterId: string, sessionMessages: IWL4ChatMessage[]) => {
    const userMessages = sessionMessages.filter(msg => msg.type === 'user');
    const aiMessages = sessionMessages.filter(msg => msg.type === 'ai');
    
    const currentProgress = progressData[characterId] || createEmptyProgress(characterId);
    
    // 기본 통계 업데이트
    const updatedProgress: CharacterProgress = {
      ...currentProgress,
      totalMessages: currentProgress.totalMessages + sessionMessages.length,
      lastInteraction: Date.now(),
      totalSessions: currentProgress.totalSessions + 1,
      averageSessionLength: Math.round((currentProgress.averageSessionLength * (currentProgress.totalSessions - 1) + sessionMessages.length) / currentProgress.totalSessions)
    };

    // 메시지 분석을 통한 학습 통계 업데이트
    const learningAnalysis = analyzeMessages(userMessages, aiMessages, characterId);
    updatedProgress.learningStats = {
      ...updatedProgress.learningStats,
      ...learningAnalysis
    };

    // 성취도 및 개선점 업데이트
    updatedProgress.achievements = updateAchievements(updatedProgress);
    updatedProgress.strengths = identifyStrengths(updatedProgress, characterId);
    updatedProgress.improvements = identifyImprovements(updatedProgress, characterId);

    // 단계별 진도 업데이트
    const currentPhase = getCurrentPhase(sessionMessages);
    if (currentPhase) {
      updatedProgress.progressByPhase[currentPhase] = Math.min(
        (updatedProgress.progressByPhase[currentPhase] || 0) + 10,
        100
      );
    }

    const newProgressData = {
      ...progressData,
      [characterId]: updatedProgress
    };

    setProgressData(newProgressData);
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(newProgressData));
    
    onProgressUpdate?.(updatedProgress);
  };

  // 빈 진도 데이터 생성
  const createEmptyProgress = (characterId: string): CharacterProgress => ({
    characterId,
    totalSessions: 0,
    totalMessages: 0,
    averageSessionLength: 0,
    lastInteraction: 0,
    progressByPhase: {},
    achievements: [],
    learningStats: {
      questionsAsked: 0,
      problemsSolved: 0,
      creativityScore: 0,
      analyticalScore: 0,
      empathyScore: 0,
      motivationScore: 0
    },
    strengths: [],
    improvements: []
  });

  // 메시지 분석
  const analyzeMessages = (userMessages: IWL4ChatMessage[], aiMessages: IWL4ChatMessage[], characterId: string) => {
    const analysis = {
      questionsAsked: userMessages.filter(msg => msg.content.includes('?')).length,
      problemsSolved: Math.floor(userMessages.length / 3), // 대화 3회당 1개 문제 해결로 가정
      creativityScore: 0,
      analyticalScore: 0,
      empathyScore: 0,
      motivationScore: 0
    };

    // 캐릭터별 특화 점수 계산
    const character = AI_CHARACTERS_DETAILED[characterId];
    if (character) {
      switch (characterId) {
        case '생각이':
          analysis.analyticalScore = Math.min(100, (progressData[characterId]?.learningStats.analyticalScore || 0) + userMessages.length * 2);
          break;
        case '아키':
          analysis.creativityScore = Math.min(100, (progressData[characterId]?.learningStats.creativityScore || 0) + userMessages.length * 2);
          break;
        case '미루미':
          analysis.empathyScore = Math.min(100, (progressData[characterId]?.learningStats.empathyScore || 0) + userMessages.length * 2);
          break;
        case '반짝이':
          analysis.motivationScore = Math.min(100, (progressData[characterId]?.learningStats.motivationScore || 0) + userMessages.length * 2);
          break;
      }
    }

    return analysis;
  };

  // 현재 학습 단계 파악
  const getCurrentPhase = (messages: IWL4ChatMessage[]): number | null => {
    const phaseMessage = messages.find(msg => msg.metadata?.phase);
    return phaseMessage?.metadata?.phase || null;
  };

  // 성취도 업데이트
  const updateAchievements = (progress: CharacterProgress): string[] => {
    const achievements = [...progress.achievements];
    
    if (progress.totalMessages >= 50 && !achievements.includes('대화의 달인')) {
      achievements.push('대화의 달인');
    }
    
    if (progress.totalSessions >= 10 && !achievements.includes('꾸준한 학습자')) {
      achievements.push('꾸준한 학습자');
    }
    
    if (progress.learningStats.questionsAsked >= 20 && !achievements.includes('호기심 천재')) {
      achievements.push('호기심 천재');
    }

    // 캐릭터별 특수 성취도
    const character = AI_CHARACTERS_DETAILED[progress.characterId];
    if (character) {
      const maxScore = Math.max(
        progress.learningStats.analyticalScore,
        progress.learningStats.creativityScore,
        progress.learningStats.empathyScore,
        progress.learningStats.motivationScore
      );
      
      if (maxScore >= 80) {
        const skillName = character.specialty[0];
        const achievementName = `${skillName} 전문가`;
        if (!achievements.includes(achievementName)) {
          achievements.push(achievementName);
        }
      }
    }

    return achievements;
  };

  // 강점 식별
  const identifyStrengths = (progress: CharacterProgress, characterId: string): string[] => {
    const strengths: string[] = [];
    const character = AI_CHARACTERS_DETAILED[characterId];
    
    if (!character) return strengths;

    // 캐릭터별 강점 분석
    switch (characterId) {
      case '생각이':
        if (progress.learningStats.analyticalScore > 60) {
          strengths.push('논리적 분석 능력이 뛰어남');
        }
        if (progress.learningStats.questionsAsked > 15) {
          strengths.push('깊이 있는 질문을 많이 함');
        }
        break;
      case '아키':
        if (progress.learningStats.creativityScore > 60) {
          strengths.push('창의적 사고력이 발달됨');
        }
        if (progress.averageSessionLength > 20) {
          strengths.push('집중력이 뛰어남');
        }
        break;
      case '미루미':
        if (progress.learningStats.empathyScore > 60) {
          strengths.push('공감 능력이 뛰어남');
        }
        if (progress.totalSessions > 8) {
          strengths.push('지속적인 관계 맺기를 잘함');
        }
        break;
      case '반짝이':
        if (progress.learningStats.motivationScore > 60) {
          strengths.push('목표 지향적 사고가 강함');
        }
        if (progress.learningStats.problemsSolved > 10) {
          strengths.push('문제 해결 의지가 뛰어남');
        }
        break;
    }

    return strengths;
  };

  // 개선점 식별
  const identifyImprovements = (progress: CharacterProgress, characterId: string): string[] => {
    const improvements: string[] = [];
    const character = AI_CHARACTERS_DETAILED[characterId];
    
    if (!character) return improvements;

    // 전반적인 활동 수준 체크
    if (progress.totalSessions < 5) {
      improvements.push('더 많은 대화 경험이 필요');
    }
    
    if (progress.averageSessionLength < 10) {
      improvements.push('세션당 대화 시간을 늘려보세요');
    }

    // 캐릭터별 개선점 분석
    switch (characterId) {
      case '생각이':
        if (progress.learningStats.analyticalScore < 40) {
          improvements.push('체계적 사고 연습이 필요');
        }
        break;
      case '아키':
        if (progress.learningStats.creativityScore < 40) {
          improvements.push('창의적 아이디어 발상 연습 필요');
        }
        break;
      case '미루미':
        if (progress.learningStats.empathyScore < 40) {
          improvements.push('감정적 소통 능력 개발 필요');
        }
        break;
      case '반짝이':
        if (progress.learningStats.motivationScore < 40) {
          improvements.push('목표 설정 및 실행 연습 필요');
        }
        break;
    }

    return improvements;
  };

  const currentProgress = progressData[selectedCharacter] || createEmptyProgress(selectedCharacter);
  const character = AI_CHARACTERS_DETAILED[selectedCharacter];

  if (!character) return null;

  return (
    <ThemeAwareCard useIWLTheme variant="iwl" className={className}>
      <ThemeAwareCardHeader useIWLTheme>
        <ThemeAwareCardTitle useIWLTheme>
          학습 진도 분석
        </ThemeAwareCardTitle>
      </ThemeAwareCardHeader>
      
      <ThemeAwareCardContent useIWLTheme>
        {/* 캐릭터 선택 */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {Object.keys(AI_CHARACTERS_DETAILED).map((charId) => (
              <button
                key={charId}
                onClick={() => setSelectedCharacter(charId)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCharacter === charId
                    ? 'shadow-md transform scale-105'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: selectedCharacter === charId 
                    ? 'var(--iwl-primary)' 
                    : 'var(--iwl-surface)',
                  color: selectedCharacter === charId 
                    ? 'white' 
                    : 'var(--iwl-text)',
                  border: `1px solid ${selectedCharacter === charId ? 'var(--iwl-primary)' : 'var(--iwl-border)'}`
                }}
              >
                {AI_CHARACTERS_DETAILED[charId].emoji} {AI_CHARACTERS_DETAILED[charId].name}
              </button>
            ))}
          </div>
        </div>

        {/* 기본 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--iwl-primary)' }}>
              {currentProgress.totalSessions}
            </div>
            <div className="text-sm" style={{ color: 'var(--iwl-text-muted)' }}>
              총 세션
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--iwl-primary)' }}>
              {currentProgress.totalMessages}
            </div>
            <div className="text-sm" style={{ color: 'var(--iwl-text-muted)' }}>
              총 메시지
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--iwl-primary)' }}>
              {currentProgress.averageSessionLength}
            </div>
            <div className="text-sm" style={{ color: 'var(--iwl-text-muted)' }}>
              평균 세션 길이
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--iwl-primary)' }}>
              {currentProgress.learningStats.problemsSolved}
            </div>
            <div className="text-sm" style={{ color: 'var(--iwl-text-muted)' }}>
              해결한 문제
            </div>
          </div>
        </div>

        {/* 캐릭터별 특화 점수 */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--iwl-text)' }}>
            {character.name}와의 학습 성과
          </h3>
          <div className="space-y-3">
            {Object.entries({
              '논리적 사고': currentProgress.learningStats.analyticalScore,
              '창의적 사고': currentProgress.learningStats.creativityScore,
              '감성 지능': currentProgress.learningStats.empathyScore,
              '동기 부여': currentProgress.learningStats.motivationScore
            }).map(([skill, score]) => (
              <div key={skill}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--iwl-text)' }}>
                    {skill}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--iwl-text-muted)' }}>
                    {score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(score, 100)}%`,
                      backgroundColor: 'var(--iwl-primary)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 성취도 */}
        {currentProgress.achievements.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--iwl-text)' }}>
              🏆 획득한 성취도
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentProgress.achievements.map((achievement) => (
                <span
                  key={achievement}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--iwl-success)',
                    color: 'white'
                  }}
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 강점과 개선점 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 강점 */}
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--iwl-text)' }}>
              💪 학습 강점
            </h3>
            <div className="space-y-2">
              {currentProgress.strengths.length > 0 ? (
                currentProgress.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg text-sm"
                    style={{
                      backgroundColor: 'var(--iwl-success)' + '20',
                      border: '1px solid var(--iwl-success)',
                      color: 'var(--iwl-text)'
                    }}
                  >
                    ✓ {strength}
                  </div>
                ))
              ) : (
                <div className="text-sm" style={{ color: 'var(--iwl-text-muted)' }}>
                  더 많은 대화를 통해 강점을 발견해보세요!
                </div>
              )}
            </div>
          </div>

          {/* 개선점 */}
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--iwl-text)' }}>
              🎯 개선 포인트
            </h3>
            <div className="space-y-2">
              {currentProgress.improvements.length > 0 ? (
                currentProgress.improvements.map((improvement, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg text-sm"
                    style={{
                      backgroundColor: 'var(--iwl-warning)' + '20',
                      border: '1px solid var(--iwl-warning)',
                      color: 'var(--iwl-text)'
                    }}
                  >
                    💡 {improvement}
                  </div>
                ))
              ) : (
                <div className="text-sm" style={{ color: 'var(--iwl-text-muted)' }}>
                  훌륭한 학습 상태를 유지하고 있어요!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 다음 목표 제안 */}
        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--iwl-surface)' }}>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--iwl-text)' }}>
            🎯 다음 학습 목표
          </h3>
          <div className="text-sm" style={{ color: 'var(--iwl-text-muted)' }}>
            {currentProgress.totalSessions < 5 
              ? `${character.name}와 더 많은 대화를 나누어 친밀도를 높여보세요!`
              : currentProgress.averageSessionLength < 15
              ? '한 번의 대화에서 더 깊이 있게 탐구해보세요!'
              : `${character.specialty[0]} 영역에서 전문가 수준에 도전해보세요!`
            }
          </div>
        </div>
      </ThemeAwareCardContent>
    </ThemeAwareCard>
  );
}