/**
 * ===================================================================
 * IdeaWorkLab v3.3 Typing Indicator Component
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * AI 파트너 '아키(Archi)'의 타이핑 상태 표시 컴포넌트
 * ===================================================================
 */

'use client';

import React from 'react';
import { TypingIndicatorProps } from './types';
import { BRAIN_STATES, ARCHI_CONFIG } from './constants';
import { getBrainStateIcon } from './helpers';

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  isVisible,
  brainState = 'thinking',
  className = '',
}) => {
  if (!isVisible) return null;

  const stateConfig = BRAIN_STATES[brainState];

  return (
    <div className={`flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-pulse ${className}`}>
      {/* 아키 아바타 */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {getBrainStateIcon(brainState)}
        </div>
      </div>

      {/* 타이핑 내용 */}
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            {ARCHI_CONFIG.NAME}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            stateConfig.color === 'yellow' 
              ? 'bg-yellow-100 text-yellow-800'
              : stateConfig.color === 'green'
              ? 'bg-green-100 text-green-800'
              : stateConfig.color === 'orange'
              ? 'bg-orange-100 text-orange-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {stateConfig.label}
          </span>
        </div>
        
        <div className="flex items-center space-x-1 mt-1">
          <span className="text-sm text-gray-500">
            {stateConfig.description}
          </span>
          
          {/* 애니메이션 점들 */}
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>

      {/* 상태별 추가 시각적 요소 */}
      {brainState === 'thinking' && (
        <div className="flex-shrink-0">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {brainState === 'insights' && (
        <div className="flex-shrink-0">
          <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-yellow-600 text-xs">💡</span>
          </div>
        </div>
      )}
    </div>
  );
};

// 타이핑 효과를 위한 텍스트 애니메이션 컴포넌트
export const TypingText: React.FC<{
  text: string;
  speed?: number;
  onComplete?: () => void;
}> = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  React.useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

// 브레인 상태 변화 애니메이션 컴포넌트
export const BrainStateTransition: React.FC<{
  from: string;
  to: string;
  duration?: number;
}> = ({ from, to, duration = 1000 }) => {
  const [isTransitioning, setIsTransitioning] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isTransitioning) return null;

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 animate-fade-in-out">
      <span>{from}</span>
      <span className="animate-pulse">→</span>
      <span>{to}</span>
    </div>
  );
};

// 사고 과정 시각화 컴포넌트
export const ThinkingProcess: React.FC<{
  steps: string[];
  currentStep: number;
  className?: string;
}> = ({ steps, currentStep, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {steps.map((step, index) => (
        <div 
          key={index}
          className={`flex items-center space-x-2 text-sm transition-all duration-300 ${
            index === currentStep 
              ? 'text-blue-600 font-medium' 
              : index < currentStep 
              ? 'text-green-600' 
              : 'text-gray-400'
          }`}
        >
          <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
            index === currentStep 
              ? 'bg-blue-100 animate-pulse' 
              : index < currentStep 
              ? 'bg-green-100' 
              : 'bg-gray-100'
          }`}>
            {index < currentStep ? '✓' : index + 1}
          </div>
          <span>{step}</span>
          {index === currentStep && (
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TypingIndicator;