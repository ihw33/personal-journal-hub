/**
 * ===================================================================
 * IdeaWorkLab v3.3 Chatbot Types
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * AI 파트너 '아키(Archi)' 챗봇 컴포넌트 타입 정의
 * ===================================================================
 */

export type SessionMode = 'guided' | 'self-directed';
export type SessionStatus = 'active' | 'completed' | 'paused' | 'abandoned';
export type MessageSender = 'user' | 'archi';
export type BrainState = 'thinking' | 'ready' | 'insights';
export type EmotionalState = 'curious' | 'excited' | 'confused' | 'frustrated' | 'enlightened';

export interface ChatMessage {
  id: string;
  sessionId: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  order: number;
  metadata?: Record<string, any>;
  brainState?: BrainState;
  isInsight?: boolean;
  isExercise?: boolean;
  isFeedback?: boolean;
  resources?: any[];
  topics?: string[];
  userRating?: number;
  userFoundHelpful?: boolean;
  processingTime?: number;
}

export interface LearningSession {
  id: string;
  title: string;
  mode: SessionMode;
  status: SessionStatus;
  totalMessages: number;
  insights: number;
  progress: number;
  topics: string[];
  emotionalState: EmotionalState;
  courseContext?: Record<string, any>;
  startedAt: string;
  completedAt?: string;
  lastActivityAt: string;
  createdAt: string;
}

export interface SessionStats {
  total: number;
  completed: number;
  guided: number;
  selfDirected: number;
  totalMessages: number;
  totalInsights: number;
  totalDuration: number;
}

export interface ChatbotInterfaceProps {
  sessionId?: string;
  mode?: SessionMode;
  onSessionCreate?: (session: LearningSession) => void;
  onSessionEnd?: (sessionId: string) => void;
  className?: string;
}

export interface ConversationHistoryProps {
  sessionId: string;
  messages: ChatMessage[];
  loading?: boolean;
  onMessageRate?: (messageId: string, rating: number) => void;
  onMessageHelpful?: (messageId: string, helpful: boolean) => void;
  className?: string;
}

export interface ModeToggleProps {
  mode: SessionMode;
  onModeChange: (mode: SessionMode) => void;
  disabled?: boolean;
  className?: string;
}

export interface TypingIndicatorProps {
  isVisible: boolean;
  brainState?: BrainState;
  className?: string;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export interface ArchiResponse {
  content: string;
  metadata: Record<string, any>;
  brainState: BrainState;
  isInsight: boolean;
  isExercise: boolean;
  isFeedback: boolean;
  resources: any[];
  topics: string[];
}

export interface CreateSessionRequest {
  title: string;
  mode: SessionMode;
  courseId?: string;
  topics?: string[];
  initialMessage?: string;
  courseContext?: Record<string, any>;
}

export interface SendMessageRequest {
  sessionId: string;
  message: string;
  mode: SessionMode;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ChatMessageApiResponse {
  userMessage: ChatMessage;
  archiMessage: ChatMessage;
  sessionUpdate: {
    totalMessages: number;
    insights: number;
    progress: number;
  };
}

export interface SessionListApiResponse {
  sessions: LearningSession[];
  stats: SessionStats;
  pagination: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface ChatHistoryApiResponse {
  session: LearningSession;
  messages: ChatMessage[];
  stats: {
    userMessages: number;
    archiMessages: number;
    insights: number;
    exercises: number;
    feedback: number;
    totalProcessingTime: number;
    averageResponseTime: number;
    totalMessages: number;
    hasMore: boolean;
  };
  pagination: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}