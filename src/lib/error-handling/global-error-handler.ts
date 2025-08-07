// Global error handling system for IWL 4.0

export interface ErrorReport {
  id: string;
  timestamp: Date;
  type: 'client' | 'server' | 'api' | 'websocket';
  level: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  stack?: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
}

export class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private errorQueue: ErrorReport[] = [];
  private isReporting = false;
  private maxQueueSize = 100;

  static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  private constructor() {
    this.setupGlobalHandlers();
  }

  private setupGlobalHandlers() {
    // Handle uncaught JavaScript errors
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        this.reportError({
          type: 'client',
          level: 'error',
          message: event.message || 'Uncaught error',
          stack: event.error?.stack,
          context: {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
          }
        });
      });

      // Handle unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        this.reportError({
          type: 'client',
          level: 'error',
          message: `Unhandled promise rejection: ${event.reason}`,
          stack: event.reason?.stack,
          context: {
            reason: event.reason
          }
        });
      });

      // Handle resource loading errors
      window.addEventListener('error', (event) => {
        if (event.target && event.target !== window) {
          const target = event.target as HTMLElement;
          this.reportError({
            type: 'client',
            level: 'warning',
            message: `Resource failed to load: ${target.tagName}`,
            context: {
              tagName: target.tagName,
              src: (target as any).src || (target as any).href,
              outerHTML: target.outerHTML?.substring(0, 200)
            }
          });
        }
      }, true);
    }
  }

  reportError(errorData: Partial<ErrorReport>): void {
    const report: ErrorReport = {
      id: this.generateId(),
      timestamp: new Date(),
      type: errorData.type || 'client',
      level: errorData.level || 'error',
      message: errorData.message || 'Unknown error',
      stack: errorData.stack,
      context: errorData.context,
      userId: this.getCurrentUserId(),
      sessionId: this.getSessionId(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      ...errorData
    };

    // Add to queue
    this.addToQueue(report);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error Report [${report.level.toUpperCase()}]`);
      console.error('Message:', report.message);
      if (report.stack) console.error('Stack:', report.stack);
      if (report.context) console.error('Context:', report.context);
      console.groupEnd();
    }

    // Send to external service if needed
    this.processQueue();
  }

  private addToQueue(report: ErrorReport): void {
    this.errorQueue.push(report);

    // Limit queue size
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue = this.errorQueue.slice(-this.maxQueueSize);
    }
  }

  private async processQueue(): Promise<void> {
    if (this.isReporting || this.errorQueue.length === 0) {
      return;
    }

    this.isReporting = true;

    try {
      // In production, send to error reporting service
      if (process.env.NODE_ENV === 'production') {
        await this.sendToErrorService(this.errorQueue);
        this.errorQueue = [];
      }
    } catch (error) {
      console.error('Failed to send error reports:', error);
    } finally {
      this.isReporting = false;
    }
  }

  private async sendToErrorService(reports: ErrorReport[]): Promise<void> {
    // This would integrate with services like Sentry, LogRocket, etc.
    // For now, we'll just log to local storage for demo purposes
    
    try {
      const existingReports = JSON.parse(localStorage.getItem('iwl_error_reports') || '[]');
      const updatedReports = [...existingReports, ...reports];
      
      // Keep only last 500 reports
      const trimmedReports = updatedReports.slice(-500);
      localStorage.setItem('iwl_error_reports', JSON.stringify(trimmedReports));
      
      console.log(`Stored ${reports.length} error reports locally`);
    } catch (error) {
      console.error('Failed to store error reports locally:', error);
    }
  }

  // API Error Handler
  handleAPIError(error: any, endpoint: string, method: string): void {
    this.reportError({
      type: 'api',
      level: error.status >= 500 ? 'critical' : 'error',
      message: `API Error: ${method} ${endpoint}`,
      context: {
        endpoint,
        method,
        status: error.status,
        statusText: error.statusText,
        response: error.response?.data || error.message
      }
    });
  }

  // WebSocket Error Handler
  handleWebSocketError(error: Event, url: string): void {
    this.reportError({
      type: 'websocket',
      level: 'error',
      message: 'WebSocket connection error',
      context: {
        url,
        error: error.type,
        timestamp: Date.now()
      }
    });
  }

  // Authentication Error Handler
  handleAuthError(error: any, action: string): void {
    this.reportError({
      type: 'api',
      level: 'warning',
      message: `Authentication error during ${action}`,
      context: {
        action,
        error: error.message || error,
        timestamp: Date.now()
      }
    });
  }

  // Component Error Handler
  handleComponentError(error: Error, errorInfo: React.ErrorInfo, componentName?: string): void {
    this.reportError({
      type: 'client',
      level: 'error',
      message: `Component error: ${componentName || 'Unknown'} - ${error.message}`,
      stack: error.stack,
      context: {
        componentName,
        componentStack: errorInfo.componentStack,
        errorBoundary: true
      }
    });
  }

  // Validation Error Handler
  handleValidationError(field: string, value: any, rule: string): void {
    this.reportError({
      type: 'client',
      level: 'info',
      message: `Validation error: ${field} failed ${rule}`,
      context: {
        field,
        value: typeof value === 'string' ? value.substring(0, 100) : value,
        rule,
        formValidation: true
      }
    });
  }

  // Network Error Handler
  handleNetworkError(error: any): void {
    this.reportError({
      type: 'client',
      level: 'warning',
      message: 'Network connectivity issue',
      context: {
        offline: !navigator.onLine,
        error: error.message || 'Network error',
        timestamp: Date.now()
      }
    });
  }

  // Get error reports for admin dashboard
  getErrorReports(limit: number = 50): ErrorReport[] {
    try {
      const reports = JSON.parse(localStorage.getItem('iwl_error_reports') || '[]');
      return reports.slice(-limit).reverse(); // Most recent first
    } catch (error) {
      return [];
    }
  }

  // Clear error reports
  clearErrorReports(): void {
    localStorage.removeItem('iwl_error_reports');
    this.errorQueue = [];
  }

  private generateId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getCurrentUserId(): string | undefined {
    // Get from auth context or localStorage
    try {
      const testUser = localStorage.getItem('test_user');
      if (testUser) {
        return JSON.parse(testUser).id;
      }
      // Add other user ID extraction logic here
      return undefined;
    } catch {
      return undefined;
    }
  }

  private getSessionId(): string | undefined {
    // Generate or retrieve session ID
    try {
      let sessionId = sessionStorage.getItem('iwl_session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('iwl_session_id', sessionId);
      }
      return sessionId;
    } catch {
      return undefined;
    }
  }
}

// Export singleton instance
export const globalErrorHandler = GlobalErrorHandler.getInstance();

// Convenience functions
export const reportError = (errorData: Partial<ErrorReport>) => 
  globalErrorHandler.reportError(errorData);

export const reportAPIError = (error: any, endpoint: string, method: string) => 
  globalErrorHandler.handleAPIError(error, endpoint, method);

export const reportWebSocketError = (error: Event, url: string) => 
  globalErrorHandler.handleWebSocketError(error, url);

export const reportAuthError = (error: any, action: string) => 
  globalErrorHandler.handleAuthError(error, action);

export const reportComponentError = (error: Error, errorInfo: React.ErrorInfo, componentName?: string) => 
  globalErrorHandler.handleComponentError(error, errorInfo, componentName);

export const reportValidationError = (field: string, value: any, rule: string) => 
  globalErrorHandler.handleValidationError(field, value, rule);

export const reportNetworkError = (error: any) => 
  globalErrorHandler.handleNetworkError(error);