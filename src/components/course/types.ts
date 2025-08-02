// Course Level System Types for IdeaWorkLab v3.0
// 8-Phase Thinking Expansion (사고 확장 8단계) System

export interface CourseLevel {
  id: number;
  name: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  isLocked: boolean;
  progress: number;
  totalSessions: number;
  completedSessions: number;
  estimatedDuration: string;
  skills: string[];
  prerequisites?: number[];
}

export interface CourseSession {
  id: string;
  courseId: string;
  levelId: number;
  sessionNumber: number;
  title: string;
  description: string;
  duration: number; // in minutes
  isCompleted: boolean;
  isLocked: boolean;
  contentBlocks: ContentBlock[];
  createdAt: string;
  updatedAt: string;
}

export interface ContentBlock {
  id: string;
  sessionId: string;
  type: ContentBlockType;
  order: number;
  title?: string;
  content: string;
  metadata?: ContentBlockMetadata;
  isInteractive: boolean;
  isCompleted: boolean;
}

export type ContentBlockType = 
  | 'text'
  | 'video'
  | 'audio'
  | 'image'
  | 'quiz'
  | 'exercise'
  | 'reflection'
  | 'code'
  | 'diagram'
  | 'checklist';

export interface ContentBlockMetadata {
  videoUrl?: string;
  audioUrl?: string;
  imageUrl?: string;
  altText?: string;
  quizQuestions?: QuizQuestion[];
  exercisePrompt?: string;
  reflectionPrompts?: string[];
  codeLanguage?: string;
  diagramType?: string;
  checklistItems?: ChecklistItem[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'open-ended';
  options?: string[];
  correctAnswer?: string | number;
  explanation?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  difficulty: CourseDifficulty;
  totalLevels: number;
  estimatedDuration: string;
  enrolledCount: number;
  rating: number;
  levels: CourseLevel[];
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  tags: string[];
  isEnrolled: boolean;
  currentLevel: number;
  overallProgress: number;
}

export type CourseCategory = 
  | 'thinking-expansion'
  | 'creativity'
  | 'problem-solving'
  | 'innovation'
  | 'design-thinking'
  | 'systems-thinking'
  | 'critical-thinking'
  | 'strategic-thinking';

export type CourseDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface UserProgress {
  userId: string;
  courseId: string;
  currentLevelId: number;
  currentSessionId?: string;
  overallProgress: number;
  levelProgress: { [levelId: number]: number };
  completedSessions: string[];
  timeSpent: number; // in minutes
  lastAccessedAt: string;
  completedAt?: string;
}

export interface CourseFilters {
  category?: CourseCategory;
  difficulty?: CourseDifficulty;
  duration?: 'short' | 'medium' | 'long';
  rating?: number;
  isEnrolled?: boolean;
  searchQuery?: string;
}

export interface CourseSortOptions {
  field: 'popularity' | 'rating' | 'duration' | 'newest' | 'progress';
  order: 'asc' | 'desc';
}

// 8-Phase Thinking Expansion specific types
export const THINKING_PHASES = {
  1: {
    name: 'observation',
    title: '관찰하기',
    description: '현상과 문제를 명확히 파악하는 단계',
    color: '#3B82F6', // blue
    icon: '👁️'
  },
  2: {
    name: 'questioning',
    title: '질문하기', 
    description: '핵심 질문을 발견하고 정의하는 단계',
    color: '#10B981', // emerald
    icon: '❓'
  },
  3: {
    name: 'analyzing',
    title: '분석하기',
    description: '문제를 구조적으로 해부하는 단계',
    color: '#F59E0B', // amber
    icon: '🔍'
  },
  4: {
    name: 'connecting',
    title: '연결하기',
    description: '다양한 요소들의 관계를 파악하는 단계',
    color: '#8B5CF6', // violet
    icon: '🔗'
  },
  5: {
    name: 'imagining',
    title: '상상하기',
    description: '창의적 가능성을 탐구하는 단계',
    color: '#EC4899', // pink
    icon: '💭'
  },
  6: {
    name: 'synthesizing',
    title: '종합하기',
    description: '아이디어를 통합하고 재구성하는 단계',
    color: '#06B6D4', // cyan
    icon: '⚡'
  },
  7: {
    name: 'evaluating',
    title: '평가하기',
    description: '솔루션을 검증하고 개선하는 단계',
    color: '#84CC16', // lime
    icon: '⚖️'
  },
  8: {
    name: 'implementing',
    title: '실행하기',
    description: '아이디어를 현실로 구현하는 단계',
    color: '#EF4444', // red
    icon: '🚀'
  }
} as const;

export type ThinkingPhase = keyof typeof THINKING_PHASES;