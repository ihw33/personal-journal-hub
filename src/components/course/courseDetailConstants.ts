// Course Detail Constants for IdeaWorkLab v3.0
// 8-Phase Thinking Expansion Course System

import { CourseCategory, CourseDifficulty } from './types';

// Course duration mappings
export const DURATION_LABELS = {
  short: '1-2시간',
  medium: '3-5시간', 
  long: '6시간 이상'
} as const;

// Difficulty level configurations
export const DIFFICULTY_CONFIG = {
  beginner: {
    label: '초급',
    description: '처음 시작하는 분들을 위한 기초 과정',
    color: '#10B981',
    bgColor: '#ECFDF5',
    icon: '🌱'
  },
  intermediate: {
    label: '중급',
    description: '기본기를 갖춘 분들을 위한 심화 과정',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    icon: '🌿'
  },
  advanced: {
    label: '고급',
    description: '전문적인 사고력 확장을 원하는 분들을 위한 과정',
    color: '#EF4444',
    bgColor: '#FEF2F2',
    icon: '🌳'
  },
  expert: {
    label: '전문가',
    description: '사고의 달인을 위한 마스터 과정',
    color: '#8B5CF6',
    bgColor: '#F3E8FF',
    icon: '🎯'
  }
} as const;

// Category configurations
export const CATEGORY_CONFIG = {
  'thinking-expansion': {
    label: '사고 확장',
    description: '다차원적 사고력과 창의적 문제해결 능력 개발',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    icon: '🧠'
  },
  'creativity': {
    label: '창의성',
    description: '혁신적 아이디어 발굴과 창의적 사고 패턴 구축',
    color: '#EC4899',
    bgColor: '#FDF2F8',
    icon: '🎨'
  },
  'problem-solving': {
    label: '문제해결',
    description: '체계적 문제 분석과 효과적인 솔루션 도출',
    color: '#10B981',
    bgColor: '#ECFDF5',
    icon: '🔧'
  },
  'innovation': {
    label: '혁신',
    description: '변화와 혁신을 이끄는 사고방식과 접근법',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    icon: '💡'
  },
  'design-thinking': {
    label: '디자인 씽킹',
    description: '인간 중심의 혁신적 문제해결 방법론',
    color: '#06B6D4',
    bgColor: '#ECFEFF',
    icon: '🎯'
  },
  'systems-thinking': {
    label: '시스템 씽킹',
    description: '복잡한 시스템을 이해하고 전체적 관점에서 사고',
    color: '#8B5CF6',
    bgColor: '#F3E8FF',
    icon: '🔄'
  },
  'critical-thinking': {
    label: '비판적 사고',
    description: '논리적 분석과 객관적 판단력 향상',
    color: '#84CC16',
    bgColor: '#F7FEE7',
    icon: '⚖️'
  },
  'strategic-thinking': {
    label: '전략적 사고',
    description: '장기적 관점과 전략적 의사결정 능력',
    color: '#EF4444',
    bgColor: '#FEF2F2',
    icon: '📈'
  }
} as const;

// Content block type configurations
export const CONTENT_BLOCK_CONFIG = {
  text: {
    label: '텍스트',
    icon: '📝',
    color: '#6B7280'
  },
  video: {
    label: '동영상',
    icon: '🎥',
    color: '#EF4444'
  },
  audio: {
    label: '오디오',
    icon: '🎵',
    color: '#8B5CF6'
  },
  image: {
    label: '이미지',
    icon: '🖼️',
    color: '#10B981'
  },
  quiz: {
    label: '퀴즈',
    icon: '❓',
    color: '#F59E0B'
  },
  exercise: {
    label: '실습',
    icon: '💪',
    color: '#06B6D4'
  },
  reflection: {
    label: '성찰',
    icon: '🤔',
    color: '#EC4899'
  },
  code: {
    label: '코드',
    icon: '💻',
    color: '#374151'
  },
  diagram: {
    label: '다이어그램',
    icon: '📊',
    color: '#84CC16'
  },
  checklist: {
    label: '체크리스트',
    icon: '✅',
    color: '#10B981'
  }
} as const;

// Progress status configurations
export const PROGRESS_STATUS = {
  not_started: {
    label: '시작 전',
    color: '#9CA3AF',
    bgColor: '#F9FAFB'
  },
  in_progress: {
    label: '진행 중',
    color: '#3B82F6',
    bgColor: '#EFF6FF'
  },
  completed: {
    label: '완료',
    color: '#10B981',
    bgColor: '#ECFDF5'
  },
  locked: {
    label: '잠김',
    color: '#6B7280',
    bgColor: '#F3F4F6'
  }
} as const;

// Achievement badges
export const ACHIEVEMENT_BADGES = {
  level_completion: {
    label: '레벨 완주',
    description: '레벨을 성공적으로 완료했습니다',
    icon: '🏆',
    color: '#F59E0B'
  },
  perfect_score: {
    label: '완벽한 점수',
    description: '모든 퀴즈에서 만점을 받았습니다',
    icon: '⭐',
    color: '#EF4444'
  },
  quick_learner: {
    label: '빠른 학습자',
    description: '예상 시간보다 빨리 완료했습니다',
    icon: '⚡',
    color: '#06B6D4'
  },
  deep_thinker: {
    label: '깊은 사고자',
    description: '모든 성찰 문제에 답변했습니다',
    icon: '🧠',
    color: '#8B5CF6'
  },
  consistent_learner: {
    label: '꾸준한 학습자',
    description: '7일 연속으로 학습했습니다',
    icon: '📅',
    color: '#10B981'
  }
} as const;

// Thinking phase progress indicators
export const PHASE_PROGRESS_INDICATORS = {
  1: {
    title: '관찰 능력',
    skills: ['세심한 관찰', '패턴 인식', '데이터 수집', '현상 파악']
  },
  2: {
    title: '질문 능력', 
    skills: ['핵심 질문 도출', '가설 설정', '문제 정의', '탐구 설계']
  },
  3: {
    title: '분석 능력',
    skills: ['구조적 분석', '요소 분해', '인과관계 파악', '논리적 추론']
  },
  4: {
    title: '연결 능력',
    skills: ['패턴 연결', '시스템 이해', '관계 매핑', '통합적 사고']
  },
  5: {
    title: '상상 능력',
    skills: ['창의적 발상', '가능성 탐구', '대안 생성', '확산적 사고']
  },
  6: {
    title: '종합 능력',
    skills: ['아이디어 통합', '솔루션 설계', '개념 재구성', '수렴적 사고']
  },
  7: {
    title: '평가 능력',
    skills: ['비판적 검토', '타당성 검증', '리스크 평가', '개선 방안 도출']
  },
  8: {
    title: '실행 능력',
    skills: ['실행 계획', '프로토타입 제작', '테스트 및 검증', '최종 구현']
  }
} as const;

// Default course settings
export const DEFAULT_COURSE_SETTINGS = {
  sessionDuration: 30, // minutes
  maxRetries: 3,
  requiredScore: 80, // percentage
  autoSave: true,
  showProgress: true,
  allowSkipping: false,
  requireCompletion: true
} as const;

// Responsive breakpoints for course layout
export const COURSE_BREAKPOINTS = {
  mobile: 'max-width: 640px',
  tablet: 'max-width: 1024px',
  desktop: 'min-width: 1025px'
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500
} as const;