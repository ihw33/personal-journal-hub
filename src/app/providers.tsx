'use client';

import { useEffect } from 'react';
import { AuthProvider } from '@/lib/supabase/auth-context';
import { ErrorBoundary } from '@/lib/error-handling/error-boundary';
import { globalErrorHandler, reportComponentError } from '@/lib/error-handling/global-error-handler';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { DesignModeProvider } from '@/components/design-mode/DesignModeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize global error handling
    console.log('IWL 4.0 Error Handling System initialized');
    
    // Setup cleanup on window unload
    const cleanup = () => {
      globalErrorHandler.clearErrorReports();
    };

    window.addEventListener('beforeunload', cleanup);
    return () => window.removeEventListener('beforeunload', cleanup);
  }, []);

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    reportComponentError(error, errorInfo, 'RootErrorBoundary');
  };

  return (
    <ErrorBoundary onError={handleError}>
      <ThemeProvider>
        <DesignModeProvider defaultMode="helena" enableAutoMode={true}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </DesignModeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}