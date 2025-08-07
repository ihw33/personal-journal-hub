'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useDesignMode } from '@/components/design-mode/DesignModeProvider';
import { AI_CHARACTERS_DETAILED, type AICharacterPersonality } from '@/lib/ai/character-personality';

export interface CharacterAvatarProps {
  characterId: string;
  isTyping?: boolean;
  isActive?: boolean;
  mood?: 'default' | 'thinking' | 'excited' | 'empathetic' | 'focused';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  className?: string;
  onClick?: () => void;
}

// 캐릭터별 색상 정의
const CHARACTER_COLORS = {
  '생각이': '#6B73FF',
  '아키': '#FF6B6B', 
  '미루미': '#FFB4D6',
  '반짝이': '#FFE66D'
} as const;

// 크기별 스타일
const SIZES = {
  sm: { avatar: 'w-8 h-8', emoji: 'text-lg', pulse: 'w-10 h-10' },
  md: { avatar: 'w-12 h-12', emoji: 'text-2xl', pulse: 'w-14 h-14' },
  lg: { avatar: 'w-16 h-16', emoji: 'text-3xl', pulse: 'w-18 h-18' },
  xl: { avatar: 'w-20 h-20', emoji: 'text-4xl', pulse: 'w-22 h-22' }
} as const;

export function CharacterAvatar({
  characterId,
  isTyping = false,
  isActive = false,
  mood = 'default',
  size = 'md',
  showStatus = false,
  className = '',
  onClick
}: CharacterAvatarProps) {
  const [animationState, setAnimationState] = useState<'idle' | 'bounce' | 'pulse' | 'shake'>('idle');
  const [showSpecialEffect, setShowSpecialEffect] = useState(false);

  const character = AI_CHARACTERS_DETAILED[characterId];
  const color = CHARACTER_COLORS[characterId as keyof typeof CHARACTER_COLORS] || '#6B73FF';
  const sizeStyles = SIZES[size];

  // 캐릭터별 특성에 따른 애니메이션
  useEffect(() => {
    if (isTyping) {
      setAnimationState('pulse');
    } else if (isActive) {
      // 캐릭터별 고유 애니메이션
      switch (characterId) {
        case '생각이':
          setAnimationState('pulse'); // 차분한 맥박
          break;
        case '아키':
          setAnimationState('bounce'); // 활발한 바운스
          break;
        case '미루미':
          setAnimationState('pulse'); // 부드러운 맥박
          break;
        case '반짝이':
          setAnimationState('shake'); // 활기찬 흔들림
          break;
        default:
          setAnimationState('idle');
      }
    } else {
      setAnimationState('idle');
    }
  }, [isTyping, isActive, characterId]);

  // 특수 효과 트리거
  useEffect(() => {
    if (isActive && !isTyping) {
      const timer = setTimeout(() => {
        setShowSpecialEffect(true);
        setTimeout(() => setShowSpecialEffect(false), 1000);
      }, Math.random() * 5000 + 3000); // 3-8초 후 특수 효과

      return () => clearTimeout(timer);
    }
  }, [isActive, isTyping]);

  // 기분에 따른 이모지 변화
  const getEmoji = () => {
    if (!character) return '🤖';

    switch (mood) {
      case 'thinking':
        return characterId === '생각이' ? '🧐' : 
               characterId === '아키' ? '💭' :
               characterId === '미루미' ? '😌' :
               characterId === '반짝이' ? '🤔' : character.emoji;
      case 'excited':
        return characterId === '생각이' ? '😊' :
               characterId === '아키' ? '🚀' :
               characterId === '미루미' ? '😄' :
               characterId === '반짝이' ? '🎉' : character.emoji;
      case 'empathetic':
        return characterId === '생각이' ? '😌' :
               characterId === '아키' ? '🤗' :
               characterId === '미루미' ? '💝' :
               characterId === '반짝이' ? '💖' : character.emoji;
      case 'focused':
        return characterId === '생각이' ? '🎯' :
               characterId === '아키' ? '⚡' :
               characterId === '미루미' ? '🌟' :
               characterId === '반짝이' ? '🔥' : character.emoji;
      default:
        return character.emoji;
    }
  };

  // 애니메이션 클래스
  const getAnimationClass = () => {
    switch (animationState) {
      case 'bounce':
        return 'animate-bounce';
      case 'pulse':
        return 'animate-pulse';
      case 'shake':
        return 'animate-pulse'; // shake 대신 pulse 사용 (shake는 CSS에서 커스텀 필요)
      default:
        return '';
    }
  };

  // 캐릭터별 특수 효과
  const getSpecialElements = () => {
    if (!showSpecialEffect) return null;

    const effects = character?.specialFeatures?.visualElements || [];
    
    return effects.slice(0, 2).map((effect, index) => (
      <div
        key={index}
        className={`absolute text-xs opacity-60 animate-ping ${
          index === 0 ? '-top-1 -right-1' : '-bottom-1 -left-1'
        }`}
        style={{ color }}
      >
        {effect.split(' ')[0]} {/* 첫 번째 이모지만 표시 */}
      </div>
    ));
  };

  const { currentMode } = useDesignMode();

  return (
    <div className={cn(
      'relative inline-block character-avatar design-mode-transition',
      className
    )}>
      {/* 배경 펄스 효과 (활성화 시) */}
      {isActive && (
        <div 
          className={`absolute inset-0 ${sizeStyles.pulse} rounded-full opacity-20 animate-ping`}
          style={{ backgroundColor: color }}
        />
      )}

      {/* 타이핑 인디케이터 */}
      {isTyping && (
        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-white shadow-sm animate-pulse"
             style={{ backgroundColor: color }}>
          <div className="absolute inset-1 rounded-full bg-white animate-ping" />
        </div>
      )}

      {/* 메인 아바타 */}
      <button
        onClick={onClick}
        disabled={!onClick}
        className={`
          ${sizeStyles.avatar} rounded-full flex items-center justify-center
          transition-all duration-300 transform hover:scale-105
          ${getAnimationClass()}
          ${onClick ? 'cursor-pointer' : 'cursor-default'}
          ${isActive ? 'shadow-lg' : 'shadow-sm'}
        `}
        style={{
          backgroundColor: color + '20',
          border: `2px solid ${color}40`,
          boxShadow: isActive ? `0 4px 20px ${color}30` : undefined
        }}
      >
        <span className={`${sizeStyles.emoji} ${isTyping ? 'animate-pulse' : ''}`}>
          {getEmoji()}
        </span>
      </button>

      {/* 특수 효과 */}
      {getSpecialElements()}

      {/* 상태 표시 */}
      {showStatus && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <div 
            className="px-2 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap"
            style={{ backgroundColor: color }}
          >
            {isTyping ? '입력 중...' : 
             isActive ? '활성' :
             character?.role || '대기'}
          </div>
        </div>
      )}

      {/* 기분 인디케이터 */}
      {mood !== 'default' && (
        <div 
          className="absolute -top-1 -left-1 w-3 h-3 rounded-full border border-white"
          style={{ backgroundColor: color }}
          title={mood}
        >
          <div className="w-full h-full rounded-full animate-ping opacity-75"
               style={{ backgroundColor: color }} />
        </div>
      )}
    </div>
  );
}

/**
 * 멀티 캐릭터 아바타 그룹 컴포넌트
 */
export interface CharacterAvatarGroupProps {
  characters: string[];
  activeCharacter?: string;
  typingCharacter?: string;
  size?: 'sm' | 'md' | 'lg';
  onCharacterSelect?: (characterId: string) => void;
  className?: string;
}

export function CharacterAvatarGroup({
  characters,
  activeCharacter,
  typingCharacter,
  size = 'md',
  onCharacterSelect,
  className = ''
}: CharacterAvatarGroupProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {characters.map((characterId, index) => (
        <CharacterAvatar
          key={characterId}
          characterId={characterId}
          size={size}
          isActive={activeCharacter === characterId}
          isTyping={typingCharacter === characterId}
          onClick={onCharacterSelect ? () => onCharacterSelect(characterId) : undefined}
          className={`transition-transform duration-200 ${
            index > 0 ? '-ml-2' : ''
          } ${activeCharacter === characterId ? 'z-10' : 'z-0'}`}
        />
      ))}
    </div>
  );
}

/**
 * 대화형 캐릭터 아바타 (채팅 메시지용)
 */
export interface ChatCharacterAvatarProps {
  characterId: string;
  messageType?: 'greeting' | 'question' | 'explanation' | 'encouragement' | 'summary' | 'farewell';
  isLatest?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function ChatCharacterAvatar({
  characterId,
  messageType = 'explanation',
  isLatest = false,
  size = 'sm',
  className = ''
}: ChatCharacterAvatarProps) {
  // 메시지 타입에 따른 기분 매핑
  const getMoodFromMessageType = () => {
    switch (messageType) {
      case 'greeting':
      case 'farewell':
        return 'excited';
      case 'question':
        return 'thinking';
      case 'encouragement':
        return 'empathetic';
      case 'summary':
        return 'focused';
      default:
        return 'default';
    }
  };

  return (
    <CharacterAvatar
      characterId={characterId}
      mood={getMoodFromMessageType()}
      size={size}
      isActive={isLatest}
      showStatus={false}
      className={className}
    />
  );
}