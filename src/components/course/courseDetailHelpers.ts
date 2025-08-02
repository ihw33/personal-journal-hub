// Course Detail Helper Functions for IdeaWorkLab v3.0
// 8-Phase Thinking Expansion Course System

import { 
  Course, 
  CourseLevel, 
  CourseSession, 
  UserProgress, 
  ThinkingPhase,
  ContentBlock 
} from './types';
import { THINKING_PHASES } from './types';
import { 
  DIFFICULTY_CONFIG, 
  CATEGORY_CONFIG,
  PHASE_PROGRESS_INDICATORS 
} from './courseDetailConstants';

/**
 * 전체 코스 진행률 계산
 */
export const calculateOverallProgress = (course: Course, userProgress?: UserProgress): number => {
  if (!userProgress) return 0;
  
  const totalSessions = course.levels.reduce((sum, level) => sum + level.totalSessions, 0);
  const completedSessions = userProgress.completedSessions.length;
  
  return totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;
};

/**
 * 특정 레벨의 진행률 계산
 */
export const calculateLevelProgress = (level: CourseLevel, completedSessions: string[]): number => {
  if (level.totalSessions === 0) return 0;
  
  const levelCompletedSessions = completedSessions.filter(sessionId => 
    sessionId.startsWith(`${level.id}-`)
  ).length;
  
  return Math.round((levelCompletedSessions / level.totalSessions) * 100);
};

/**
 * 다음 잠금 해제 레벨 확인
 */
export const getNextUnlockedLevel = (course: Course, userProgress?: UserProgress): CourseLevel | null => {
  if (!userProgress) return course.levels[0] || null;
  
  const currentLevel = userProgress.currentLevelId;
  const nextLevel = course.levels.find(level => level.id === currentLevel + 1);
  
  if (!nextLevel) return null;
  
  // 이전 레벨 완료 여부 확인
  const prevLevel = course.levels.find(level => level.id === currentLevel);
  if (prevLevel) {
    const prevLevelProgress = calculateLevelProgress(prevLevel, userProgress.completedSessions);
    return prevLevelProgress >= 80 ? nextLevel : null;
  }
  
  return nextLevel;
};

/**
 * 세션 잠금 상태 확인
 */
export const isSessionLocked = (session: CourseSession, userProgress?: UserProgress): boolean => {
  if (!userProgress) return session.sessionNumber > 1;
  
  // 첫 번째 세션은 항상 잠금 해제
  if (session.sessionNumber === 1) return false;
  
  // 이전 세션 완료 여부 확인
  const prevSessionId = `${session.levelId}-${session.sessionNumber - 1}`;
  return !userProgress.completedSessions.includes(prevSessionId);
};

/**
 * 추정 완료 시간 계산
 */
export const calculateEstimatedTime = (course: Course, userProgress?: UserProgress): string => {
  if (!userProgress) return course.estimatedDuration;
  
  const remainingSessions = course.levels.reduce((sum, level) => {
    const levelSessions = level.totalSessions;
    const completedInLevel = userProgress.completedSessions.filter(sessionId => 
      sessionId.startsWith(`${level.id}-`)
    ).length;
    return sum + (levelSessions - completedInLevel);
  }, 0);
  
  const avgSessionTime = 30; // minutes
  const totalMinutes = remainingSessions * avgSessionTime;
  
  if (totalMinutes < 60) return `${totalMinutes}분`;
  if (totalMinutes < 120) return `${Math.round(totalMinutes / 60)}시간`;
  return `${Math.round(totalMinutes / 60)}시간`;
};

/**
 * 사고 단계별 진행 상태 분석
 */
export const analyzeThinkingPhaseProgress = (userProgress?: UserProgress): {
  phase: ThinkingPhase;
  progress: number;
  skills: string[];
  isCompleted: boolean;
}[] => {
  const results = Object.keys(THINKING_PHASES).map(phaseKey => {
    const phase = parseInt(phaseKey) as ThinkingPhase;
    const phaseInfo = THINKING_PHASES[phase];
    const skillInfo = PHASE_PROGRESS_INDICATORS[phase];
    
    let progress = 0;
    let isCompleted = false;
    
    if (userProgress) {
      const phaseProgress = userProgress.levelProgress[phase] || 0;
      progress = phaseProgress;
      isCompleted = phaseProgress >= 100;
    }
    
    return {
      phase,
      progress,
      skills: skillInfo.skills,
      isCompleted
    };
  });
  
  return results;
};

/**
 * 콘텐츠 블록 완료 상태 확인
 */
export const isContentBlockCompleted = (block: ContentBlock, userProgress?: UserProgress): boolean => {
  // 실제 구현에서는 userProgress에서 개별 블록 완료 상태를 확인
  return block.isCompleted;
};

/**
 * 세션 내 콘텐츠 블록 진행률 계산
 */
export const calculateSessionProgress = (session: CourseSession): number => {
  if (session.contentBlocks.length === 0) return 0;
  
  const completedBlocks = session.contentBlocks.filter(block => block.isCompleted).length;
  return Math.round((completedBlocks / session.contentBlocks.length) * 100);
};

/**
 * 학습 통계 계산
 */
export const calculateLearningStats = (userProgress?: UserProgress) => {
  if (!userProgress) {
    return {
      totalTimeSpent: 0,
      sessionsCompleted: 0,
      averageSessionTime: 0,
      currentStreak: 0,
      totalDays: 0
    };
  }
  
  return {
    totalTimeSpent: userProgress.timeSpent,
    sessionsCompleted: userProgress.completedSessions.length,
    averageSessionTime: userProgress.completedSessions.length > 0 
      ? Math.round(userProgress.timeSpent / userProgress.completedSessions.length) 
      : 0,
    currentStreak: calculateCurrentStreak(userProgress),
    totalDays: calculateTotalLearningDays(userProgress)
  };
};

/**
 * 현재 연속 학습 일수 계산
 */
const calculateCurrentStreak = (userProgress: UserProgress): number => {
  // 실제 구현에서는 학습 이력 데이터를 바탕으로 계산
  // 여기서는 mock 값 반환
  return 3;
};

/**
 * 총 학습 일수 계산
 */
const calculateTotalLearningDays = (userProgress: UserProgress): number => {
  // 실제 구현에서는 첫 학습일부터 현재까지의 일수 계산
  const startDate = new Date(userProgress.lastAccessedAt);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * 코스 카테고리 정보 조회
 */
export const getCategoryInfo = (category: string) => {
  return CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG] || {
    label: '기타',
    description: '',
    color: '#6B7280',
    bgColor: '#F9FAFB',
    icon: '📚'
  };
};

/**
 * 난이도 정보 조회
 */
export const getDifficultyInfo = (difficulty: string) => {
  return DIFFICULTY_CONFIG[difficulty as keyof typeof DIFFICULTY_CONFIG] || {
    label: '알 수 없음',
    description: '',
    color: '#6B7280',
    bgColor: '#F9FAFB',
    icon: '❓'
  };
};

/**
 * 다음 세션 추천
 */
export const getNextRecommendedSession = (course: Course, userProgress?: UserProgress): CourseSession | null => {
  if (!userProgress) {
    // 첫 번째 레벨의 첫 번째 세션 반환
    const firstLevel = course.levels[0];
    if (firstLevel) {
      return {
        id: `${firstLevel.id}-1`,
        courseId: course.id,
        levelId: firstLevel.id,
        sessionNumber: 1,
        title: `${firstLevel.title} - 세션 1`,
        description: '시작하는 첫 번째 세션입니다.',
        duration: 30,
        isCompleted: false,
        isLocked: false,
        contentBlocks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    return null;
  }
  
  const currentLevel = course.levels.find(level => level.id === userProgress.currentLevelId);
  if (!currentLevel) return null;
  
  // 현재 레벨에서 다음 미완료 세션 찾기
  for (let sessionNum = 1; sessionNum <= currentLevel.totalSessions; sessionNum++) {
    const sessionId = `${currentLevel.id}-${sessionNum}`;
    if (!userProgress.completedSessions.includes(sessionId)) {
      return {
        id: sessionId,
        courseId: course.id,
        levelId: currentLevel.id,
        sessionNumber: sessionNum,
        title: `${currentLevel.title} - 세션 ${sessionNum}`,
        description: `${currentLevel.description}의 ${sessionNum}번째 세션입니다.`,
        duration: 30,
        isCompleted: false,
        isLocked: isSessionLocked({ 
          sessionNumber: sessionNum, 
          levelId: currentLevel.id 
        } as CourseSession, userProgress),
        contentBlocks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  }
  
  return null;
};

/**
 * 성취도 배지 확인
 */
export const checkAchievements = (course: Course, userProgress?: UserProgress): string[] => {
  if (!userProgress) return [];
  
  const achievements: string[] = [];
  
  // 레벨 완료 배지
  const completedLevels = course.levels.filter(level => {
    const levelProgress = calculateLevelProgress(level, userProgress.completedSessions);
    return levelProgress >= 100;
  });
  
  if (completedLevels.length > 0) {
    achievements.push('level_completion');
  }
  
  // 꾸준한 학습자 배지 (연속 7일 학습)
  const currentStreak = calculateCurrentStreak(userProgress);
  if (currentStreak >= 7) {
    achievements.push('consistent_learner');
  }
  
  return achievements;
};

/**
 * 시간 형식 변환 (분 -> 시간:분)
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}분`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) return `${hours}시간`;
  return `${hours}시간 ${remainingMinutes}분`;
};

/**
 * 진행률 색상 계산
 */
export const getProgressColor = (progress: number): string => {
  if (progress >= 80) return '#10B981'; // green
  if (progress >= 60) return '#F59E0B'; // amber
  if (progress >= 40) return '#EF4444'; // red
  return '#6B7280'; // gray
};