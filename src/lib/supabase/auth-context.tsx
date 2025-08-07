'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, signIn, signOut as enhancedSignOut, getCurrentUser } from './enhanced-client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  userProfile: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // 초기 세션 가져오기
    const getInitialSession = async () => {
      try {
        // 테스트 계정 확인
        const testUser = localStorage.getItem('test_user');
        if (testUser) {
          const userData = JSON.parse(testUser);
          setUser(userData as User);
          setUserProfile({
            role: userData.user_metadata?.role || userData.user_metadata?.user_type,
            full_name: userData.user_metadata?.name
          });
          setSession(null); // 테스트 계정은 실제 세션이 없음
          setLoading(false);
          return;
        }

        // Enhanced client를 사용한 세션 가져오기
        if (supabase) {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Error getting session:', error);
          } else {
            setSession(session);
            setUser(session?.user ?? null);
          }
        } else {
          // Demo mode - no actual session
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            setSession(null);
          }
        }
      } catch (error) {
        console.error('Session initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // 인증 상태 변경 리스너 (Enhanced client 호환)
    let subscription: any = null;
    
    if (supabase) {
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state changed:', event, session?.user?.email);
          
          // 테스트 계정이 있으면 Supabase 세션을 무시
          const testUser = localStorage.getItem('test_user');
          if (testUser) {
            return;
          }
          
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);

          // 페이지 새로고침이 필요한 경우
          if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
            // 필요시 페이지 새로고침 로직 추가
          }
        }
      );
      subscription = data.subscription;
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []); // 컴포넌트 마운트 시에만 실행 (의도적으로 빈 배열)

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      
      // 테스트 계정 로그아웃
      if (localStorage.getItem('test_user')) {
        localStorage.removeItem('test_user');
        setUser(null);
        setSession(null);
        setUserProfile(null);
        // 페이지 새로고침 또는 홈으로 리다이렉션
        window.location.href = '/';
        return;
      }
      
      const { error } = await enhancedSignOut();
      
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      
      // 상태는 onAuthStateChange에서 자동으로 업데이트됨
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []); // 의존성 없음 - supabase.auth는 안정적인 참조

  const value = {
    user,
    session,
    loading,
    signOut,
    userProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 인증이 필요한 컴포넌트를 위한 HOC
export function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function AuthenticatedComponent(props: T) {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-architect-primary"></div>
        </div>
      );
    }

    if (!user) {
      // 로그인 페이지로 리다이렉트하거나 로그인 폼 표시
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-architect-gray-900 mb-4">
              로그인이 필요합니다
            </h1>
            <p className="text-architect-gray-600">
              이 페이지에 접근하려면 로그인해주세요.
            </p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}