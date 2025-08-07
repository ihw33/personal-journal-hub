/**
 * IWL 4.0 Helena/Rio 디자인 모드 시스템
 * 사용자 상황과 학습 맥락에 따라 자동으로 디자인 모드를 전환
 */

import type { UserLevel } from '@/lib/theme/theme-system';

export type DesignMode = 'helena' | 'rio';

export interface DesignModeConfig {
  mode: DesignMode;
  name: string;
  description: string;
  purpose: string;
  visualStyle: {
    layout: 'fluid' | 'structured';
    spacing: 'relaxed' | 'compact';
    colors: 'warm' | 'cool' | 'neutral';
    typography: 'playful' | 'serious';
    components: 'rounded' | 'angular';
    animations: 'gentle' | 'snappy';
  };
  userContext: {
    preferredLevels: UserLevel[];
    idealActivities: string[];
    timeOfDay: string[];
    sessionType: ('exploration' | 'focused-study' | 'review' | 'practice')[];
  };
  cognitiveLoad: 'low' | 'medium' | 'high';
  interactionStyle: 'discovery' | 'guided';
}

export const DESIGN_MODES: Record<DesignMode, DesignModeConfig> = {
  helena: {
    mode: 'helena',
    name: 'Helena',
    description: '탐구와 발견을 위한 자유로운 디자인',
    purpose: '창의적 사고와 자유로운 탐구를 촉진하는 열린 환경',
    visualStyle: {
      layout: 'fluid',
      spacing: 'relaxed',
      colors: 'warm',
      typography: 'playful',
      components: 'rounded',
      animations: 'gentle'
    },
    userContext: {
      preferredLevels: ['junior', 'youth', 'adult'],
      idealActivities: ['브레인스토밍', '창의적 사고', '자유 토론', '아이디어 발상'],
      timeOfDay: ['morning', 'afternoon'],
      sessionType: ['exploration', 'review']
    },
    cognitiveLoad: 'low',
    interactionStyle: 'discovery'
  },
  rio: {
    mode: 'rio',
    name: 'Rio',
    description: '학습과 집중을 위한 구조화된 디자인',
    purpose: '체계적 학습과 깊은 집중을 돕는 정돈된 환경',
    visualStyle: {
      layout: 'structured',
      spacing: 'compact',
      colors: 'cool',
      typography: 'serious',
      components: 'angular',
      animations: 'snappy'
    },
    userContext: {
      preferredLevels: ['adult', 'instructor', 'admin'],
      idealActivities: ['체계적 학습', '문제 해결', '분석적 사고', '집중 학습'],
      timeOfDay: ['afternoon', 'evening'],
      sessionType: ['focused-study', 'practice']
    },
    cognitiveLoad: 'high',
    interactionStyle: 'guided'
  }
};

/**
 * 사용자 상황 분석을 위한 컨텍스트 타입
 */
export interface UserContext {
  userLevel: UserLevel;
  currentActivity?: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  sessionDuration?: number; // 분 단위
  previousSessions?: {
    mode: DesignMode;
    duration: number;
    satisfaction: number; // 1-5
  }[];
  learningGoals?: string[];
  cognitiveState?: 'fresh' | 'focused' | 'tired' | 'distracted';
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

/**
 * 디자인 모드 자동 추천 시스템
 */
export class DesignModeRecommender {
  /**
   * 사용자 컨텍스트를 기반으로 최적의 디자인 모드 추천
   */
  static recommendMode(context: UserContext): {
    mode: DesignMode;
    confidence: number;
    reasoning: string[];
  } {
    const scores = {
      helena: 0,
      rio: 0
    };

    const reasoning: string[] = [];

    // 1. 사용자 레벨 기반 점수 (30%)
    Object.entries(DESIGN_MODES).forEach(([mode, config]) => {
      if (config.userContext.preferredLevels.includes(context.userLevel)) {
        scores[mode as DesignMode] += 30;
        reasoning.push(`${config.name}: ${context.userLevel} 레벨에 적합`);
      }
    });

    // 2. 시간대 기반 점수 (20%)
    Object.entries(DESIGN_MODES).forEach(([mode, config]) => {
      if (config.userContext.timeOfDay.includes(context.timeOfDay)) {
        scores[mode as DesignMode] += 20;
        reasoning.push(`${config.name}: ${context.timeOfDay} 시간대에 최적화`);
      }
    });

    // 3. 인지 상태 기반 점수 (25%)
    if (context.cognitiveState) {
      switch (context.cognitiveState) {
        case 'fresh':
        case 'distracted':
          scores.helena += 25;
          reasoning.push('Helena: 자유로운 탐구가 적합한 인지 상태');
          break;
        case 'focused':
        case 'tired':
          scores.rio += 25;
          reasoning.push('Rio: 구조화된 학습이 적합한 인지 상태');
          break;
      }
    }

    // 4. 세션 지속 시간 기반 점수 (15%)
    if (context.sessionDuration) {
      if (context.sessionDuration <= 20) {
        scores.helena += 15;
        reasoning.push('Helena: 짧은 세션에 적합한 자유로운 탐구');
      } else if (context.sessionDuration > 30) {
        scores.rio += 15;
        reasoning.push('Rio: 긴 세션에 적합한 체계적 학습');
      }
    }

    // 5. 이전 세션 만족도 기반 점수 (10%)
    if (context.previousSessions && context.previousSessions.length > 0) {
      const recentSessions = context.previousSessions.slice(-3);
      const avgSatisfaction = recentSessions.reduce((sum, session) => {
        const modeScore = session.satisfaction * (session.mode === 'helena' ? 1 : -1);
        return sum + modeScore;
      }, 0) / recentSessions.length;

      if (avgSatisfaction > 0) {
        scores.helena += 10;
        reasoning.push('Helena: 최근 Helena 모드 세션 만족도 높음');
      } else {
        scores.rio += 10;
        reasoning.push('Rio: 최근 Rio 모드 세션 만족도 높음');
      }
    }

    // 결과 계산
    const recommendedMode = scores.helena > scores.rio ? 'helena' : 'rio';
    const maxScore = Math.max(scores.helena, scores.rio);
    const confidence = Math.min(maxScore / 100, 1);

    return {
      mode: recommendedMode,
      confidence,
      reasoning
    };
  }

  /**
   * 실시간 모드 전환 필요성 판단
   */
  static shouldSwitchMode(
    currentMode: DesignMode,
    context: UserContext,
    sessionActivity: {
      duration: number;
      interactionCount: number;
      errorCount: number;
      satisfactionIndicators: number; // 긍정적 상호작용 점수
    }
  ): {
    shouldSwitch: boolean;
    suggestedMode?: DesignMode;
    reason?: string;
  } {
    // 1. 세션이 너무 짧으면 전환하지 않음
    if (sessionActivity.duration < 5) {
      return { shouldSwitch: false };
    }

    // 2. 사용자가 현재 모드에 만족하고 있으면 전환하지 않음
    const satisfactionScore = sessionActivity.satisfactionIndicators / sessionActivity.interactionCount;
    if (satisfactionScore > 0.7) {
      return { shouldSwitch: false };
    }

    // 3. 에러율이 높으면 모드 전환 고려
    const errorRate = sessionActivity.errorCount / sessionActivity.interactionCount;
    if (errorRate > 0.3) {
      const alternativeMode = currentMode === 'helena' ? 'rio' : 'helena';
      return {
        shouldSwitch: true,
        suggestedMode: alternativeMode,
        reason: `높은 에러율로 인한 ${DESIGN_MODES[alternativeMode].name} 모드 전환 제안`
      };
    }

    // 4. 상호작용 패턴 기반 판단
    const interactionRate = sessionActivity.interactionCount / sessionActivity.duration;
    
    if (currentMode === 'helena' && interactionRate < 0.5) {
      // Helena 모드에서 상호작용이 적으면 Rio 모드 제안
      return {
        shouldSwitch: true,
        suggestedMode: 'rio',
        reason: '낮은 상호작용으로 인한 집중 모드 전환 제안'
      };
    }

    if (currentMode === 'rio' && interactionRate > 2) {
      // Rio 모드에서 상호작용이 너무 많으면 Helena 모드 제안
      return {
        shouldSwitch: true,
        suggestedMode: 'helena',
        reason: '높은 상호작용으로 인한 탐구 모드 전환 제안'
      };
    }

    return { shouldSwitch: false };
  }
}

/**
 * 디자인 모드별 CSS 변수 생성
 */
export function getDesignModeStyles(mode: DesignMode): Record<string, string> {
  const config = DESIGN_MODES[mode];
  const styles: Record<string, string> = {};

  // 레이아웃 관련
  styles['--iwl-layout-type'] = config.visualStyle.layout;
  styles['--iwl-spacing-scale'] = config.visualStyle.spacing === 'relaxed' ? '1.2' : '0.8';

  // 색상 관련
  switch (config.visualStyle.colors) {
    case 'warm':
      styles['--iwl-design-primary'] = '#FF6B47';
      styles['--iwl-design-secondary'] = '#FFB347';
      styles['--iwl-design-accent'] = '#FF8E71';
      break;
    case 'cool':
      styles['--iwl-design-primary'] = '#4A90E2';
      styles['--iwl-design-secondary'] = '#7BB3F0';
      styles['--iwl-design-accent'] = '#5BA0F2';
      break;
    case 'neutral':
      styles['--iwl-design-primary'] = '#6B73FF';
      styles['--iwl-design-secondary'] = '#9C9EFF';
      styles['--iwl-design-accent'] = '#8B92FF';
      break;
  }

  // 타이포그래피 관련
  styles['--iwl-font-style'] = config.visualStyle.typography;
  styles['--iwl-font-weight-base'] = config.visualStyle.typography === 'playful' ? '400' : '500';

  // 컴포넌트 스타일
  styles['--iwl-border-radius'] = config.visualStyle.components === 'rounded' ? '12px' : '4px';
  styles['--iwl-component-style'] = config.visualStyle.components;

  // 애니메이션 관련
  styles['--iwl-transition-duration'] = config.visualStyle.animations === 'gentle' ? '0.3s' : '0.15s';
  styles['--iwl-animation-style'] = config.visualStyle.animations;

  return styles;
}

/**
 * 현재 시간대 자동 감지
 */
export function getCurrentTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
}

/**
 * 디바이스 타입 감지
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export default DesignModeRecommender;