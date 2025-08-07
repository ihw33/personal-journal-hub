// IWL 4.0 통합을 위한 타입 정의

// 기본 AI 메시지 인터페이스
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    week?: number;
    phase?: number;
    mode?: 'guided' | 'self-directed';
    messageType?: 'introduction' | 'guidance' | 'feedback' | 'completion';
    character?: 'helena' | 'rio' | 'archi';
  };
}

// 학습 세션 인터페이스
export interface LearningSession {
  id: string;
  userId: string;
  courseId: string;
  week: number;
  phase: number;
  mode: 'guided' | 'self-directed';
  character: 'helena' | 'rio' | 'archi';
  messages: AIMessage[];
  progress: {
    currentStep: number;
    totalSteps: number;
    completedTasks: string[];
    learningProgress: number;
  };
  context: {
    userLearningStyle: string;
    currentFocus: string;
    previousSessions: string[];
    insights: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

// 사용자 레벨 및 권한
export type UserLevel = 'junior' | 'youth' | 'adult' | 'instructor' | 'admin';
export type UserRole = 'member' | 'instructor' | 'admin' | 'master';

// 사용자 프로필 확장
export interface ExtendedUser {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  level: UserLevel;
  created_at: string;
  updated_at: string;
  subscription_status?: 'active' | 'inactive' | 'trial';
  subscription_end?: string;
  learning_preferences: {
    preferred_mode: 'guided' | 'self-directed' | 'mixed';
    favorite_character: 'helena' | 'rio' | 'archi';
    learning_style: string[];
    difficulty_preference: 'beginner' | 'intermediate' | 'advanced';
  };
  progress: {
    total_sessions: number;
    completed_courses: number;
    current_level: UserLevel;
    achievement_points: number;
    badges: string[];
  };
}

// AI 캐릭터 정보
export interface AICharacter {
  id: 'helena' | 'rio' | 'archi';
  name: string;
  description: string;
  personality: string[];
  specialties: string[];
  emoji: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  avatar: string;
  voice_style: {
    tone: 'friendly' | 'professional' | 'encouraging' | 'analytical';
    formality: 'casual' | 'semi-formal' | 'formal';
    enthusiasm: 'low' | 'medium' | 'high';
  };
}

// 코스 진행 상태
export interface CourseProgress {
  id: string;
  userId: string;
  courseId: string;
  currentWeek: number;
  currentPhase: number;
  overallProgress: number; // 0-100
  weeklyProgress: Record<number, {
    week: number;
    phases: Record<number, {
      phase: number;
      completed: boolean;
      progress: number;
      timeSpent: number;
      sessions: string[];
    }>;
    weekCompleted: boolean;
    weekProgress: number;
  }>;
  achievements: {
    badges: string[];
    milestones: string[];
    points: number;
    level_ups: UserLevel[];
  };
  insights: {
    strengths: string[];
    growth_areas: string[];
    recommendations: string[];
    learning_patterns: string[];
  };
  created_at: Date;
  updated_at: Date;
}

// 테마 시스템
export interface ThemeConfig {
  level: UserLevel;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  spacing: {
    base: number;
    scale: number;
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      ease: string;
      bounce: string;
      spring: string;
    };
  };
}

// API 응답 타입
export interface APIResponse<T> {
  data: T | null;
  error: {
    message: string;
    code?: string;
    details?: any;
  } | null;
  metadata?: {
    timestamp: Date;
    requestId: string;
    version: string;
  };
}

// IWL4 컴포넌트 props 타입
export interface IWL4ChatInterfaceProps {
  userId: string;
  sessionId?: string;
  courseId?: string;
  week?: number;
  phase?: number;
  mode?: 'guided' | 'self-directed';
  character?: 'helena' | 'rio' | 'archi';
  theme?: 'helena' | 'rio' | 'mixed';
  level?: UserLevel;
  onSessionUpdate?: (session: LearningSession) => void;
  onComplete?: (session: LearningSession) => void;
  className?: string;
}

export interface IWL4DashboardProps {
  user: ExtendedUser;
  courses: CourseProgress[];
  recentSessions: LearningSession[];
  achievements: {
    recent: string[];
    total: number;
    nextMilestone: string;
  };
  onCourseSelect?: (courseId: string) => void;
  onSessionStart?: (sessionId: string) => void;
  className?: string;
}

// 통합 설정
export interface IWL4Config {
  ai: {
    provider: 'openai' | 'anthropic' | 'local';
    model: string;
    temperature: number;
    max_tokens: number;
    timeout: number;
  };
  characters: AICharacter[];
  themes: Record<UserLevel, ThemeConfig>;
  features: {
    helena_rio_mode: boolean;
    level_based_theming: boolean;
    character_switching: boolean;
    progress_tracking: boolean;
    achievement_system: boolean;
    social_features: boolean;
  };
  security: {
    rate_limit: {
      requests_per_minute: number;
      requests_per_hour: number;
    };
    content_filtering: boolean;
    session_timeout: number;
  };
}

// 이벤트 타입
export type IWL4Event = 
  | { type: 'session_started'; payload: { sessionId: string; userId: string } }
  | { type: 'message_sent'; payload: { sessionId: string; messageId: string; content: string } }
  | { type: 'message_received'; payload: { sessionId: string; messageId: string; content: string; character: string } }
  | { type: 'session_completed'; payload: { sessionId: string; duration: number; progress: number } }
  | { type: 'level_up'; payload: { userId: string; oldLevel: UserLevel; newLevel: UserLevel } }
  | { type: 'achievement_unlocked'; payload: { userId: string; achievementId: string } }
  | { type: 'error_occurred'; payload: { error: string; context: any } };

// 이벤트 핸들러
export type IWL4EventHandler = (event: IWL4Event) => void | Promise<void>;

// 통합 상태
export interface IWL4State {
  isInitialized: boolean;
  currentUser: ExtendedUser | null;
  currentSession: LearningSession | null;
  currentTheme: ThemeConfig;
  config: IWL4Config;
  eventHandlers: Record<string, IWL4EventHandler[]>;
}