"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export type UserRole = 'guest' | 'member';
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
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
  signInWithOAuth: (provider: 'google' | 'kakao' | 'naver') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<ExtendedUser>) => Promise<{ error: any }>;
  updatePersonalizationData: (data: Partial<PersonalizationData>) => Promise<{ error: any }>;
  getUserType: () => UserRole;
  refreshPersonalizationData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    // Supabase 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setLoading(false);
      }
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
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  // 회원가입
  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  // 소셜 로그인
  const signInWithOAuth = async (provider: 'google' | 'kakao' | 'naver') => {
    try {
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
      return { error };
    }
  };

  // 로그아웃
  const signOut = async () => {
    // 데모 사용자 정보 제거
    localStorage.removeItem('demo-user');
    
    // Supabase 로그아웃
    await supabase.auth.signOut();
    
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

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithOAuth,
    signOut,
    updateUserProfile,
    updatePersonalizationData,
    getUserType,
    refreshPersonalizationData
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