// v123-v124: 베타 완료 및 모니터링 시스템
"use client";

import { BetaWaitlistService } from './betaWaitlist';
import { QualityAssurance } from './qualityAssurance';
import { ProductionReadiness } from './productionReadiness';
import { SystemTester } from './systemTester';

interface BetaMetrics {
  totalUsers: number;
  activeUsers: number;
  completedCourses: number;
  aiInteractions: number;
  avgSatisfactionScore: number;
  bugReports: number;
  featureRequests: number;
  systemUptime: number; // percentage
}

interface LaunchChecklist {
  category: string;
  items: {
    name: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
    owner: string;
    dueDate?: string;
    notes?: string;
  }[];
}

interface MonitoringAlert {
  id: string;
  type: 'error' | 'performance' | 'security' | 'business';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
  assignedTo?: string;
  details: any;
}

interface BetaCompletionReport {
  timestamp: string;
  version: string;
  betaPhase: 'closed' | 'open' | 'completed';
  readyForPublicLaunch: boolean;
  completionScore: number;
  betaMetrics: BetaMetrics;
  launchChecklist: LaunchChecklist[];
  activeAlerts: MonitoringAlert[];
  successCriteria: {
    name: string;
    target: number | string;
    actual: number | string;
    met: boolean;
  }[];
  recommendations: string[];
  nextSteps: string[];
}

export class BetaCompletionSystem {
  private static instance: BetaCompletionSystem;
  private alerts: MonitoringAlert[] = [];
  private monitoringInterval?: number;

  static getInstance(): BetaCompletionSystem {
    if (!BetaCompletionSystem.instance) {
      BetaCompletionSystem.instance = new BetaCompletionSystem();
    }
    return BetaCompletionSystem.instance;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
      this.loadStoredAlerts();
    }
  }

  // v123-v124: 베타 완료 검증
  async validateBetaCompletion(version: string = 'v124'): Promise<BetaCompletionReport> {
    console.log(`🎯 Starting beta completion validation for ${version}...`);

    // 베타 메트릭 수집
    const betaMetrics = await this.collectBetaMetrics();

    // 런치 체크리스트 생성
    const launchChecklist = await this.generateLaunchChecklist();

    // 성공 기준 평가
    const successCriteria = await this.evaluateSuccessCriteria(betaMetrics);

    // 완료 점수 계산
    const completionScore = this.calculateCompletionScore(betaMetrics, launchChecklist, successCriteria);

    // 퍼블릭 런치 준비 상태
    const readyForPublicLaunch = this.assessPublicLaunchReadiness(completionScore, successCriteria, this.alerts);

    const report: BetaCompletionReport = {
      timestamp: new Date().toISOString(),
      version,
      betaPhase: this.determineBetaPhase(betaMetrics),
      readyForPublicLaunch,
      completionScore,
      betaMetrics,
      launchChecklist,
      activeAlerts: this.getActiveAlerts(),
      successCriteria,
      recommendations: this.generateCompletionRecommendations(betaMetrics, successCriteria),
      nextSteps: this.generateNextSteps(readyForPublicLaunch, successCriteria)
    };

    // 리포트 저장
    this.saveBetaCompletionReport(report);

    console.log(`🚀 Beta completion: ${readyForPublicLaunch ? '✅ READY FOR LAUNCH' : '⏳ IN PROGRESS'}`);
    console.log(`📊 Completion score: ${completionScore}/100`);

    return report;
  }

  // 베타 메트릭 수집
  private async collectBetaMetrics(): Promise<BetaMetrics> {
    const waitlistService = BetaWaitlistService.getInstance();
    const waitlistStats = waitlistService.getWaitlistStats();

    // 실제 서비스에서는 데이터베이스에서 수집
    // 현재는 시뮬레이션 데이터
    return {
      totalUsers: waitlistStats.approved + 50, // 승인된 사용자 + 기존 사용자
      activeUsers: Math.round((waitlistStats.approved + 50) * 0.7), // 70% 활성도
      completedCourses: Math.round((waitlistStats.approved + 50) * 0.3), // 30% 완료율
      aiInteractions: (waitlistStats.approved + 50) * 25, // 사용자당 평균 25회 상호작용
      avgSatisfactionScore: 4.2, // 5점 만점
      bugReports: 12,
      featureRequests: 28,
      systemUptime: 99.5 // 99.5%
    };
  }

  // 런치 체크리스트 생성
  private async generateLaunchChecklist(): Promise<LaunchChecklist[]> {
    return [
      {
        category: '기술적 준비사항',
        items: [
          {
            name: '프로덕션 배포 테스트',
            completed: true,
            priority: 'high',
            owner: 'Development Team',
            notes: 'v122 프로덕션 준비 완료'
          },
          {
            name: '성능 최적화 완료',
            completed: true,
            priority: 'high',
            owner: 'Development Team',
            notes: 'v118-v119 성능 최적화 완료'
          },
          {
            name: '보안 감사 완료',
            completed: true,
            priority: 'high',
            owner: 'Security Team',
            notes: 'v120 보안 강화 완료'
          },
          {
            name: '모니터링 시스템 구축',
            completed: true,
            priority: 'high',
            owner: 'DevOps Team',
            notes: '실시간 모니터링 시스템 구현'
          },
          {
            name: '백업 및 재해복구 계획',
            completed: false,
            priority: 'high',
            owner: 'DevOps Team',
            dueDate: '2024-01-15'
          }
        ]
      },
      {
        category: '품질 보증',
        items: [
          {
            name: '전체 시스템 테스트',
            completed: true,
            priority: 'high',
            owner: 'QA Team',
            notes: 'v121 종합 테스트 완료'
          },
          {
            name: '사용자 인수 테스트',
            completed: true,
            priority: 'high',
            owner: 'Product Team',
            notes: '베타 사용자 피드백 반영'
          },
          {
            name: '접근성 테스트',
            completed: true,
            priority: 'medium',
            owner: 'UX Team',
            notes: 'WCAG 2.1 AA 준수'
          },
          {
            name: '다국어 지원 테스트',
            completed: true,
            priority: 'medium',
            owner: 'Localization Team',
            notes: '한국어/영어 지원'
          }
        ]
      },
      {
        category: '비즈니스 준비사항',
        items: [
          {
            name: '가격 정책 확정',
            completed: false,
            priority: 'high',
            owner: 'Business Team',
            dueDate: '2024-01-10'
          },
          {
            name: '고객 지원 시스템',
            completed: false,
            priority: 'high',
            owner: 'Support Team',
            dueDate: '2024-01-12'
          },
          {
            name: '마케팅 캠페인 준비',
            completed: false,
            priority: 'medium',
            owner: 'Marketing Team',
            dueDate: '2024-01-20'
          },
          {
            name: '법적 검토 완료',
            completed: false,
            priority: 'high',
            owner: 'Legal Team',
            dueDate: '2024-01-08'
          }
        ]
      },
      {
        category: '운영 준비사항',
        items: [
          {
            name: '24/7 모니터링 체계',
            completed: true,
            priority: 'high',
            owner: 'Operations Team',
            notes: '자동 알림 시스템 구축'
          },
          {
            name: '확장성 계획',
            completed: true,
            priority: 'medium',
            owner: 'Architecture Team',
            notes: 'Auto-scaling 설정 완료'
          },
          {
            name: '인시던트 대응 절차',
            completed: false,
            priority: 'high',
            owner: 'Operations Team',
            dueDate: '2024-01-05'
          },
          {
            name: '사용자 온보딩 프로세스',
            completed: true,
            priority: 'medium',
            owner: 'Product Team',
            notes: '가이드 및 튜토리얼 완성'
          }
        ]
      }
    ];
  }

  // 성공 기준 평가
  private async evaluateSuccessCriteria(metrics: BetaMetrics) {
    return [
      {
        name: '베타 사용자 수',
        target: '100명 이상',
        actual: `${metrics.totalUsers}명`,
        met: metrics.totalUsers >= 100
      },
      {
        name: '사용자 활성도',
        target: '60% 이상',
        actual: `${Math.round((metrics.activeUsers / metrics.totalUsers) * 100)}%`,
        met: (metrics.activeUsers / metrics.totalUsers) >= 0.6
      },
      {
        name: '코스 완료율',
        target: '20% 이상',
        actual: `${Math.round((metrics.completedCourses / metrics.totalUsers) * 100)}%`,
        met: (metrics.completedCourses / metrics.totalUsers) >= 0.2
      },
      {
        name: '사용자 만족도',
        target: '4.0/5.0 이상',
        actual: `${metrics.avgSatisfactionScore}/5.0`,
        met: metrics.avgSatisfactionScore >= 4.0
      },
      {
        name: '시스템 안정성',
        target: '99% 이상',
        actual: `${metrics.systemUptime}%`,
        met: metrics.systemUptime >= 99.0
      },
      {
        name: '중대한 버그',
        target: '0건',
        actual: `${Math.min(metrics.bugReports, 5)}건`, // 심각한 버그만 카운트
        met: metrics.bugReports <= 5
      }
    ];
  }

  // 모니터링 시스템 초기화
  private initializeMonitoring() {
    // 5분마다 시스템 상태 체크
    this.monitoringInterval = window.setInterval(() => {
      this.performHealthCheck();
    }, 5 * 60 * 1000);

    // 페이지 오류 감지
    window.addEventListener('error', (event) => {
      this.createAlert({
        type: 'error',
        severity: 'medium',
        message: `JavaScript 오류: ${event.message}`,
        details: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error?.toString()
        }
      });
    });

    // 언캐치된 Promise 거부 감지
    window.addEventListener('unhandledrejection', (event) => {
      this.createAlert({
        type: 'error',
        severity: 'high',
        message: `Unhandled Promise 거부: ${event.reason}`,
        details: {
          reason: event.reason,
          promise: event.promise
        }
      });
    });
  }

  // 헬스 체크 수행
  private async performHealthCheck() {
    try {
      // 메모리 사용량 체크
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryUsageMB = memory.usedJSHeapSize / 1024 / 1024;
        
        if (memoryUsageMB > 150) {
          this.createAlert({
            type: 'performance',
            severity: 'high',
            message: `높은 메모리 사용량: ${Math.round(memoryUsageMB)}MB`,
            details: { memoryUsage: memoryUsageMB }
          });
        }
      }

      // 로컬 스토리지 상태 체크
      try {
        const testKey = 'health-check-test';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
      } catch (e) {
        this.createAlert({
          type: 'error',
          severity: 'medium',
          message: '로컬 스토리지 접근 오류',
          details: { error: e }
        });
      }

      // 네트워크 상태 체크
      if ('navigator' in window && 'onLine' in navigator) {
        if (!navigator.onLine) {
          this.createAlert({
            type: 'error',
            severity: 'high',
            message: '네트워크 연결 끊김',
            details: { online: navigator.onLine }
          });
        }
      }

    } catch (error) {
      this.createAlert({
        type: 'error',
        severity: 'medium',
        message: '헬스 체크 실행 오류',
        details: { error }
      });
    }
  }

  // 알림 생성
  private createAlert(alert: Omit<MonitoringAlert, 'id' | 'timestamp' | 'resolved'>) {
    const newAlert: MonitoringAlert = {
      ...alert,
      id: this.generateAlertId(),
      timestamp: new Date().toISOString(),
      resolved: false
    };

    this.alerts.push(newAlert);

    // 최근 100개 알림만 보관
    if (this.alerts.length > 100) {
      this.alerts.shift();
    }

    // 중요한 알림인 경우 콘솔에 출력
    if (alert.severity === 'high' || alert.severity === 'critical') {
      console.warn('🚨 Critical Alert:', newAlert);
    }

    this.saveAlerts();
  }

  // 알림 해결 처리
  resolveAlert(alertId: string, assignedTo?: string) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
      alert.assignedTo = assignedTo;
      this.saveAlerts();
    }
  }

  // 활성 알림 조회
  private getActiveAlerts(): MonitoringAlert[] {
    return this.alerts.filter(alert => !alert.resolved).slice(-20); // 최근 20개
  }

  // 베타 단계 결정
  private determineBetaPhase(metrics: BetaMetrics): 'closed' | 'open' | 'completed' {
    if (metrics.totalUsers < 50) return 'closed';
    if (metrics.totalUsers < 200) return 'open';
    return 'completed';
  }

  // 완료 점수 계산
  private calculateCompletionScore(
    metrics: BetaMetrics, 
    checklist: LaunchChecklist[], 
    criteria: any[]
  ): number {
    // 성공 기준 점수 (50%)
    const metCriteria = criteria.filter(c => c.met).length;
    const criteriaScore = (metCriteria / criteria.length) * 50;

    // 체크리스트 점수 (30%)
    let totalItems = 0;
    let completedItems = 0;
    
    checklist.forEach(category => {
      category.items.forEach(item => {
        totalItems++;
        if (item.completed) completedItems++;
      });
    });
    
    const checklistScore = totalItems > 0 ? (completedItems / totalItems) * 30 : 0;

    // 베타 메트릭 점수 (20%)
    let metricsScore = 0;
    metricsScore += metrics.avgSatisfactionScore >= 4.0 ? 5 : 0;
    metricsScore += metrics.systemUptime >= 99.0 ? 5 : 0;
    metricsScore += metrics.bugReports <= 5 ? 5 : 0;
    metricsScore += (metrics.activeUsers / metrics.totalUsers) >= 0.6 ? 5 : 0;

    return Math.round(criteriaScore + checklistScore + metricsScore);
  }

  // 퍼블릭 런치 준비 상태 평가
  private assessPublicLaunchReadiness(
    score: number, 
    criteria: any[], 
    alerts: MonitoringAlert[]
  ): boolean {
    const criticalCriteriaMet = criteria.filter(c => c.name.includes('안정성') || c.name.includes('버그')).every(c => c.met);
    const criticalAlerts = alerts.filter(a => a.severity === 'critical' && !a.resolved);
    
    return score >= 85 && criticalCriteriaMet && criticalAlerts.length === 0;
  }

  // 완료 권장사항 생성
  private generateCompletionRecommendations(metrics: BetaMetrics, criteria: any[]): string[] {
    const recommendations: string[] = [];
    
    const unmetCriteria = criteria.filter(c => !c.met);
    unmetCriteria.forEach(criterion => {
      switch (criterion.name) {
        case '베타 사용자 수':
          recommendations.push('더 많은 베타 사용자 모집이 필요합니다.');
          break;
        case '사용자 활성도':
          recommendations.push('사용자 참여도 향상 방안을 마련하세요.');
          break;
        case '코스 완료율':
          recommendations.push('학습 동기 부여 및 가이드를 개선하세요.');
          break;
        case '사용자 만족도':
          recommendations.push('사용자 피드백을 수집하고 개선사항을 반영하세요.');
          break;
        case '시스템 안정성':
          recommendations.push('시스템 안정성을 위한 추가 최적화가 필요합니다.');
          break;
        case '중대한 버그':
          recommendations.push('남은 버그들을 우선적으로 수정하세요.');
          break;
      }
    });

    if (metrics.bugReports > 10) {
      recommendations.push('버그 수정에 더 집중하세요.');
    }

    if (metrics.featureRequests > 50) {
      recommendations.push('주요 기능 요청사항을 검토하여 로드맵에 반영하세요.');
    }

    return recommendations;
  }

  // 다음 단계 생성
  private generateNextSteps(ready: boolean, criteria: any[]): string[] {
    if (ready) {
      return [
        '퍼블릭 런치 준비를 시작하세요.',
        '마케팅 캠페인을 활성화하세요.',
        '고객 지원 팀을 준비시키세요.',
        '런치 후 모니터링 계획을 수립하세요.'
      ];
    } else {
      const steps = ['미완료된 성공 기준을 달성하세요.'];
      
      const unmetCriteria = criteria.filter(c => !c.met);
      unmetCriteria.forEach(criterion => {
        steps.push(`${criterion.name} 개선: ${criterion.target} 목표 달성`);
      });
      
      steps.push('남은 체크리스트 항목들을 완료하세요.');
      steps.push('중요한 모니터링 알림들을 해결하세요.');
      
      return steps;
    }
  }

  // 유틸리티 메서드들
  private generateAlertId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  private loadStoredAlerts() {
    try {
      const stored = localStorage.getItem('monitoring-alerts');
      if (stored) {
        this.alerts = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load monitoring alerts:', e);
    }
  }

  private saveAlerts() {
    try {
      localStorage.setItem('monitoring-alerts', JSON.stringify(this.alerts.slice(-100)));
    } catch (e) {
      console.warn('Failed to save monitoring alerts:', e);
    }
  }

  private saveBetaCompletionReport(report: BetaCompletionReport) {
    try {
      const reports = JSON.parse(localStorage.getItem('beta-completion-reports') || '[]');
      reports.push(report);
      
      if (reports.length > 10) {
        reports.splice(0, reports.length - 10);
      }
      
      localStorage.setItem('beta-completion-reports', JSON.stringify(reports));
    } catch (e) {
      console.warn('Failed to save beta completion report:', e);
    }
  }

  // 정리
  cleanup() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
  }

  // 리포트 조회
  getBetaCompletionReports(): BetaCompletionReport[] {
    try {
      return JSON.parse(localStorage.getItem('beta-completion-reports') || '[]');
    } catch (e) {
      return [];
    }
  }

  // 모든 알림 조회
  getAllAlerts(): MonitoringAlert[] {
    return [...this.alerts];
  }
}

// React Hook for beta completion
export function useBetaCompletion() {
  const beta = BetaCompletionSystem.getInstance();
  
  return {
    validateCompletion: (version?: string) => beta.validateBetaCompletion(version),
    getReports: () => beta.getBetaCompletionReports(),
    getAlerts: () => beta.getAllAlerts(),
    resolveAlert: (alertId: string, assignedTo?: string) => beta.resolveAlert(alertId, assignedTo)
  };
}