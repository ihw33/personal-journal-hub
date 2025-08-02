/**
 * ===================================================================
 * IdeaWorkLab v3.3 Validation Schemas
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * Zod 기반 런타임 타입 검증 스키마
 * ===================================================================
 */

import { z } from 'zod';

// 세션 모드 검증
export const SessionModeSchema = z.enum(['guided', 'self-directed']);

// 세션 상태 검증
export const SessionStatusSchema = z.enum(['active', 'completed', 'paused', 'abandoned']);

// 감정 상태 검증
export const EmotionalStateSchema = z.enum(['curious', 'excited', 'confused', 'frustrated', 'enlightened']);

// 기본 문자열 검증 (XSS 방지)
export const SafeStringSchema = z.string()
  .min(1, '내용을 입력해주세요')
  .max(2000, '내용이 너무 깁니다 (최대 2000자)')
  .refine(
    (val) => !/<script|javascript:|data:text\/html/i.test(val),
    '안전하지 않은 내용이 포함되어 있습니다'
  );

// 제목 검증
export const TitleSchema = z.string()
  .min(1, '제목을 입력해주세요')
  .max(200, '제목이 너무 깁니다 (최대 200자)')
  .refine(
    (val) => !/<script|javascript:|data:text\/html/i.test(val),
    '안전하지 않은 내용이 포함되어 있습니다'
  );

// UUID 검증
export const UUIDSchema = z.string().uuid('올바른 UUID 형식이 아닙니다');

// 페이지네이션 검증
export const PaginationSchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
});

// 평점 검증
export const RatingSchema = z.number().min(1).max(5);

// ===================================================================
// 세션 관련 스키마
// ===================================================================

// 세션 생성 요청 스키마
export const CreateSessionSchema = z.object({
  title: TitleSchema,
  mode: SessionModeSchema.default('guided'),
  courseId: UUIDSchema.optional(),
  topics: z.array(z.string().max(50)).max(10).default([]),
  initialMessage: SafeStringSchema.optional(),
  courseContext: z.record(z.any()).default({}),
});

// 세션 업데이트 요청 스키마
export const UpdateSessionSchema = z.object({
  sessionId: UUIDSchema,
  status: SessionStatusSchema.optional(),
  emotionalEnd: EmotionalStateSchema.optional(),
  progress: z.number().min(0).max(100).optional(),
});

// 세션 목록 조회 쿼리 스키마
export const GetSessionsQuerySchema = z.object({
  status: SessionStatusSchema.or(z.literal('all')).default('all'),
  mode: SessionModeSchema.or(z.literal('all')).default('all'),
  ...PaginationSchema.shape,
});

// ===================================================================
// 메시지 관련 스키마
// ===================================================================

// 메시지 전송 요청 스키마
export const SendMessageSchema = z.object({
  sessionId: UUIDSchema,
  message: SafeStringSchema,
  mode: SessionModeSchema.default('guided'),
});

// 채팅 히스토리 조회 쿼리 스키마
export const GetChatHistoryQuerySchema = z.object({
  sessionId: UUIDSchema,
  ...PaginationSchema.shape,
});

// 메시지 평가 요청 스키마
export const RateMessageSchema = z.object({
  messageId: UUIDSchema,
  userRating: RatingSchema.optional(),
  userFoundHelpful: z.boolean().optional(),
}).refine(
  (data) => data.userRating !== undefined || data.userFoundHelpful !== undefined,
  '평점 또는 도움됨 여부 중 하나는 필수입니다'
);

// ===================================================================
// 응답 스키마 (타입 안전성을 위한 출력 검증)
// ===================================================================

// API 기본 응답 스키마
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  error: z.string().optional(),
});

// 세션 응답 스키마
export const SessionResponseSchema = z.object({
  id: UUIDSchema,
  title: z.string(),
  mode: SessionModeSchema,
  status: SessionStatusSchema,
  totalMessages: z.number(),
  insights: z.number(),
  progress: z.number(),
  topics: z.array(z.string()),
  emotionalState: EmotionalStateSchema,
  courseContext: z.record(z.any()),
  startedAt: z.string(),
  createdAt: z.string(),
  completedAt: z.string().optional(),
  lastActivityAt: z.string().optional(),
});

// 메시지 응답 스키마
export const MessageResponseSchema = z.object({
  id: UUIDSchema,
  content: z.string(),
  sender: z.enum(['user', 'archi']),
  timestamp: z.string(),
  metadata: z.record(z.any()).optional(),
  brainState: z.enum(['thinking', 'ready', 'insights']).optional(),
  isInsight: z.boolean().optional(),
  isExercise: z.boolean().optional(),
  isFeedback: z.boolean().optional(),
  resources: z.array(z.any()).optional(),
  topics: z.array(z.string()).optional(),
  processingTime: z.number().optional(),
});

// ===================================================================
// 유틸리티 함수
// ===================================================================

/**
 * 요청 본문 검증 헬퍼 함수
 */
export async function validateRequestBody<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);
    
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      const errorMessage = result.error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join(', ');
      
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    return { success: false, error: '잘못된 JSON 형식입니다' };
  }
}

/**
 * 쿼리 파라미터 검증 헬퍼 함수
 */
export function validateQueryParams<T>(
  url: URL,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; error: string } {
  try {
    const params = Object.fromEntries(url.searchParams.entries());
    const result = schema.safeParse(params);
    
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      const errorMessage = result.error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join(', ');
      
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    return { success: false, error: '쿼리 파라미터 검증 실패' };
  }
}

/**
 * 에러 응답 생성 헬퍼 함수
 */
export function createValidationErrorResponse(error: string, status = 400) {
  return Response.json(
    {
      success: false,
      error,
      message: '입력값 검증에 실패했습니다',
    },
    { status }
  );
}

/**
 * 성공 응답 생성 헬퍼 함수
 */
export function createSuccessResponse<T>(data: T, status = 200) {
  return Response.json(
    {
      success: true,
      ...data,
    },
    { status }
  );
}

// ===================================================================
// 개발용 스키마 검증 함수
// ===================================================================

/**
 * 개발 환경에서 스키마 테스트
 */
export function testSchemas() {
  if (process.env.NODE_ENV !== 'development') return;
  
  console.log('Testing validation schemas...');
  
  // 세션 생성 테스트
  const sessionTest = CreateSessionSchema.safeParse({
    title: '테스트 세션',
    mode: 'guided',
    topics: ['테스트'],
  });
  
  console.log('Session validation test:', sessionTest.success);
  
  // 메시지 전송 테스트
  const messageTest = SendMessageSchema.safeParse({
    sessionId: '12345678-1234-1234-1234-123456789012',
    message: '안녕하세요!',
    mode: 'guided',
  });
  
  console.log('Message validation test:', messageTest.success);
}

// 개발 환경에서 자동 테스트 실행
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  testSchemas();
}