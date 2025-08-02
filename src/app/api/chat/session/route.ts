/**
 * ===================================================================
 * IdeaWorkLab v3.3 Learning Session API Route
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * 새로운 학습 세션 생성 및 관리 API
 * ===================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import DOMPurify from 'isomorphic-dompurify';
import { enforceRateLimit } from '@/lib/middleware/rate-limit';
import { 
  CreateSessionSchema, 
  UpdateSessionSchema, 
  GetSessionsQuerySchema,
  validateRequestBody,
  validateQueryParams,
  createValidationErrorResponse,
  createSuccessResponse
} from '@/lib/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting 체크
    const rateLimitResult = await enforceRateLimit(request, 'session');
    if (rateLimitResult) {
      return rateLimitResult;
    }

    const supabase = createRouteHandlerClient({ cookies });

    // 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Zod를 이용한 요청 본문 검증
    const validation = await validateRequestBody(request, CreateSessionSchema);
    if (!validation.success) {
      return createValidationErrorResponse(validation.error);
    }

    const { 
      title, 
      mode, 
      courseId, 
      topics, 
      initialMessage,
      courseContext 
    } = validation.data;

    // 입력값 추가 정제 (Zod 검증 후 추가 보안)
    const sanitizedTitle = DOMPurify.sanitize(title.trim(), { ALLOWED_TAGS: [] });
    const sanitizedTopics = topics.map((topic: string) => 
      DOMPurify.sanitize(topic, { ALLOWED_TAGS: [] })
    ).filter((topic: string) => topic.length > 0);

    // 코스 ID 검증 (제공된 경우)
    if (courseId) {
      // 코스 존재 및 접근 권한 확인
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .select('id, title, is_published')
        .eq('id', courseId)
        .eq('is_published', true)
        .single();

      if (courseError || !course) {
        return NextResponse.json(
          { error: 'Course not found or not accessible' },
          { status: 404 }
        );
      }
    }

    // 현재 활성 세션 수 확인 (사용자당 최대 5개 동시 세션)
    const { data: activeSessions, error: activeSessionsError } = await supabase
      .from('learning_sessions')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'active');

    if (activeSessionsError) {
      console.error('Error checking active sessions:', activeSessionsError);
      return NextResponse.json(
        { error: 'Failed to check session limits' },
        { status: 500 }
      );
    }

    if (activeSessions && activeSessions.length >= 5) {
      return NextResponse.json(
        { error: 'Maximum active sessions limit reached (5)' },
        { status: 429 }
      );
    }

    // 새로운 학습 세션 생성
    const sessionData = {
      user_id: user.id,
      course_id: courseId || null,
      title: sanitizedTitle,
      mode,
      status: 'active',
      topics: sanitizedTopics,
      emotional_journey_start: mode === 'guided' ? 'curious' : 'excited',
      course_context: courseContext || {},
      started_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_activity_at: new Date().toISOString()
    };

    const { data: newSession, error: sessionError } = await supabase
      .from('learning_sessions')
      .insert(sessionData)
      .select(`
        id,
        title,
        mode,
        status,
        total_messages,
        insights_count,
        current_progress,
        topics,
        emotional_journey_start,
        course_context,
        started_at,
        created_at
      `)
      .single();

    if (sessionError) {
      console.error('Error creating session:', sessionError);
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      );
    }

    // 환영 메시지 생성 (아키의 첫 메시지)
    const welcomeMessages = {
      guided: mode === 'guided' 
        ? '안녕하세요! 저는 아키입니다. 체계적인 사고 수련을 함께 시작해보겠습니다. 어떤 주제로 깊이 탐구해보고 싶으신가요?'
        : '반갑습니다! 자유로운 사고 탐험의 여정을 시작해보겠습니다. 오늘은 어떤 아이디어나 질문을 탐구해보고 싶으신가요?',
      'self-directed': '안녕하세요! 저는 아키입니다. 자유로운 사고 탐험의 여정을 시작해보겠습니다. 오늘은 어떤 아이디어나 질문을 탐구해보고 싶으신가요?'
    };

    const { data: welcomeMessage, error: welcomeError } = await supabase
      .from('chat_messages')
      .insert({
        session_id: newSession.id,
        sender: 'archi',
        content: welcomeMessages[mode as keyof typeof welcomeMessages],
        metadata: {
          type: 'welcome',
          mode,
          generated_at: new Date().toISOString()
        },
        archi_brain_state: 'ready',
        is_insight: false,
        is_exercise: false,
        is_feedback: false
      })
      .select()
      .single();

    if (welcomeError) {
      console.error('Error creating welcome message:', welcomeError);
      // 환영 메시지 실패는 치명적이지 않으므로 계속 진행
    }

    // 초기 메시지가 있는 경우 처리
    let userMessageResponse = null;
    if (initialMessage && initialMessage.trim().length > 0) {
      const sanitizedInitialMessage = DOMPurify.sanitize(initialMessage, { ALLOWED_TAGS: [] });
      
      if (sanitizedInitialMessage.length <= 2000) {
        const { data: userMessage } = await supabase
          .from('chat_messages')
          .insert({
            session_id: newSession.id,
            sender: 'user',
            content: sanitizedInitialMessage,
            metadata: {
              type: 'initial',
              mode
            }
          })
          .select()
          .single();

        userMessageResponse = userMessage;
      }
    }

    // 응답 구성
    const response = {
      success: true,
      session: {
        id: newSession.id,
        title: newSession.title,
        mode: newSession.mode,
        status: newSession.status,
        totalMessages: newSession.total_messages,
        insights: newSession.insights_count,
        progress: newSession.current_progress,
        topics: newSession.topics,
        emotionalState: newSession.emotional_journey_start,
        courseContext: newSession.course_context,
        startedAt: newSession.started_at,
        createdAt: newSession.created_at
      },
      welcomeMessage: welcomeMessage ? {
        id: welcomeMessage.id,
        content: welcomeMessage.content,
        sender: 'archi',
        timestamp: welcomeMessage.created_at,
        metadata: welcomeMessage.metadata
      } : null,
      initialUserMessage: userMessageResponse ? {
        id: userMessageResponse.id,
        content: userMessageResponse.content,
        sender: 'user',
        timestamp: userMessageResponse.created_at
      } : null
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Error in session creation API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 세션 목록 조회
export async function GET(request: NextRequest) {
  try {
    // Rate limiting 체크
    const rateLimitResult = await enforceRateLimit(request, 'general');
    if (rateLimitResult) {
      return rateLimitResult;
    }

    const supabase = createRouteHandlerClient({ cookies });

    // 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // 쿼리 파라미터 검증
    const url = new URL(request.url);
    const validation = validateQueryParams(url, GetSessionsQuerySchema);
    if (!validation.success) {
      return createValidationErrorResponse(validation.error);
    }

    const { status, mode, limit, offset } = validation.data;

    // 쿼리 빌드
    let query = supabase
      .from('learning_sessions')
      .select(`
        id,
        title,
        mode,
        status,
        total_messages,
        insights_count,
        current_progress,
        topics,
        emotional_journey_start,
        emotional_journey_end,
        duration_minutes,
        course_context,
        started_at,
        completed_at,
        last_activity_at,
        created_at
      `)
      .eq('user_id', user.id);

    // 필터 적용
    if (status !== 'all') {
      query = query.eq('status', status);
    }

    if (mode !== 'all') {
      query = query.eq('mode', mode);
    }

    // 정렬 및 페이지네이션
    const { data: sessions, error: sessionsError } = await query
      .order('last_activity_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (sessionsError) {
      console.error('Error fetching sessions:', sessionsError);
      return NextResponse.json(
        { error: 'Failed to fetch sessions' },
        { status: 500 }
      );
    }

    // 통계 계산
    const { data: stats } = await supabase
      .from('learning_sessions')
      .select('status, mode, total_messages, insights_count, duration_minutes')
      .eq('user_id', user.id);

    const sessionStats = stats?.reduce((acc, session) => {
      acc.total++;
      acc.totalMessages += session.total_messages || 0;
      acc.totalInsights += session.insights_count || 0;
      acc.totalDuration += session.duration_minutes || 0;
      
      if (session.status === 'completed') acc.completed++;
      if (session.mode === 'guided') acc.guided++;
      if (session.mode === 'self-directed') acc.selfDirected++;
      
      return acc;
    }, {
      total: 0,
      completed: 0,
      guided: 0,
      selfDirected: 0,
      totalMessages: 0,
      totalInsights: 0,
      totalDuration: 0
    }) || {
      total: 0,
      completed: 0,
      guided: 0,
      selfDirected: 0,
      totalMessages: 0,
      totalInsights: 0,
      totalDuration: 0
    };

    return NextResponse.json({
      success: true,
      sessions: sessions || [],
      stats: sessionStats,
      pagination: {
        limit,
        offset,
        hasMore: (sessions?.length || 0) === limit
      }
    });

  } catch (error) {
    console.error('Error in sessions list API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 세션 상태 업데이트
export async function PATCH(request: NextRequest) {
  try {
    // Rate limiting 체크
    const rateLimitResult = await enforceRateLimit(request, 'general');
    if (rateLimitResult) {
      return rateLimitResult;
    }

    const supabase = createRouteHandlerClient({ cookies });

    // 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Zod를 이용한 요청 본문 검증
    const validation = await validateRequestBody(request, UpdateSessionSchema);
    if (!validation.success) {
      return createValidationErrorResponse(validation.error);
    }

    const { sessionId, status, emotionalEnd, progress } = validation.data;

    // 업데이트 데이터 구성
    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (status) {
      updateData.status = status;
      
      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }
    }

    if (emotionalEnd) {
      updateData.emotional_journey_end = emotionalEnd;
    }

    if (progress !== undefined) {
      updateData.current_progress = Math.max(0, Math.min(100, progress));
    }

    // 세션 업데이트
    const { error: updateError } = await supabase
      .from('learning_sessions')
      .update(updateData)
      .eq('id', sessionId)
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Error updating session:', updateError);
      return NextResponse.json(
        { error: 'Failed to update session' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Session updated successfully'
    });

  } catch (error) {
    console.error('Error in session update API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}