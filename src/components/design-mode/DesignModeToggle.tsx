'use client';

import React, { useState } from 'react';
import { useDesignMode, useDesignModeNotification } from './DesignModeProvider';
import { ThemeAwareButton } from '@/components/ui/theme-aware/ThemeAwareButton';
import { ThemeAwareCard, ThemeAwareCardContent } from '@/components/ui/theme-aware/ThemeAwareCard';
import { 
  Palette, 
  Zap, 
  Settings, 
  Eye, 
  Brain,
  X,
  Check,
  ArrowRight,
  Sparkles,
  Target
} from 'lucide-react';
import type { DesignMode } from '@/lib/design-mode/design-mode-system';

export function DesignModeToggle() {
  const { 
    currentMode, 
    isAutoMode, 
    setMode, 
    toggleAutoMode, 
    getModeConfig,
    confidence,
    recommendedMode 
  } = useDesignMode();
  
  const [showDetails, setShowDetails] = useState(false);

  const helenaConfig = getModeConfig('helena');
  const rioConfig = getModeConfig('rio');

  return (
    <div className="relative">
      {/* 메인 토글 버튼 */}
      <ThemeAwareButton
        variant="outline"
        size="sm"
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-2"
      >
        {currentMode === 'helena' ? (
          <Sparkles className="w-4 h-4 text-orange-500" />
        ) : (
          <Target className="w-4 h-4 text-blue-500" />
        )}
        <span>{currentMode === 'helena' ? 'Helena' : 'Rio'}</span>
        {isAutoMode && <Zap className="w-3 h-3 text-green-500" />}
      </ThemeAwareButton>

      {/* 상세 모드 선택 패널 */}
      {showDetails && (
        <div className="absolute top-full mt-2 right-0 z-50">
          <ThemeAwareCard useIWLTheme variant="iwl" className="w-80 p-0">
            <ThemeAwareCardContent useIWLTheme className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg" style={{ color: 'var(--iwl-text)' }}>
                  디자인 모드
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 자동 모드 토글 */}
              <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--iwl-surface)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium" style={{ color: 'var(--iwl-text)' }}>
                      자동 모드
                    </span>
                  </div>
                  <button
                    onClick={toggleAutoMode}
                    className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                      isAutoMode ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                      isAutoMode ? 'translate-x-5' : 'translate-x-1'
                    } mt-1`} />
                  </button>
                </div>
                
                {isAutoMode && (
                  <div className="mt-2 text-xs" style={{ color: 'var(--iwl-text-muted)' }}>
                    상황에 따라 자동으로 최적 모드 선택 (현재 확신도: {Math.round(confidence * 100)}%)
                  </div>
                )}
              </div>

              {/* 추천 모드 알림 */}
              {!isAutoMode && recommendedMode !== currentMode && confidence > 0.6 && (
                <div 
                  className="mb-4 p-3 rounded-lg border border-orange-200"
                  style={{ backgroundColor: 'var(--iwl-warning)' + '10' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium" style={{ color: 'var(--iwl-text)' }}>
                      추천 모드
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: 'var(--iwl-text-muted)' }}>
                    현재 상황에는 <strong>{getModeConfig(recommendedMode).name}</strong> 모드가 더 적합할 수 있습니다
                  </p>
                  <ThemeAwareButton
                    size="sm"
                    variant="outline"
                    onClick={() => setMode(recommendedMode)}
                    className="text-xs"
                  >
                    {getModeConfig(recommendedMode).name} 모드로 전환
                  </ThemeAwareButton>
                </div>
              )}

              {/* 모드 선택 버튼 */}
              <div className="space-y-3">
                {/* Helena 모드 */}
                <div 
                  className={`p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    currentMode === 'helena' 
                      ? 'border-orange-400 bg-orange-50' 
                      : 'border-gray-200 hover:border-orange-200'
                  }`}
                  onClick={() => setMode('helena')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-orange-500" />
                      <div>
                        <div className="font-medium text-sm" style={{ color: 'var(--iwl-text)' }}>
                          Helena 모드
                        </div>
                        <div className="text-xs" style={{ color: 'var(--iwl-text-muted)' }}>
                          {helenaConfig.description}
                        </div>
                      </div>
                    </div>
                    {currentMode === 'helena' && (
                      <Check className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {helenaConfig.userContext.idealActivities.slice(0, 2).map((activity) => (
                      <span
                        key={activity}
                        className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rio 모드 */}
                <div 
                  className={`p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    currentMode === 'rio' 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                  onClick={() => setMode('rio')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium text-sm" style={{ color: 'var(--iwl-text)' }}>
                          Rio 모드
                        </div>
                        <div className="text-xs" style={{ color: 'var(--iwl-text-muted)' }}>
                          {rioConfig.description}
                        </div>
                      </div>
                    </div>
                    {currentMode === 'rio' && (
                      <Check className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {rioConfig.userContext.idealActivities.slice(0, 2).map((activity) => (
                      <span
                        key={activity}
                        className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 현재 모드 정보 */}
              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--iwl-surface)' }}>
                <div className="text-xs font-medium mb-2" style={{ color: 'var(--iwl-text)' }}>
                  현재 모드 특징
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs" style={{ color: 'var(--iwl-text-muted)' }}>
                  <div>레이아웃: {getModeConfig(currentMode).visualStyle.layout}</div>
                  <div>간격: {getModeConfig(currentMode).visualStyle.spacing}</div>
                  <div>색상: {getModeConfig(currentMode).visualStyle.colors}</div>
                  <div>타입: {getModeConfig(currentMode).visualStyle.typography}</div>
                </div>
              </div>
            </ThemeAwareCardContent>
          </ThemeAwareCard>
        </div>
      )}
    </div>
  );
}

/**
 * 디자인 모드 추천 알림 컴포넌트
 */
export function DesignModeNotification() {
  const { 
    showNotification, 
    recommendedMode, 
    confidence, 
    reasoning, 
    acceptRecommendation, 
    dismissNotification 
  } = useDesignModeNotification();
  
  const { getModeConfig, currentMode } = useDesignMode();

  if (!showNotification) return null;

  const recommended = getModeConfig(recommendedMode);
  const current = getModeConfig(currentMode);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2">
      <ThemeAwareCard useIWLTheme variant="iwl" className="w-80">
        <ThemeAwareCardContent useIWLTheme className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-500" />
              <span className="font-semibold" style={{ color: 'var(--iwl-text)' }}>
                모드 전환 제안
              </span>
            </div>
            <button
              onClick={dismissNotification}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-2 text-sm">
                {currentMode === 'helena' ? (
                  <Sparkles className="w-4 h-4 text-orange-500" />
                ) : (
                  <Target className="w-4 h-4 text-blue-500" />
                )}
                <span style={{ color: 'var(--iwl-text-muted)' }}>{current.name}</span>
              </div>
              
              <ArrowRight className="w-4 h-4" style={{ color: 'var(--iwl-text-muted)' }} />
              
              <div className="flex items-center gap-2 text-sm">
                {recommendedMode === 'helena' ? (
                  <Sparkles className="w-4 h-4 text-orange-500" />
                ) : (
                  <Target className="w-4 h-4 text-blue-500" />
                )}
                <span className="font-medium" style={{ color: 'var(--iwl-text)' }}>
                  {recommended.name}
                </span>
              </div>
            </div>
            
            <p className="text-sm mb-2" style={{ color: 'var(--iwl-text)' }}>
              {recommended.description}
            </p>
            
            <div className="text-xs" style={{ color: 'var(--iwl-text-muted)' }}>
              확신도: {Math.round(confidence * 100)}%
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xs font-medium mb-1" style={{ color: 'var(--iwl-text)' }}>
              추천 이유:
            </div>
            <ul className="text-xs space-y-1" style={{ color: 'var(--iwl-text-muted)' }}>
              {reasoning.slice(0, 2).map((reason, index) => (
                <li key={index}>• {reason}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2">
            <ThemeAwareButton
              size="sm"
              variant="iwl"
              useIWLTheme
              onClick={acceptRecommendation}
              className="flex-1"
            >
              전환하기
            </ThemeAwareButton>
            <ThemeAwareButton
              size="sm"
              variant="outline"
              onClick={dismissNotification}
              className="flex-1"
            >
              무시하기
            </ThemeAwareButton>
          </div>
        </ThemeAwareCardContent>
      </ThemeAwareCard>
    </div>
  );
}

/**
 * 간단한 모드 인디케이터 (헤더용)
 */
export function DesignModeIndicator() {
  const { currentMode, isAutoMode } = useDesignMode();

  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-gray-100">
      {currentMode === 'helena' ? (
        <Sparkles className="w-3 h-3 text-orange-500" />
      ) : (
        <Target className="w-3 h-3 text-blue-500" />
      )}
      <span className="text-xs font-medium" style={{ color: 'var(--iwl-text)' }}>
        {currentMode === 'helena' ? 'Helena' : 'Rio'}
      </span>
      {isAutoMode && <Zap className="w-2 h-2 text-green-500" />}
    </div>
  );
}