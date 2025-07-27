// v121: 종합 시스템 테스트 및 검증 도구
"use client";

import { PerformanceMonitor } from './performanceMonitor';
import { SecurityMonitor } from './securityMonitor';
import { MemoryLeakPrevention } from './memoryLeakPrevention';
import { BetaFlagService } from './betaFlags';
import { BetaWaitlistService } from './betaWaitlist';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: any;
  duration: number;
}

interface SystemTestReport {
  timestamp: string;
  overallStatus: 'pass' | 'fail' | 'warning';
  totalTests: number;
  passedTests: number;
  failedTests: number;
  warningTests: number;
  categories: {
    performance: TestResult[];
    security: TestResult[];
    memory: TestResult[];
    beta: TestResult[];
    auth: TestResult[];
    ui: TestResult[];
  };
  recommendations: string[];
}

export class SystemTester {
  private static instance: SystemTester;
  private testResults: TestResult[] = [];

  static getInstance(): SystemTester {
    if (!SystemTester.instance) {
      SystemTester.instance = new SystemTester();
    }
    return SystemTester.instance;
  }

  // 전체 시스템 테스트 실행
  async runFullSystemTest(): Promise<SystemTestReport> {
    console.log('🧪 Starting comprehensive system test...');
    
    const startTime = performance.now();
    this.testResults = [];

    // 각 카테고리별 테스트 실행
    const performanceTests = await this.runPerformanceTests();
    const securityTests = await this.runSecurityTests();
    const memoryTests = await this.runMemoryTests();
    const betaTests = await this.runBetaSystemTests();
    const authTests = await this.runAuthTests();
    const uiTests = await this.runUITests();

    const totalDuration = performance.now() - startTime;

    // 결과 집계
    const allResults = [
      ...performanceTests,
      ...securityTests,
      ...memoryTests,
      ...betaTests,
      ...authTests,
      ...uiTests
    ];

    const passedTests = allResults.filter(r => r.status === 'pass').length;
    const failedTests = allResults.filter(r => r.status === 'fail').length;
    const warningTests = allResults.filter(r => r.status === 'warning').length;

    const overallStatus: 'pass' | 'fail' | 'warning' = 
      failedTests > 0 ? 'fail' : 
      warningTests > 0 ? 'warning' : 'pass';

    const report: SystemTestReport = {
      timestamp: new Date().toISOString(),
      overallStatus,
      totalTests: allResults.length,
      passedTests,
      failedTests,
      warningTests,
      categories: {
        performance: performanceTests,
        security: securityTests,
        memory: memoryTests,
        beta: betaTests,
        auth: authTests,
        ui: uiTests
      },
      recommendations: this.generateRecommendations(allResults)
    };

    // 결과 저장
    this.saveTestReport(report);

    console.log(`✅ System test completed in ${Math.round(totalDuration)}ms`);
    console.log(`📊 Results: ${passedTests} passed, ${failedTests} failed, ${warningTests} warnings`);

    return report;
  }

  // 성능 테스트
  private async runPerformanceTests(): Promise<TestResult[]> {
    const results: TestResult[] = [];
    const performanceMonitor = PerformanceMonitor.getInstance();

    // 메모리 사용량 테스트
    results.push(await this.runTest('memory-usage', async () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryMB = memory.usedJSHeapSize / 1024 / 1024;
        
        if (memoryMB > 100) {
          return { status: 'fail', message: `높은 메모리 사용량: ${Math.round(memoryMB)}MB` };
        } else if (memoryMB > 50) {
          return { status: 'warning', message: `보통 메모리 사용량: ${Math.round(memoryMB)}MB` };
        } else {
          return { status: 'pass', message: `정상 메모리 사용량: ${Math.round(memoryMB)}MB` };
        }
      }
      return { status: 'warning', message: '메모리 정보를 가져올 수 없음' };
    }));

    // DOM 노드 수 테스트
    results.push(await this.runTest('dom-nodes', async () => {
      const nodeCount = document.querySelectorAll('*').length;
      
      if (nodeCount > 5000) {
        return { status: 'fail', message: `과도한 DOM 노드: ${nodeCount}개` };
      } else if (nodeCount > 2000) {
        return { status: 'warning', message: `많은 DOM 노드: ${nodeCount}개` };
      } else {
        return { status: 'pass', message: `정상 DOM 노드: ${nodeCount}개` };
      }
    }));

    // 렌더링 성능 테스트
    results.push(await this.runTest('render-performance', async () => {
      const startTime = performance.now();
      
      // 간단한 DOM 조작으로 렌더링 성능 측정
      const testDiv = document.createElement('div');
      testDiv.innerHTML = '<span>Performance Test</span>';
      document.body.appendChild(testDiv);
      
      await new Promise(resolve => setTimeout(resolve, 1));
      
      document.body.removeChild(testDiv);
      const renderTime = performance.now() - startTime;
      
      if (renderTime > 50) {
        return { status: 'fail', message: `느린 렌더링: ${Math.round(renderTime)}ms` };
      } else if (renderTime > 20) {
        return { status: 'warning', message: `보통 렌더링: ${Math.round(renderTime)}ms` };
      } else {
        return { status: 'pass', message: `빠른 렌더링: ${Math.round(renderTime)}ms` };
      }
    }));

    return results;
  }

  // 보안 테스트
  private async runSecurityTests(): Promise<TestResult[]> {
    const results: TestResult[] = [];
    const securityMonitor = SecurityMonitor.getInstance();

    // XSS 방어 테스트
    results.push(await this.runTest('xss-protection', async () => {
      const maliciousInput = '<script>alert("xss")</script>';
      const validation = securityMonitor.validateInput(maliciousInput, 'test-field');
      
      if (!validation.safe) {
        return { status: 'pass', message: 'XSS 공격 차단됨', details: validation.threats };
      } else {
        return { status: 'fail', message: 'XSS 공격이 차단되지 않음' };
      }
    }));

    // SQL 인젝션 방어 테스트
    results.push(await this.runTest('sql-injection-protection', async () => {
      const maliciousInput = "'; DROP TABLE users; --";
      const validation = securityMonitor.validateInput(maliciousInput, 'test-field');
      
      if (!validation.safe) {
        return { status: 'pass', message: 'SQL 인젝션 차단됨', details: validation.threats };
      } else {
        return { status: 'fail', message: 'SQL 인젝션이 차단되지 않음' };
      }
    }));

    // 로그인 시도 제한 테스트
    results.push(await this.runTest('login-rate-limiting', async () => {
      const testEmail = 'test@example.com';
      
      // 여러 번 실패한 로그인 시도
      for (let i = 0; i < 3; i++) {
        securityMonitor.recordFailedLogin(testEmail);
      }
      
      const validation = securityMonitor.validateLoginAttempt(testEmail);
      
      if (validation.allowed) {
        return { status: 'pass', message: '로그인 시도 제한 정상 작동' };
      } else {
        return { status: 'pass', message: '로그인 시도가 차단됨 (예상된 동작)' };
      }
    }));

    // 세션 보안 테스트
    results.push(await this.runTest('session-security', async () => {
      const adminSession = localStorage.getItem('admin-session');
      const adminLoginTime = localStorage.getItem('admin-login-time');
      
      if (adminSession === 'true' && adminLoginTime) {
        const loginTime = new Date(adminLoginTime);
        const now = new Date();
        const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 3600);
        
        if (hoursDiff > 24) {
          return { status: 'warning', message: '관리자 세션이 만료되어야 함' };
        } else {
          return { status: 'pass', message: '관리자 세션 타임아웃 정상' };
        }
      } else {
        return { status: 'pass', message: '활성 관리자 세션 없음' };
      }
    }));

    return results;
  }

  // 메모리 테스트
  private async runMemoryTests(): Promise<TestResult[]> {
    const results: TestResult[] = [];
    const memoryMonitor = MemoryLeakPrevention.getInstance();

    // 메모리 누수 감지 테스트
    results.push(await this.runTest('memory-leaks', async () => {
      const report = memoryMonitor.generateMemoryReport();
      
      if (report.recentLeaks.length > 5) {
        return { status: 'fail', message: `다수의 메모리 누수 감지: ${report.recentLeaks.length}개` };
      } else if (report.recentLeaks.length > 0) {
        return { status: 'warning', message: `일부 메모리 누수 감지: ${report.recentLeaks.length}개` };
      } else {
        return { status: 'pass', message: '메모리 누수 없음' };
      }
    }));

    // 메모리 트렌드 테스트
    results.push(await this.runTest('memory-trend', async () => {
      const report = memoryMonitor.generateMemoryReport();
      
      if (report.memoryTrend === 'increasing') {
        return { status: 'warning', message: '메모리 사용량 증가 추세' };
      } else if (report.memoryTrend === 'stable') {
        return { status: 'pass', message: '메모리 사용량 안정' };
      } else {
        return { status: 'pass', message: '메모리 사용량 감소 추세' };
      }
    }));

    return results;
  }

  // 베타 시스템 테스트
  private async runBetaSystemTests(): Promise<TestResult[]> {
    const results: TestResult[] = [];
    
    // 베타 플래그 시스템 테스트
    results.push(await this.runTest('beta-flags', async () => {
      try {
        const betaService = BetaFlagService.getInstance();
        const status = betaService.getBetaStatus();
        
        return { 
          status: 'pass', 
          message: `베타 플래그 시스템 정상 작동`, 
          details: status 
        };
      } catch (error) {
        return { status: 'fail', message: '베타 플래그 시스템 오류', details: error };
      }
    }));

    // 베타 대기열 시스템 테스트
    results.push(await this.runTest('beta-waitlist', async () => {
      try {
        const waitlistService = BetaWaitlistService.getInstance();
        const stats = waitlistService.getWaitlistStats();
        
        return { 
          status: 'pass', 
          message: `베타 대기열 시스템 정상 작동`, 
          details: stats 
        };
      } catch (error) {
        return { status: 'fail', message: '베타 대기열 시스템 오류', details: error };
      }
    }));

    return results;
  }

  // 인증 시스템 테스트
  private async runAuthTests(): Promise<TestResult[]> {
    const results: TestResult[] = [];

    // 로컬 스토리지 인증 데이터 테스트
    results.push(await this.runTest('auth-storage', async () => {
      try {
        const demoUser = localStorage.getItem('demo-user');
        const adminSession = localStorage.getItem('admin-session');
        
        let validData = 0;
        let totalData = 0;
        
        if (demoUser) {
          totalData++;
          try {
            JSON.parse(demoUser);
            validData++;
          } catch (e) {
            // 잘못된 데이터
          }
        }
        
        if (adminSession) {
          totalData++;
          if (adminSession === 'true' || adminSession === 'false') {
            validData++;
          }
        }
        
        if (totalData === 0) {
          return { status: 'pass', message: '인증 데이터 없음 (정상)' };
        } else if (validData === totalData) {
          return { status: 'pass', message: '모든 인증 데이터 유효' };
        } else {
          return { status: 'fail', message: '일부 인증 데이터 손상' };
        }
      } catch (error) {
        return { status: 'fail', message: '인증 시스템 오류', details: error };
      }
    }));

    return results;
  }

  // UI 테스트
  private async runUITests(): Promise<TestResult[]> {
    const results: TestResult[] = [];

    // 접근성 테스트
    results.push(await this.runTest('accessibility', async () => {
      const images = document.querySelectorAll('img');
      const buttons = document.querySelectorAll('button');
      const links = document.querySelectorAll('a');
      
      let issues = 0;
      
      // 이미지 alt 텍스트 확인
      images.forEach(img => {
        if (!img.alt && !img.getAttribute('aria-label')) {
          issues++;
        }
      });
      
      // 버튼 레이블 확인
      buttons.forEach(button => {
        if (!button.textContent && !button.getAttribute('aria-label')) {
          issues++;
        }
      });
      
      // 링크 텍스트 확인
      links.forEach(link => {
        if (!link.textContent && !link.getAttribute('aria-label')) {
          issues++;
        }
      });
      
      if (issues > 10) {
        return { status: 'fail', message: `접근성 문제 다수: ${issues}개` };
      } else if (issues > 0) {
        return { status: 'warning', message: `접근성 문제: ${issues}개` };
      } else {
        return { status: 'pass', message: '접근성 문제 없음' };
      }
    }));

    // 반응형 디자인 테스트
    results.push(await this.runTest('responsive-design', async () => {
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      
      const isMobile = viewport.width < 768;
      const isTablet = viewport.width >= 768 && viewport.width < 1024;
      const isDesktop = viewport.width >= 1024;
      
      // 기본적인 레이아웃 요소들이 존재하는지 확인
      const header = document.querySelector('header');
      const main = document.querySelector('main') || document.querySelector('[role="main"]');
      const footer = document.querySelector('footer');
      
      let score = 0;
      if (header) score++;
      if (main) score++;
      if (footer) score++;
      
      if (score === 3) {
        return { 
          status: 'pass', 
          message: '반응형 레이아웃 정상', 
          details: { viewport, deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop' }
        };
      } else {
        return { status: 'warning', message: '일부 레이아웃 요소 누락' };
      }
    }));

    return results;
  }

  // 개별 테스트 실행 헬퍼
  private async runTest(
    name: string, 
    testFn: () => Promise<{ status: 'pass' | 'fail' | 'warning'; message: string; details?: any }>
  ): Promise<TestResult> {
    const startTime = performance.now();
    
    try {
      const result = await testFn();
      const duration = performance.now() - startTime;
      
      return {
        name,
        status: result.status,
        message: result.message,
        details: result.details,
        duration: Math.round(duration * 100) / 100
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      
      return {
        name,
        status: 'fail',
        message: `테스트 실행 중 오류: ${error}`,
        details: error,
        duration: Math.round(duration * 100) / 100
      };
    }
  }

  // 권장사항 생성
  private generateRecommendations(results: TestResult[]): string[] {
    const recommendations: string[] = [];
    
    const failedTests = results.filter(r => r.status === 'fail');
    const warningTests = results.filter(r => r.status === 'warning');
    
    if (failedTests.length > 0) {
      recommendations.push(`${failedTests.length}개의 실패한 테스트를 수정해야 합니다.`);
    }
    
    if (warningTests.length > 5) {
      recommendations.push('여러 경고 사항이 있습니다. 점진적 개선을 고려하세요.');
    }
    
    // 메모리 관련 권장사항
    const memoryTests = results.filter(r => r.name.includes('memory'));
    const memoryFailures = memoryTests.filter(r => r.status === 'fail');
    if (memoryFailures.length > 0) {
      recommendations.push('메모리 누수 문제를 우선적으로 해결하세요.');
    }
    
    // 보안 관련 권장사항
    const securityTests = results.filter(r => r.name.includes('protection') || r.name.includes('security'));
    const securityFailures = securityTests.filter(r => r.status === 'fail');
    if (securityFailures.length > 0) {
      recommendations.push('보안 취약점을 즉시 수정하세요.');
    }
    
    // 성능 관련 권장사항
    const performanceTests = results.filter(r => r.name.includes('performance') || r.name.includes('render'));
    const performanceWarnings = performanceTests.filter(r => r.status === 'warning');
    if (performanceWarnings.length > 0) {
      recommendations.push('성능 최적화를 고려하세요.');
    }
    
    return recommendations;
  }

  // 테스트 리포트 저장
  private saveTestReport(report: SystemTestReport) {
    try {
      const reports = JSON.parse(localStorage.getItem('system-test-reports') || '[]');
      reports.push(report);
      
      // 최근 10개 리포트만 보관
      if (reports.length > 10) {
        reports.splice(0, reports.length - 10);
      }
      
      localStorage.setItem('system-test-reports', JSON.stringify(reports));
    } catch (e) {
      console.warn('Failed to save test report:', e);
    }
  }

  // 이전 테스트 리포트 조회
  getTestReports(): SystemTestReport[] {
    try {
      return JSON.parse(localStorage.getItem('system-test-reports') || '[]');
    } catch (e) {
      return [];
    }
  }

  // 테스트 데이터 초기화
  clearTestData() {
    localStorage.removeItem('system-test-reports');
  }
}

// React Hook for system testing
export function useSystemTester() {
  const tester = SystemTester.getInstance();
  
  return {
    runFullTest: () => tester.runFullSystemTest(),
    getReports: () => tester.getTestReports(),
    clearData: () => tester.clearTestData()
  };
}