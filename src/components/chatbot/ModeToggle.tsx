/**
 * ===================================================================
 * IdeaWorkLab v3.3 Mode Toggle Component
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * 가이드 수련 vs 자유 수련 모드 전환 컴포넌트
 * ===================================================================
 */

'use client';

import React from 'react';
import { ModeToggleProps, SessionMode } from './types';
import { SESSION_MODES, THINKING_PHASES } from './constants';

const ModeToggle: React.FC<ModeToggleProps> = ({
  mode,
  onModeChange,
  disabled = false,
  className = '',
}) => {
  const handleModeChange = (newMode: SessionMode) => {
    if (!disabled && newMode !== mode) {
      onModeChange(newMode);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 모드 선택 토글 */}
      <div className="relative">
        <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
          {Object.entries(SESSION_MODES).map(([modeKey, modeConfig]) => {
            const isActive = mode === modeKey;
            return (
              <button
                key={modeKey}
                onClick={() => handleModeChange(modeKey as SessionMode)}
                disabled={disabled}
                className={`
                  flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? modeConfig.color === 'blue'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <span className="text-lg">{modeConfig.icon}</span>
                <span>{modeConfig.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 선택된 모드 설명 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
              SESSION_MODES[mode].color === 'blue' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-purple-100 text-purple-600'
            }`}>
              {SESSION_MODES[mode].icon}
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {SESSION_MODES[mode].label}
            </h3>
            <p className="text-gray-600 text-sm">
              {SESSION_MODES[mode].description}
            </p>
          </div>
        </div>

        {/* 가이드 모드일 때 8단계 사고 확장 시스템 표시 */}
        {mode === 'guided' && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              8단계 사고 확장 시스템
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {THINKING_PHASES.map((phase, index) => (
                <div 
                  key={phase.phase}
                  className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg"
                >
                  <span className="text-xs font-medium text-blue-600">
                    {index + 1}
                  </span>
                  <span className="text-sm">{phase.icon}</span>
                  <span className="text-xs font-medium text-blue-800">
                    {phase.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              아키가 체계적인 사고 과정을 통해 깊이 있는 학습을 안내합니다.
            </p>
          </div>
        )}

        {/* 자유 수련 모드일 때 특징 표시 */}
        {mode === 'self-directed' && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              자유 탐구의 특징
            </h4>
            <div className="space-y-2">
              {[
                { icon: '🚀', text: '창의적 발상과 자유로운 아이디어 탐험' },
                { icon: '🌟', text: '직관과 영감을 중시하는 학습 방식' },
                { icon: '🎨', text: '예술적 사고와 상상력 확장' },
                { icon: '💫', text: '예상치 못한 연결고리와 새로운 관점 발견' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <span>{feature.icon}</span>
                  <span className="text-gray-600">{feature.text}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              아키가 자유로운 사고의 동반자로서 창의적 여정에 함께합니다.
            </p>
          </div>
        )}
      </div>

      {/* 모드 전환 시 주의사항 */}
      {!disabled && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600 text-sm">⚠️</span>
            <div className="text-xs text-yellow-800">
              <p className="font-medium mb-1">모드 변경 시 주의사항</p>
              <p>
                진행 중인 세션에서 모드를 변경하면 아키의 대화 스타일과 접근 방식이 
                즉시 전환됩니다. 현재 세션의 맥락은 유지되지만, 새로운 모드에 맞는 
                상호작용이 시작됩니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 모드 비교 컴포넌트
export const ModeComparison: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          수련 모드 비교
        </h3>
      </div>
      
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {Object.entries(SESSION_MODES).map(([modeKey, modeConfig]) => (
          <div key={modeKey} className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                modeConfig.color === 'blue' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-purple-100 text-purple-600'
              }`}>
                {modeConfig.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {modeConfig.label}
                </h4>
                <p className="text-sm text-gray-600">
                  {modeConfig.description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  특징
                </h5>
                <ul className="space-y-1 text-sm text-gray-600">
                  {modeKey === 'guided' ? [
                    '체계적인 8단계 사고 과정',
                    '단계별 안내와 피드백',
                    '구조화된 학습 경험',
                    '논리적 사고력 강화'
                  ] : [
                    '자유로운 창의적 탐구',
                    '직관과 영감 중심',
                    '유연한 대화 흐름',
                    '예술적 사고력 확장'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-gray-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  적합한 상황
                </h5>
                <p className="text-sm text-gray-600">
                  {modeKey === 'guided' 
                    ? '복잡한 문제 분석, 논리적 사고 훈련, 체계적 학습이 필요한 경우'
                    : '창의적 아이디어 발상, 예술적 영감, 자유로운 탐구가 필요한 경우'
                  }
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeToggle;