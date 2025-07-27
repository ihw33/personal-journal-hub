// v117: Admin Route Protection Component
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Lock, AlertTriangle, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface AdminRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onNavigateHome?: () => void;
  language?: 'ko' | 'en';
}

export function AdminRoute({ 
  children, 
  fallback, 
  onNavigateHome,
  language = 'ko' 
}: AdminRouteProps) {
  const { isAdminLoggedIn, getUserType } = useAuth();
  const userType = getUserType();

  const content = {
    ko: {
      accessDenied: '접근 권한이 없습니다',
      adminRequired: '관리자 권한 필요',
      description: '이 페이지는 관리자만 접근할 수 있습니다.',
      loginRequired: '관리자 로그인이 필요합니다.',
      goHome: '홈으로 돌아가기',
      goToLogin: '관리자 로그인',
      currentRole: '현재 권한',
      requiredRole: '필요 권한',
      securityNotice: '보안 알림'
    },
    en: {
      accessDenied: 'Access Denied',
      adminRequired: 'Admin Access Required',
      description: 'This page is accessible only to administrators.',
      loginRequired: 'Admin login is required.',
      goHome: 'Go to Home',
      goToLogin: 'Admin Login',
      currentRole: 'Current Role',
      requiredRole: 'Required Role',
      securityNotice: 'Security Notice'
    }
  };

  const t = content[language];

  // Admin이 로그인된 경우 컨텐츠 표시
  if (isAdminLoggedIn && userType === 'admin') {
    return <>{children}</>;
  }

  // 커스텀 fallback이 있는 경우
  if (fallback) {
    return <>{fallback}</>;
  }

  // 기본 접근 거부 UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6">
      <Card className="max-w-lg w-full border-2 border-red-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-red-700 flex items-center justify-center gap-2">
            <Lock className="w-6 h-6" />
            {t.accessDenied}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Security Notice */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="font-medium text-red-700">{t.securityNotice}</span>
            </div>
            <p className="text-red-600 text-sm">
              {t.description}
            </p>
          </div>

          {/* Role Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">{t.currentRole}</div>
              <Badge variant="secondary" className="capitalize">
                {userType === 'guest' ? (language === 'ko' ? '비회원' : 'Guest') :
                 userType === 'member' ? (language === 'ko' ? '회원' : 'Member') :
                 userType}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">{t.requiredRole}</div>
              <Badge className="bg-red-100 text-red-700">
                {language === 'ko' ? '관리자' : 'Admin'}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {userType !== 'admin' && (
              <Button
                onClick={() => {
                  if (onNavigateHome) {
                    onNavigateHome();
                  } else {
                    window.location.href = '/admin';
                  }
                }}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Lock className="w-4 h-4 mr-2" />
                {t.goToLogin}
              </Button>
            )}
            
            <Button
              onClick={() => {
                if (onNavigateHome) {
                  onNavigateHome();
                } else {
                  window.location.href = '/';
                }
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              {t.goHome}
            </Button>
          </div>

          {/* Additional Security Info */}
          <div className="text-xs text-gray-500 text-center pt-4 border-t">
            {language === 'ko' 
              ? '이 시도가 기록되었습니다. 관리자가 아닌 경우 홈으로 돌아가세요.'
              : 'This attempt has been logged. If you are not an admin, please return to home.'
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// v117: HOC for Admin Route Protection
export function withAdminRoute<T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T>,
  options?: {
    fallback?: React.ComponentType<any>;
    language?: 'ko' | 'en';
  }
) {
  return function AdminProtectedComponent(props: T) {
    return (
      <AdminRoute 
        fallback={options?.fallback ? <options.fallback {...props} /> : undefined}
        language={options?.language}
      >
        <WrappedComponent {...props} />
      </AdminRoute>
    );
  };
}