// v115: 베타 테스트 기능 플래그 시스템
"use client";

export interface BetaFlag {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  targetGroup?: 'all' | 'beta' | 'admin';
  rolloutPercentage?: number;
}

export interface BetaConfig {
  version: string;
  releaseDate: string;
  flags: Record<string, BetaFlag>;
}

// v115: 베타 기능 플래그 설정
export const BETA_FLAGS: BetaConfig = {
  version: "v115-beta",
  releaseDate: "2024-12-27",
  flags: {
    // AI 기능 관련
    aiChatbot: {
      key: "aiChatbot",
      name: "AI 챗봇",
      description: "AI와의 실시간 대화 기능",
      enabled: true,
      targetGroup: "beta",
      rolloutPercentage: 100
    },
    aiOptimization: {
      key: "aiOptimization", 
      name: "AI 성능 최적화",
      description: "v114 AI 캐싱 및 최적화 기능",
      enabled: true,
      targetGroup: "all",
      rolloutPercentage: 100
    },
    
    // 코스 기능 관련
    trialCourse: {
      key: "trialCourse",
      name: "체험강의",
      description: "무료 체험강의 시스템",
      enabled: true,
      targetGroup: "all",
      rolloutPercentage: 100
    },
    jejuCourse: {
      key: "jejuCourse",
      name: "제주도 코스",
      description: "8주 제주도 여행 기획 과정",
      enabled: true,
      targetGroup: "beta",
      rolloutPercentage: 80
    },
    courseProgress: {
      key: "courseProgress",
      name: "학습 진도 추적",
      description: "개인화된 학습 진도 시스템",
      enabled: true,
      targetGroup: "beta",
      rolloutPercentage: 60
    },
    
    // 사용자 경험 개선
    feedbackSystem: {
      key: "feedbackSystem",
      name: "피드백 시스템",
      description: "실시간 사용자 피드백 수집",
      enabled: true,
      targetGroup: "beta",
      rolloutPercentage: 100
    },
    errorReporting: {
      key: "errorReporting",
      name: "오류 리포팅",
      description: "자동 오류 수집 및 리포팅",
      enabled: true,
      targetGroup: "all",
      rolloutPercentage: 100
    },
    betaAnalytics: {
      key: "betaAnalytics",
      name: "베타 분석",
      description: "베타 테스트 사용 패턴 분석",
      enabled: true,
      targetGroup: "beta",
      rolloutPercentage: 100
    },
    
    // 실험적 기능
    advancedAI: {
      key: "advancedAI",
      name: "고급 AI 기능",
      description: "실험적 AI 기능 (GPT-4, Claude 등)",
      enabled: false,
      targetGroup: "admin",
      rolloutPercentage: 10
    },
    mobilePWA: {
      key: "mobilePWA",
      name: "모바일 PWA",
      description: "Progressive Web App 기능",
      enabled: false,
      targetGroup: "beta",
      rolloutPercentage: 30
    }
  }
};

export class BetaFlagService {
  private static instance: BetaFlagService;
  private userGroup: 'guest' | 'member' | 'beta' | 'admin' = 'guest';
  private userId: string | null = null;

  static getInstance(): BetaFlagService {
    if (!BetaFlagService.instance) {
      BetaFlagService.instance = new BetaFlagService();
    }
    return BetaFlagService.instance;
  }

  // 사용자 그룹 설정
  setUserContext(userId: string, userGroup: 'guest' | 'member' | 'beta' | 'admin'): void {
    this.userId = userId;
    this.userGroup = userGroup;
  }

  // 기능 플래그 확인
  isFeatureEnabled(flagKey: string): boolean {
    // SSR 환경에서는 안전하게 false 반환
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const flag = BETA_FLAGS.flags[flagKey];
      if (!flag) return false;

      // 기능이 비활성화된 경우
      if (!flag.enabled) return false;

      // 타겟 그룹 확인
      if (flag.targetGroup) {
        switch (flag.targetGroup) {
          case 'admin':
            if (this.userGroup !== 'admin') return false;
            break;
          case 'beta':
            if (!['beta', 'admin'].includes(this.userGroup)) return false;
            break;
          case 'all':
            break;
          default:
            return false;
        }
      }

      // 롤아웃 퍼센트 확인 (사용자 ID 기반)
      if (flag.rolloutPercentage && flag.rolloutPercentage < 100) {
        if (!this.userId) return false;
        
        // 사용자 ID를 해시하여 일관된 결과 생성
        const hash = this.hashUserId(this.userId);
        const percentage = hash % 100;
        
        return percentage < flag.rolloutPercentage;
      }

      return true;
    } catch (error) {
      console.warn('Error checking feature flag:', error);
      return false;
    }
  }

  // 사용자 ID 해시 함수 (간단한 구현)
  private hashUserId(userId: string): number {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32비트 정수로 변환
    }
    return Math.abs(hash);
  }

  // 활성화된 기능 목록 반환
  getEnabledFeatures(): BetaFlag[] {
    return Object.values(BETA_FLAGS.flags).filter(flag => 
      this.isFeatureEnabled(flag.key)
    );
  }

  // 모든 기능 플래그 반환 (관리자용)
  getAllFlags(): BetaFlag[] {
    return Object.values(BETA_FLAGS.flags);
  }

  // 기능 사용 통계 로깅
  logFeatureUsage(flagKey: string, action: string = 'used'): void {
    if (this.isFeatureEnabled('betaAnalytics')) {
      const logData = {
        timestamp: new Date().toISOString(),
        userId: this.userId,
        userGroup: this.userGroup,
        flagKey,
        action,
        version: BETA_FLAGS.version
      };

      // 로컬 스토리지에 저장 (실제 구현시 서버로 전송)
      const existingLogs = JSON.parse(localStorage.getItem('beta-feature-logs') || '[]');
      existingLogs.push(logData);
      
      // 최대 1000개 로그만 유지
      if (existingLogs.length > 1000) {
        existingLogs.splice(0, existingLogs.length - 1000);
      }
      
      localStorage.setItem('beta-feature-logs', JSON.stringify(existingLogs));
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🧪 베타 기능 사용:', logData);
      }
    }
  }

  // 베타 테스트 상태 확인
  getBetaStatus(): {
    isBetaTester: boolean;
    version: string;
    enabledFeatures: number;
    totalFeatures: number;
  } {
    const enabledFeatures = this.getEnabledFeatures();
    const totalFeatures = Object.keys(BETA_FLAGS.flags).length;

    return {
      isBetaTester: ['beta', 'admin'].includes(this.userGroup),
      version: BETA_FLAGS.version,
      enabledFeatures: enabledFeatures.length,
      totalFeatures
    };
  }
}

// v115: 베타 플래그 Hook (React hooks는 클라이언트 컴포넌트에서만 사용)
export function useBetaFlag(flagKey: string) {
  if (typeof window === 'undefined') {
    return { isEnabled: false, logUsage: () => {} };
  }
  
  const betaService = BetaFlagService.getInstance();
  const isEnabled = betaService.isFeatureEnabled(flagKey);

  const logUsage = (action: string = 'used') => {
    betaService.logFeatureUsage(flagKey, action);
  };

  return { isEnabled, logUsage };
}

// v115: 베타 컴포넌트 래퍼
export function BetaFeature({ 
  flagKey, 
  children, 
  fallback = null 
}: { 
  flagKey: string; 
  children: any; 
  fallback?: any;
}) {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const betaService = BetaFlagService.getInstance();
  const isEnabled = betaService.isFeatureEnabled(flagKey);

  if (isEnabled) {
    betaService.logFeatureUsage(flagKey, 'rendered');
    return children;
  }
  
  return fallback;
}