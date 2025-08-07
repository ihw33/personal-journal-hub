import React from 'react';
import { AlertCircle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * ErrorBoundary 컴포넌트
 * React 애플리케이션에서 발생하는 JavaScript 에러를 포착하고
 * 대체 UI를 표시하여 앱 전체의 크래시를 방지합니다.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 에러가 발생하면 state를 업데이트하여 다음 렌더링에서 fallback UI를 표시
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 에러 정보를 state에 저장
    this.setState({ error, errorInfo });
    
    // 에러를 외부 로깅 서비스에 전송 (예: Sentry, LogRocket)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    console.error('Error stack:', error.stack);
    console.error('Component stack:', errorInfo.componentStack);
    
    // props로 전달된 onError 콜백 실행
    this.props.onError?.(error, errorInfo);
  }

  retry = () => {
    // 에러 상태를 재설정하여 다시 시도
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // 커스텀 fallback이 제공된 경우 사용
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} retry={this.retry} />;
      }

      // 기본 에러 UI 렌더링
      return <DefaultErrorFallback error={this.state.error!} retry={this.retry} />;
    }

    return this.props.children;
  }
}

/**
 * 기본 에러 대체 UI 컴포넌트
 */
interface DefaultErrorFallbackProps {
  error: Error;
  retry: () => void;
}

const DefaultErrorFallback: React.FC<DefaultErrorFallbackProps> = ({ error, retry }) => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-error/5 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-architect-gray-300/50 text-center">
          
          {/* 에러 아이콘 */}
          <div className="w-20 h-20 bg-architect-error rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>

          {/* 에러 제목 */}
          <h1 className="text-h2 font-black text-architect-gray-900 mb-4">
            문제가 발생했습니다
          </h1>

          {/* 에러 설명 */}
          <p className="text-body text-architect-gray-600 mb-6 max-w-md mx-auto">
            예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주시거나, 
            문제가 지속되면 고객 지원팀에 문의해 주세요.
          </p>

          {/* 에러 상세 정보 표시 (임시로 프로덕션에서도 표시) */}
          <div className="mb-6 p-4 bg-architect-gray-100 rounded-xl text-left">
            <h3 className="text-h5 font-bold text-architect-gray-900 mb-2">
              에러 정보:
            </h3>
            <pre className="text-xs text-architect-gray-700 overflow-auto max-h-48">
              {error.name}: {error.message}
              {error.stack && `\n\nStack trace:\n${error.stack}`}
            </pre>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={retry}
              className="px-6 py-3"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              다시 시도
            </Button>
            
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전 페이지
            </Button>
            
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="px-6 py-3"
            >
              <Home className="w-4 h-4 mr-2" />
              홈으로
            </Button>
          </div>

          {/* 도움말 링크 */}
          <div className="mt-8 pt-6 border-t border-architect-gray-300">
            <p className="text-small text-architect-gray-500">
              문제가 계속 발생하나요?{' '}
              <a 
                href="mailto:support@ideaworklab.com" 
                className="text-architect-primary hover:underline font-medium"
              >
                고객 지원팀에 문의하기
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * HOC(Higher-Order Component) 형태의 ErrorBoundary
 * 컴포넌트를 ErrorBoundary로 래핑하는 유틸리티 함수
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * 저널 페이지 전용 에러 대체 UI
 */
export const JournalErrorFallback: React.FC<DefaultErrorFallbackProps> = ({ error, retry }) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-architect-error/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-architect-error" />
        </div>
        
        <h2 className="text-h4 font-bold text-architect-gray-900 mb-3">
          저널을 불러올 수 없습니다
        </h2>
        
        <p className="text-body text-architect-gray-600 mb-6">
          네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.
        </p>
        
        <Button onClick={retry} className="px-6">
          <RefreshCw className="w-4 h-4 mr-2" />
          다시 시도
        </Button>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="text-small text-architect-gray-500 cursor-pointer">
              에러 상세 정보 (개발자용)
            </summary>
            <pre className="mt-2 p-3 bg-architect-gray-100 rounded-lg text-xs text-architect-gray-700 overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};