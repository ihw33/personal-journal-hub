/**
 * ===================================================================
 * IdeaWorkLab v3.3 Chat Message API Route
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * AI 파트너 '아키(Archi)'와의 메시지 처리 API
 * ===================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import DOMPurify from 'isomorphic-dompurify';
import { generateArchiResponse } from '@/lib/ai/archi-engine';

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // 요청 본문 파싱 및 검증
    const body = await request.json();
    const { sessionId, message, mode = 'guided' } = body;

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: 'Session ID and message are required' },
        { status: 400 }
      );
    }

    // 입력값 정제 (XSS 방지)
    const sanitizedMessage = DOMPurify.sanitize(message, { ALLOWED_TAGS: [] });
    
    if (sanitizedMessage.length > 2000) {
      return NextResponse.json(
        { error: 'Message too long (max 2000 characters)' },
        { status: 400 }
      );
    }

    // 세션 유효성 확인
    const { data: session, error: sessionError } = await supabase
      .from('learning_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', user.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Invalid session or access denied' },
        { status: 403 }
      );
    }

    // 사용자 메시지 저장
    const { data: userMessage, error: userMessageError } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        sender: 'user',
        content: sanitizedMessage,
        metadata: {
          mode,
          input_length: sanitizedMessage.length,
          timestamp: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (userMessageError) {
      console.error('Error saving user message:', userMessageError);
      return NextResponse.json(
        { error: 'Failed to save message' },
        { status: 500 }
      );
    }

    // AI 응답 생성 시작 시간 기록
    const aiStartTime = Date.now();

    // AI 응답 생성
    const aiResponseData = await generateArchiResponse({
      message: sanitizedMessage,
      sessionId,
      userId: user.id,
      mode,
      sessionContext: {
        totalMessages: session.total_messages || 0,
        insights: session.insights_count || 0,
        topics: session.topics || [],
        emotionalState: session.emotional_journey_start
      }
    });

    const aiProcessingTime = Date.now() - aiStartTime;

    // AI 응답 저장
    const { data: archiMessage, error: archiMessageError } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        sender: 'archi',
        content: aiResponseData.content,
        metadata: {
          ...aiResponseData.metadata,
          mode,
          generated_at: new Date().toISOString()
        },
        archi_brain_state: aiResponseData.brainState || 'ready',
        processing_time_ms: aiProcessingTime,
        is_insight: aiResponseData.isInsight || false,
        is_exercise: aiResponseData.isExercise || false,
        is_feedback: aiResponseData.isFeedback || false,
        generated_resources: aiResponseData.resources || [],
        referenced_topics: aiResponseData.topics || []
      })
      .select()
      .single();

    if (archiMessageError) {
      console.error('Error saving AI response:', archiMessageError);
      return NextResponse.json(
        { error: 'Failed to save AI response' },
        { status: 500 }
      );
    }

    // 세션 통계 업데이트 (트리거로 자동 처리되지만 추가 정보 업데이트)
    const updates: any = {
      last_activity_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // 인사이트가 생성된 경우 감정 상태 업데이트
    if (aiResponseData.isInsight) {
      updates.emotional_journey_end = 'enlightened';
    }

    // 운동이나 피드백이 제공된 경우 진행률 업데이트
    if (aiResponseData.isExercise || aiResponseData.isFeedback) {
      updates.current_progress = Math.min((session.current_progress || 0) + 5, 100);
    }

    await supabase
      .from('learning_sessions')
      .update(updates)
      .eq('id', sessionId);

    // 응답 반환
    return NextResponse.json({
      success: true,
      userMessage: {
        id: userMessage.id,
        content: userMessage.content,
        timestamp: userMessage.created_at,
        sender: 'user'
      },
      archiMessage: {
        id: archiMessage.id,
        content: archiMessage.content,
        timestamp: archiMessage.created_at,
        sender: 'archi',
        metadata: archiMessage.metadata,
        brainState: archiMessage.archi_brain_state,
        isInsight: archiMessage.is_insight,
        isExercise: archiMessage.is_exercise,
        isFeedback: archiMessage.is_feedback,
        resources: archiMessage.generated_resources,
        topics: archiMessage.referenced_topics,
        processingTime: aiProcessingTime
      },
      sessionUpdate: {
        totalMessages: session.total_messages + 2,
        insights: session.insights_count + (aiResponseData.isInsight ? 1 : 0),
        progress: updates.current_progress || session.current_progress
      }
    });

  } catch (error) {
    console.error('Error in chat message API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Rate limiting 헤더 추가
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'X-RateLimit-Limit': '60',
      'X-RateLimit-Window': '1m'
    }
  });
}