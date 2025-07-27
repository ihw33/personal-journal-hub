// v119: 성능 모니터링 및 최적화 유틸리티
"use client";

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  bundleSize?: number;
  componentCount: number;
  memoryUsage?: number;
  timestamp: string;
}

interface ComponentPerformance {
  name: string;
  renderTime: number;
  reRenderCount: number;
  lastRender: string;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private componentMetrics: Map<string, ComponentPerformance> = new Map();
  private observer?: PerformanceObserver;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
    }
  }

  private initializeMonitoring() {
    // Performance Observer 설정
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.processPerformanceEntry(entry);
        }
      });

      try {
        this.observer.observe({ 
          entryTypes: ['navigation', 'measure', 'paint', 'largest-contentful-paint'] 
        });
      } catch (e) {
        console.warn('Performance monitoring not fully supported:', e);
      }
    }

    // 페이지 로드 완료 시 초기 메트릭 수집
    if (document.readyState === 'complete') {
      this.collectInitialMetrics();
    } else {
      window.addEventListener('load', () => this.collectInitialMetrics());
    }

    // 메모리 사용량 주기적 모니터링 (Chrome)
    if ('memory' in performance) {
      setInterval(() => this.collectMemoryMetrics(), 30000); // 30초마다
    }
  }

  private processPerformanceEntry(entry: PerformanceEntry) {
    switch (entry.entryType) {
      case 'navigation':
        const navEntry = entry as PerformanceNavigationTiming;
        this.recordMetric({
          loadTime: navEntry.loadEventEnd - navEntry.navigationStart,
          renderTime: navEntry.domContentLoadedEventEnd - navEntry.navigationStart,
          componentCount: document.querySelectorAll('[data-component]').length,
          timestamp: new Date().toISOString()
        });
        break;

      case 'largest-contentful-paint':
        console.log(`LCP: ${entry.startTime}ms`);
        break;

      case 'paint':
        if (entry.name === 'first-contentful-paint') {
          console.log(`FCP: ${entry.startTime}ms`);
        }
        break;
    }
  }

  private collectInitialMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      const metrics: PerformanceMetrics = {
        loadTime: navigation.loadEventEnd - navigation.navigationStart,
        renderTime: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        componentCount: document.querySelectorAll('[data-component]').length,
        timestamp: new Date().toISOString()
      };

      // 메모리 정보 추가 (Chrome)
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        metrics.memoryUsage = memory.usedJSHeapSize;
      }

      this.recordMetric(metrics);
    }
  }

  private collectMemoryMetrics() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      
      // 메모리 사용량이 50MB 이상이면 경고
      if (memoryMB > 50) {
        console.warn(`High memory usage detected: ${memoryMB}MB`);
        this.logPerformanceIssue('high-memory', { memoryUsage: memoryMB });
      }
    }
  }

  // 컴포넌트 렌더링 성능 추적
  trackComponentRender(componentName: string, renderTime: number) {
    const existing = this.componentMetrics.get(componentName);
    
    if (existing) {
      existing.renderTime = renderTime;
      existing.reRenderCount++;
      existing.lastRender = new Date().toISOString();
    } else {
      this.componentMetrics.set(componentName, {
        name: componentName,
        renderTime,
        reRenderCount: 1,
        lastRender: new Date().toISOString()
      });
    }

    // 렌더링 시간이 100ms 이상이면 경고
    if (renderTime > 100) {
      console.warn(`Slow component render detected: ${componentName} (${renderTime}ms)`);
      this.logPerformanceIssue('slow-render', { componentName, renderTime });
    }
  }

  // 번들 크기 추적
  trackBundleSize(size: number) {
    const sizeMB = Math.round(size / 1024 / 1024 * 100) / 100;
    
    // 최근 메트릭 업데이트
    if (this.metrics.length > 0) {
      this.metrics[this.metrics.length - 1].bundleSize = size;
    }

    // 번들 크기가 5MB 이상이면 경고
    if (sizeMB > 5) {
      console.warn(`Large bundle size detected: ${sizeMB}MB`);
      this.logPerformanceIssue('large-bundle', { bundleSize: sizeMB });
    }
  }

  private recordMetric(metric: PerformanceMetrics) {
    this.metrics.push(metric);
    
    // 최근 100개 메트릭만 보관
    if (this.metrics.length > 100) {
      this.metrics.shift();
    }

    // 로컬 스토리지에 저장
    this.saveMetricsToStorage();
  }

  private logPerformanceIssue(type: string, data: any) {
    const issue = {
      type,
      data,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    // 성능 이슈 로그 저장
    const issues = JSON.parse(localStorage.getItem('performance-issues') || '[]');
    issues.push(issue);
    
    // 최근 50개 이슈만 보관
    if (issues.length > 50) {
      issues.splice(0, issues.length - 50);
    }
    
    localStorage.setItem('performance-issues', JSON.stringify(issues));
  }

  private saveMetricsToStorage() {
    try {
      localStorage.setItem('performance-metrics', JSON.stringify(this.metrics));
    } catch (e) {
      console.warn('Failed to save performance metrics:', e);
    }
  }

  // 성능 리포트 생성
  generateReport(): {
    summary: {
      avgLoadTime: number;
      avgRenderTime: number;
      avgMemoryUsage?: number;
      totalComponents: number;
      slowComponents: ComponentPerformance[];
    };
    issues: any[];
    recommendations: string[];
  } {
    const summary = this.calculateSummary();
    const issues = JSON.parse(localStorage.getItem('performance-issues') || '[]');
    const recommendations = this.generateRecommendations(summary, issues);

    return { summary, issues, recommendations };
  }

  private calculateSummary() {
    const avgLoadTime = this.metrics.length > 0 
      ? this.metrics.reduce((sum, m) => sum + m.loadTime, 0) / this.metrics.length 
      : 0;
    
    const avgRenderTime = this.metrics.length > 0
      ? this.metrics.reduce((sum, m) => sum + m.renderTime, 0) / this.metrics.length
      : 0;

    const avgMemoryUsage = this.metrics.filter(m => m.memoryUsage).length > 0
      ? this.metrics.filter(m => m.memoryUsage).reduce((sum, m) => sum + (m.memoryUsage || 0), 0) / this.metrics.filter(m => m.memoryUsage).length
      : undefined;

    const slowComponents = Array.from(this.componentMetrics.values())
      .filter(c => c.renderTime > 50)
      .sort((a, b) => b.renderTime - a.renderTime)
      .slice(0, 10);

    return {
      avgLoadTime: Math.round(avgLoadTime),
      avgRenderTime: Math.round(avgRenderTime),
      avgMemoryUsage: avgMemoryUsage ? Math.round(avgMemoryUsage / 1024 / 1024) : undefined,
      totalComponents: this.componentMetrics.size,
      slowComponents
    };
  }

  private generateRecommendations(summary: any, issues: any[]): string[] {
    const recommendations: string[] = [];

    if (summary.avgLoadTime > 3000) {
      recommendations.push('페이지 로드 시간이 느립니다. 코드 분할을 고려해보세요.');
    }

    if (summary.avgRenderTime > 1000) {
      recommendations.push('렌더링 시간이 느립니다. 컴포넌트 최적화를 고려해보세요.');
    }

    if (summary.avgMemoryUsage && summary.avgMemoryUsage > 30) {
      recommendations.push('메모리 사용량이 높습니다. 메모리 누수를 확인해보세요.');
    }

    if (summary.slowComponents.length > 5) {
      recommendations.push('느린 컴포넌트가 많습니다. React.memo 사용을 고려해보세요.');
    }

    const bundleIssues = issues.filter(i => i.type === 'large-bundle');
    if (bundleIssues.length > 0) {
      recommendations.push('번들 크기가 큽니다. 불필요한 라이브러리 제거를 고려해보세요.');
    }

    return recommendations;
  }

  // 성능 데이터 초기화
  clearMetrics() {
    this.metrics = [];
    this.componentMetrics.clear();
    localStorage.removeItem('performance-metrics');
    localStorage.removeItem('performance-issues');
  }

  // 성능 모니터링 중지
  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// React 컴포넌트용 성능 추적 훅
export function usePerformanceTracking(componentName: string) {
  const monitor = PerformanceMonitor.getInstance();
  
  return {
    trackRender: (renderTime: number) => {
      monitor.trackComponentRender(componentName, renderTime);
    },
    
    startTiming: () => {
      return performance.now();
    },
    
    endTiming: (startTime: number) => {
      const renderTime = performance.now() - startTime;
      monitor.trackComponentRender(componentName, renderTime);
      return renderTime;
    }
  };
}

// HOC for automatic performance tracking
export function withPerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string
) {
  return function PerformanceTrackedComponent(props: P) {
    const name = componentName || Component.displayName || Component.name || 'UnknownComponent';
    const { startTiming, endTiming } = usePerformanceTracking(name);
    
    React.useEffect(() => {
      const startTime = startTiming();
      return () => {
        endTiming(startTime);
      };
    });
    
    return React.createElement(Component, props);
  };
}