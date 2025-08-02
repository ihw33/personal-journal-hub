/**
 * ===================================================================
 * IdeaWorkLab v3.3 Chatbot Helpers
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * AI 파트너 '아키(Archi)' 챗봇 유틸리티 함수들
 * ===================================================================
 */

import { 
  ChatMessage, 
  LearningSession, 
  SessionMode, 
  BrainState, 
  EmotionalState,
  CreateSessionRequest,
  SendMessageRequest,
  ApiResponse,
  ChatMessageApiResponse,
  SessionListApiResponse,
  ChatHistoryApiResponse
} from './types';
import { API_ENDPOINTS, LIMITS, STORAGE_KEYS } from './constants';

// API 호출 함수들
export class ChatbotAPI {
  private static async fetchWithAuth<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(endpoint, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || '알 수 없는 오류가 발생했습니다.',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: '네트워크 오류가 발생했습니다.',
      };
    }
  }

  static async createSession(request: CreateSessionRequest): Promise<ApiResponse<LearningSession>> {
    return this.fetchWithAuth<LearningSession>(API_ENDPOINTS.CREATE_SESSION, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  static async getSessions(
    status?: string, 
    mode?: string, 
    limit = 20, 
    offset = 0
  ): Promise<ApiResponse<SessionListApiResponse>> {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (mode) params.append('mode', mode);
    params.append('limit', limit.toString());
    params.append('offset', offset.toString());

    return this.fetchWithAuth<SessionListApiResponse>(
      `${API_ENDPOINTS.GET_SESSIONS}?${params.toString()}`
    );
  }

  static async updateSession(
    sessionId: string,
    updates: { status?: string; emotionalEnd?: string; progress?: number }
  ): Promise<ApiResponse<any>> {
    return this.fetchWithAuth(API_ENDPOINTS.UPDATE_SESSION, {
      method: 'PATCH',
      body: JSON.stringify({ sessionId, ...updates }),
    });
  }

  static async sendMessage(request: SendMessageRequest): Promise<ApiResponse<ChatMessageApiResponse>> {
    return this.fetchWithAuth<ChatMessageApiResponse>(API_ENDPOINTS.SEND_MESSAGE, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  static async getChatHistory(
    sessionId: string, 
    limit = 50, 
    offset = 0
  ): Promise<ApiResponse<ChatHistoryApiResponse>> {
    const params = new URLSearchParams({
      sessionId,
      limit: limit.toString(),
      offset: offset.toString(),
    });

    return this.fetchWithAuth<ChatHistoryApiResponse>(
      `${API_ENDPOINTS.GET_HISTORY}?${params.toString()}`
    );
  }

  static async rateMessage(
    messageId: string, 
    rating: number, 
    helpful?: boolean
  ): Promise<ApiResponse<any>> {
    return this.fetchWithAuth(API_ENDPOINTS.UPDATE_MESSAGE, {
      method: 'PATCH',
      body: JSON.stringify({ 
        messageId, 
        userRating: rating, 
        userFoundHelpful: helpful 
      }),
    });
  }
}

// 유틸리티 함수들
export const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return '방금 전';
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}일 전`;
  
  return date.toLocaleDateString('ko-KR');
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}분`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) return `${hours}시간`;
  return `${hours}시간 ${remainingMinutes}분`;
};

export const validateMessage = (message: string): { valid: boolean; error?: string } => {
  if (!message.trim()) {
    return { valid: false, error: '메시지를 입력해주세요.' };
  }
  
  if (message.length > LIMITS.MAX_MESSAGE_LENGTH) {
    return { 
      valid: false, 
      error: `메시지가 너무 깁니다. ${LIMITS.MAX_MESSAGE_LENGTH}자 이내로 작성해주세요.` 
    };
  }
  
  return { valid: true };
};

export const validateSessionTitle = (title: string): { valid: boolean; error?: string } => {
  if (!title.trim()) {
    return { valid: false, error: '세션 제목을 입력해주세요.' };
  }
  
  if (title.length > LIMITS.MAX_SESSION_TITLE_LENGTH) {
    return { 
      valid: false, 
      error: `제목이 너무 깁니다. ${LIMITS.MAX_SESSION_TITLE_LENGTH}자 이내로 작성해주세요.` 
    };
  }
  
  return { valid: true };
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};

export const generateSessionTitle = (firstMessage: string): string => {
  const cleaned = sanitizeInput(firstMessage);
  if (cleaned.length <= 50) return cleaned;
  
  const truncated = cleaned.substring(0, 47) + '...';
  return truncated;
};

export const getEmotionalStateFromProgress = (progress: number): EmotionalState => {
  if (progress === 0) return 'curious';
  if (progress < 25) return 'confused';
  if (progress < 50) return 'frustrated';
  if (progress < 75) return 'excited';
  return 'enlightened';
};

export const getBrainStateIcon = (state: BrainState): string => {
  switch (state) {
    case 'thinking': return '🤔';
    case 'ready': return '😊';
    case 'insights': return '💡';
    default: return '🤖';
  }
};

export const getMessageTypeColor = (message: ChatMessage): string => {
  if (message.sender === 'user') return 'bg-blue-50 border-blue-200';
  if (message.isInsight) return 'bg-yellow-50 border-yellow-200';
  if (message.isExercise) return 'bg-green-50 border-green-200';
  if (message.isFeedback) return 'bg-purple-50 border-purple-200';
  return 'bg-gray-50 border-gray-200';
};

export const getMessageTypeIcon = (message: ChatMessage): string => {
  if (message.sender === 'user') return '👤';
  if (message.isInsight) return '💡';
  if (message.isExercise) return '📝';
  if (message.isFeedback) return '📊';
  return '🤖';
};

export const calculateSessionStats = (messages: ChatMessage[]) => {
  return messages.reduce((stats, message) => {
    if (message.sender === 'user') {
      stats.userMessages++;
    } else {
      stats.archiMessages++;
      if (message.isInsight) stats.insights++;
      if (message.isExercise) stats.exercises++;
      if (message.isFeedback) stats.feedback++;
    }
    return stats;
  }, {
    userMessages: 0,
    archiMessages: 0,
    insights: 0,
    exercises: 0,
    feedback: 0,
  });
};

export const estimateReadingTime = (text: string): number => {
  const wordsPerMinute = 200; // 한국어 평균 읽기 속도
  const words = text.length / 2; // 한국어는 대략 2글자가 1단어
  return Math.ceil(words / wordsPerMinute);
};

// 로컬 스토리지 헬퍼
export class LocalStorageHelper {
  static setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  static getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return defaultValue;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }

  static saveCurrentSession(sessionId: string): void {
    this.setItem(STORAGE_KEYS.CURRENT_SESSION, sessionId);
  }

  static getCurrentSession(): string | null {
    return this.getItem<string | null>(STORAGE_KEYS.CURRENT_SESSION, null);
  }

  static clearCurrentSession(): void {
    this.removeItem(STORAGE_KEYS.CURRENT_SESSION);
  }

  static saveDraftMessage(message: string): void {
    this.setItem(STORAGE_KEYS.DRAFT_MESSAGE, message);
  }

  static getDraftMessage(): string {
    return this.getItem<string>(STORAGE_KEYS.DRAFT_MESSAGE, '');
  }

  static clearDraftMessage(): void {
    this.removeItem(STORAGE_KEYS.DRAFT_MESSAGE);
  }
}

// 디바운스 유틸리티
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// 스크롤 유틸리티
export const scrollToBottom = (element: HTMLElement, smooth = true): void => {
  element.scrollTo({
    top: element.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto',
  });
};

// 텍스트 하이라이트 유틸리티
export const highlightKeywords = (text: string, keywords: string[]): string => {
  if (!keywords.length) return text;
  
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

// 에러 처리 유틸리티
export const handleApiError = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  return '알 수 없는 오류가 발생했습니다.';
};