// v120: 보안 모니터링 및 강화 시스템
"use client";

interface SecurityEvent {
  type: 'suspicious_activity' | 'failed_login' | 'admin_attempt' | 'data_access' | 'injection_attempt';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  userAgent?: string;
  ip?: string;
  userId?: string;
  details: Record<string, any>;
  blocked: boolean;
}

interface SecurityConfig {
  maxFailedLogins: number;
  loginAttemptWindow: number; // minutes
  suspiciousPatterns: string[];
  blockedUserAgents: string[];
  rateLimitWindow: number; // minutes
  maxRequestsPerWindow: number;
}

export class SecurityMonitor {
  private static instance: SecurityMonitor;
  private events: SecurityEvent[] = [];
  private blockedIPs: Set<string> = new Set();
  private failedAttempts: Map<string, { count: number; lastAttempt: Date }> = new Map();
  
  private config: SecurityConfig = {
    maxFailedLogins: 5,
    loginAttemptWindow: 15,
    suspiciousPatterns: [
      'script',
      'javascript:',
      '<script',
      'eval(',
      'document.cookie',
      'localStorage',
      'sessionStorage',
      'XMLHttpRequest',
      'fetch(',
      'onload=',
      'onerror=',
      'onclick='
    ],
    blockedUserAgents: [
      'bot',
      'crawler',
      'spider',
      'scraper'
    ],
    rateLimitWindow: 5,
    maxRequestsPerWindow: 100
  };

  static getInstance(): SecurityMonitor {
    if (!SecurityMonitor.instance) {
      SecurityMonitor.instance = new SecurityMonitor();
    }
    return SecurityMonitor.instance;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
      this.loadStoredData();
    }
  }

  private initializeMonitoring() {
    // 콘솔 사용 모니터링
    this.monitorConsoleUsage();
    
    // 개발자 도구 감지
    this.detectDevTools();
    
    // XSS 시도 감지
    this.monitorXSSAttempts();
    
    // 비정상적인 DOM 조작 감지
    this.monitorDOMManipulation();
    
    // 주기적 보안 체크
    setInterval(() => this.performSecurityChecks(), 30000); // 30초마다
  }

  private loadStoredData() {
    try {
      const storedEvents = localStorage.getItem('security-events');
      if (storedEvents) {
        this.events = JSON.parse(storedEvents);
        // 24시간 이상 된 이벤트 제거
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        this.events = this.events.filter(event => new Date(event.timestamp) > oneDayAgo);
      }
    } catch (e) {
      console.warn('Failed to load security events:', e);
    }
  }

  private saveEvents() {
    try {
      localStorage.setItem('security-events', JSON.stringify(this.events.slice(-100))); // 최근 100개만 저장
    } catch (e) {
      console.warn('Failed to save security events:', e);
    }
  }

  // 보안 이벤트 기록
  logSecurityEvent(event: Omit<SecurityEvent, 'timestamp'>) {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined
    };

    this.events.push(securityEvent);
    this.saveEvents();

    // 심각한 보안 이벤트인 경우 즉시 대응
    if (event.severity === 'critical' || event.severity === 'high') {
      this.handleCriticalSecurityEvent(securityEvent);
    }

    console.warn('Security Event:', securityEvent);
  }

  // 로그인 시도 검증
  validateLoginAttempt(identifier: string): { allowed: boolean; reason?: string } {
    const attempts = this.failedAttempts.get(identifier);
    const now = new Date();

    if (attempts) {
      const timeDiff = now.getTime() - attempts.lastAttempt.getTime();
      const minutesDiff = timeDiff / (1000 * 60);

      // 시간 윈도우가 지나면 카운터 리셋
      if (minutesDiff > this.config.loginAttemptWindow) {
        this.failedAttempts.delete(identifier);
        return { allowed: true };
      }

      // 최대 시도 횟수 초과
      if (attempts.count >= this.config.maxFailedLogins) {
        this.logSecurityEvent({
          type: 'failed_login',
          severity: 'high',
          details: { identifier, attemptCount: attempts.count },
          blocked: true
        });
        return { allowed: false, reason: '너무 많은 로그인 시도입니다. 15분 후 다시 시도해주세요.' };
      }
    }

    return { allowed: true };
  }

  // 실패한 로그인 시도 기록
  recordFailedLogin(identifier: string) {
    const attempts = this.failedAttempts.get(identifier);
    const now = new Date();

    if (attempts) {
      attempts.count++;
      attempts.lastAttempt = now;
    } else {
      this.failedAttempts.set(identifier, { count: 1, lastAttempt: now });
    }

    this.logSecurityEvent({
      type: 'failed_login',
      severity: 'medium',
      details: { identifier, attemptCount: this.failedAttempts.get(identifier)?.count },
      blocked: false
    });
  }

  // 성공한 로그인 - 카운터 리셋
  recordSuccessfulLogin(identifier: string) {
    this.failedAttempts.delete(identifier);
  }

  // 관리자 액세스 시도 검증
  validateAdminAccess(): { allowed: boolean; reason?: string } {
    const recentAdminAttempts = this.events.filter(event => 
      event.type === 'admin_attempt' && 
      new Date(event.timestamp) > new Date(Date.now() - 60 * 60 * 1000) // 1시간 내
    );

    if (recentAdminAttempts.length > 3) {
      this.logSecurityEvent({
        type: 'admin_attempt',
        severity: 'critical',
        details: { recentAttempts: recentAdminAttempts.length },
        blocked: true
      });
      return { allowed: false, reason: '관리자 액세스 시도가 너무 빈번합니다.' };
    }

    return { allowed: true };
  }

  // 입력 데이터 보안 검증
  validateInput(input: string, fieldName: string): { safe: boolean; threats: string[] } {
    const threats: string[] = [];
    const lowerInput = input.toLowerCase();

    // XSS 패턴 검사
    for (const pattern of this.config.suspiciousPatterns) {
      if (lowerInput.includes(pattern.toLowerCase())) {
        threats.push(`XSS pattern detected: ${pattern}`);
      }
    }

    // SQL Injection 패턴 검사
    const sqlPatterns = [
      // Common SQL Injection keywords
      '' OR '1'='1',
      '' OR 1=1 --',
      '" OR 1=1 --',
      'OR 1=1',
      '--',
      ';',
      '/*',
      '*/',
      'xp_cmdshell',
      'exec',
      'sp_executesql',
      'UNION ALL SELECT',
      'UNION SELECT',
      'information_schema',
      'table_schema',
      'table_name',
      'column_name',
      'DROP TABLE',
      'TRUNCATE TABLE',
      'DELETE FROM',
      'INSERT INTO',
      'UPDATE',
      'SELECT',
    ];

    for (const pattern of sqlPatterns) {
      if (lowerInput.includes(pattern)) {
        threats.push(`SQL injection pattern detected: ${pattern}`);
      }
    }

    if (threats.length > 0) {
      this.logSecurityEvent({
        type: 'injection_attempt',
        severity: 'high',
        details: { fieldName, input: input.substring(0, 100), threats },
        blocked: true
      });
    }

    return { safe: threats.length === 0, threats };
  }

  // 콘솔 사용 모니터링
  private monitorConsoleUsage() {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = (...args) => {
      this.checkConsoleUsage('log', args);
      originalLog.apply(console, args);
    };

    console.warn = (...args) => {
      this.checkConsoleUsage('warn', args);
      originalWarn.apply(console, args);
    };

    console.error = (...args) => {
      this.checkConsoleUsage('error', args);
      originalError.apply(console, args);
    };
  }

  private checkConsoleUsage(type: string, args: any[]) {
    const message = args.join(' ');
    
    // 악의적인 콘솔 사용 패턴 감지
    if (message.includes('password') || message.includes('token') || message.includes('secret')) {
      this.logSecurityEvent({
        type: 'suspicious_activity',
        severity: 'medium',
        details: { consoleType: type, suspiciousContent: true },
        blocked: false
      });
    }
  }

  // 개발자 도구 감지
  private detectDevTools() {
    let devtools = false;
    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools) {
          devtools = true;
          this.logSecurityEvent({
            type: 'suspicious_activity',
            severity: 'low',
            details: { devToolsDetected: true },
            blocked: false
          });
        }
      } else {
        devtools = false;
      }
    }, 500);
  }

  // XSS 시도 감지
  private monitorXSSAttempts() {
    // DOM에 추가되는 스크립트 태그 감지
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName === 'SCRIPT' || 
                element.innerHTML?.includes('<script') ||
                element.getAttribute?.('onload') ||
                element.getAttribute?.('onerror')) {
              
              this.logSecurityEvent({
                type: 'injection_attempt',
                severity: 'critical',
                details: { 
                  suspiciousElement: element.tagName,
                  innerHTML: element.innerHTML?.substring(0, 100)
                },
                blocked: true
              });
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // DOM 조작 모니터링
  private monitorDOMManipulation() {
    let domModifications = 0;
    const resetInterval = 60000; // 1분

    const observer = new MutationObserver(() => {
      domModifications++;
      
      // 1분 내 100회 이상 DOM 수정 시 의심스러운 활동으로 간주
      if (domModifications > 100) {
        this.logSecurityEvent({
          type: 'suspicious_activity',
          severity: 'medium',
          details: { excessiveDOMModifications: domModifications },
          blocked: false
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    // 1분마다 카운터 리셋
    setInterval(() => {
      domModifications = 0;
    }, resetInterval);
  }

  // 주기적 보안 체크
  private performSecurityChecks() {
    // 로컬 스토리지 무결성 검사
    this.checkLocalStorageIntegrity();
    
    // 세션 유효성 검사
    this.validateSessionSecurity();
    
    // 메모리 사용량 체크
    this.checkMemoryUsage();
  }

  private checkLocalStorageIntegrity() {
    try {
      const criticalKeys = ['admin-session', 'demo-user', 'performance-metrics'];
      
      for (const key of criticalKeys) {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            JSON.parse(value);
          } catch (e) {
            this.logSecurityEvent({
              type: 'data_access',
              severity: 'medium',
              details: { corruptedData: key },
              blocked: false
            });
          }
        }
      }
    } catch (e) {
      // localStorage 접근 불가
    }
  }

  private validateSessionSecurity() {
    // 세션 타임아웃 체크
    const adminLoginTime = localStorage.getItem('admin-login-time');
    if (adminLoginTime) {
      const loginTime = new Date(adminLoginTime);
      const now = new Date();
      const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 3600);
      
      if (hoursDiff > 24) {
        this.logSecurityEvent({
          type: 'suspicious_activity',
          severity: 'medium',
          details: { expiredSession: true, hoursDiff },
          blocked: false
        });
      }
    }
  }

  private checkMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryMB = memory.usedJSHeapSize / 1024 / 1024;
      
      // 메모리 사용량이 100MB 이상이면 경고
      if (memoryMB > 100) {
        this.logSecurityEvent({
          type: 'suspicious_activity',
          severity: 'low',
          details: { excessiveMemoryUsage: Math.round(memoryMB) },
          blocked: false
        });
      }
    }
  }

  // 심각한 보안 이벤트 처리
  private handleCriticalSecurityEvent(event: SecurityEvent) {
    // 임시 보안 모드 활성화
    this.enableSecurityMode();
    
    // 관리자에게 알림 (실제 환경에서는 이메일/슬랙 등)
    console.error('🚨 CRITICAL SECURITY EVENT:', event);
    
    // 사용자에게 보안 경고 표시
    if (typeof window !== 'undefined') {
      const warningDiv = document.createElement('div');
      warningDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #dc2626;
        color: white;
        padding: 10px;
        text-align: center;
        z-index: 10000;
        font-family: sans-serif;
      `;
      warningDiv.textContent = '보안 위협이 감지되었습니다. 페이지를 새로고침해주세요.';
      document.body.prepend(warningDiv);
      
      setTimeout(() => warningDiv.remove(), 5000);
    }
  }

  private enableSecurityMode() {
    // 보안 모드에서는 추가적인 검증 수행
    localStorage.setItem('security-mode', 'true');
    localStorage.setItem('security-mode-timestamp', new Date().toISOString());
  }

  // 보안 리포트 생성
  generateSecurityReport(): {
    summary: {
      totalEvents: number;
      criticalEvents: number;
      blockedAttempts: number;
      recentActivity: SecurityEvent[];
    };
    recommendations: string[];
  } {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const recentEvents = this.events.filter(event => new Date(event.timestamp) > oneDayAgo);
    
    const summary = {
      totalEvents: this.events.length,
      criticalEvents: this.events.filter(e => e.severity === 'critical').length,
      blockedAttempts: this.events.filter(e => e.blocked).length,
      recentActivity: recentEvents.slice(-10)
    };

    const recommendations = this.generateSecurityRecommendations(recentEvents);

    return { summary, recommendations };
  }

  private generateSecurityRecommendations(recentEvents: SecurityEvent[]): string[] {
    const recommendations: string[] = [];
    
    const failedLogins = recentEvents.filter(e => e.type === 'failed_login').length;
    if (failedLogins > 5) {
      recommendations.push('로그인 보안을 강화하세요. 2FA 사용을 고려하세요.');
    }

    const injectionAttempts = recentEvents.filter(e => e.type === 'injection_attempt').length;
    if (injectionAttempts > 0) {
      recommendations.push('입력 검증을 강화하고 WAF 사용을 고려하세요.');
    }

    const adminAttempts = recentEvents.filter(e => e.type === 'admin_attempt').length;
    if (adminAttempts > 2) {
      recommendations.push('관리자 접근 제어를 강화하세요.');
    }

    return recommendations;
  }

  // 보안 데이터 초기화
  clearSecurityData() {
    this.events = [];
    this.blockedIPs.clear();
    this.failedAttempts.clear();
    localStorage.removeItem('security-events');
    localStorage.removeItem('security-mode');
    localStorage.removeItem('security-mode-timestamp');
  }
}

// React Hook for security monitoring
export function useSecurityMonitor() {
  const monitor = SecurityMonitor.getInstance();
  
  return {
    validateInput: (input: string, fieldName: string) => monitor.validateInput(input, fieldName),
    recordFailedLogin: (identifier: string) => monitor.recordFailedLogin(identifier),
    recordSuccessfulLogin: (identifier: string) => monitor.recordSuccessfulLogin(identifier),
    validateLoginAttempt: (identifier: string) => monitor.validateLoginAttempt(identifier),
    validateAdminAccess: () => monitor.validateAdminAccess(),
    generateReport: () => monitor.generateSecurityReport()
  };
}