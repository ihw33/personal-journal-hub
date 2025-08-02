/**
 * ===================================================================
 * IdeaWorkLab v3.3 Chat History API Route
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * 특정 세션의 대화 기록 조회 API
 * ===================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { enforceRateLimit } from '@/lib/middleware/rate-limit';
import { 
  GetChatHistoryQuerySchema,
  RateMessageSchema,
  validateRequestBody,
  validateQueryParams,
  createValidationErrorResponse 
} from '@/lib/validation/schemas';

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
    const validation = validateQueryParams(url, GetChatHistoryQuerySchema);
    if (!validation.success) {
      return createValidationErrorResponse(validation.error);
    }

    const { sessionId, limit, offset } = validation.data;

    // 세션 소유권 확인
    const { data: session, error: sessionError } = await supabase
      .from('learning_sessions')
      .select('id, title, mode, status, total_messages, insights_count, current_progress, created_at')
      .eq('id', sessionId)
      .eq('user_id', user.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Session not found or access denied' },
        { status: 404 }
      );
    }

    // 대화 메시지 조회
    const { data: messages, error: messagesError } = await supabase
      .from('chat_messages')
      .select(`
        id,
        sender,
        content,
        message_order,
        metadata,
        archi_brain_state,
        processing_time_ms,
        is_insight,
        is_exercise,
        is_feedback,
        generated_resources,
        referenced_topics,
        user_rating,
        user_found_helpful,
        created_at,
        updated_at
      `)
      .eq('session_id', sessionId)
      .order('message_order', { ascending: true })
      .range(offset, offset + limit - 1);

    if (messagesError) {
      console.error('Error fetching messages:', messagesError);
      return NextResponse.json(
        { error: 'Failed to fetch chat history' },
        { status: 500 }
      );
    }

    // 메시지 통계 계산
    const messageStats = messages.reduce((stats, message) => {
      if (message.sender === 'user') {
        stats.userMessages++;
      } else if (message.sender === 'archi') {
        stats.archiMessages++;
        if (message.is_insight) stats.insights++;
        if (message.is_exercise) stats.exercises++;
        if (message.is_feedback) stats.feedback++;
        if (message.processing_time_ms) {
          stats.totalProcessingTime += message.processing_time_ms;
        }
      }
      return stats;
    }, {
      userMessages: 0,
      archiMessages: 0,
      insights: 0,
      exercises: 0,
      feedback: 0,
      totalProcessingTime: 0
    });

    // 평균 응답 시간 계산
    const averageResponseTime = messageStats.archiMessages > 0 
      ? Math.round(messageStats.totalProcessingTime / messageStats.archiMessages)
      : 0;

    // 응답 데이터 구성
    const response = {
      success: true,
      session: {
        id: session.id,
        title: session.title,
        mode: session.mode,
        status: session.status,
        totalMessages: session.total_messages,
        insights: session.insights_count,
        progress: session.current_progress,
        createdAt: session.created_at
      },
      messages: messages.map(message => ({
        id: message.id,
        sender: message.sender,
        content: message.content,
        order: message.message_order,
        timestamp: message.created_at,
        metadata: message.metadata,
        brainState: message.archi_brain_state,
        isInsight: message.is_insight,
        isExercise: message.is_exercise,
        isFeedback: message.is_feedback,
        resources: message.generated_resources,
        topics: message.referenced_topics,
        userRating: message.user_rating,
        userFoundHelpful: message.user_found_helpful,
        processingTime: message.processing_time_ms
      })),
      stats: {
        ...messageStats,
        averageResponseTime,
        totalMessages: messages.length,
        hasMore: messages.length === limit
      },
      pagination: {
        limit,
        offset,
        hasMore: messages.length === limit
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error in chat history API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 메시지 업데이트 (사용자 평가 등)
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
    const validation = await validateRequestBody(request, RateMessageSchema);
    if (!validation.success) {
      return createValidationErrorResponse(validation.error);
    }

    const { messageId, userRating, userFoundHelpful } = validation.data;

    // 메시지 소유권 확인
    const { data: message, error: messageError } = await supabase
      .from('chat_messages')
      .select(`
        id,
        session_id,
        learning_sessions!inner(user_id)
      `)
      .eq('id', messageId)
      .single();

    if (messageError || !message || message.learning_sessions.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Message not found or access denied' },
        { status: 404 }
      );
    }

    // 메시지 업데이트
    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (userRating !== undefined) updateData.user_rating = userRating;
    if (userFoundHelpful !== undefined) updateData.user_found_helpful = userFoundHelpful;

    const { error: updateError } = await supabase
      .from('chat_messages')
      .update(updateData)
      .eq('id', messageId);

    if (updateError) {
      console.error('Error updating message:', updateError);
      return NextResponse.json(
        { error: 'Failed to update message' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message updated successfully'
    });

  } catch (error) {
    console.error('Error in message update API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}