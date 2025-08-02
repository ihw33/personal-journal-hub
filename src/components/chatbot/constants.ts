/**
 * ===================================================================
 * IdeaWorkLab v3.3 Chatbot Constants
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * AI 파트너 '아키(Archi)' 챗봇 관련 상수 정의
 * ===================================================================
 */

import { SessionMode, BrainState, EmotionalState } from './types';

// API 엔드포인트
export const API_ENDPOINTS = {
  CREATE_SESSION: '/api/chat/session',
  GET_SESSIONS: '/api/chat/session',
  UPDATE_SESSION: '/api/chat/session',
  SEND_MESSAGE: '/api/chat/message',
  GET_HISTORY: '/api/chat/history',
  UPDATE_MESSAGE: '/api/chat/history',
} as const;

// 아키의 기본 설정
export const ARCHI_CONFIG = {
  NAME: '아키',
  FULL_NAME: '사고와 재능의 설계자',
  ENGLISH_NAME: 'Archi - The Architect of Thought and Talent',
  VERSION: 'v3.3',
  PERSONALITY: 'wise_companion',
} as const;

// 세션 모드 설정
export const SESSION_MODES: Record<SessionMode, { 
  label: string; 
  description: string; 
  icon: string; 
  color: string; 
}> = {
  guided: {
    label: '가이드 수련',
    description: '체계적인 8단계 사고 확장 시스템으로 안내받으며 학습',
    icon: '🎯',
    color: 'blue',
  },
  'self-directed': {
    label: '자유 수련',
    description: '자유로운 창의적 탐구와 발상을 통한 자기주도 학습',
    icon: '🚀',
    color: 'purple',
  },
} as const;

// 8단계 사고 확장 시스템
export const THINKING_PHASES = [
  { phase: 'observation', label: '관찰', icon: '👁️', description: '현상과 상황을 주의 깊게 관찰' },
  { phase: 'questioning', label: '질문', icon: '❓', description: '본질적인 질문을 통한 탐구' },
  { phase: 'analysis', label: '분석', icon: '🔍', description: '요소들을 체계적으로 분석' },
  { phase: 'connection', label: '연결', icon: '🔗', description: '다양한 개념들 간의 연결고리 발견' },
  { phase: 'imagination', label: '상상', icon: '💭', description: '창의적 상상력을 통한 확장' },
  { phase: 'synthesis', label: '종합', icon: '🧩', description: '요소들을 통합하여 새로운 관점 형성' },
  { phase: 'evaluation', label: '평가', icon: '⚖️', description: '비판적 사고를 통한 검증' },
  { phase: 'execution', label: '실행', icon: '⚡', description: '실용적 적용과 행동 계획' },
] as const;

// 뇌 상태 설정
export const BRAIN_STATES: Record<BrainState, {
  label: string;
  icon: string;
  color: string;
  description: string;
}> = {
  thinking: {
    label: '사고 중',
    icon: '🤔',
    color: 'yellow',
    description: '아키가 깊이 생각하고 있습니다',
  },
  ready: {
    label: '준비됨',
    icon: '😊',
    color: 'green',
    description: '아키가 응답할 준비가 되었습니다',
  },
  insights: {
    label: '통찰 모드',
    icon: '💡',
    color: 'orange',
    description: '아키가 새로운 통찰을 제공하고 있습니다',
  },
} as const;

// 감정 상태 설정
export const EMOTIONAL_STATES: Record<EmotionalState, {
  label: string;
  icon: string;
  color: string;
  description: string;
}> = {
  curious: {
    label: '호기심',
    icon: '🤗',
    color: 'blue',
    description: '새로운 것에 대한 호기심이 넘치는 상태',
  },
  excited: {
    label: '흥분',
    icon: '🎉',
    color: 'purple',
    description: '창의적 에너지가 높은 상태',
  },
  confused: {
    label: '혼란',
    icon: '😵',
    color: 'gray',
    description: '복잡한 내용으로 혼란스러운 상태',
  },
  frustrated: {
    label: '좌절',
    icon: '😤',
    color: 'red',
    description: '어려움으로 인해 답답한 상태',
  },
  enlightened: {
    label: '깨달음',
    icon: '✨',
    color: 'gold',
    description: '새로운 깨달음을 얻은 상태',
  },
} as const;

// 제한 설정
export const LIMITS = {
  MAX_MESSAGE_LENGTH: 2000,
  MAX_SESSION_TITLE_LENGTH: 200,
  MAX_ACTIVE_SESSIONS: 5,
  DEFAULT_MESSAGE_LIMIT: 50,
  MAX_MESSAGE_LIMIT: 100,
  RATE_LIMIT_PER_MINUTE: 60,
} as const;

// UI 설정
export const UI_SETTINGS = {
  TYPING_ANIMATION_DURATION: 1500,
  AUTO_SCROLL_DELAY: 100,
  MESSAGE_FADE_DURATION: 300,
  BRAIN_STATE_UPDATE_INTERVAL: 2000,
  RESPONSE_TIMEOUT: 30000,
} as const;

// 기본 메시지들
export const DEFAULT_MESSAGES = {
  WELCOME_GUIDED: '안녕하세요! 저는 아키입니다. 체계적인 사고 수련을 함께 시작해보겠습니다. 어떤 주제로 깊이 탐구해보고 싶으신가요?',
  WELCOME_SELF_DIRECTED: '반갑습니다! 자유로운 사고 탐험의 여정을 시작해보겠습니다. 오늘은 어떤 아이디어나 질문을 탐구해보고 싶으신가요?',
  SESSION_ENDED: '수고하셨습니다! 오늘의 사고 수련이 마무리되었습니다. 새로운 통찰을 얻으셨기를 바랍니다.',
  ERROR_GENERIC: '죄송합니다. 잠시 문제가 발생했습니다. 다시 시도해주세요.',
  ERROR_SESSION_NOT_FOUND: '세션을 찾을 수 없습니다. 새로운 세션을 시작해주세요.',
  ERROR_MESSAGE_TOO_LONG: `메시지가 너무 깁니다. ${LIMITS.MAX_MESSAGE_LENGTH}자 이내로 작성해주세요.`,
  PLACEHOLDER_MESSAGE: '아키에게 질문하거나 생각을 나누어보세요...',
} as const;

// 색상 설정
export const COLORS = {
  USER_MESSAGE: '#E3F2FD',
  ARCHI_MESSAGE: '#F3E5F5',
  INSIGHT_MESSAGE: '#FFF3E0',
  EXERCISE_MESSAGE: '#E8F5E8',
  FEEDBACK_MESSAGE: '#FFF8E1',
  ERROR_MESSAGE: '#FFEBEE',
  SYSTEM_MESSAGE: '#F5F5F5',
} as const;

// 아이콘 설정
export const ICONS = {
  USER: '👤',
  ARCHI: '🤖',
  INSIGHT: '💡',
  EXERCISE: '📝',
  FEEDBACK: '📊',
  THINKING: '💭',
  SEND: '➤',
  NEW_SESSION: '✨',
  HISTORY: '📖',
  SETTINGS: '⚙️',
} as const;

// 애니메이션 클래스
export const ANIMATIONS = {
  FADE_IN: 'animate-fadeIn',
  FADE_OUT: 'animate-fadeOut',
  SLIDE_UP: 'animate-slideUp',
  SLIDE_DOWN: 'animate-slideDown',
  PULSE: 'animate-pulse',
  BOUNCE: 'animate-bounce',
  TYPING: 'animate-typing',
} as const;

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  CURRENT_SESSION: 'archi_current_session',
  USER_PREFERENCES: 'archi_user_preferences',
  DRAFT_MESSAGE: 'archi_draft_message',
  SESSION_HISTORY: 'archi_session_history',
} as const;