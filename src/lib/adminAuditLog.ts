// v117: Admin Audit Log System
export interface AdminAuditEvent {
  id: string;
  timestamp: Date;
  event: 'LOGIN' | 'LOGOUT' | 'PAGE_ACCESS' | 'ACTION_PERFORMED' | 'SECURITY_VIOLATION';
  userId: string;
  userAgent?: string;
  ipAddress?: string;
  page?: string;
  action?: string;
  success: boolean;
  details?: any;
  sessionId?: string;
}

class AdminAuditLogger {
  private static instance: AdminAuditLogger;
  private events: AdminAuditEvent[] = [];
  private readonly MAX_EVENTS = 1000; // Keep last 1000 events in memory
  private readonly STORAGE_KEY = 'admin_audit_log';

  static getInstance(): AdminAuditLogger {
    if (!AdminAuditLogger.instance) {
      AdminAuditLogger.instance = new AdminAuditLogger();
    }
    return AdminAuditLogger.instance;
  }

  constructor() {
    this.loadFromStorage();
  }

  // v117: Log admin events
  log(event: Omit<AdminAuditEvent, 'id' | 'timestamp'>): void {
    const auditEvent: AdminAuditEvent = {
      id: this.generateId(),
      timestamp: new Date(),
      ...event
    };

    this.events.unshift(auditEvent);
    
    // Keep only the latest events
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(0, this.MAX_EVENTS);
    }

    this.saveToStorage();
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔐 Admin Audit: ${event.event}`, auditEvent);
    }
  }

  // v117: Get audit events with filtering
  getEvents(filter?: {
    event?: AdminAuditEvent['event'];
    userId?: string;
    success?: boolean;
    fromDate?: Date;
    toDate?: Date;
    limit?: number;
  }): AdminAuditEvent[] {
    let filteredEvents = [...this.events];

    if (filter) {
      if (filter.event) {
        filteredEvents = filteredEvents.filter(e => e.event === filter.event);
      }
      if (filter.userId) {
        filteredEvents = filteredEvents.filter(e => e.userId === filter.userId);
      }
      if (filter.success !== undefined) {
        filteredEvents = filteredEvents.filter(e => e.success === filter.success);
      }
      if (filter.fromDate) {
        filteredEvents = filteredEvents.filter(e => e.timestamp >= filter.fromDate!);
      }
      if (filter.toDate) {
        filteredEvents = filteredEvents.filter(e => e.timestamp <= filter.toDate!);
      }
      if (filter.limit) {
        filteredEvents = filteredEvents.slice(0, filter.limit);
      }
    }

    return filteredEvents;
  }

  // v117: Get security statistics
  getSecurityStats(): {
    totalEvents: number;
    loginAttempts: number;
    successfulLogins: number;
    failedLogins: number;
    securityViolations: number;
    recentActivity: AdminAuditEvent[];
    activeUsers: string[];
  } {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const recentEvents = this.events.filter(e => e.timestamp >= last24Hours);
    const loginEvents = this.events.filter(e => e.event === 'LOGIN');
    const securityViolations = this.events.filter(e => e.event === 'SECURITY_VIOLATION');
    
    return {
      totalEvents: this.events.length,
      loginAttempts: loginEvents.length,
      successfulLogins: loginEvents.filter(e => e.success).length,
      failedLogins: loginEvents.filter(e => !e.success).length,
      securityViolations: securityViolations.length,
      recentActivity: recentEvents.slice(0, 10),
      activeUsers: [...new Set(recentEvents.map(e => e.userId))]
    };
  }

  // v117: Clear old events
  clearOldEvents(olderThanDays: number = 30): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);
    
    this.events = this.events.filter(e => e.timestamp >= cutoffDate);
    this.saveToStorage();
  }

  // v117: Export audit log
  exportLog(): string {
    return JSON.stringify(this.events, null, 2);
  }

  // v117: Private utility methods
  private generateId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadFromStorage(): void {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
          const events = JSON.parse(stored);
          this.events = events.map((e: any) => ({
            ...e,
            timestamp: new Date(e.timestamp)
          }));
        }
      }
    } catch (error) {
      console.warn('Failed to load audit log from storage:', error);
    }
  }

  private saveToStorage(): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events));
      }
    } catch (error) {
      console.warn('Failed to save audit log to storage:', error);
    }
  }
}

// v117: Admin audit helper functions
export const adminAudit = AdminAuditLogger.getInstance();

export function logAdminLogin(userId: string, success: boolean, details?: any): void {
  adminAudit.log({
    event: 'LOGIN',
    userId,
    success,
    details,
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined
  });
}

export function logAdminLogout(userId: string): void {
  adminAudit.log({
    event: 'LOGOUT',
    userId,
    success: true
  });
}

export function logAdminPageAccess(userId: string, page: string, success: boolean): void {
  adminAudit.log({
    event: 'PAGE_ACCESS',
    userId,
    page,
    success
  });
}

export function logAdminAction(userId: string, action: string, success: boolean, details?: any): void {
  adminAudit.log({
    event: 'ACTION_PERFORMED',
    userId,
    action,
    success,
    details
  });
}

export function logSecurityViolation(userId: string, details: any): void {
  adminAudit.log({
    event: 'SECURITY_VIOLATION',
    userId,
    success: false,
    details
  });
}