"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './button';
import { LoadingSpinner } from './LoadingSpinner';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isRetrying: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  private retryCount = 0;
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isRetrying: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo
    });

    // 에러 로깅
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // 에러 리포팅 (개발 환경에서는 콘솔에만 출력)
    if (process.env.NODE_ENV === 'production') {
      // 실제 환경에서는 에러 트래킹 서비스로 전송
      this.reportError(error, errorInfo);
    }

    // 부모 컴포넌트에 에러 콜백 실행
    this.props.onError?.(error, errorInfo);
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    // 에러 보고 로직 (예: Sentry, LogRocket 등)
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown'
    };

    // 로컬 스토리지에 에러 로그 저장
    if (typeof window !== 'undefined') {
      try {
        const errorLogs = JSON.parse(localStorage.getItem('error-logs') || '[]');
        errorLogs.push(errorReport);
        
        // 최근 50개 에러만 보관
        if (errorLogs.length > 50) {
          errorLogs.splice(0, errorLogs.length - 50);
        }
        
        localStorage.setItem('error-logs', JSON.stringify(errorLogs));
      } catch (e) {
        console.warn('Failed to save error log:', e);
      }
    }
  };

  private handleRetry = async () => {
    if (this.retryCount >= this.maxRetries) {
      return;
    }

    this.setState({ isRetrying: true });
    this.retryCount++;

    // 재시도 지연
    await new Promise(resolve => setTimeout(resolve, 1000));

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      isRetrying: false
    });
  };

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  private handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.state.isRetrying) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <LoadingSpinner 
              size="lg" 
              text="문제를 해결하는 중입니다..." 
              variant="pulse"
            />
          </div>
        );
      }

      // 커스텀 fallback이 있는 경우
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 기본 에러 UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-16 h-16 text-red-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              문제가 발생했습니다
            </h1>
            
            <p className="text-gray-600 mb-6">
              일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 mb-2">
                  개발자 정보
                </summary>
                <div className="bg-gray-100 p-3 rounded text-xs text-gray-700 overflow-auto max-h-32">
                  <p className="font-semibold">{this.state.error.message}</p>
                  <pre className="mt-2 whitespace-pre-wrap">
                    {this.state.error.stack}
                  </pre>
                </div>
              </details>
            )}

            <div className="space-y-3">
              {this.retryCount < this.maxRetries && (
                <Button 
                  onClick={this.handleRetry}
                  className="w-full bg-iwl-gradient hover:opacity-90 text-white"
                  size="lg"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  다시 시도 ({this.maxRetries - this.retryCount}회 남음)
                </Button>
              )}
              
              <div className="flex gap-3">
                <Button 
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="flex-1"
                >
                  <Home className="w-4 h-4 mr-2" />
                  홈으로
                </Button>
                
                <Button 
                  onClick={this.handleReload}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  새로고침
                </Button>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              문제가 계속 발생하면 고객 지원팀에 문의해주세요.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC 형태로도 사용 가능
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback} onError={onError}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}