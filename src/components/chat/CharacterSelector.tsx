'use client';

import React, { useState } from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { ThemeAwareButton } from '@/components/ui/theme-aware/ThemeAwareButton';
import { ThemeAwareCard, ThemeAwareCardContent, ThemeAwareCardHeader, ThemeAwareCardTitle } from '@/components/ui/theme-aware/ThemeAwareCard';
import { AI_CHARACTERS_DETAILED, getRecommendedCharacter } from '@/lib/ai/character-personality';
import type { UserLevel } from '@/lib/theme/theme-system';

export interface AICharacter {
  id: string;
  name: string;
  emoji: string;
  color: string;
  role: string;
  description: string;
  personality: string;
  specialty: string[];
  levelPreference?: string[];
}

// UI 표시용 캐릭터 정보 (색상 포함)
export const AI_CHARACTERS: Record<string, AICharacter> = {
  '생각이': {
    id: '생각이',
    name: '생각이',
    emoji: '🤔',
    color: '#6B73FF',
    role: '깊이 생각하는 친구',
    description: '체계적 분석과 논리적 사고로 복잡한 문제를 차근차근 해결해주는 신뢰할 수 있는 사고력 전문가입니다.',
    personality: 'analytical',
    specialty: ['논리적 사고', '문제 분석', '추론', '비판적 사고'],
    levelPreference: ['adult', 'youth', 'instructor', 'admin']
  },
  '아키': {
    id: '아키',
    name: '아키',
    emoji: '🏗️',
    color: '#FF6B6B',
    role: '창의적 설계자',
    description: '상상력과 혁신적 사고로 새로운 아이디어를 설계하고 실현 가능한 창작물로 만들어주는 전문가입니다.',
    personality: 'creative',
    specialty: ['창의적 사고', '아이디어 발상', '설계', '혁신'],
    levelPreference: ['junior', 'youth', 'adult', 'instructor']
  },
  '미루미': {
    id: '미루미',
    name: '미루미',
    emoji: '🌸',
    color: '#FFB4D6',
    role: '따뜻한 공감자',
    description: '감성과 공감을 바탕으로 마음을 이해하고 인간관계와 소통의 지혜를 나누어주는 전문가입니다.',
    personality: 'empathetic',
    specialty: ['감성적 사고', '공감', '소통', '인간관계'],
    levelPreference: ['junior', 'youth', 'adult', 'instructor']
  },
  '반짝이': {
    id: '반짝이',
    name: '반짝이',
    emoji: '✨',
    color: '#FFE66D',
    role: '활기찬 동기부여자',
    description: '열정과 에너지로 목표 달성을 이끌어주고 지속적인 동기부여와 실행력을 키워주는 전문가입니다.',
    personality: 'motivational',
    specialty: ['동기부여', '실행력', '목표달성', '성과창출'],
    levelPreference: ['youth', 'adult', 'instructor', 'admin']
  }
};

export interface CharacterSelectorProps {
  selectedCharacterId: string;
  onCharacterChange: (characterId: string) => void;
  showRecommendation?: boolean;
  className?: string;
}

export function CharacterSelector({
  selectedCharacterId,
  onCharacterChange,
  showRecommendation = true,
  className = ''
}: CharacterSelectorProps) {
  const { currentLevel } = useTheme();
  const [showDetailedInfo, setShowDetailedInfo] = useState<string | null>(null);
  
  // 현재 레벨에 맞는 추천 캐릭터 찾기 (새로운 추천 시스템 사용)
  const recommendedCharacterId = getRecommendedCharacter(currentLevel as UserLevel);
  const recommendedCharacter = AI_CHARACTERS[recommendedCharacterId] || AI_CHARACTERS['생각이'];

  return (
    <ThemeAwareCard useIWLTheme variant="iwl" className={className}>
      <ThemeAwareCardHeader useIWLTheme>
        <ThemeAwareCardTitle useIWLTheme>
          AI 학습 파트너 선택
        </ThemeAwareCardTitle>
        {showRecommendation && (
          <p className="text-sm" style={{ color: 'var(--iwl-text-muted)' }}>
            <span className="text-base">💡 </span>
            <strong>{recommendedCharacter.name}</strong>을(를) 추천드립니다 - {currentLevel} 레벨에 최적화
          </p>
        )}
      </ThemeAwareCardHeader>
      
      <ThemeAwareCardContent useIWLTheme>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(AI_CHARACTERS).map((character) => {
            const isSelected = character.id === selectedCharacterId;
            const isRecommended = character.id === recommendedCharacter.id;
            const detailedInfo = AI_CHARACTERS_DETAILED[character.id];
            const showDetails = showDetailedInfo === character.id;
            
            return (
              <div
                key={character.id}
                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  isSelected ? 'scale-105' : 'hover:scale-102'
                }`}
                style={{
                  borderColor: isSelected ? character.color : 'var(--iwl-border)',
                  backgroundColor: isSelected 
                    ? character.color + '10' 
                    : 'var(--iwl-surface)',
                  boxShadow: isSelected 
                    ? `0 4px 20px ${character.color}30`
                    : 'var(--iwl-shadow-sm)'
                }}
                onClick={() => onCharacterChange(character.id)}
              >
                {/* 추천 배지 */}
                {isRecommended && (
                  <div 
                    className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold text-white z-10"
                    style={{ backgroundColor: character.color }}
                  >
                    추천
                  </div>
                )}
                
                {/* 상세 정보 버튼 */}
                <button
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110"
                  style={{ 
                    backgroundColor: character.color + '40',
                    color: character.color 
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetailedInfo(showDetails ? null : character.id);
                  }}
                >
                  {showDetails ? '−' : 'i'}
                </button>
                
                {/* 캐릭터 아바타 */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ 
                      backgroundColor: character.color + '20',
                      border: `2px solid ${character.color}40`
                    }}
                  >
                    {character.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="font-bold text-lg"
                      style={{ color: isSelected ? character.color : 'var(--iwl-text)' }}
                    >
                      {character.name}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--iwl-text-muted)' }}>
                      {character.role}
                    </p>
                  </div>
                  
                  {/* 선택 표시 */}
                  {isSelected && (
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                      style={{ backgroundColor: character.color }}
                    >
                      ✓
                    </div>
                  )}
                </div>
                
                {/* 설명 */}
                <p 
                  className="text-sm mb-3 leading-relaxed"
                  style={{ color: 'var(--iwl-text)' }}
                >
                  {character.description}
                </p>
                
                {/* 전문 분야 */}
                <div className="space-y-2 mb-3">
                  <p className="text-xs font-medium" style={{ color: 'var(--iwl-text-muted)' }}>
                    전문 분야
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {character.specialty.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: character.color + '20',
                          color: character.color,
                          border: `1px solid ${character.color}40`
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 상세 정보 확장 영역 */}
                {showDetails && detailedInfo && (
                  <div className="mt-4 pt-4 border-t space-y-3" style={{ borderColor: 'var(--iwl-border)' }}>
                    {/* 성격 특성 */}
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: 'var(--iwl-text-muted)' }}>
                        📋 성격 특성
                      </p>
                      <p className="text-xs" style={{ color: 'var(--iwl-text)' }}>
                        {detailedInfo.personalityTraits.primary}
                      </p>
                    </div>

                    {/* 교육 방식 */}
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: 'var(--iwl-text-muted)' }}>
                        🎓 교육 방식
                      </p>
                      <p className="text-xs" style={{ color: 'var(--iwl-text)' }}>
                        {detailedInfo.personalityTraits.teachingStyle}
                      </p>
                    </div>

                    {/* 의사소통 스타일 */}
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: 'var(--iwl-text-muted)' }}>
                        💬 소통 스타일
                      </p>
                      <p className="text-xs" style={{ color: 'var(--iwl-text)' }}>
                        {detailedInfo.personalityTraits.communicationTone}
                      </p>
                    </div>

                    {/* 지원 레벨 */}
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: 'var(--iwl-text-muted)' }}>
                        🎯 최적 학습 레벨
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {detailedInfo.teachingMethodology.supportedLevels.map((level) => (
                          <span
                            key={level}
                            className={`px-2 py-1 rounded-full text-xs ${
                              level === currentLevel ? 'font-bold' : ''
                            }`}
                            style={{
                              backgroundColor: level === currentLevel 
                                ? character.color + '40' 
                                : character.color + '15',
                              color: character.color,
                              border: `1px solid ${character.color}30`
                            }}
                          >
                            {level === currentLevel && '★ '}{level}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 학습 단계별 특화 (현재 레벨 맞춤) */}
                    {detailedInfo.levelAdaptations[currentLevel as UserLevel] && (
                      <div>
                        <p className="text-xs font-medium mb-1" style={{ color: 'var(--iwl-text-muted)' }}>
                          ⚙️ {currentLevel} 레벨 맞춤 설정
                        </p>
                        <div className="text-xs space-y-1" style={{ color: 'var(--iwl-text)' }}>
                          <p><strong>어휘:</strong> {detailedInfo.levelAdaptations[currentLevel as UserLevel].vocabulary}</p>
                          <p><strong>동기부여:</strong> {detailedInfo.levelAdaptations[currentLevel as UserLevel].motivationStyle}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* 선택 버튼 */}
        <div className="mt-6 text-center">
          <ThemeAwareButton
            useIWLTheme
            variant="iwl"
            size="lg"
            className="w-full md:w-auto px-8"
            style={{
              backgroundColor: AI_CHARACTERS[selectedCharacterId]?.color,
              border: 'none'
            }}
          >
            {AI_CHARACTERS[selectedCharacterId]?.emoji} {AI_CHARACTERS[selectedCharacterId]?.name}와 학습 시작하기
          </ThemeAwareButton>
        </div>
        
        {/* 도움말 */}
        <div 
          className="mt-4 p-3 rounded-lg text-sm"
          style={{ 
            backgroundColor: 'var(--iwl-surface)',
            border: '1px solid var(--iwl-border)'
          }}
        >
          <p className="font-medium mb-2" style={{ color: 'var(--iwl-text)' }}>
            💡 AI 파트너 선택 가이드
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs" style={{ color: 'var(--iwl-text-muted)' }}>
            <div>
              <p className="font-medium mb-1" style={{ color: '#6B73FF' }}>🤔 생각이</p>
              <p>• 논리적 분석과 체계적 사고</p>
              <p>• 복잡한 문제 해결과 추론</p>
              <p>• 비판적 사고력 향상</p>
            </div>
            <div>
              <p className="font-medium mb-1" style={{ color: '#FF6B6B' }}>🏗️ 아키</p>
              <p>• 창의적 아이디어 발상</p>
              <p>• 혁신적 설계와 구조화</p>
              <p>• 상상력과 실험 정신</p>
            </div>
            <div>
              <p className="font-medium mb-1" style={{ color: '#FFB4D6' }}>🌸 미루미</p>
              <p>• 감성 이해와 공감 능력</p>
              <p>• 인간관계와 소통 기술</p>
              <p>• 협력적 학습과 배려</p>
            </div>
            <div>
              <p className="font-medium mb-1" style={{ color: '#FFE66D' }}>✨ 반짝이</p>
              <p>• 목표 달성과 실행력</p>
              <p>• 동기부여와 성과 창출</p>
              <p>• 도전 정신과 리더십</p>
            </div>
          </div>
          
          <div className="mt-3 pt-2 border-t" style={{ borderColor: 'var(--iwl-border)' }}>
            <p className="text-xs" style={{ color: 'var(--iwl-text-muted)' }}>
              💁‍♀️ <strong>팁:</strong> 'i' 버튼을 클릭하면 각 캐릭터의 상세 정보를 확인할 수 있어요!
              현재 <strong>{currentLevel}</strong> 레벨에 최적화된 캐릭터는 <strong style={{ color: recommendedCharacter.color }}>{recommendedCharacter.name}</strong>입니다.
            </p>
          </div>
        </div>
      </ThemeAwareCardContent>
    </ThemeAwareCard>
  );
}