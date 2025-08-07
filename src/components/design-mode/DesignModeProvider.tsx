'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { 
  DesignMode, 
  UserContext, 
  DesignModeRecommender, 
  getDesignModeStyles,
  getCurrentTimeOfDay,
  getDeviceType,
  DESIGN_MODES
} from '@/lib/design-mode/design-mode-system';
import type { UserLevel } from '@/lib/theme/theme-system';

interface DesignModeContextType {
  // 현재 상태
  currentMode: DesignMode;
  isAutoMode: boolean;
  
  // 추천 시스템
  recommendedMode: DesignMode;
  confidence: number;
  reasoning: string[];
  
  // 액션
  setMode: (mode: DesignMode) => void;
  toggleAutoMode: () => void;
  applyRecommendation: () => void;
  
  // 세션 추적
  updateUserContext: (context: Partial<UserContext>) => void;
  trackSessionActivity: (activity: {
    interactionCount: number;
    errorCount: number;
    satisfactionIndicators: number;
  }) => void;
  
  // 모드 정보
  getModeConfig: (mode: DesignMode) => typeof DESIGN_MODES[DesignMode];
  getCurrentModeStyles: () => Record<string, string>;
}

const DesignModeContext = createContext<DesignModeContextType | undefined>(undefined);

export function useDesignMode() {
  const context = useContext(DesignModeContext);
  if (!context) {
    throw new Error('useDesignMode must be used within a DesignModeProvider');
  }
  return context;
}

interface DesignModeProviderProps {
  children: React.ReactNode;
  defaultMode?: DesignMode;
  enableAutoMode?: boolean;
}

export function DesignModeProvider({
  children,
  defaultMode = 'helena',
  enableAutoMode = true
}: DesignModeProviderProps) {
  const { currentLevel } = useTheme();
  
  // 상태 관리
  const [currentMode, setCurrentMode] = useState<DesignMode>(defaultMode);
  const [isAutoMode, setIsAutoMode] = useState(enableAutoMode);
  const [userContext, setUserContext] = useState<UserContext>({
    userLevel: currentLevel as UserLevel,
    timeOfDay: getCurrentTimeOfDay(),
    deviceType: getDeviceType(),
    cognitiveState: 'fresh'
  });
  
  // 세션 추적
  const [sessionStartTime] = useState(Date.now());
  const [sessionActivity, setSessionActivity] = useState({
    duration: 0,
    interactionCount: 0,
    errorCount: 0,
    satisfactionIndicators: 0
  });

  // 추천 계산
  const recommendation = DesignModeRecommender.recommendMode(userContext);
  const { mode: recommendedMode, confidence, reasoning } = recommendation;

  // 로컬스토리지 키
  const STORAGE_KEY = 'iwl4-design-mode-preferences';

  // 초기 로드 시 저장된 설정 복원
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { mode, autoMode, previousSessions } = JSON.parse(saved);
        setCurrentMode(mode);
        setIsAutoMode(autoMode);
        
        if (previousSessions) {
          setUserContext(prev => ({
            ...prev,
            previousSessions
          }));
        }
      }
    } catch (error) {
      console.error('디자인 모드 설정 복원 실패:', error);
    }
  }, []);

  // 설정 저장
  const savePreferences = useCallback((mode: DesignMode, autoMode: boolean) => {
    if (typeof window === 'undefined') return;

    try {
      const preferences = {
        mode,
        autoMode,
        previousSessions: userContext.previousSessions || [],
        lastUpdated: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('디자인 모드 설정 저장 실패:', error);
    }
  }, [userContext.previousSessions]);

  // 사용자 레벨 변경 시 컨텍스트 업데이트
  useEffect(() => {
    setUserContext(prev => ({
      ...prev,
      userLevel: currentLevel as UserLevel
    }));
  }, [currentLevel]);

  // 시간 변화 추적
  useEffect(() => {
    const updateTimeOfDay = () => {
      const newTimeOfDay = getCurrentTimeOfDay();
      setUserContext(prev => ({
        ...prev,
        timeOfDay: newTimeOfDay
      }));
    };

    // 매 시간마다 시간대 업데이트
    const interval = setInterval(updateTimeOfDay, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // 세션 지속 시간 추적
  useEffect(() => {
    const updateSessionDuration = () => {
      const duration = Math.floor((Date.now() - sessionStartTime) / (1000 * 60));
      setSessionActivity(prev => ({
        ...prev,
        duration
      }));
    };

    const interval = setInterval(updateSessionDuration, 60 * 1000);
    return () => clearInterval(interval);
  }, [sessionStartTime]);

  // 자동 모드에서 추천 적용
  useEffect(() => {
    if (isAutoMode && recommendedMode !== currentMode && confidence > 0.7) {
      // 높은 확신도일 때만 자동 전환
      const switchRecommendation = DesignModeRecommender.shouldSwitchMode(
        currentMode,
        userContext,
        sessionActivity
      );

      if (switchRecommendation.shouldSwitch && switchRecommendation.suggestedMode === recommendedMode) {
        setCurrentMode(recommendedMode);
        console.log(`자동 모드 전환: ${currentMode} → ${recommendedMode} (확신도: ${Math.round(confidence * 100)}%)`);
      }
    }
  }, [isAutoMode, recommendedMode, currentMode, confidence, userContext, sessionActivity]);

  // CSS 변수 적용
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const styles = getDesignModeStyles(currentMode);
    const root = document.documentElement;

    // CSS 변수 적용
    Object.entries(styles).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // 모드별 클래스 적용
    root.classList.remove('helena-mode', 'rio-mode');
    root.classList.add(`${currentMode}-mode`);

    // 저장
    savePreferences(currentMode, isAutoMode);

  }, [currentMode, savePreferences, isAutoMode]);

  // 액션 함수들
  const setMode = useCallback((mode: DesignMode) => {
    setCurrentMode(mode);
    
    // 수동 설정 시 자동 모드 해제
    if (isAutoMode) {
      setIsAutoMode(false);
    }
  }, [isAutoMode]);

  const toggleAutoMode = useCallback(() => {
    setIsAutoMode(prev => !prev);
  }, []);

  const applyRecommendation = useCallback(() => {
    setCurrentMode(recommendedMode);
  }, [recommendedMode]);

  const updateUserContext = useCallback((newContext: Partial<UserContext>) => {
    setUserContext(prev => ({
      ...prev,
      ...newContext
    }));
  }, []);

  const trackSessionActivity = useCallback((activity: {
    interactionCount: number;
    errorCount: number;
    satisfactionIndicators: number;
  }) => {
    setSessionActivity(prev => ({
      ...prev,
      ...activity
    }));
  }, []);

  const getModeConfig = useCallback((mode: DesignMode) => {
    return DESIGN_MODES[mode];
  }, []);

  const getCurrentModeStyles = useCallback(() => {
    return getDesignModeStyles(currentMode);
  }, [currentMode]);

  const contextValue: DesignModeContextType = {
    // 현재 상태
    currentMode,
    isAutoMode,
    
    // 추천 시스템
    recommendedMode,
    confidence,
    reasoning,
    
    // 액션
    setMode,
    toggleAutoMode,
    applyRecommendation,
    
    // 세션 추적
    updateUserContext,
    trackSessionActivity,
    
    // 모드 정보
    getModeConfig,
    getCurrentModeStyles
  };

  return (
    <DesignModeContext.Provider value={contextValue}>
      {children}
    </DesignModeContext.Provider>
  );
}

/**
 * 디자인 모드 변경 알림을 위한 훅
 */
export function useDesignModeNotification() {
  const { currentMode, recommendedMode, confidence, reasoning, applyRecommendation } = useDesignMode();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (recommendedMode !== currentMode && confidence > 0.8) {
      setShowNotification(true);
      
      // 5초 후 자동 숨김
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [recommendedMode, currentMode, confidence]);

  const acceptRecommendation = useCallback(() => {
    applyRecommendation();
    setShowNotification(false);
  }, [applyRecommendation]);

  const dismissNotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  return {
    showNotification,
    recommendedMode,
    confidence,
    reasoning,
    acceptRecommendation,
    dismissNotification
  };
}