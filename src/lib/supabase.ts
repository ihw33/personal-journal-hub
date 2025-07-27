import { createClient } from '@supabase/supabase-js'

// Browser-compatible environment variables for Vite
// In production, these should be set via build process or environment
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://demo-project.supabase.co'
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'demo-anon-key'

// Safe client creation with error handling
export const supabase = (() => {
  try {
    // Check if we have valid Supabase credentials (silent check)
    if (supabaseUrl === 'https://demo-project.supabase.co' || supabaseAnonKey === 'demo-anon-key') {
      // Running in demo mode - no console warnings
      return null; // Will handle in functions below
    }
    
    // Validate URL format
    if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
      // Invalid URL format - fallback to demo mode silently
      return null;
    }
    
    // Create Supabase client with real credentials
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
  } catch (error) {
    // Failed to create client - fallback to demo mode silently
    return null;
  }
})();

// Types for database tables
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'member' | 'instructor' | 'admin' | 'master';
  created_at: string;
  updated_at: string;
  subscription_status?: 'active' | 'inactive' | 'trial';
  subscription_end?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration_weeks: number;
  instructor_id: string;
  thumbnail_url?: string;
  status: 'draft' | 'published' | 'archived';
  rating: number;
  total_students: number;
  created_at: string;
  updated_at: string;
}

export interface CourseEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at?: string;
  progress: number;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_id?: string;
}

export interface Payment {
  id: string;
  user_id: string;
  course_id?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  stripe_payment_id: string;
  created_at: string;
  updated_at: string;
}

// Mock data for demo purposes
const DEMO_USER: User = {
  id: 'demo-user-id',
  email: 'demo@ideaworklab.com',
  full_name: '데모 사용자',
  role: 'member',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  subscription_status: 'trial'
};

const DEMO_COURSES: Course[] = [
  {
    id: 'course-jeju',
    title: '제주도 여행 계획 AI 협업 마스터 과정',
    description: 'AI와 함께 8주간 체계적으로 제주도 여행을 기획하며 AI 협업 방법론을 익히는 실전 과정',
    price: 299000,
    duration_weeks: 8,
    instructor_id: 'instructor-1',
    status: 'published',
    rating: 4.9,
    total_students: 1247,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'course-thinking',
    title: 'AI와 함께하는 창의적 사고법',
    description: 'AI 도구를 활용하여 창의성을 극대화하는 체계적인 사고 방법론',
    price: 199000,
    duration_weeks: 6,
    instructor_id: 'instructor-1',
    status: 'published',
    rating: 4.8,
    total_students: 892,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'course-writing',
    title: 'AI 협업 글쓰기 워크샵',
    description: 'AI와 함께 효과적인 글쓰기 기법을 익히는 실무 중심 과정',
    price: 149000,
    duration_weeks: 4,
    instructor_id: 'instructor-1',
    status: 'published',
    rating: 4.7,
    total_students: 654,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Demo mode checker
const isDemoMode = () => {
  return !supabase || supabaseUrl.includes('demo-project') || supabaseAnonKey === 'demo-anon-key';
};

// Auth helpers with demo fallback
export const getCurrentUser = async () => {
  if (isDemoMode()) {
    return null; // No user in demo mode initially
  }
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    // Supabase not configured - using demo mode
    return null;
  }
}

export const signUp = async (email: string, password: string, userData: any) => {
  if (isDemoMode()) {
    // Demo signup - always succeeds
    return { 
      data: { user: { ...DEMO_USER, email } }, 
      error: null 
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  } catch (error) {
    return { data: null, error: { message: 'Supabase not configured' } };
  }
}

export const signIn = async (email: string, password: string) => {
  if (isDemoMode()) {
    // Demo login - check for demo credentials
    if (email === 'demo@ideaworklab.com' && password === 'demo123456') {
      return { 
        data: { user: DEMO_USER }, 
        error: null 
      };
    } else {
      return { 
        data: null, 
        error: { message: '데모 계정: demo@ideaworklab.com / demo123456' } 
      };
    }
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  } catch (error) {
    return { data: null, error: { message: 'Supabase not configured' } };
  }
}

export const signOut = async () => {
  if (isDemoMode()) {
    return { error: null };
  }

  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error) {
    return { error: null };
  }
}

export const signInWithProvider = async (provider: 'google' | 'github' | 'facebook') => {
  if (isDemoMode()) {
    return { 
      data: null, 
      error: { message: '소셜 로그인은 실제 Supabase 설정이 필요합니다.' } 
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  } catch (error) {
    return { data: null, error: { message: 'Supabase not configured' } };
  }
}

// Database helpers with demo fallback
export const getUserProfile = async (userId: string) => {
  if (isDemoMode()) {
    return { data: DEMO_USER, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  } catch (error) {
    return { data: DEMO_USER, error: null };
  }
}

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  if (isDemoMode()) {
    return { data: { ...DEMO_USER, ...updates }, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    return { data, error }
  } catch (error) {
    return { data: { ...DEMO_USER, ...updates }, error: null };
  }
}

export const getCourses = async (filters?: { status?: string; instructor_id?: string }) => {
  if (isDemoMode()) {
    let filteredCourses = DEMO_COURSES;
    
    if (filters?.status) {
      filteredCourses = filteredCourses.filter(course => course.status === filters.status);
    }
    
    return { data: filteredCourses, error: null };
  }

  try {
    let query = supabase.from('courses').select('*')
    
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    
    if (filters?.instructor_id) {
      query = query.eq('instructor_id', filters.instructor_id)
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })
    return { data, error }
  } catch (error) {
    return { data: DEMO_COURSES, error: null };
  }
}

export const getCourseEnrollments = async (userId: string) => {
  if (isDemoMode()) {
    // Demo enrollment for Jeju course
    const demoEnrollments = [
      {
        id: 'enrollment-1',
        user_id: userId,
        course_id: 'course-jeju',
        enrolled_at: new Date().toISOString(),
        progress: 45,
        payment_status: 'completed',
        courses: DEMO_COURSES[0]
      }
    ];
    
    return { data: demoEnrollments, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('course_enrollments')
      .select(`
        *,
        courses (
          id,
          title,
          description,
          thumbnail_url,
          rating
        )
      `)
      .eq('user_id', userId)
      .order('enrolled_at', { ascending: false })
    
    return { data, error }
  } catch (error) {
    return { data: [], error: null };
  }
}

export const enrollInCourse = async (userId: string, courseId: string, paymentId?: string) => {
  if (isDemoMode()) {
    const course = DEMO_COURSES.find(c => c.id === courseId);
    return { 
      data: {
        id: `enrollment-${Date.now()}`,
        user_id: userId,
        course_id: courseId,
        payment_id: paymentId,
        progress: 0,
        enrolled_at: new Date().toISOString(),
        courses: course
      }, 
      error: null 
    };
  }

  try {
    const { data, error } = await supabase
      .from('course_enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
        payment_id: paymentId,
        progress: 0
      })
      .select()
      .single()
    
    return { data, error }
  } catch (error) {
    return { data: null, error };
  }
}

// Admin functions with demo fallback
export const getUsers = async (role?: string) => {
  if (isDemoMode()) {
    const demoUsers = [DEMO_USER];
    return { data: role ? demoUsers.filter(u => u.role === role) : demoUsers, error: null };
  }

  try {
    let query = supabase.from('users').select('*')
    
    if (role) {
      query = query.eq('role', role)
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })
    return { data, error }
  } catch (error) {
    return { data: [DEMO_USER], error: null };
  }
}

export const updateUserRole = async (userId: string, role: User['role']) => {
  if (isDemoMode()) {
    return { data: { ...DEMO_USER, role }, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', userId)
      .select()
      .single()
    
    return { data, error }
  } catch (error) {
    return { data: { ...DEMO_USER, role }, error: null };
  }
}

// Payment functions with demo fallback
export const createPayment = async (paymentData: Omit<Payment, 'id' | 'created_at' | 'updated_at'>) => {
  if (isDemoMode()) {
    return { 
      data: {
        ...paymentData,
        id: `payment-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, 
      error: null 
    };
  }

  try {
    const { data, error } = await supabase
      .from('payments')
      .insert(paymentData)
      .select()
      .single()
    
    return { data, error }
  } catch (error) {
    return { data: null, error };
  }
}

export const updatePaymentStatus = async (paymentId: string, status: Payment['status']) => {
  if (isDemoMode()) {
    return { 
      data: {
        id: paymentId,
        status,
        updated_at: new Date().toISOString()
      }, 
      error: null 
    };
  }

  try {
    const { data, error } = await supabase
      .from('payments')
      .update({ status })
      .eq('id', paymentId)
      .select()
      .single()
    
    return { data, error }
  } catch (error) {
    return { data: null, error };
  }
}