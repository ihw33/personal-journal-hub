"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { BetaFlagService } from '../lib/betaFlags';
import { BetaNotificationService } from '../lib/betaNotifications';
import { logAdminLogin, logAdminLogout, logSecurityViolation } from '../lib/adminAuditLog';
import { SecurityMonitor } from '../lib/securityMonitor';

export type UserRole = 'guest' | 'member' | 'admin';
export type MembershipLevel = 'free' | 'basic' | 'premium' | 'vip';

export interface PersonalizationData {
  // 학습 진행 상황
  learningProgress: {
    enrolledCourses: string[];
    currentWeek: number;
    currentPhase: number;
    completedPhases: number;
    totalPhases: number;
    completionRate: number;
    estimatedCompletionDate?: Date;
  };
  
  // AI 상호작용 데이터
  aiInteractions: {
    totalConversations: number;
    totalMessages: number;
    avgSatisfactionScore: number;
    lastInteractionDate?: Date;
    preferredAIStyle: 'detailed' | 'concise' | 'creative';
  };
  
  // 개인 성취
  achievements: {
    badges: string[];
    streak: number;
    completedCourses: number;
    totalStudyTime: number;
  };
  
  // 사용자 선호도
  preferences: {
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
    preferredStudyTime: 'morning' | 'afternoon' | 'evening';
    difficultyPreference: 'easy' | 'medium' | 'hard' | 'adaptive';
    language: 'ko' | 'en';
  };
}

export interface ExtendedUser extends User {
  role: UserRole;
  membershipLevel: MembershipLevel;
  name?: string;
  enrollmentDate?: string;
  lastActivity?: Date;
  personalizationData?: PersonalizationData;
}

interface AuthContextType {
  user: ExtendedUser | null;
  session: Session | null;
  loading: boolean;
  isAdminLoggedIn: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
  signInWithOAuth: (provider: 'google' | 'kakao' | 'naver') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  adminLogin: (password: string) => Promise<{ error: any }>;
  adminLogout: () => void;
  updateUserProfile: (updates: Partial<ExtendedUser>) => Promise<{ error: any }>;
  updatePersonalizationData: (data: Partial<PersonalizationData>) => Promise<{ error: any }>;
  getUserType: () => UserRole;
  refreshPersonalizationData: () => Promise<void>;
  getBetaStatus: () => { isBetaTester: boolean; version: string; enabledFeatures: number; totalFeatures: number; };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // v116: 베타 시스템 초기화 (SSR 안전성 개선)
  useEffect(() => {
    const initializeBetaSystems = () => {
      // SSR 에서는 실행하지 않음
      if (typeof window === 'undefined') {
        return;
      }
      
      try {
        // 베타 알림 템플릿 초기화
        const notificationService = BetaNotificationService.getInstance();
        notificationService.initializeTemplates();

        console.log('🚀 Beta systems initialized');
      } catch (error) {
        console.error('Failed to initialize beta systems:', error);
      }
    };

    // 지연 실행으로 SSR 안정성 향상
    setTimeout(initializeBetaSystems, 100);
  }, []);

  useEffect(() => {
    // 관리자 세션 상태 확인 (SSR 안전성)
    if (typeof window === 'undefined') {
      return;
    }
    
    console.log('🔍 AuthContext: Checking admin session...');
    
    // 🚨 강제 초기화 - 기존 세션 완전 제거 (개발/디버깅용)
    if (window.location.search.includes('force-reset=true')) {
      console.log('🧹 Force reset triggered - clearing all admin data');
      localStorage.removeItem('admin-session');
      localStorage.removeItem('admin-login-time');
      setIsAdminLoggedIn(false);
      return;
    }
    
    // 관리자 세션 확인
    const adminSession = localStorage.getItem('admin-session');
    const adminLoginTime = localStorage.getItem('admin-login-time');
    
    console.log('🔍 Session check:', { adminSession, adminLoginTime });
    
    if (adminSession === 'true' && adminLoginTime) {
      // 세션 시간 확인 (24시간 유효)
      const loginTime = new Date(adminLoginTime);
      const now = new Date();
      const hoursSinceLogin = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
      
      console.log('⏰ Hours since login:', hoursSinceLogin);
      
      if (hoursSinceLogin < 24) {
        setIsAdminLoggedIn(true);
        console.log('🔑 Admin session restored from localStorage');
      } else {
        // 세션 만료
        localStorage.removeItem('admin-session');
        localStorage.removeItem('admin-login-time');
        setIsAdminLoggedIn(false);
        console.log('⏰ Admin session expired');
      }
    } else {
      setIsAdminLoggedIn(false);
      console.log('❌ No valid admin session found');
    }

    // 데모 사용자 확인
    const checkDemoUser = () => {
      const demoUserData = localStorage.getItem('demo-user');
      if (demoUserData) {
        const demoUser = JSON.parse(demoUserData);
        setUser(createExtendedDemoUser(demoUser));
        setLoading(false);
        return true;
      }
      return false;
    };

    // 데모 사용자가 있으면 바로 설정
    if (checkDemoUser()) {
      return;
    }

    // Supabase 세션 확인 (안전한 처리)
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        if (session?.user) {
          loadUserProfile(session.user);
        } else {
          setLoading(false);
        }
      }).catch((error) => {
        console.warn('Session check failed:', error);
        setLoading(false);
      });

      // 인증 상태 변경 리스너
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        setSession(session);
        if (session?.user) {
          await loadUserProfile(session.user);
        } else {
          setUser(null);
          setLoading(false);
        }
      });

      return () => subscription?.unsubscribe();
    } else {
      // Supabase 없이도 앱이 동작하도록
      setLoading(false);
    }
  }, []);

  // 데모 사용자를 ExtendedUser로 변환
  const createExtendedDemoUser = (demoUser: any): ExtendedUser => {
    const personalizationData = generateDemoPersonalizationData();
    
    return {
      ...demoUser,
      id: demoUser.id,
      email: demoUser.email,
      role: 'member',
      membershipLevel: demoUser.membershipLevel || 'premium',
      name: demoUser.name,
      enrollmentDate: demoUser.enrollmentDate,
      lastActivity: new Date(),
      personalizationData,
      // Supabase User 인터페이스 필수 필드들
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      app_metadata: {},
      user_metadata: { name: demoUser.name },
      identities: [],
      factors: []
    };
  };

  // 데모용 개인화 데이터 생성
  const generateDemoPersonalizationData = (): PersonalizationData => {
    return {
      learningProgress: {
        enrolledCourses: ['제주도 여행 기획 코스'],
        currentWeek: 3,
        currentPhase: 2,
        completedPhases: 7,
        totalPhases: 12,
        completionRate: 58
      },
      aiInteractions: {
        totalConversations: 23,
        totalMessages: 147,
        avgSatisfactionScore: 4.6,
        lastInteractionDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2시간 전
        preferredAIStyle: 'detailed'
      },
      achievements: {
        badges: ['🚀 빠른 시작자', '💬 활발한 소통왕', '🎯 꾸준한 실행자'],
        streak: 7,
        completedCourses: 1,
        totalStudyTime: 420 // 분
      },
      preferences: {
        learningStyle: 'mixed',
        preferredStudyTime: 'evening',
        difficultyPreference: 'medium',
        language: 'ko'
      }
    };
  };

  // 사용자 프로필 로드
  const loadUserProfile = async (authUser: User) => {
    try {
      // Supabase가 없는 경우 기본 처리
      if (!supabase) {
        const extendedUser: ExtendedUser = {
          ...authUser,
          role: 'member',
          membershipLevel: 'free',
          name: authUser.user_metadata?.name,
          enrollmentDate: new Date().toISOString(),
          lastActivity: new Date(),
          personalizationData: generateDemoPersonalizationData()
        };
        setUser(extendedUser);
        setLoading(false);
        return;
      }

      // 기본 프로필 정보 조회
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error loading profile:', profileError);
      }

      // 개인화 데이터 조회
      const { data: personalization, error: personalizationError } = await supabase
        .from('user_personalization')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      if (personalizationError && personalizationError.code !== 'PGRST116') {
        console.error('Error loading personalization:', personalizationError);
      }

      // 확장된 사용자 객체 생성
      const extendedUser: ExtendedUser = {
        ...authUser,
        role: 'member', // 실제 사용자는 모두 member로 설정
        membershipLevel: profile?.membership_level || 'free',
        name: profile?.name || authUser.user_metadata?.name,
        enrollmentDate: profile?.created_at,
        lastActivity: profile?.last_activity ? new Date(profile.last_activity) : new Date(),
        personalizationData: personalization ? {
          learningProgress: personalization.learning_progress || generateDefaultLearningProgress(),
          aiInteractions: personalization.ai_interactions || generateDefaultAIInteractions(),
          achievements: personalization.achievements || generateDefaultAchievements(),
          preferences: personalization.preferences || generateDefaultPreferences()
        } : generateDemoPersonalizationData()
      };

      setUser(extendedUser);
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  // 기본 데이터 생성 함수들
  const generateDefaultLearningProgress = () => ({
    enrolledCourses: [],
    currentWeek: 1,
    currentPhase: 1,
    completedPhases: 0,
    totalPhases: 8,
    completionRate: 0
  });

  const generateDefaultAIInteractions = () => ({
    totalConversations: 0,
    totalMessages: 0,
    avgSatisfactionScore: 0,
    preferredAIStyle: 'detailed' as const
  });

  const generateDefaultAchievements = () => ({
    badges: [],
    streak: 0,
    completedCourses: 0,
    totalStudyTime: 0
  });

  const generateDefaultPreferences = () => ({
    learningStyle: 'mixed' as const,
    preferredStudyTime: 'evening' as const,
    difficultyPreference: 'medium' as const,
    language: 'ko' as const
  });

  // 로그인
  const signIn = async (email: string, password: string) => {
    const securityMonitor = SecurityMonitor.getInstance();
    
    // v120: 로그인 시도 검증
    const validation = securityMonitor.validateLoginAttempt(email);
    if (!validation.allowed) {
      return { error: { message: validation.reason } };
    }

    try {
      // Supabase가 설정되지 않은 경우 데모 로그인 처리
      if (!supabase) {
        // 데모 계정 체크
        if (email === 'demo@ideaworklab.com' && password === 'demo123456') {
          const demoUser = {
            id: 'demo-user-1',
            email: 'demo@ideaworklab.com',
            name: '데모 사용자',
            role: 'member' as const,
            membershipLevel: 'premium' as const,
            enrollmentDate: new Date().toISOString(),
            lastActivity: new Date(),
            aud: 'authenticated',
            created_at: new Date().toISOString(),
            app_metadata: {},
            user_metadata: { name: '데모 사용자' },
            identities: [],
            factors: [],
            personalizationData: generateDemoPersonalizationData()
          };
          
          setUser(demoUser);
          localStorage.setItem('demo-user', JSON.stringify(demoUser));
          securityMonitor.recordSuccessfulLogin(email);
          return { error: null };
        } else {
          securityMonitor.recordFailedLogin(email);
          return { error: { message: '데모 계정: demo@ideaworklab.com / demo123456' } };
        }
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        securityMonitor.recordFailedLogin(email);
      } else {
        securityMonitor.recordSuccessfulLogin(email);
      }
      
      return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: { message: 'Failed to fetch. Please check your connection.' } };
    }
  };

  // 회원가입
  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      // Supabase가 설정되지 않은 경우 데모 회원가입 처리
      if (!supabase) {
        const demoUser = {
          id: `demo-user-${Date.now()}`,
          email: email,
          name: metadata?.name || '새 사용자',
          role: 'member' as const,
          membershipLevel: 'free' as const,
          enrollmentDate: new Date().toISOString(),
          lastActivity: new Date(),
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: { name: metadata?.name || '새 사용자' },
          identities: [],
          factors: [],
          personalizationData: generateDemoPersonalizationData()
        };
        
        setUser(demoUser);
        localStorage.setItem('demo-user', JSON.stringify(demoUser));
        return { error: null };
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: { message: 'Failed to fetch. Please check your connection.' } };
    }
  };

  // 소셜 로그인
  const signInWithOAuth = async (provider: 'google' | 'kakao' | 'naver') => {
    try {
      // Supabase가 설정되지 않은 경우
      if (!supabase) {
        return { 
          error: new Error('소셜 로그인은 실제 Supabase 설정이 필요합니다. 데모 계정을 사용해주세요.') 
        };
      }

      // Google은 Supabase 기본 지원
      if (provider === 'google') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`
          }
        });
        return { error };
      }
      
      // Kakao, Naver는 추후 구현
      // 현재는 에러 반환
      return { 
        error: new Error(`${provider} 로그인은 준비 중입니다.`) 
      };
    } catch (error) {
      console.error('OAuth error:', error);
      return { error: { message: 'Failed to fetch. Please check your connection.' } };
    }
  };

  // v117: 강화된 관리자 로그인
  const adminLogin = async (password: string) => {
    const securityMonitor = SecurityMonitor.getInstance();
    
    // v120: 관리자 액세스 시도 검증
    const validation = securityMonitor.validateAdminAccess();
    if (!validation.allowed) {
      return { error: { message: validation.reason } };
    }

    try {
      // 관리자 비밀번호 확인
      if (password === 'ideaworklab2024') {
        setIsAdminLoggedIn(true);
        localStorage.setItem('admin-session', 'true');
        localStorage.setItem('admin-login-time', new Date().toISOString());
        
        // v117: 베타 플래그 서비스에 관리자 컨텍스트 설정
        const betaService = BetaFlagService.getInstance();
        betaService.setUserContext('admin', 'admin');
        
        // v117: 관리자 로그인 감사 로깅
        logAdminLogin('admin', true, { 
          loginTime: new Date().toISOString(),
          userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Unknown'
        });
        
        console.log('🔑 Admin access granted - Enhanced security mode activated');
        return { error: null };
      } else {
        // v117: 실패한 로그인 시도 기록
        logAdminLogin('admin', false, { 
          attemptTime: new Date().toISOString(),
          reason: 'Invalid password'
        });
        
        return { error: { message: '잘못된 관리자 비밀번호입니다.' } };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return { error: { message: '관리자 로그인 중 오류가 발생했습니다.' } };
    }
  };

  // v117: 강화된 관리자 로그아웃
  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('admin-session');
    localStorage.removeItem('admin-login-time');
    
    // v117: 베타 플래그 서비스 컨텍스트 정리
    const betaService = BetaFlagService.getInstance();
    betaService.setUserContext('guest', 'guest');
    
    // v117: 관리자 로그아웃 감사 로깅
    logAdminLogout('admin');
    
    console.log('🔒 Admin session terminated - Security mode deactivated');
  };

  // 로그아웃
  const signOut = async () => {
    // 데모 사용자 정보 제거
    localStorage.removeItem('demo-user');
    
    // 관리자 세션 제거
    adminLogout();
    
    // Supabase 로그아웃 (안전한 처리)
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (error) {
        console.warn('Logout error:', error);
      }
    }
    
    setUser(null);
    setSession(null);
  };

  // 사용자 프로필 업데이트
  const updateUserProfile = async (updates: Partial<ExtendedUser>) => {
    if (!user) return { error: new Error('User not authenticated') };

    // 데모 사용자인 경우
    if (user.id.startsWith('demo-')) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('demo-user', JSON.stringify(updatedUser));
      return { error: null };
    }

    // 실제 사용자인 경우
    if (!supabase) {
      return { error: new Error('Database not configured') };
    }

    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        ...updates,
        updated_at: new Date().toISOString()
      });

    if (!error) {
      setUser({ ...user, ...updates });
    }

    return { error };
  };

  // 개인화 데이터 업데이트
  const updatePersonalizationData = async (data: Partial<PersonalizationData>) => {
    if (!user) return { error: new Error('User not authenticated') };

    const updatedData = {
      ...user.personalizationData,
      ...data
    };

    // 데모 사용자인 경우
    if (user.id.startsWith('demo-')) {
      const updatedUser = {
        ...user,
        personalizationData: updatedData
      };
      setUser(updatedUser);
      localStorage.setItem('demo-user', JSON.stringify(updatedUser));
      return { error: null };
    }

    // 실제 사용자인 경우
    if (!supabase) {
      return { error: new Error('Database not configured') };
    }

    const { error } = await supabase
      .from('user_personalization')
      .upsert({
        user_id: user.id,
        learning_progress: updatedData.learningProgress,
        ai_interactions: updatedData.aiInteractions,
        achievements: updatedData.achievements,
        preferences: updatedData.preferences,
        updated_at: new Date().toISOString()
      });

    if (!error) {
      setUser({
        ...user,
        personalizationData: updatedData
      });
    }

    return { error };
  };

  // 사용자 타입 반환
  const getUserType = (): UserRole => {
    if (isAdminLoggedIn) return 'admin';
    if (!user) return 'guest';
    return user.role;
  };

  // 개인화 데이터 새로고침
  const refreshPersonalizationData = async () => {
    if (!user) return;
    
    // 데모 사용자인 경우 새로운 데이터 생성
    if (user.id.startsWith('demo-')) {
      const newPersonalizationData = generateDemoPersonalizationData();
      await updatePersonalizationData(newPersonalizationData);
      return;
    }

    // 실제 사용자인 경우 재로드
    await loadUserProfile(user);
  };

  // v115: 베타 테스트 상태 반환
  const getBetaStatus = () => {
    const betaService = BetaFlagService.getInstance();
    return betaService.getBetaStatus();
  };

  const value = {
    user,
    session,
    loading,
    isAdminLoggedIn,
    signIn,
    signUp,
    signInWithOAuth,
    signOut,
    adminLogin,
    adminLogout,
    updateUserProfile,
    updatePersonalizationData,
    getUserType,
    refreshPersonalizationData,
    getBetaStatus
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