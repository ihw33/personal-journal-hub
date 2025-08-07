// Supabase Course System Query Functions for IdeaWorkLab v3.0
// 8-Phase Thinking Expansion Course System

import { supabase } from './enhanced-client';
import { User } from '@supabase/supabase-js';
import { 
  Course, 
  CourseLevel, 
  CourseSession, 
  ContentBlock,
  UserProgress,
  CourseFilters,
  CourseSortOptions
} from '@/components/course/types';

// Safe sanitization function that works on both client and server
function sanitizeText(text: string, maxLength?: number): string {
  // Simple sanitization without DOMPurify to avoid SSR issues
  let sanitized = text
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
  
  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }
  
  return sanitized;
}

// Security validation functions
function validateCourseFilters(filters: CourseFilters): CourseFilters {
  const validCategories = ['thinking', 'creativity', 'problem-solving', 'communication', 'collaboration'];
  const validDifficulties = ['beginner', 'intermediate', 'advanced'];
  
  return {
    category: filters.category && validCategories.includes(filters.category) ? filters.category : undefined,
    difficulty: filters.difficulty && validDifficulties.includes(filters.difficulty) ? filters.difficulty : undefined,
    searchQuery: filters.searchQuery ? sanitizeText(filters.searchQuery, 100) : undefined
  };
}

function validateSortOptions(sortOptions: CourseSortOptions): CourseSortOptions {
  const validFields = ['popularity', 'rating', 'newest', 'progress'];
  const validOrders = ['asc', 'desc'];
  
  return {
    field: validFields.includes(sortOptions.field) ? sortOptions.field : 'popularity',
    order: validOrders.includes(sortOptions.order) ? sortOptions.order : 'desc'
  };
}

function validatePagination(page: number, limit: number): { page: number; limit: number } {
  return {
    page: Math.max(1, Math.min(page, 1000)), // Max 1000 pages
    limit: Math.max(1, Math.min(limit, 50)) // Max 50 items per page
  };
}

// ===============================
// COURSE QUERIES
// ===============================

/**
 * 모든 공개된 코스 목록을 가져옵니다
 */
// Dummy data for development/demo
const DUMMY_COURSES: Course[] = [
  {
    id: 'course-main',
    title: '8단계 사고 확장 마스터 과정',
    description: '체계적인 8단계 프로세스를 통해 사고의 깊이와 폭을 확장하는 종합 과정입니다.',
    category: 'thinking',
    difficulty: 'intermediate',
    totalLevels: 8,
    estimatedDuration: '8주',
    enrolledCount: 1247,
    rating: 4.8,
    levels: [
      { id: 1, name: 'Foundation', title: '사고의 기초', description: '기본적인 사고 프레임워크 이해', color: '#4F46E5', icon: '🏛️', isLocked: false, progress: 100, totalSessions: 5, completedSessions: 5, estimatedDuration: '1주', skills: ['논리적 사고', '분석 능력'], prerequisites: null },
      { id: 2, name: 'Exploring', title: '탐색과 발견', description: '다양한 관점으로 문제 탐색하기', color: '#7C3AED', icon: '🔍', isLocked: false, progress: 80, totalSessions: 6, completedSessions: 5, estimatedDuration: '1주', skills: ['창의적 탐색', '패턴 인식'], prerequisites: null },
      { id: 3, name: 'Convergence', title: '수렴적 사고', description: '정보를 체계적으로 정리하고 수렴', color: '#2563EB', icon: '🎯', isLocked: false, progress: 60, totalSessions: 5, completedSessions: 3, estimatedDuration: '1주', skills: ['정보 종합', '우선순위 설정'], prerequisites: null },
      { id: 4, name: 'Divergence', title: '발산적 사고', description: '창의적 아이디어 생성과 확장', color: '#06B6D4', icon: '💫', isLocked: false, progress: 40, totalSessions: 6, completedSessions: 2, estimatedDuration: '1주', skills: ['브레인스토밍', '아이디어 생성'], prerequisites: null },
      { id: 5, name: 'Critical', title: '비판적 분석', description: '논리적이고 비판적인 사고력 개발', color: '#10B981', icon: '⚖️', isLocked: false, progress: 20, totalSessions: 5, completedSessions: 1, estimatedDuration: '1주', skills: ['논증 분석', '오류 탐지'], prerequisites: null },
      { id: 6, name: 'Systems', title: '시스템 사고', description: '복잡한 시스템 이해와 분석', color: '#F59E0B', icon: '🔗', isLocked: false, progress: 0, totalSessions: 6, completedSessions: 0, estimatedDuration: '1주', skills: ['시스템 분석', '상호작용 이해'], prerequisites: null },
      { id: 7, name: 'Strategy', title: '전략적 사고', description: '장기적 관점의 전략 수립', color: '#EF4444', icon: '♟️', isLocked: true, progress: 0, totalSessions: 5, completedSessions: 0, estimatedDuration: '1주', skills: ['전략 기획', '시나리오 분석'], prerequisites: null },
      { id: 8, name: 'Mastery', title: '통합과 숙달', description: '모든 사고 기법의 통합 적용', color: '#8B5CF6', icon: '👑', isLocked: true, progress: 0, totalSessions: 6, completedSessions: 0, estimatedDuration: '1주', skills: ['통합적 사고', '마스터리'], prerequisites: null }
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    author: { id: '1', name: 'IWL 교육팀', avatar: '', bio: 'IdeaWork Lab 전문 교육팀' },
    tags: ['사고력', '창의성', '문제해결'],
    isEnrolled: true,
    currentLevel: 3,
    overallProgress: 48
  },
  {
    id: 'course-creative',
    title: '창의적 문제해결 워크숍',
    description: '실전 프로젝트를 통해 창의적 문제해결 능력을 개발하는 실습 중심 과정',
    category: 'creativity',
    difficulty: 'beginner',
    totalLevels: 4,
    estimatedDuration: '4주',
    enrolledCount: 892,
    rating: 4.7,
    levels: [],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-20',
    author: { id: '2', name: '김창의', avatar: '', bio: '창의성 전문가' },
    tags: ['창의성', '워크숍', '실습'],
    isEnrolled: false,
    currentLevel: 1,
    overallProgress: 0
  },
  {
    id: 'course-communication',
    title: '효과적인 커뮤니케이션 마스터',
    description: '생각을 명확하게 전달하고 소통하는 기술을 익히는 과정',
    category: 'communication',
    difficulty: 'intermediate',
    totalLevels: 5,
    estimatedDuration: '5주',
    enrolledCount: 1103,
    rating: 4.9,
    levels: [],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-18',
    author: { id: '3', name: '박소통', avatar: '', bio: '커뮤니케이션 전문가' },
    tags: ['소통', '프레젠테이션', '설득'],
    isEnrolled: false,
    currentLevel: 1,
    overallProgress: 0
  }
];

export async function getPublishedCourses(
  filters: CourseFilters = {},
  sortOptions: CourseSortOptions = { field: 'popularity', order: 'desc' },
  user?: User,
  page: number = 1,
  limit: number = 12
): Promise<{ courses: Course[]; totalCount: number }> {
  try {
    // Check if supabase is available
    if (!supabase) {
      throw new Error('Supabase not configured - using demo mode');
    }
    
    // Validate and sanitize all inputs
    const validatedFilters = validateCourseFilters(filters);
    const validatedSortOptions = validateSortOptions(sortOptions);
    const { page: validatedPage, limit: validatedLimit } = validatePagination(page, limit);
    let query = supabase
      .from('courses')
      .select(`
        *,
        author:auth.users!author_id(
          id,
          raw_user_meta_data
        ),
        course_levels(
          id,
          level_number,
          name,
          title,
          description,
          color,
          icon,
          estimated_duration,
          skills,
          prerequisites,
          sort_order
        ),
        user_course_enrollments!inner(
          enrolled_at,
          completed_at
        ),
        course_reviews(
          rating,
          created_at
        )
      `)
      .eq('is_published', true);

    // Apply validated filters
    if (validatedFilters.category) {
      query = query.eq('category', validatedFilters.category);
    }

    if (validatedFilters.difficulty) {
      query = query.eq('difficulty', validatedFilters.difficulty);
    }

    if (validatedFilters.searchQuery) {
      query = query.or(`title.ilike.%${validatedFilters.searchQuery}%,description.ilike.%${validatedFilters.searchQuery}%`);
    }

    // Apply validated sorting
    switch (validatedSortOptions.field) {
      case 'popularity':
        query = query.order('enrolled_count', { ascending: validatedSortOptions.order === 'asc' });
        break;
      case 'rating':
        query = query.order('rating', { ascending: validatedSortOptions.order === 'asc' });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: validatedSortOptions.order === 'asc' });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    // Get total count first for pagination
    const { count: totalCount } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true);

    // Apply validated pagination
    const from = (validatedPage - 1) * validatedLimit;
    const to = from + validatedLimit - 1;
    query = query.range(from, to);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }

    // Transform data to match Course interface with sanitization
    const courses: Course[] = data?.map(course => ({
      id: course.id,
      title: sanitizeText(course.title || ''),
      description: sanitizeText(course.description || ''),
      category: course.category,
      difficulty: course.difficulty,
      totalLevels: course.total_levels,
      estimatedDuration: course.estimated_duration,
      enrolledCount: course.enrolled_count,
      rating: course.rating || 0,
      levels: course.course_levels?.map((level: any) => ({
        id: level.level_number,
        name: sanitizeText(level.name || ''),
        title: sanitizeText(level.title || ''),
        description: sanitizeText(level.description || ''),
        color: level.color,
        icon: level.icon,
        isLocked: false, // Will be calculated based on user progress
        progress: 0, // Will be calculated based on user progress
        totalSessions: 4, // Default, should be calculated
        completedSessions: 0, // Will be calculated based on user progress
        estimatedDuration: level.estimated_duration,
        skills: level.skills || [],
        prerequisites: level.prerequisites
      })) || [],
      createdAt: course.created_at,
      updatedAt: course.updated_at,
      author: {
        id: course.author?.id || '',
        name: sanitizeText(course.author?.raw_user_meta_data?.name || 'Unknown Author'),
        avatar: course.author?.raw_user_meta_data?.avatar_url,
        bio: sanitizeText(course.author?.raw_user_meta_data?.bio || '')
      },
      tags: course.tags || [],
      isEnrolled: user ? course.user_course_enrollments?.length > 0 : false,
      currentLevel: 1, // Will be calculated based on user progress
      overallProgress: 0 // Will be calculated based on user progress
    })) || [];

    return {
      courses,
      totalCount: totalCount || 0
    };
  } catch (error) {
    console.error('Error in getPublishedCourses:', error);
    // Return dummy data as fallback
    console.log('Using dummy courses data as fallback');
    
    // Apply client-side filtering to dummy data
    let filteredCourses = [...DUMMY_COURSES];
    
    if (filters.category) {
      filteredCourses = filteredCourses.filter(c => c.category === filters.category);
    }
    
    if (filters.difficulty) {
      filteredCourses = filteredCourses.filter(c => c.difficulty === filters.difficulty);
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredCourses = filteredCourses.filter(c => 
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    filteredCourses.sort((a, b) => {
      switch (sortOptions.field) {
        case 'popularity':
          return sortOptions.order === 'asc' ? 
            a.enrolledCount - b.enrolledCount : 
            b.enrolledCount - a.enrolledCount;
        case 'rating':
          return sortOptions.order === 'asc' ? 
            a.rating - b.rating : 
            b.rating - a.rating;
        case 'newest':
          return sortOptions.order === 'asc' ? 
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() : 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
    
    // Apply pagination
    const start = (page - 1) * limit;
    const paginatedCourses = filteredCourses.slice(start, start + limit);
    
    return {
      courses: paginatedCourses,
      totalCount: filteredCourses.length
    };
  }
}

/**
 * 특정 코스의 상세 정보를 가져옵니다
 */
export async function getCourseById(courseId: string, user?: User): Promise<Course | null> {
  try {
    // Check if supabase is available
    if (!supabase) {
      // Return dummy course if it matches
      const dummyCourse = DUMMY_COURSES.find(c => c.id === courseId);
      return dummyCourse || null;
    }
    
    // Validate courseId format (UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!courseId || !uuidRegex.test(courseId)) {
      console.error('Invalid courseId format:', courseId);
      return null;
    }
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        author:auth.users!author_id(
          id,
          raw_user_meta_data
        ),
        course_levels(
          id,
          level_number,
          name,
          title,
          description,
          color,
          icon,
          estimated_duration,
          skills,
          prerequisites,
          sort_order,
          course_sessions(
            id,
            session_number,
            title,
            description,
            duration_minutes,
            sort_order
          )
        )
      `)
      .eq('id', courseId)
      .eq('is_published', true)
      .single();

    if (error) {
      console.error('Error fetching course:', error);
      throw error;
    }

    if (!data) {
      return null;
    }

    // Get user enrollment and progress if user is provided
    let userProgress: UserProgress | null = null;
    if (user) {
      userProgress = await getUserCourseProgress(user.id, courseId);
    }

    // Transform data to match Course interface with sanitization
    const course: Course = {
      id: data.id,
      title: sanitizeText(data.title || ''),
      description: sanitizeText(data.description || ''),
      category: data.category,
      difficulty: data.difficulty,
      totalLevels: data.total_levels,
      estimatedDuration: data.estimated_duration,
      enrolledCount: data.enrolled_count,
      rating: data.rating || 0,
      levels: data.course_levels?.map((level: any) => ({
        id: level.level_number,
        name: sanitizeText(level.name || ''),
        title: sanitizeText(level.title || ''),
        description: sanitizeText(level.description || ''),
        color: level.color,
        icon: level.icon,
        isLocked: userProgress ? level.level_number > userProgress.currentLevelId + 1 : level.level_number > 1,
        progress: userProgress ? calculateLevelProgress(level, userProgress) : 0,
        totalSessions: level.course_sessions?.length || 0,
        completedSessions: userProgress ? calculateCompletedSessions(level, userProgress) : 0,
        estimatedDuration: level.estimated_duration,
        skills: level.skills || [],
        prerequisites: level.prerequisites
      })) || [],
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      author: {
        id: data.author?.id || '',
        name: sanitizeText(data.author?.raw_user_meta_data?.name || 'Unknown Author'),
        avatar: data.author?.raw_user_meta_data?.avatar_url,
        bio: sanitizeText(data.author?.raw_user_meta_data?.bio || '')
      },
      tags: data.tags || [],
      isEnrolled: !!userProgress,
      currentLevel: userProgress?.currentLevelId || 1,
      overallProgress: userProgress?.overallProgress || 0
    };

    return course;
  } catch (error) {
    console.error('Error in getCourseById:', error);
    return null;
  }
}

// ===============================
// USER PROGRESS QUERIES
// ===============================

/**
 * 사용자의 특정 코스 진행 상황을 가져옵니다
 */
export async function getUserCourseProgress(userId: string, courseId: string): Promise<UserProgress | null> {
  try {
    const { data, error } = await supabase
      .from('user_course_progress')
      .select(`
        *,
        current_level:course_levels!current_level_id(
          level_number,
          name,
          title
        ),
        current_session:course_sessions!current_session_id(
          id,
          session_number,
          title
        )
      `)
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Get completed sessions
    const { data: sessionProgress } = await supabase
      .from('user_session_progress')
      .select(`
        session_id,
        is_completed,
        course_sessions(
          level_id,
          course_levels(
            level_number
          )
        )
      `)
      .eq('user_id', userId)
      .eq('is_completed', true);

    const completedSessions = sessionProgress?.map(sp => sp.session_id) || [];

    return {
      userId: data.user_id,
      courseId: data.course_id,
      currentLevelId: data.current_level?.level_number || 1,
      currentSessionId: data.current_session_id,
      overallProgress: data.overall_progress,
      levelProgress: {}, // Will be calculated separately if needed
      completedSessions,
      timeSpent: data.time_spent_minutes,
      lastAccessedAt: data.last_accessed_at,
      completedAt: data.completed_at
    };
  } catch (error) {
    console.error('Error in getUserCourseProgress:', error);
    return null;
  }
}

/**
 * 사용자의 모든 코스 진행 상황을 가져옵니다
 */
export async function getUserAllCourseProgress(userId: string): Promise<UserProgress[]> {
  try {
    const { data, error } = await supabase
      .from('user_course_progress')
      .select(`
        *,
        courses(
          title
        )
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user progress:', error);
      return [];
    }

    const progressList: UserProgress[] = data?.map(progress => ({
      userId: progress.user_id,
      courseId: progress.course_id,
      currentLevelId: progress.current_level_id || 1,
      currentSessionId: progress.current_session_id,
      overallProgress: progress.overall_progress,
      levelProgress: {},
      completedSessions: [], // Will need separate query for each course
      timeSpent: progress.time_spent_minutes,
      lastAccessedAt: progress.last_accessed_at,
      completedAt: progress.completed_at
    })) || [];

    return progressList;
  } catch (error) {
    console.error('Error in getUserAllCourseProgress:', error);
    return [];
  }
}

// ===============================
// ENROLLMENT FUNCTIONS
// ===============================

/**
 * 사용자를 코스에 등록합니다
 */
export async function enrollUserInCourse(userId: string, courseId: string): Promise<boolean> {
  try {
    // Check if already enrolled
    const { data: existingEnrollment } = await supabase
      .from('user_course_enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (existingEnrollment) {
      console.log('User already enrolled in course');
      return true;
    }

    // Create enrollment
    const { error: enrollmentError } = await supabase
      .from('user_course_enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
        enrolled_at: new Date().toISOString()
      });

    if (enrollmentError) {
      console.error('Error creating enrollment:', enrollmentError);
      return false;
    }

    // Initialize progress tracking
    const { error: progressError } = await supabase
      .from('user_course_progress')
      .insert({
        user_id: userId,
        course_id: courseId,
        overall_progress: 0,
        time_spent_minutes: 0,
        last_accessed_at: new Date().toISOString()
      });

    if (progressError) {
      console.error('Error initializing progress:', progressError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in enrollUserInCourse:', error);
    return false;
  }
}

// ===============================
// SESSION AND CONTENT QUERIES
// ===============================

/**
 * 특정 세션의 상세 정보와 콘텐츠 블록을 가져옵니다
 */
export async function getSessionWithContent(sessionId: string, userId?: string): Promise<CourseSession | null> {
  try {
    const { data, error } = await supabase
      .from('course_sessions')
      .select(`
        *,
        content_blocks(
          id,
          type,
          title,
          content,
          metadata,
          is_interactive,
          is_required,
          points,
          sort_order
        ),
        course_levels(
          course_id,
          level_number,
          title
        )
      `)
      .eq('id', sessionId)
      .single();

    if (error) {
      console.error('Error fetching session:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Get user progress for content blocks if user is provided
    let userBlockProgress: any[] = [];
    if (userId) {
      const { data: blockProgress } = await supabase
        .from('user_content_block_progress')
        .select('content_block_id, is_completed, user_response, score')
        .eq('user_id', userId)
        .in('content_block_id', data.content_blocks?.map((block: any) => block.id) || []);

      userBlockProgress = blockProgress || [];
    }

    const session: CourseSession = {
      id: data.id,
      courseId: data.course_levels.course_id,
      levelId: data.level_id,
      sessionNumber: data.session_number,
      title: data.title,
      description: data.description,
      duration: data.duration_minutes,
      isCompleted: false, // Will be calculated based on user progress
      isLocked: false, // Will be calculated based on user progress
      contentBlocks: data.content_blocks?.map((block: any) => {
        const userProgress = userBlockProgress.find(up => up.content_block_id === block.id);
        
        return {
          id: block.id,
          sessionId: data.id,
          type: block.type,
          order: block.sort_order,
          title: block.title,
          content: block.content,
          metadata: block.metadata,
          isInteractive: block.is_interactive,
          isCompleted: userProgress?.is_completed || false
        };
      }) || [],
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };

    return session;
  } catch (error) {
    console.error('Error in getSessionWithContent:', error);
    return null;
  }
}

// ===============================
// PROGRESS UPDATE FUNCTIONS
// ===============================

/**
 * 세션 완료를 기록합니다
 */
export async function markSessionCompleted(
  userId: string, 
  sessionId: string, 
  timeSpentMinutes: number = 0
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_session_progress')
      .upsert({
        user_id: userId,
        session_id: sessionId,
        progress_percentage: 100,
        time_spent_minutes: timeSpentMinutes,
        is_completed: true,
        completed_at: new Date().toISOString(),
        last_accessed_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error marking session completed:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in markSessionCompleted:', error);
    return false;
  }
}

/**
 * 콘텐츠 블록 완료를 기록합니다
 */
export async function markContentBlockCompleted(
  userId: string,
  contentBlockId: string,
  userResponse?: any,
  score?: number
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_content_block_progress')
      .upsert({
        user_id: userId,
        content_block_id: contentBlockId,
        is_completed: true,
        user_response: userResponse || {},
        score: score,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error marking content block completed:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in markContentBlockCompleted:', error);
    return false;
  }
}

// ===============================
// UTILITY FUNCTIONS
// ===============================

/**
 * 레벨별 진행률을 계산합니다
 */
function calculateLevelProgress(level: any, userProgress: UserProgress): number {
  // 실제 구현에서는 해당 레벨의 완료된 세션 수를 기반으로 계산
  const completedInLevel = userProgress.completedSessions.filter(sessionId => 
    sessionId.startsWith(`${level.id}-`)
  ).length;
  
  const totalInLevel = level.course_sessions?.length || 1;
  return Math.round((completedInLevel / totalInLevel) * 100);
}

/**
 * 레벨별 완료된 세션 수를 계산합니다
 */
function calculateCompletedSessions(level: any, userProgress: UserProgress): number {
  return userProgress.completedSessions.filter(sessionId => 
    sessionId.startsWith(`${level.id}-`)
  ).length;
}

/**
 * 학습 분석 데이터를 기록합니다
 */
export async function recordLearningAnalytics(
  userId: string,
  eventType: string,
  eventData: any = {},
  courseId?: string,
  sessionId?: string,
  durationSeconds?: number
): Promise<void> {
  try {
    await supabase
      .from('learning_analytics')
      .insert({
        user_id: userId,
        course_id: courseId,
        session_id: sessionId,
        event_type: eventType,
        event_data: eventData,
        duration_seconds: durationSeconds,
        timestamp: new Date().toISOString()
      });
  } catch (error) {
    console.error('Error recording analytics:', error);
  }
}