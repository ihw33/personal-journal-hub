import { createClient } from '@supabase/supabase-js';

// Supabase 환경 변수
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

// Auth 헬퍼 함수들
export const auth = {
  // 이메일/비밀번호로 로그인
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // 회원가입
  signUp: async (email: string, password: string, metadata?: { name?: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    return { data, error };
  },

  // 소셜 로그인
  signInWithOAuth: async (provider: 'google' | 'github') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  },

  // 비밀번호 재설정 이메일 전송
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    return { data, error };
  },

  // 로그아웃
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // 현재 사용자 가져오기
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // 세션 가져오기
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // 사용자 정보 업데이트
  updateUser: async (attributes: { email?: string; password?: string; data?: object }) => {
    const { data, error } = await supabase.auth.updateUser(attributes);
    return { data, error };
  },
};

// 에러 메시지 한국어 변환
export const getAuthErrorMessage = (error: any): string => {
  if (!error) return '';
  
  const errorMessages: Record<string, string> = {
    'Invalid login credentials': '잘못된 이메일 또는 비밀번호입니다.',
    'Email not confirmed': '이메일 인증이 필요합니다. 메일함을 확인해주세요.',
    'User already registered': '이미 가입된 이메일입니다.',
    'Password should be at least 6 characters': '비밀번호는 최소 6자 이상이어야 합니다.',
    'Unable to validate email address: invalid format': '올바른 이메일 형식이 아닙니다.',
    'User not found': '존재하지 않는 사용자입니다.',
    'Email rate limit exceeded': '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
  };

  // 에러 메시지 매칭
  const message = error.message || error.error_description || '';
  for (const [key, value] of Object.entries(errorMessages)) {
    if (message.includes(key)) {
      return value;
    }
  }

  // 기본 에러 메시지
  return '오류가 발생했습니다. 다시 시도해주세요.';
};