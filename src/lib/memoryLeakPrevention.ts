// v120: 메모리 누수 방지 및 메모리 관리 시스템
"use client";

interface MemorySnapshot {
  timestamp: string;
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
  componentCount: number;
  eventListenerCount: number;
  domNodeCount: number;
}

interface MemoryLeak {
  type: 'event_listeners' | 'dom_nodes' | 'timers' | 'memory_growth' | 'component_leaks';
  severity: 'low' | 'medium' | 'high';
  description: string;
  timestamp: string;
  details: Record<string, any>;
}

export class MemoryLeakPrevention {
  private static instance: MemoryLeakPrevention;
  private snapshots: MemorySnapshot[] = [];
  private leaks: MemoryLeak[] = [];
  private activeTimers: Set<number> = new Set();
  private activeIntervals: Set<number> = new Set();
  private activeListeners: Map<Element, Map<string, EventListener[]>> = new Map();
  private componentRegistry: Map<string, { count: number; lastUpdate: Date }> = new Map();
  private monitoringInterval?: number;

  static getInstance(): MemoryLeakPrevention {
    if (!MemoryLeakPrevention.instance) {
      MemoryLeakPrevention.instance = new MemoryLeakPrevention();
    }
    return MemoryLeakPrevention.instance;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
      this.wrapNativeMethods();
    }
  }

  private initializeMonitoring() {
    // 10초마다 메모리 스냅샷 생성
    this.monitoringInterval = window.setInterval(() => {
      this.takeMemorySnapshot();
      this.detectMemoryLeaks();
    }, 10000);

    // 페이지 언로드 시 정리
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });

    // Visibility API를 사용하여 페이지가 숨겨질 때 모니터링 일시정지
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseMonitoring();
      } else {
        this.resumeMonitoring();
      }
    });
  }

  private wrapNativeMethods() {
    // setTimeout 래핑
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = (callback: Function, delay?: number, ...args: any[]) => {
      const timerId = originalSetTimeout(() => {
        this.activeTimers.delete(timerId);
        callback.apply(null, args);
      }, delay);
      this.activeTimers.add(timerId);
      return timerId;
    };

    // clearTimeout 래핑
    const originalClearTimeout = window.clearTimeout;
    window.clearTimeout = (timerId: number) => {
      this.activeTimers.delete(timerId);
      originalClearTimeout(timerId);
    };

    // setInterval 래핑
    const originalSetInterval = window.setInterval;
    window.setInterval = (callback: Function, delay: number, ...args: any[]) => {
      const intervalId = originalSetInterval(callback, delay, ...args);
      this.activeIntervals.add(intervalId);
      return intervalId;
    };

    // clearInterval 래핑
    const originalClearInterval = window.clearInterval;
    window.clearInterval = (intervalId: number) => {
      this.activeIntervals.delete(intervalId);
      originalClearInterval(intervalId);
    };

    // addEventListener 래핑
    const originalAddEventListener = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function(type: string, listener: EventListener, options?: any) {
      const element = this;
      
      if (!MemoryLeakPrevention.instance.activeListeners.has(element)) {
        MemoryLeakPrevention.instance.activeListeners.set(element, new Map());
      }
      
      const elementListeners = MemoryLeakPrevention.instance.activeListeners.get(element)!;
      if (!elementListeners.has(type)) {
        elementListeners.set(type, []);
      }
      
      elementListeners.get(type)!.push(listener);
      originalAddEventListener.call(this, type, listener, options);
    };

    // removeEventListener 래핑
    const originalRemoveEventListener = Element.prototype.removeEventListener;
    Element.prototype.removeEventListener = function(type: string, listener: EventListener, options?: any) {
      const element = this;
      const elementListeners = MemoryLeakPrevention.instance.activeListeners.get(element);
      
      if (elementListeners && elementListeners.has(type)) {
        const listeners = elementListeners.get(type)!;
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
        
        if (listeners.length === 0) {
          elementListeners.delete(type);
        }
        
        if (elementListeners.size === 0) {
          MemoryLeakPrevention.instance.activeListeners.delete(element);
        }
      }
      
      originalRemoveEventListener.call(this, type, listener, options);
    };
  }

  private takeMemorySnapshot() {
    if (!('memory' in performance)) {
      return;
    }

    const memory = (performance as any).memory;
    const snapshot: MemorySnapshot = {
      timestamp: new Date().toISOString(),
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      componentCount: this.componentRegistry.size,
      eventListenerCount: this.getTotalEventListenerCount(),
      domNodeCount: document.querySelectorAll('*').length
    };

    this.snapshots.push(snapshot);

    // 최근 50개 스냅샷만 보관
    if (this.snapshots.length > 50) {
      this.snapshots.shift();
    }

    // 로컬 스토리지에 저장
    this.saveSnapshots();
  }

  private getTotalEventListenerCount(): number {
    let total = 0;
    this.activeListeners.forEach(elementMap => {
      elementMap.forEach(listeners => {
        total += listeners.length;
      });
    });
    return total;
  }

  private detectMemoryLeaks() {
    if (this.snapshots.length < 5) {
      return; // 충분한 데이터가 없음
    }

    const recent = this.snapshots.slice(-5);
    this.detectMemoryGrowthLeaks(recent);
    this.detectEventListenerLeaks();
    this.detectDOMNodeLeaks(recent);
    this.detectTimerLeaks();
    this.detectComponentLeaks();
  }

  private detectMemoryGrowthLeaks(snapshots: MemorySnapshot[]) {
    const first = snapshots[0];
    const last = snapshots[snapshots.length - 1];
    const growthRate = (last.usedJSHeapSize - first.usedJSHeapSize) / first.usedJSHeapSize;

    // 5분 내 메모리 사용량이 50% 이상 증가하면 누수 의심
    if (growthRate > 0.5) {
      this.recordLeak({
        type: 'memory_growth',
        severity: 'high',
        description: `급격한 메모리 증가 감지: ${Math.round(growthRate * 100)}%`,
        details: {
          growthRate,
          initialMemory: Math.round(first.usedJSHeapSize / 1024 / 1024),
          currentMemory: Math.round(last.usedJSHeapSize / 1024 / 1024),
          timePeriod: '5분'
        }
      });
    }

    // 메모리 사용량이 90% 이상이면 경고
    const memoryUsageRatio = last.usedJSHeapSize / last.jsHeapSizeLimit;
    if (memoryUsageRatio > 0.9) {
      this.recordLeak({
        type: 'memory_growth',
        severity: 'high',
        description: '메모리 사용량이 한계에 근접',
        details: {
          usageRatio: Math.round(memoryUsageRatio * 100),
          usedMemoryMB: Math.round(last.usedJSHeapSize / 1024 / 1024),
          limitMB: Math.round(last.jsHeapSizeLimit / 1024 / 1024)
        }
      });
    }
  }

  private detectEventListenerLeaks() {
    const currentCount = this.getTotalEventListenerCount();
    
    // 이벤트 리스너가 1000개 이상이면 누수 의심
    if (currentCount > 1000) {
      this.recordLeak({
        type: 'event_listeners',
        severity: 'medium',
        description: `과도한 이벤트 리스너 감지: ${currentCount}개`,
        details: {
          listenerCount: currentCount,
          elementsWithListeners: this.activeListeners.size
        }
      });
    }

    // 제거된 DOM 요소에 여전히 리스너가 있는지 확인
    let orphanedListeners = 0;
    this.activeListeners.forEach((listeners, element) => {
      if (!document.contains(element)) {
        orphanedListeners += this.getTotalListenersForElement(listeners);
      }
    });

    if (orphanedListeners > 0) {
      this.recordLeak({
        type: 'event_listeners',
        severity: 'high',
        description: `분리된 DOM 요소의 이벤트 리스너: ${orphanedListeners}개`,
        details: {
          orphanedListeners
        }
      });

      // 분리된 요소의 리스너 자동 정리
      this.cleanupOrphanedListeners();
    }
  }

  private getTotalListenersForElement(elementMap: Map<string, EventListener[]>): number {
    let total = 0;
    elementMap.forEach(listeners => {
      total += listeners.length;
    });
    return total;
  }

  private cleanupOrphanedListeners() {
    const elementsToRemove: Element[] = [];
    
    this.activeListeners.forEach((listeners, element) => {
      if (!document.contains(element)) {
        elementsToRemove.push(element);
      }
    });

    elementsToRemove.forEach(element => {
      this.activeListeners.delete(element);
    });
  }

  private detectDOMNodeLeaks(snapshots: MemorySnapshot[]) {
    const first = snapshots[0];
    const last = snapshots[snapshots.length - 1];
    const nodeGrowth = last.domNodeCount - first.domNodeCount;

    // DOM 노드가 1000개 이상 증가하면 누수 의심
    if (nodeGrowth > 1000) {
      this.recordLeak({
        type: 'dom_nodes',
        severity: 'medium',
        description: `DOM 노드 급격한 증가: ${nodeGrowth}개`,
        details: {
          nodeGrowth,
          initialNodes: first.domNodeCount,
          currentNodes: last.domNodeCount
        }
      });
    }

    // 총 DOM 노드가 10,000개 이상이면 경고
    if (last.domNodeCount > 10000) {
      this.recordLeak({
        type: 'dom_nodes',
        severity: 'high',
        description: `과도한 DOM 노드: ${last.domNodeCount}개`,
        details: {
          totalNodes: last.domNodeCount
        }
      });
    }
  }

  private detectTimerLeaks() {
    const activeTimerCount = this.activeTimers.size;
    const activeIntervalCount = this.activeIntervals.size;

    // 활성 타이머가 100개 이상이면 누수 의심
    if (activeTimerCount > 100) {
      this.recordLeak({
        type: 'timers',
        severity: 'medium',
        description: `과도한 활성 타이머: ${activeTimerCount}개`,
        details: {
          activeTimers: activeTimerCount
        }
      });
    }

    // 활성 인터벌이 20개 이상이면 누수 의심
    if (activeIntervalCount > 20) {
      this.recordLeak({
        type: 'timers',
        severity: 'high',
        description: `과도한 활성 인터벌: ${activeIntervalCount}개`,
        details: {
          activeIntervals: activeIntervalCount
        }
      });
    }
  }

  private detectComponentLeaks() {
    const now = new Date();
    let staleComponents = 0;

    this.componentRegistry.forEach((info, componentName) => {
      const timeDiff = now.getTime() - info.lastUpdate.getTime();
      const minutesDiff = timeDiff / (1000 * 60);

      // 30분 이상 업데이트되지 않은 컴포넌트는 누수 의심
      if (minutesDiff > 30) {
        staleComponents++;
      }
    });

    if (staleComponents > 10) {
      this.recordLeak({
        type: 'component_leaks',
        severity: 'medium',
        description: `오래된 컴포넌트 참조: ${staleComponents}개`,
        details: {
          staleComponents,
          totalComponents: this.componentRegistry.size
        }
      });
    }
  }

  private recordLeak(leak: Omit<MemoryLeak, 'timestamp'>) {
    const memoryLeak: MemoryLeak = {
      ...leak,
      timestamp: new Date().toISOString()
    };

    this.leaks.push(memoryLeak);

    // 최근 100개 누수 기록만 보관
    if (this.leaks.length > 100) {
      this.leaks.shift();
    }

    console.warn('Memory Leak Detected:', memoryLeak);

    // 심각한 누수인 경우 즉시 정리 시도
    if (leak.severity === 'high') {
      this.performEmergencyCleanup();
    }

    // 로컬 스토리지에 저장
    this.saveLeaks();
  }

  private performEmergencyCleanup() {
    // 분리된 DOM 요소의 리스너 정리
    this.cleanupOrphanedListeners();
    
    // 오래된 컴포넌트 참조 정리
    this.cleanupStaleComponents();
    
    // 강제 가비지 컬렉션 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development' && 'gc' in window) {
      (window as any).gc();
    }
  }

  private cleanupStaleComponents() {
    const now = new Date();
    const componentsToRemove: string[] = [];

    this.componentRegistry.forEach((info, componentName) => {
      const timeDiff = now.getTime() - info.lastUpdate.getTime();
      const minutesDiff = timeDiff / (1000 * 60);

      if (minutesDiff > 60) { // 1시간 이상 된 컴포넌트 제거
        componentsToRemove.push(componentName);
      }
    });

    componentsToRemove.forEach(componentName => {
      this.componentRegistry.delete(componentName);
    });
  }

  private saveSnapshots() {
    try {
      localStorage.setItem('memory-snapshots', JSON.stringify(this.snapshots.slice(-20))); // 최근 20개만 저장
    } catch (e) {
      console.warn('Failed to save memory snapshots:', e);
    }
  }

  private saveLeaks() {
    try {
      localStorage.setItem('memory-leaks', JSON.stringify(this.leaks.slice(-50))); // 최근 50개만 저장
    } catch (e) {
      console.warn('Failed to save memory leaks:', e);
    }
  }

  private pauseMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
    }
  }

  private resumeMonitoring() {
    if (!this.monitoringInterval) {
      this.monitoringInterval = window.setInterval(() => {
        this.takeMemorySnapshot();
        this.detectMemoryLeaks();
      }, 10000);
    }
  }

  // 컴포넌트 등록/해제 (React Hook과 함께 사용)
  registerComponent(componentName: string) {
    const existing = this.componentRegistry.get(componentName);
    if (existing) {
      existing.count++;
      existing.lastUpdate = new Date();
    } else {
      this.componentRegistry.set(componentName, {
        count: 1,
        lastUpdate: new Date()
      });
    }
  }

  unregisterComponent(componentName: string) {
    const existing = this.componentRegistry.get(componentName);
    if (existing) {
      existing.count--;
      existing.lastUpdate = new Date();
      
      if (existing.count <= 0) {
        this.componentRegistry.delete(componentName);
      }
    }
  }

  // 안전한 타이머 생성 (자동 정리)
  createSafeTimer(callback: Function, delay: number): number {
    return window.setTimeout(() => {
      callback();
    }, delay);
  }

  createSafeInterval(callback: Function, delay: number): number {
    return window.setInterval(callback, delay);
  }

  // 메모리 리포트 생성
  generateMemoryReport(): {
    currentSnapshot: MemorySnapshot | null;
    memoryTrend: 'increasing' | 'stable' | 'decreasing';
    recentLeaks: MemoryLeak[];
    recommendations: string[];
  } {
    const currentSnapshot = this.snapshots[this.snapshots.length - 1] || null;
    const memoryTrend = this.calculateMemoryTrend();
    const recentLeaks = this.leaks.slice(-10);
    const recommendations = this.generateRecommendations();

    return {
      currentSnapshot,
      memoryTrend,
      recentLeaks,
      recommendations
    };
  }

  private calculateMemoryTrend(): 'increasing' | 'stable' | 'decreasing' {
    if (this.snapshots.length < 5) {
      return 'stable';
    }

    const recent = this.snapshots.slice(-5);
    const first = recent[0];
    const last = recent[recent.length - 1];
    const growthRate = (last.usedJSHeapSize - first.usedJSHeapSize) / first.usedJSHeapSize;

    if (growthRate > 0.1) return 'increasing';
    if (growthRate < -0.1) return 'decreasing';
    return 'stable';
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.activeTimers.size > 50) {
      recommendations.push('활성 타이머가 많습니다. useEffect cleanup을 확인하세요.');
    }

    if (this.getTotalEventListenerCount() > 500) {
      recommendations.push('이벤트 리스너가 많습니다. 컴포넌트 언마운트 시 리스너 제거를 확인하세요.');
    }

    const recentMemoryLeaks = this.leaks.filter(leak => 
      new Date(leak.timestamp) > new Date(Date.now() - 60 * 60 * 1000) // 1시간 내
    );

    if (recentMemoryLeaks.length > 5) {
      recommendations.push('최근 메모리 누수가 빈번합니다. 컴포넌트 생명주기를 검토하세요.');
    }

    return recommendations;
  }

  // 정리
  cleanup() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    
    // 모든 활성 타이머/인터벌 정리
    this.activeTimers.forEach(timerId => clearTimeout(timerId));
    this.activeIntervals.forEach(intervalId => clearInterval(intervalId));
    
    this.activeTimers.clear();
    this.activeIntervals.clear();
    this.activeListeners.clear();
    this.componentRegistry.clear();
  }
}

// React Hook for memory leak prevention
export function useMemoryLeakPrevention(componentName: string) {
  const monitor = MemoryLeakPrevention.getInstance();
  
  React.useEffect(() => {
    monitor.registerComponent(componentName);
    
    return () => {
      monitor.unregisterComponent(componentName);
    };
  }, [componentName, monitor]);

  return {
    createSafeTimer: monitor.createSafeTimer.bind(monitor),
    createSafeInterval: monitor.createSafeInterval.bind(monitor),
    generateReport: () => monitor.generateMemoryReport()
  };
}

// React Hook for safe timer management
export function useSafeTimer() {
  const timers = React.useRef<Set<number>>(new Set());
  
  const createTimer = React.useCallback((callback: Function, delay: number) => {
    const timerId = setTimeout(() => {
      timers.current.delete(timerId);
      callback();
    }, delay);
    
    timers.current.add(timerId);
    return timerId;
  }, []);

  const createInterval = React.useCallback((callback: Function, delay: number) => {
    const intervalId = setInterval(callback, delay);
    timers.current.add(intervalId);
    return intervalId;
  }, []);

  const clearTimer = React.useCallback((timerId: number) => {
    clearTimeout(timerId);
    clearInterval(timerId);
    timers.current.delete(timerId);
  }, []);

  React.useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 모든 타이머 정리
      timers.current.forEach(timerId => {
        clearTimeout(timerId);
        clearInterval(timerId);
      });
      timers.current.clear();
    };
  }, []);

  return {
    createTimer,
    createInterval,
    clearTimer
  };
}