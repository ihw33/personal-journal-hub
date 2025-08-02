/**
 * ===================================================================
 * IdeaWorkLab v3.3 Chatbot Mock Data
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * AI 파트너 '아키(Archi)' 챗봇 개발용 목업 데이터
 * ===================================================================
 */

import { ChatMessage, LearningSession, SessionStats } from './types';

// 목업 세션 데이터
export const mockSessions: LearningSession[] = [
  {
    id: 'session-1',
    title: '창의적 문제해결 방법론 탐구',
    mode: 'guided',
    status: 'completed',
    totalMessages: 24,
    insights: 5,
    progress: 100,
    topics: ['창의성', '문제해결', '혁신'],
    emotionalState: 'enlightened',
    courseContext: {},
    startedAt: '2024-01-15T09:00:00Z',
    completedAt: '2024-01-15T10:30:00Z',
    lastActivityAt: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 'session-2',
    title: '비판적 사고와 논리적 추론',
    mode: 'guided',
    status: 'active',
    totalMessages: 12,
    insights: 2,
    progress: 60,
    topics: ['논리', '추론', '비판적사고'],
    emotionalState: 'excited',
    courseContext: {},
    startedAt: '2024-01-16T14:00:00Z',
    lastActivityAt: '2024-01-16T14:45:00Z',
    createdAt: '2024-01-16T14:00:00Z',
  },
  {
    id: 'session-3',
    title: '자유로운 상상력 확장',
    mode: 'self-directed',
    status: 'paused',
    totalMessages: 8,
    insights: 1,
    progress: 30,
    topics: ['상상력', '창의', '자유사고'],
    emotionalState: 'curious',
    courseContext: {},
    startedAt: '2024-01-17T16:00:00Z',
    lastActivityAt: '2024-01-17T16:20:00Z',
    createdAt: '2024-01-17T16:00:00Z',
  },
];

// 목업 메시지 데이터
export const mockMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sessionId: 'session-1',
    sender: 'archi',
    content: '안녕하세요! 저는 아키입니다. 체계적인 사고 수련을 함께 시작해보겠습니다. 어떤 주제로 깊이 탐구해보고 싶으신가요?',
    timestamp: '2024-01-15T09:00:00Z',
    order: 1,
    metadata: { type: 'welcome', mode: 'guided' },
    brainState: 'ready',
    isInsight: false,
    isExercise: false,
    isFeedback: false,
    resources: [],
    topics: [],
  },
  {
    id: 'msg-2',
    sessionId: 'session-1',
    sender: 'user',
    content: '창의적인 문제해결 방법에 대해 배우고 싶어요. 특히 일상에서 마주치는 복잡한 문제들을 어떻게 접근해야 할지 궁금합니다.',
    timestamp: '2024-01-15T09:01:00Z',
    order: 2,
    metadata: { mode: 'guided' },
  },
  {
    id: 'msg-3',
    sessionId: 'session-1',
    sender: 'archi',
    content: '훌륭한 질문입니다! 창의적 문제해결은 정말 중요한 능력이죠. 먼저 현재 가장 어려움을 겪고 있는 구체적인 문제가 있나요? 실제 사례를 통해 함께 탐구해보겠습니다.',
    timestamp: '2024-01-15T09:01:30Z',
    order: 3,
    metadata: { mode: 'guided', analysis: ['questioning'] },
    brainState: 'ready',
    isInsight: false,
    isExercise: false,
    isFeedback: false,
    resources: [],
    topics: ['문제해결', '창의성'],
    processingTime: 1200,
  },
  {
    id: 'msg-4',
    sessionId: 'session-1',
    sender: 'user',
    content: '직장에서 팀원들과의 의견 충돌을 해결하는 게 어려워요. 각자 다른 관점을 가지고 있어서 합의점을 찾기가 힘듭니다.',
    timestamp: '2024-01-15T09:02:00Z',
    order: 4,
    metadata: { mode: 'guided' },
  },
  {
    id: 'msg-5',
    sessionId: 'session-1',
    sender: 'archi',
    content: '💡 흥미로운 발견: 의견 충돌은 사실 다양성의 표현입니다! 서로 다른 관점이 있다는 것은 더 풍부한 해결책을 만들 수 있는 기회예요.\n\n체계적으로 접근해보겠습니다. 먼저 각 팀원의 관점을 명확히 이해하고 계신가요? 그들의 근본적인 관심사나 우려사항이 무엇인지 파악해보는 것부터 시작해볼까요?',
    timestamp: '2024-01-15T09:02:45Z',
    order: 5,
    metadata: { mode: 'guided', analysis: ['observation', 'questioning'] },
    brainState: 'insights',
    isInsight: true,
    isExercise: false,
    isFeedback: false,
    resources: [],
    topics: ['갈등해결', '소통', '관점'],
    processingTime: 1800,
  },
  {
    id: 'msg-6',
    sessionId: 'session-1',
    sender: 'user',
    content: '각자의 관점은 어느 정도 파악하고 있어요. 하지만 서로 자신의 방식이 최선이라고 생각해서 양보를 안 하려고 해요.',
    timestamp: '2024-01-15T09:03:30Z',
    order: 6,
    metadata: { mode: 'guided' },
  },
  {
    id: 'msg-7',
    sessionId: 'session-1',
    sender: 'archi',
    content: '아하, 핵심을 파악하셨네요! 이제 연결고리를 찾아보겠습니다.\n\n📝 실습해볼 만한 아이디어가 있습니다: 각 팀원에게 "상대방 관점의 장점 3가지"를 찾아보라고 제안해보세요. 이때 비판하지 말고, 순수하게 장점만 찾는 것이 중요합니다.\n\n이 방법이 효과적인 이유는 사람들이 자신의 관점을 방어하는 것에서 벗어나, 다른 관점을 이해하려는 모드로 전환되기 때문입니다.',
    timestamp: '2024-01-15T09:04:15Z',
    order: 7,
    metadata: { mode: 'guided', analysis: ['connection', 'synthesis'] },
    brainState: 'insights',
    isInsight: false,
    isExercise: true,
    isFeedback: false,
    resources: [],
    topics: ['소통기법', '관점전환', '실습'],
    processingTime: 2100,
  },
];

// 목업 통계 데이터
export const mockStats: SessionStats = {
  total: 15,
  completed: 8,
  guided: 10,
  selfDirected: 5,
  totalMessages: 180,
  totalInsights: 25,
  totalDuration: 420, // 7시간
};

// 목업 토픽 데이터
export const mockTopics = [
  '창의성',
  '문제해결',
  '비판적사고',
  '논리적추론',
  '소통',
  '협업',
  '혁신',
  '분석',
  '종합',
  '평가',
  '실행',
  '관찰',
  '질문',
  '연결',
  '상상',
];

// 목업 인사이트 데이터
export const mockInsights = [
  '모든 문제는 다른 관점에서 보면 기회가 될 수 있습니다.',
  '제약 조건이 오히려 창의성의 촉진제 역할을 할 수 있어요.',
  '복잡한 문제일수록 단순한 접근이 효과적일 때가 많습니다.',
  '질문의 질이 답변의 질을 결정합니다.',
  '연결고리를 찾는 것이 새로운 발견의 시작입니다.',
];

// 목업 실습 문제 데이터
export const mockExercises = [
  '5분 동안 이 주제와 관련된 아이디어를 최대한 많이 적어보세요.',
  '다른 사람의 입장에서 이 문제를 바라보고 의견을 정리해보세요.',
  '이 개념을 친구에게 설명한다면 어떤 비유를 사용하시겠어요?',
  '반대 의견을 가진 사람과 토론한다면 어떤 논리를 펼치시겠어요?',
  '이 문제를 해결하는 3가지 다른 방법을 생각해보세요.',
];

// 개발용 유틸리티 함수들
export const createMockMessage = (
  content: string,
  sender: 'user' | 'archi' = 'user',
  sessionId = 'session-1'
): ChatMessage => ({
  id: `msg-${Date.now()}`,
  sessionId,
  sender,
  content,
  timestamp: new Date().toISOString(),
  order: Date.now(),
  metadata: { mode: 'guided' },
  brainState: sender === 'archi' ? 'ready' : undefined,
  isInsight: false,
  isExercise: false,
  isFeedback: false,
  resources: [],
  topics: [],
});

export const createMockSession = (
  title: string,
  mode: 'guided' | 'self-directed' = 'guided'
): LearningSession => ({
  id: `session-${Date.now()}`,
  title,
  mode,
  status: 'active',
  totalMessages: 0,
  insights: 0,
  progress: 0,
  topics: [],
  emotionalState: 'curious',
  courseContext: {},
  startedAt: new Date().toISOString(),
  lastActivityAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
});

// 개발 모드에서 사용할 수 있는 디버그 데이터
export const debugData = {
  sessions: mockSessions,
  messages: mockMessages,
  stats: mockStats,
  topics: mockTopics,
  insights: mockInsights,
  exercises: mockExercises,
};

// 로딩 상태 시뮬레이션
export const simulateLoading = (duration = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

// API 응답 시뮬레이션
export const simulateApiResponse = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delay);
  });
};

// 에러 응답 시뮬레이션
export const simulateApiError = (message = '네트워크 오류', delay = 500): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay);
  });
};