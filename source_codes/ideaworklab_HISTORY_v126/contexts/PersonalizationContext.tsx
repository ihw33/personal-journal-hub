import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface LearningProgress {
  enrolledCourses: EnrolledCourse[];
  currentWeek: number;
  currentPhase: number;
  completedPhases: number;
  totalPhases: number;
  completionRate: number;
  estimatedCompletionDate: Date;
  lastLearningDate: Date;
  averageSessionTime: number;
  longestStreak: number;
  currentStreak: number;
}

interface EnrolledCourse {
  id: string;
  title: string;
  enrollmentDate: Date;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  mode: 'guided' | 'self-directed';
}

interface AIInteractionData {
  totalConversations: number;
  totalMessages: number;
  avgSatisfactionScore: number;
  lastInteractionDate: Date;
  preferredAIStyle: 'detailed' | 'concise' | 'creative' | 'analytical';
  mostUsedTopics: string[];
  strugglingAreas: string[];
  improvementAreas: string[];
}

interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  type: 'learning' | 'practice' | 'review' | 'community';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: number; // minutes
  deadline?: Date;
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  unlockedDate: Date;
  category: 'learning' | 'consistency' | 'community' | 'ai-collaboration';
  points: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  level: number;
  progress: number;
  maxProgress: number;
  category: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface LearningPreferences {
  style: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  pace: 'slow' | 'medium' | 'fast' | 'adaptive';
  timePreference: 'morning' | 'afternoon' | 'evening' | 'flexible';
  difficultyPreference: 'easy' | 'medium' | 'hard' | 'adaptive';
  sessionLength: 'short' | 'medium' | 'long' | 'flexible'; // 15min, 30min, 60min+
  reminderFrequency: 'daily' | 'weekly' | 'none';
}

interface BehaviorAnalytics {
  sessionDuration: number[];
  loginFrequency: number; // days per week
  peakActivityHours: number[];
  strugglingTopics: { topic: string; frequency: number }[];
  strongTopics: { topic: string; mastery: number }[];
  learningVelocity: number; // phases per week
  engagementScore: number; // 0-100
  dropoffRisk: 'low' | 'medium' | 'high';
}

interface PersonalizedContent {
  recommendedCourses: Course[];
  suggestedTopics: string[];
  nextActions: RecommendedAction[];
  customizedExercises: Exercise[];
  aiPromptTemplates: AITemplate[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  tags: string[];
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'reflection' | 'practice' | 'discussion' | 'project';
  difficulty: number;
  estimatedTime: number;
}

interface AITemplate {
  id: string;
  title: string;
  prompt: string;
  category: 'creative' | 'analytical' | 'problem-solving' | 'reflection';
  usageCount: number;
}

interface PersonalizationData {
  userId: string;
  learningProgress: LearningProgress;
  aiInteractions: AIInteractionData;
  recommendations: PersonalizedContent;
  achievements: Achievement[];
  badges: Badge[];
  preferences: LearningPreferences;
  behaviorAnalytics: BehaviorAnalytics;
  lastUpdated: Date;
}

interface PersonalizationContextType {
  personalizationData: PersonalizationData | null;
  isLoading: boolean;
  updateLearningProgress: (progress: Partial<LearningProgress>) => Promise<void>;
  recordAIInteraction: (interaction: Partial<AIInteractionData>) => Promise<void>;
  updatePreferences: (preferences: Partial<LearningPreferences>) => Promise<void>;
  markActionCompleted: (actionId: string) => Promise<void>;
  unlockAchievement: (achievementId: string) => Promise<void>;
  getPersonalizedRecommendations: () => Promise<RecommendedAction[]>;
  analyzeUserBehavior: () => Promise<BehaviorAnalytics>;
  generateCustomContent: (userInterests: string[]) => Promise<PersonalizedContent>;
}

const PersonalizationContext = createContext<PersonalizationContextType | null>(null);

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
};

export const PersonalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [personalizationData, setPersonalizationData] = useState<PersonalizationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 개인화 데이터 로드
  useEffect(() => {
    if (user) {
      loadPersonalizationData(user.id);
    } else {
      setPersonalizationData(null);
      setIsLoading(false);
    }
  }, [user]);

  const loadPersonalizationData = async (userId: string) => {
    try {
      setIsLoading(true);
      
      // 실제로는 API 호출
      // const response = await fetch(`/api/personalization/${userId}`);
      // const data = await response.json();
      
      // Mock data for now
      const mockData: PersonalizationData = {
        userId,
        learningProgress: {
          enrolledCourses: [
            {
              id: 'jeju-travel',
              title: '제주도 여행 기획 코스',
              enrollmentDate: new Date('2025-01-10'),
              progress: 45,
              status: 'active',
              mode: 'guided'
            }
          ],
          currentWeek: 3,
          currentPhase: 2,
          completedPhases: 8,
          totalPhases: 24,
          completionRate: 33,
          estimatedCompletionDate: new Date('2025-03-15'),
          lastLearningDate: new Date(),
          averageSessionTime: 35,
          longestStreak: 12,
          currentStreak: 5
        },
        aiInteractions: {
          totalConversations: 47,
          totalMessages: 234,
          avgSatisfactionScore: 4.6,
          lastInteractionDate: new Date(),
          preferredAIStyle: 'detailed',
          mostUsedTopics: ['여행 계획', '창의적 아이디어', '문제 해결'],
          strugglingAreas: ['AI 프롬프트 작성', '구체적 질문'],
          improvementAreas: ['분석적 사고', '체계적 정리']
        },
        recommendations: {
          recommendedCourses: [
            {
              id: 'advanced-ai',
              title: '고급 AI 협업 기법',
              description: '더 깊이 있는 AI 협업을 위한 고급 과정',
              difficulty: 'intermediate',
              estimatedTime: 480,
              tags: ['AI', '고급', '협업']
            }
          ],
          suggestedTopics: ['창의적 문제해결', '데이터 분석', '전략적 사고'],
          nextActions: [
            {
              id: 'continue-phase',
              title: '3주차 Phase 2 계속하기',
              description: '제주도 숙박 옵션 비교 분석',
              type: 'learning',
              priority: 'high',
              estimatedTime: 30,
              deadline: new Date(Date.now() + 86400000), // 24시간 후
              completed: false
            },
            {
              id: 'ai-practice',
              title: 'AI와 창의적 브레인스토밍',
              description: '새로운 아이디어 발굴을 위한 AI 대화',
              type: 'practice',
              priority: 'medium',
              estimatedTime: 20,
              completed: false
            }
          ],
          customizedExercises: [],
          aiPromptTemplates: [
            {
              id: 'creative-thinking',
              title: '창의적 사고 프롬프트',
              prompt: '이 문제를 완전히 다른 관점에서 보면 어떨까요? 3가지 혁신적인 접근법을 제안해주세요.',
              category: 'creative',
              usageCount: 15
            }
          ]
        },
        achievements: [
          {
            id: 'first-week',
            title: '빠른 시작자',
            description: '1주차를 조기 완료했습니다',
            iconUrl: '/icons/fast-starter.svg',
            unlockedDate: new Date('2025-01-17'),
            category: 'learning',
            points: 100
          },
          {
            id: 'ai-talker',
            title: '활발한 소통왕',
            description: 'AI와 30회 이상 대화했습니다',
            iconUrl: '/icons/chatty.svg',
            unlockedDate: new Date('2025-01-20'),
            category: 'ai-collaboration',
            points: 150
          }
        ],
        badges: [
          {
            id: 'consistency',
            name: '꾸준한 학습자',
            description: '연속 학습일 달성',
            iconUrl: '/badges/consistent.svg',
            level: 2,
            progress: 5,
            maxProgress: 7,
            category: 'intermediate'
          }
        ],
        preferences: {
          style: 'mixed',
          pace: 'medium',
          timePreference: 'evening',
          difficultyPreference: 'adaptive',
          sessionLength: 'medium',
          reminderFrequency: 'daily'
        },
        behaviorAnalytics: {
          sessionDuration: [25, 35, 40, 30, 28, 45, 38],
          loginFrequency: 5.2,
          peakActivityHours: [19, 20, 21],
          strugglingTopics: [
            { topic: 'AI 프롬프트 작성', frequency: 12 },
            { topic: '구체적 질문하기', frequency: 8 }
          ],
          strongTopics: [
            { topic: '창의적 사고', mastery: 85 },
            { topic: '체계적 정리', mastery: 78 }
          ],
          learningVelocity: 2.5,
          engagementScore: 87,
          dropoffRisk: 'low'
        },
        lastUpdated: new Date()
      };

      setPersonalizationData(mockData);
    } catch (error) {
      console.error('Failed to load personalization data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLearningProgress = async (progress: Partial<LearningProgress>) => {
    if (!personalizationData) return;

    try {
      const updatedData = {
        ...personalizationData,
        learningProgress: {
          ...personalizationData.learningProgress,
          ...progress
        },
        lastUpdated: new Date()
      };

      setPersonalizationData(updatedData);
      
      // 실제로는 API 호출
      // await fetch(`/api/personalization/${personalizationData.userId}/progress`, {
      //   method: 'PUT',
      //   body: JSON.stringify(progress)
      // });
    } catch (error) {
      console.error('Failed to update learning progress:', error);
    }
  };

  const recordAIInteraction = async (interaction: Partial<AIInteractionData>) => {
    if (!personalizationData) return;

    try {
      const updatedData = {
        ...personalizationData,
        aiInteractions: {
          ...personalizationData.aiInteractions,
          ...interaction,
          lastInteractionDate: new Date()
        },
        lastUpdated: new Date()
      };

      setPersonalizationData(updatedData);
    } catch (error) {
      console.error('Failed to record AI interaction:', error);
    }
  };

  const updatePreferences = async (preferences: Partial<LearningPreferences>) => {
    if (!personalizationData) return;

    try {
      const updatedData = {
        ...personalizationData,
        preferences: {
          ...personalizationData.preferences,
          ...preferences
        },
        lastUpdated: new Date()
      };

      setPersonalizationData(updatedData);
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  };

  const markActionCompleted = async (actionId: string) => {
    if (!personalizationData) return;

    try {
      const updatedActions = personalizationData.recommendations.nextActions.map(action =>
        action.id === actionId ? { ...action, completed: true } : action
      );

      const updatedData = {
        ...personalizationData,
        recommendations: {
          ...personalizationData.recommendations,
          nextActions: updatedActions
        },
        lastUpdated: new Date()
      };

      setPersonalizationData(updatedData);
    } catch (error) {
      console.error('Failed to mark action completed:', error);
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    // 실제로는 API에서 업적을 조회하고 해금
    const newAchievement: Achievement = {
      id: achievementId,
      title: 'New Achievement',
      description: 'Achievement unlocked!',
      iconUrl: '/icons/achievement.svg',
      unlockedDate: new Date(),
      category: 'learning',
      points: 100
    };

    if (!personalizationData) return;

    const updatedData = {
      ...personalizationData,
      achievements: [...personalizationData.achievements, newAchievement],
      lastUpdated: new Date()
    };

    setPersonalizationData(updatedData);
  };

  const getPersonalizedRecommendations = async (): Promise<RecommendedAction[]> => {
    if (!personalizationData) return [];

    // AI 기반 개인화 추천 로직
    const userBehavior = personalizationData.behaviorAnalytics;
    const preferences = personalizationData.preferences;
    const progress = personalizationData.learningProgress;

    // Mock AI 추천 로직
    const recommendations: RecommendedAction[] = [];

    // 학습 진도 기반 추천
    if (progress.completionRate < 50) {
      recommendations.push({
        id: 'catch-up',
        title: '학습 진도 따라잡기',
        description: '뒤처진 학습을 따라잡을 수 있는 맞춤 계획',
        type: 'learning',
        priority: 'high',
        estimatedTime: 45,
        completed: false
      });
    }

    // 선호도 기반 추천
    if (preferences.timePreference === 'evening' && userBehavior.peakActivityHours.includes(20)) {
      recommendations.push({
        id: 'evening-session',
        title: '저녁 집중 학습',
        description: '당신의 최적 학습 시간대에 맞춘 세션',
        type: 'practice',
        priority: 'medium',
        estimatedTime: 30,
        completed: false
      });
    }

    return recommendations;
  };

  const analyzeUserBehavior = async (): Promise<BehaviorAnalytics> => {
    if (!personalizationData) {
      throw new Error('No personalization data available');
    }

    // 행동 패턴 분석 로직
    const analytics = personalizationData.behaviorAnalytics;
    
    // 실제로는 머신러닝 모델을 사용하여 더 정교한 분석
    const engagementTrend = analytics.sessionDuration.reduce((acc, curr, index, arr) => {
      if (index === 0) return 0;
      return acc + (curr - arr[index - 1]);
    }, 0) / analytics.sessionDuration.length;

    const updatedAnalytics: BehaviorAnalytics = {
      ...analytics,
      engagementScore: Math.max(0, Math.min(100, analytics.engagementScore + engagementTrend)),
      dropoffRisk: engagementTrend < -5 ? 'high' : engagementTrend < 0 ? 'medium' : 'low'
    };

    return updatedAnalytics;
  };

  const generateCustomContent = async (userInterests: string[]): Promise<PersonalizedContent> => {
    // AI 기반 맞춤 콘텐츠 생성
    return {
      recommendedCourses: [],
      suggestedTopics: userInterests,
      nextActions: await getPersonalizedRecommendations(),
      customizedExercises: [],
      aiPromptTemplates: []
    };
  };

  const value: PersonalizationContextType = {
    personalizationData,
    isLoading,
    updateLearningProgress,
    recordAIInteraction,
    updatePreferences,
    markActionCompleted,
    unlockAchievement,
    getPersonalizedRecommendations,
    analyzeUserBehavior,
    generateCustomContent
  };

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
};