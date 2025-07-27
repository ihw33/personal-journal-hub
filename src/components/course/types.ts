export interface WeekData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objectives: string[];
  outcomes: string[];
  phases: PhaseData[];
  resources: Resource[];
  aiCollaboration: AICollaborationGuide;
}

export interface PhaseData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  type: 'exploration' | 'analysis' | 'synthesis' | 'evaluation';
  guidedContent: PracticeContent;
  selfDirectedContent: PracticeContent;
  aiPrompts: AIPrompt[];
  checkpoints: string[];
  deliverables: string[];
}

export interface PracticeContent {
  title: string;
  duration: string;
  description: string;
  objective: string;
  thinkingProcess: string;
  selfGuideQuestions: string[];
  templates?: string[];
  examples?: string[];
  tips: string[];
  warnings: string[];
}

export interface AIPrompt {
  id: string;
  title: string;
  content: string;
  variables: string[];
  aiTool: 'claude' | 'chatgpt' | 'both' | 'integrated';
  phase: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  expectedOutput: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'template' | 'tool' | 'website';
  url?: string;
  downloadable: boolean;
  required: boolean;
}

export interface AICollaborationGuide {
  overview: string;
  keyTechniques: string[];
  phaseSpecificTips: { [key: number]: string[] };
  commonPitfalls: string[];
  successMetrics: string[];
}

export interface ChatSession {
  id: string;
  week: number;
  mode: 'guided' | 'self-directed';
  startTime: Date;
  lastActivity: Date;
  currentPhase: number;
  messages: ChatMessage[];
  aiProvider: 'claude' | 'chatgpt';
  metadata: {
    totalMessages: number;
    userMessages: number;
    assistantMessages: number;
    sessionDuration: number;
    phaseTransitions: { phase: number; timestamp: Date }[];
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  phase: number;
  metadata?: {
    tokens?: number;
    model?: string;
    promptType?: string;
  };
}

export interface PhaseSubmission {
  id: string;
  week: number;
  phase: number;
  mode: 'guided' | 'self-directed';
  studentId: string;
  content: {
    practiceResults: string;
    reflections: string;
    challenges: string;
    insights: string;
    nextSteps: string;
  };
  chatHistory: ChatMessage[];
  metadata: {
    timeSpent: number;
    completionDate: Date;
    aiInteractions: number;
    phaseTransitions: number;
  };
  status: 'draft' | 'submitted' | 'reviewed';
  feedback?: {
    instructorComments: string;
    suggestions: string[];
    rating: number;
    reviewDate: Date;
  };
}

export interface WeeklySubmission {
  id: string;
  week: number;
  studentId: string;
  phases: PhaseSubmission[];
  synthesis: {
    weeklyReflection: string;
    keyLearnings: string[];
    challengesSummary: string;
    overallProgress: string;
  };
  completeChatHistory: ChatMessage[];
  metadata: {
    totalTimeSpent: number;
    totalAIInteractions: number;
    phasesCompleted: number;
    submissionDate: Date;
  };
  status: 'draft' | 'submitted' | 'reviewed';
  feedback?: {
    overallComments: string;
    weeklyGrade: number;
    strengths: string[];
    improvements: string[];
    nextWeekFocus: string[];
    reviewDate: Date;
  };
}

export interface CourseProgress {
  studentId: string;
  currentWeek: number;
  currentPhase: number;
  completedWeeks: number[];
  completedPhases: { [week: number]: number[] };
  overallProgress: number;
  timeSpent: { [week: number]: number };
  achievements: Achievement[];
  lastActivity: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'completion' | 'quality' | 'engagement' | 'creativity';
  unlockedDate: Date;
  week?: number;
  phase?: number;
}