// Supabase Course System Query Functions for IdeaWorkLab v3.0
// 8-Phase Thinking Expansion Course System

import { supabase } from './client';
import { User } from '@supabase/supabase-js';
import DOMPurify from 'isomorphic-dompurify';
import { 
  Course, 
  CourseLevel, 
  CourseSession, 
  ContentBlock,
  UserProgress,
  CourseFilters,
  CourseSortOptions
} from '@/components/course/types';

// Security validation functions
function validateCourseFilters(filters: CourseFilters): CourseFilters {
  const validCategories = ['thinking', 'creativity', 'problem-solving', 'communication', 'collaboration'];
  const validDifficulties = ['beginner', 'intermediate', 'advanced'];
  
  return {
    category: filters.category && validCategories.includes(filters.category) ? filters.category : undefined,
    difficulty: filters.difficulty && validDifficulties.includes(filters.difficulty) ? filters.difficulty : undefined,
    searchQuery: filters.searchQuery ? DOMPurify.sanitize(filters.searchQuery, { ALLOWED_TAGS: [] }).slice(0, 100) : undefined
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
export async function getPublishedCourses(
  filters: CourseFilters = {},
  sortOptions: CourseSortOptions = { field: 'popularity', order: 'desc' },
  user?: User,
  page: number = 1,
  limit: number = 12
): Promise<{ courses: Course[]; totalCount: number }> {
  try {
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
      title: DOMPurify.sanitize(course.title, { ALLOWED_TAGS: [] }),
      description: DOMPurify.sanitize(course.description, { ALLOWED_TAGS: [] }),
      category: course.category,
      difficulty: course.difficulty,
      totalLevels: course.total_levels,
      estimatedDuration: course.estimated_duration,
      enrolledCount: course.enrolled_count,
      rating: course.rating || 0,
      levels: course.course_levels?.map((level: any) => ({
        id: level.level_number,
        name: DOMPurify.sanitize(level.name, { ALLOWED_TAGS: [] }),
        title: DOMPurify.sanitize(level.title, { ALLOWED_TAGS: [] }),
        description: DOMPurify.sanitize(level.description, { ALLOWED_TAGS: [] }),
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
        name: DOMPurify.sanitize(course.author?.raw_user_meta_data?.name || 'Unknown Author', { ALLOWED_TAGS: [] }),
        avatar: course.author?.raw_user_meta_data?.avatar_url,
        bio: DOMPurify.sanitize(course.author?.raw_user_meta_data?.bio || '', { ALLOWED_TAGS: [] })
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
    return {
      courses: [],
      totalCount: 0
    };
  }
}

/**
 * 특정 코스의 상세 정보를 가져옵니다
 */
export async function getCourseById(courseId: string, user?: User): Promise<Course | null> {
  try {
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
      title: DOMPurify.sanitize(data.title, { ALLOWED_TAGS: [] }),
      description: DOMPurify.sanitize(data.description, { ALLOWED_TAGS: [] }),
      category: data.category,
      difficulty: data.difficulty,
      totalLevels: data.total_levels,
      estimatedDuration: data.estimated_duration,
      enrolledCount: data.enrolled_count,
      rating: data.rating || 0,
      levels: data.course_levels?.map((level: any) => ({
        id: level.level_number,
        name: DOMPurify.sanitize(level.name, { ALLOWED_TAGS: [] }),
        title: DOMPurify.sanitize(level.title, { ALLOWED_TAGS: [] }),
        description: DOMPurify.sanitize(level.description, { ALLOWED_TAGS: [] }),
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
        name: DOMPurify.sanitize(data.author?.raw_user_meta_data?.name || 'Unknown Author', { ALLOWED_TAGS: [] }),
        avatar: data.author?.raw_user_meta_data?.avatar_url,
        bio: DOMPurify.sanitize(data.author?.raw_user_meta_data?.bio || '', { ALLOWED_TAGS: [] })
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