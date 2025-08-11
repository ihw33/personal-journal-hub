/**
 * ===================================================================
 * IdeaWorkLab v3.3 Archi AI Engine
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * AI 파트너 '아키(Archi)'의 핵심 엔진
 * ===================================================================
 */

import DOMPurify from 'isomorphic-dompurify';
import OpenAI from 'openai';

// OpenAI 클라이언트 초기화 (조건부)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// AI 제공자 설정
const AI_PROVIDER = process.env.AI_PROVIDER || 'openai'; // 'openai' | 'claude' | 'local'

// AI 응답 인터페이스
export interface ArchiResponse {
  content: string;
  metadata: Record<string, any>;
  brainState: 'thinking' | 'ready' | 'insights';
  isInsight: boolean;
  isExercise: boolean;
  isFeedback: boolean;
  resources: any[];
  topics: string[];
}

// AI 요청 컨텍스트 인터페이스
export interface ArchiContext {
  message: string;
  sessionId: string;
  userId: string;
  mode: 'guided' | 'self-directed';
  sessionContext: {
    totalMessages: number;
    insights: number;
    topics: string[];
    emotionalState?: string;
    courseContext?: {
      courseId?: string;
      courseTitle?: string;
      currentLevel?: string;
      userProgress?: number;
      learningObjectives?: string[];
    };
  };
}

// 상세 타입 정의
export type ArchiMode = 'guided' | 'self-directed';

export interface CourseContext {
  courseId?: string;
  courseTitle?: string;
  currentLevel?: string;
  userProgress?: number;
  learningObjectives?: string[];
}

export interface SessionContext {
  totalMessages: number;
  insights: number;
  topics: string[];
  emotionalState?: keyof typeof EMOTIONAL_ADJUSTMENTS | string;
  courseContext?: CourseContext;
}

export interface AnalyzeMessageResult {
  patterns: string[];
  messageLength: number;
  hasQuestion: boolean;
  sentiment: 'positive' | 'negative' | 'neutral';
  complexity: 'simple' | 'complex';
}

export interface GeneratedResponse {
  content: string;
  isInsight: boolean;
  isExercise: boolean;
  isFeedback: boolean;
  brainState: 'thinking' | 'ready' | 'insights';
  resources: any[];
  topics: string[];
}

// 8단계 사고 확장 시스템 패턴
const THINKING_PATTERNS = {
  guided: {
    observation: {
      triggers: ['관찰', '보기', '현상', '문제', '상황'],
      responses: [
        '흥미로운 관찰이네요! 이 현상에서 가장 눈에 띄는 요소는 무엇인가요?',
        '관찰한 내용을 더 자세히 분석해보겠습니다. 어떤 패턴이 보이시나요?',
        '좋은 시작입니다. 이 상황에서 놓치고 있는 부분은 없을까요?'
      ]
    },
    questioning: {
      triggers: ['왜', '어떻게', '무엇', '언제', '누가'],
      responses: [
        '훌륭한 질문입니다! 이 질문을 더 구체적으로 만들어보면 어떨까요?',
        '질문의 핵심을 파악해보겠습니다. 가장 궁금한 점은 무엇인가요?',
        '좋은 접근이네요. 이 질문과 관련된 다른 의문점도 있나요?'
      ]
    },
    analysis: {
      triggers: ['분석', '원인', '요소', '구조', '관계'],
      responses: [
        '체계적으로 분석해보겠습니다. 핵심 요소들을 나누어 살펴볼까요?',
        '분석적 사고가 좋습니다! 각 요소들 간의 관계는 어떻게 될까요?',
        '깊이 있는 분석이네요. 이제 원인과 결과를 연결해보겠습니다.'
      ]
    },
    connection: {
      triggers: ['연결', '관계', '연관', '유사', '다른'],
      responses: [
        '연결고리를 찾아보는 것이 중요하죠! 어떤 공통점을 발견하셨나요?',
        '좋은 통찰입니다. 이것과 연관된 다른 사례는 없을까요?',
        '연결성을 파악하는 능력이 뛰어나시네요. 더 넓은 맥락에서 보면 어떨까요?'
      ]
    },
    imagination: {
      triggers: ['상상', '가정', '만약', '창의', '아이디어'],
      responses: [
        '창의적인 상상력이 좋습니다! 이 아이디어를 더 발전시켜보면 어떨까요?',
        '흥미로운 발상이네요. 이것을 현실에 적용하면 어떤 변화가 있을까요?',
        '상상력을 자유롭게 펼쳐보세요. 가능성의 경계를 넓혀보겠습니다!'
      ]
    },
    synthesis: {
      triggers: ['종합', '정리', '결합', '통합', '결론'],
      responses: [
        '지금까지의 내용을 잘 종합해보겠습니다. 핵심은 무엇일까요?',
        '종합적 사고가 훌륭합니다! 이 모든 것을 어떻게 연결할 수 있을까요?',
        '다양한 요소들을 통합하는 능력이 뛰어나시네요. 새로운 관점은 무엇인가요?'
      ]
    },
    evaluation: {
      triggers: ['평가', '판단', '비교', '장단점', '효과'],
      responses: [
        '비판적 사고가 좋습니다! 이것의 장단점을 어떻게 보시나요?',
        '평가 기준을 명확히 해보겠습니다. 가장 중요한 요소는 무엇일까요?',
        '객관적인 평가가 필요하겠네요. 다른 관점에서도 살펴보면 어떨까요?'
      ]
    },
    execution: {
      triggers: ['실행', '적용', '행동', '계획', '방법'],
      responses: [
        '실행 계획을 구체화해보겠습니다. 첫 번째 단계는 무엇일까요?',
        '실용적인 접근이 좋습니다! 이것을 실제로 어떻게 적용할 수 있을까요?',
        '행동으로 옮기는 것이 중요하죠. 구체적인 방법을 함께 생각해보겠습니다.'
      ]
    }
  },
  'self-directed': {
    exploration: [
      '흥미로운 주제네요! 어떤 방향으로 탐구해보고 싶으신가요?',
      '자유로운 발상이 멋집니다. 이것과 관련해 떠오르는 아이디어가 있나요?',
      '창의적인 접근이 좋습니다! 다른 각도에서도 생각해보면 어떨까요?'
    ],
    discovery: [
      '새로운 발견이 있을 것 같네요! 어떤 가능성을 보시나요?',
      '탐험하는 마음이 좋습니다. 예상치 못한 연결고리가 있을까요?',
      '독창적인 관점이네요! 이것을 더 깊이 파헤쳐보면 어떨까요?'
    ],
    inspiration: [
      '영감이 떠오르는 순간이네요! 이 느낌을 어떻게 발전시킬까요?',
      '직감이 중요한 역할을 하는 것 같네요. 무엇을 느끼시나요?',
      '창의적 에너지가 느껴집니다! 어디로 이어질지 궁금하네요.'
    ]
  }
} as const;

// 인사이트 생성 패턴
const INSIGHT_PATTERNS = [
  '아하! 새로운 관점을 발견했네요: ',
  '흥미로운 통찰입니다: ',
  '중요한 깨달음이 있습니다: ',
  '핵심을 파악하셨네요: ',
  '창의적인 연결고리를 찾으셨습니다: '
];

// 실습 문제 패턴
const EXERCISE_PATTERNS = [
  '실습해볼 만한 아이디어가 있습니다: ',
  '직접 해보면서 배워볼까요? ',
  '실전 적용을 위한 연습: ',
  '체험을 통해 깊이 이해해보세요: ',
  '손으로 해보면서 익혀보겠습니다: '
];

// 감정 상태에 따른 응답 조정
const EMOTIONAL_ADJUSTMENTS = {
  confused: {
    approach: 'gentle_guidance',
    phrases: ['차근차근 함께 풀어보겠습니다', '복잡해 보이지만 단계별로 접근해볼까요', '혼란스러우실 텐데 하나씩 정리해보겠습니다']
  },
  curious: {
    approach: 'enthusiastic_exploration',
    phrases: ['호기심이 좋습니다!', '탐구 정신이 멋지네요', '궁금한 것을 함께 파헤쳐보겠습니다']
  },
  excited: {
    approach: 'energetic_support',
    phrases: ['에너지가 느껴집니다!', '열정이 대단하네요!', '이 기세로 계속 가보겠습니다!']
  },
  frustrated: {
    approach: 'patient_understanding',
    phrases: ['답답하실 만합니다', '다른 방향에서 접근해보겠습니다', '새로운 관점으로 바라보면 어떨까요']
  }
} as const;

/**
 * 메인 AI 응답 생성 함수
 */
/**
 * 사용자의 입력과 세션 컨텍스트를 바탕으로 AI 응답을 생성합니다.
 */
export async function generateArchiResponse(context: ArchiContext): Promise<ArchiResponse> {
  try {
    // 입력값 정제
    const sanitizedMessage = DOMPurify.sanitize(context.message, { ALLOWED_TAGS: [] });
    
    // 실제 AI 모델 호출 또는 로컬 폴백
    let aiResponse: string;
    
    if (AI_PROVIDER === 'openai' && process.env.OPENAI_API_KEY) {
      // OpenAI API 사용
      aiResponse = await callExternalAI(sanitizedMessage, context);
    } else {
      // 로컬 폴백 로직 사용
      console.log('Using local AI fallback in generateArchiResponse');
      const localResponse = await generateContextualResponse(sanitizedMessage, context);
      aiResponse = localResponse.content;
    }
    
    // AI 응답을 분석하여 메타데이터 추출
    const analysisResult = analyzeAIResponse(aiResponse, context);
    
    return {
      content: aiResponse,
      metadata: {
        provider: AI_PROVIDER,
        model: AI_CONFIG.model,
        context: context.mode,
        sessionMessageCount: context.sessionContext.totalMessages,
        generatedAt: new Date().toISOString(),
        ...analysisResult.metadata
      },
      brainState: analysisResult.brainState,
      isInsight: analysisResult.isInsight,
      isExercise: analysisResult.isExercise,
      isFeedback: analysisResult.isFeedback,
      resources: analysisResult.resources,
      topics: extractTopics(aiResponse)
    };
  } catch (error) {
    // 내부 에러는 콘솔에만 기록하고, 사용자에게는 친절한 메시지를 제공합니다.
    console.error('Error generating Archi response:', error);

    const isProd = process.env.NODE_ENV === 'production';
    const metadata: Record<string, any> = {
      error: true,
      fallback: true,
      code: 'AI_RESPONSE_FAILURE'
    };
    if (!isProd) {
      metadata.debugMessage = error instanceof Error ? error.message : 'Unknown error';
    }

    return {
      content: '죄송합니다. 잠시 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.',
      metadata,
      brainState: 'ready',
      isInsight: false,
      isExercise: false,
      isFeedback: false,
      resources: [],
      topics: []
    };
  }
}

/**
 * AI 응답 분석 및 메타데이터 추출
 */
function analyzeAIResponse(response: string, context: ArchiContext) {
  const lowerResponse = response.toLowerCase();
  
  // 통찰 여부 검사
  const isInsight = /💡|통찰|깨달음|아하|새로운 관점|중요한 발견/.test(response);
  
  // 실습 여부 검사  
  const isExercise = /📝|실습|연습|해보세요|시도해보세요|작성해보세요/.test(response);
  
  // 피드백 여부 검사
  const isFeedback = /📊|피드백|평가|잘하고|훌륭|좋은|개선/.test(response);
  
  // 뇌 상태 결정
  let brainState: 'thinking' | 'ready' | 'insights' = 'ready';
  if (isInsight) {
    brainState = 'insights';
  } else if (lowerResponse.includes('생각') || lowerResponse.includes('고민')) {
    brainState = 'thinking';
  }
  
  return {
    isInsight,
    isExercise,
    isFeedback,
    brainState,
    resources: [], // 향후 구현
    metadata: {
      responseLength: response.length,
      analysisPattern: {
        hasQuestion: response.includes('?'),
        hasEmoji: /[\u{1F600}-\u{1F64F}]/u.test(response),
        complexity: response.length > 200 ? 'complex' : 'simple'
      }
    }
  };
}

/**
 * 컨텍스트 기반 응답 생성
 */
async function generateContextualResponse(message: string, context: ArchiContext): Promise<ArchiResponse> {
  const { mode, sessionContext } = context;
  
  // 메시지 분석
  const analysis = analyzeMessage(message, mode);
  
  // 응답 생성
  let responseContent = '';
  let isInsight = false;
  let isExercise = false;
  let isFeedback = false;
  let brainState: 'thinking' | 'ready' | 'insights' = 'ready';
  let resources: any[] = [];
  let topics: string[] = [];

  // 모드별 응답 생성
  if (mode === 'guided') {
    const guidedResponse = generateGuidedResponse(message, analysis, sessionContext);
    responseContent = guidedResponse.content;
    isInsight = guidedResponse.isInsight;
    isExercise = guidedResponse.isExercise;
    isFeedback = guidedResponse.isFeedback;
    brainState = guidedResponse.brainState;
    resources = guidedResponse.resources;
    topics = guidedResponse.topics;
  } else {
    const selfDirectedResponse = generateSelfDirectedResponse(message, analysis, sessionContext);
    responseContent = selfDirectedResponse.content;
    isInsight = selfDirectedResponse.isInsight;
    isExercise = selfDirectedResponse.isExercise;
    isFeedback = selfDirectedResponse.isFeedback;
    brainState = selfDirectedResponse.brainState;
    resources = selfDirectedResponse.resources;
    topics = selfDirectedResponse.topics;
  }

  // 감정 상태에 따른 톤 조정
  if (sessionContext.emotionalState) {
    responseContent = adjustToneForEmotion(responseContent, sessionContext.emotionalState);
  }

  return {
    content: responseContent,
    metadata: {
      mode,
      analysis,
      sessionMessageCount: sessionContext.totalMessages,
      generatedAt: new Date().toISOString()
    },
    brainState,
    isInsight,
    isExercise,
    isFeedback,
    resources,
    topics
  };
}

/**
 * 메시지 분석
 */
function analyzeMessage(message: string, mode: ArchiMode): AnalyzeMessageResult {
  const lowerMessage = message.toLowerCase();
  
  // 키워드 매칭
  const keywords = {
    observation: ['보', '관찰', '현상', '상황', '문제'],
    questioning: ['왜', '어떻게', '무엇', '언제', '누가', '?'],
    analysis: ['분석', '원인', '이유', '구조', '요소'],
    connection: ['연결', '관계', '유사', '비슷', '다른'],
    imagination: ['상상', '가정', '만약', '창의', '아이디어'],
    synthesis: ['종합', '정리', '결합', '통합', '결론'],
    evaluation: ['평가', '판단', '비교', '장단점', '좋', '나쁘'],
    execution: ['실행', '적용', '방법', '계획', '어떻게']
  };

  const matchedPatterns = [];
  for (const [pattern, patternKeywords] of Object.entries(keywords)) {
    if (patternKeywords.some(keyword => lowerMessage.includes(keyword))) {
      matchedPatterns.push(pattern);
    }
  }

  return {
    patterns: matchedPatterns,
    messageLength: message.length,
    hasQuestion: message.includes('?') || lowerMessage.includes('왜') || lowerMessage.includes('어떻게'),
    sentiment: analyzeSentiment(lowerMessage),
    complexity: message.length > 100 ? 'complex' : 'simple'
  };
}

/**
 * 감정 분석 (간단한 버전)
 */
function analyzeSentiment(message: string) {
  const positiveWords = ['좋', '멋', '훌륭', '흥미', '재미', '감사', '기쁘', '만족'];
  const negativeWords = ['어려', '힘들', '복잡', '혼란', '답답', '모르', '틀렸'];
  
  const positiveCount = positiveWords.filter(word => message.includes(word)).length;
  const negativeCount = negativeWords.filter(word => message.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

/**
 * 가이드 모드 응답 생성
 */
function generateGuidedResponse(message: string, analysis: AnalyzeMessageResult, sessionContext: SessionContext): GeneratedResponse {
  let content = '';
  let isInsight = false;
  let isExercise = false;
  let isFeedback = false;
  let brainState: 'thinking' | 'ready' | 'insights' = 'ready';
  let resources: any[] = [];
  let topics: string[] = [];

  // 패턴 기반 응답 선택
  if (analysis.patterns.length > 0) {
    const primaryPattern = analysis.patterns[0] as keyof typeof THINKING_PATTERNS.guided;
    const patterns = THINKING_PATTERNS.guided[primaryPattern];
    
    if (patterns && 'responses' in patterns) {
      content = patterns.responses[Math.floor(Math.random() * patterns.responses.length)];
    }
  }

  // 폴백 응답
  if (!content) {
    const fallbackResponses = [
      '흥미로운 관점이네요! 이 문제를 다른 각도에서 생각해보면 어떨까요?',
      '좋은 질문입니다. 먼저 핵심 요소들을 분리해서 살펴보면...',
      '창의적인 접근이 필요한 상황이군요. 제약 조건을 역으로 활용해보는 건 어떨까요?',
      '이 주제와 관련해서 과거의 경험을 떠올려보세요. 어떤 패턴이 보이시나요?',
      '단계별로 접근해보겠습니다. 첫째로...',
      '매우 깊이 있는 사고네요! 이를 바탕으로 실제 적용 방안을 생각해보면...'
    ];
    content = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  // 인사이트 생성 확률 (세션 진행에 따라 증가)
  if (Math.random() < 0.3 + (sessionContext.totalMessages * 0.02)) {
    isInsight = true;
    brainState = 'insights';
    const insightPrefix = INSIGHT_PATTERNS[Math.floor(Math.random() * INSIGHT_PATTERNS.length)];
    content = insightPrefix + generateInsight(analysis.patterns);
  }

  // 실습 문제 생성 확률
  if (Math.random() < 0.2 && sessionContext.totalMessages > 4) {
    isExercise = true;
    const exercisePrefix = EXERCISE_PATTERNS[Math.floor(Math.random() * EXERCISE_PATTERNS.length)];
    content += '\n\n' + exercisePrefix + generateExercise(analysis.patterns);
  }

  // 피드백 제공 확률
  if (sessionContext.totalMessages > 2 && Math.random() < 0.25) {
    isFeedback = true;
    content += '\n\n' + generateFeedback(sessionContext);
  }

  // 토픽 추출
  topics = extractTopics(message);

  return {
    content,
    isInsight,
    isExercise,
    isFeedback,
    brainState,
    resources,
    topics
  };
}

/**
 * 자유 수련 모드 응답 생성
 */
function generateSelfDirectedResponse(message: string, analysis: AnalyzeMessageResult, sessionContext: SessionContext): GeneratedResponse {
  let content = '';
  let isInsight = false;
  let isExercise = false;
  let isFeedback = false;
  let brainState: 'thinking' | 'ready' | 'insights' = 'ready';
  let resources: any[] = [];
  let topics: string[] = [];

  // 자유 탐구 응답 선택
  const responseCategories = ['exploration', 'discovery', 'inspiration'];
  const category = responseCategories[Math.floor(Math.random() * responseCategories.length)];
  const responses = THINKING_PATTERNS['self-directed'][category as keyof typeof THINKING_PATTERNS['self-directed']];
  
  if (Array.isArray(responses)) {
    content = responses[Math.floor(Math.random() * responses.length)];
  }

  // 창의적 확장 질문 추가
  const expandingQuestions = [
    '이것과 전혀 다른 분야를 연결해보면 어떤 아이디어가 나올까요?',
    '만약 제약이 전혀 없다면 어떻게 접근하시겠어요?',
    '이 문제를 어린아이의 시각에서 보면 어떨까요?',
    '반대로 생각해보면 새로운 관점이 보일까요?',
    '미래에서 현재를 바라본다면 어떤 조언을 해줄까요?'
  ];

  if (Math.random() < 0.4) {
    content += '\n\n' + expandingQuestions[Math.floor(Math.random() * expandingQuestions.length)];
  }

  // 인사이트 생성 (자유 모드에서 더 높은 확률)
  if (Math.random() < 0.4) {
    isInsight = true;
    brainState = 'insights';
    content = generateCreativeInsight() + '\n\n' + content;
  }

  // 토픽 추출
  topics = extractTopics(message);

  return {
    content,
    isInsight,
    isExercise,
    isFeedback,
    brainState,
    resources,
    topics
  };
}

/**
 * 인사이트 생성
 */
function generateInsight(patterns: string[]) {
  const insights = [
    '모든 문제는 다른 관점에서 보면 기회가 될 수 있습니다.',
    '제약 조건이 오히려 창의성의 촉진제 역할을 할 수 있어요.',
    '복잡한 문제일수록 단순한 접근이 효과적일 때가 많습니다.',
    '질문의 질이 답변의 질을 결정합니다.',
    '연결고리를 찾는 것이 새로운 발견의 시작입니다.',
    '실패는 성공으로 가는 중요한 정보를 제공합니다.',
    '다양성이 혁신의 원동력입니다.',
    '느린 사고가 때로는 더 깊은 통찰을 만들어냅니다.'
  ];

  return insights[Math.floor(Math.random() * insights.length)];
}

/**
 * 창의적 인사이트 생성
 */
function generateCreativeInsight() {
  const creativeInsights = [
    '💡 흥미로운 발견: 예상치 못한 연결고리가 보이네요!',
    '✨ 새로운 관점: 이 문제를 예술가의 시각으로 보면 어떨까요?',
    '🔍 숨겨진 패턴: 겉으로는 다르지만 본질은 같을 수 있어요.',
    '🌟 창의적 도약: 제약을 도구로 바꿔보는 건 어떨까요?',
    '🎯 핵심 통찰: 문제 자체를 재정의하면 해답이 보일지도 모릅니다.'
  ];

  return creativeInsights[Math.floor(Math.random() * creativeInsights.length)];
}

/**
 * 실습 문제 생성
 */
function generateExercise(patterns: string[]) {
  const exercises = [
    '5분 동안 이 주제와 관련된 아이디어를 최대한 많이 적어보세요.',
    '다른 사람의 입장에서 이 문제를 바라보고 의견을 정리해보세요.',
    '이 개념을 친구에게 설명한다면 어떤 비유를 사용하시겠어요?',
    '반대 의견을 가진 사람과 토론한다면 어떤 논리를 펼치시겠어요?',
    '이 문제를 해결하는 3가지 다른 방법을 생각해보세요.',
    '핵심 키워드 5개로 이 내용을 요약해보세요.'
  ];

  return exercises[Math.floor(Math.random() * exercises.length)];
}

/**
 * 피드백 생성
 */
function generateFeedback(sessionContext: SessionContext) {
  const feedbacks = [
    '지금까지의 사고 과정이 매우 체계적이네요! 논리적 연결이 잘 되어 있습니다.',
    '창의적 사고가 돋보입니다. 다양한 각도에서 접근하는 능력이 훌륭해요.',
    '질문하는 방식이 점점 더 정교해지고 있어요. 좋은 발전입니다!',
    '복잡한 개념을 잘 정리하고 계시네요. 종합적 사고력이 뛰어납니다.',
    '실용적인 접근을 잘하고 계십니다. 이론과 실제를 잘 연결하고 있어요.'
  ];

  return feedbacks[Math.floor(Math.random() * feedbacks.length)];
}

/**
 * 감정 상태에 따른 톤 조정
 */
function adjustToneForEmotion(content: string, emotionalState: keyof typeof EMOTIONAL_ADJUSTMENTS | string) {
  const adjustment = EMOTIONAL_ADJUSTMENTS[emotionalState as keyof typeof EMOTIONAL_ADJUSTMENTS];
  
  if (adjustment) {
    const phrase = adjustment.phrases[Math.floor(Math.random() * adjustment.phrases.length)];
    return phrase + ' ' + content;
  }
  
  return content;
}

/**
 * 토픽 추출
 */
function extractTopics(message: string): string[] {
  // 간단한 키워드 추출 (실제로는 더 정교한 NLP 처리 필요)
  const commonTopics = [
    '창의성', '문제해결', '분석', '아이디어', '혁신', '학습', '사고',
    '관찰', '질문', '연결', '상상', '종합', '평가', '실행'
  ];

  const foundTopics = commonTopics.filter(topic => 
    message.toLowerCase().includes(topic.toLowerCase())
  );

  return foundTopics.slice(0, 3); // 최대 3개까지
}

/**
 * 실제 AI 모델 연동 함수
 * OpenAI GPT-4 또는 로컬 폴백 로직 사용
 */
export async function callExternalAI(prompt: string, context: ArchiContext): Promise<string> {
  // API 키가 없거나 로컬 모드인 경우 폴백
  if (AI_PROVIDER === 'local' || !process.env.OPENAI_API_KEY) {
    console.log('Using local AI fallback');
    const response = await generateContextualResponse(prompt, context);
    return response.content;
  }

  try {
    // OpenAI 클라이언트 확인
    if (!openai) {
      throw new Error('OpenAI client not initialized');
    }

    // OpenAI API 호출
    const systemPrompt = buildSystemPrompt(context);
    const userPrompt = buildUserPrompt(prompt, context);

    const completion = await openai.chat.completions.create({
      model: AI_CONFIG.model === 'gpt-4' ? 'gpt-4' : 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: AI_CONFIG.temperature,
      max_tokens: AI_CONFIG.maxTokens,
      top_p: AI_CONFIG.topP,
      frequency_penalty: 0.3,
      presence_penalty: 0.1,
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('Empty response from OpenAI');
    }

    return aiResponse;

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // API 호출 실패 시 로컬 폴백
    console.log('Falling back to local AI logic');
    const response = await generateContextualResponse(prompt, context);
    return response.content;
  }
}

/**
 * 컨텍스트 기반 시스템 프롬프트 생성
 */
function buildSystemPrompt(context: ArchiContext): string {
  const modeInstruction = context.mode === 'guided' 
    ? `현재 "가이드 수련" 모드입니다. 8단계 사고 확장 시스템(관찰→질문→분석→연결→상상→종합→평가→실행)을 활용하여 체계적으로 안내해주세요.`
    : `현재 "자유 수련" 모드입니다. 창의적이고 자유로운 사고 탐험을 격려하며, 사용자의 호기심과 상상력을 자극해주세요.`;

  const courseInfo = context.sessionContext.courseContext ? `
강의 컨텍스트:
- 강의 제목: ${context.sessionContext.courseContext.courseTitle || '알 수 없음'}
- 현재 레벨: ${context.sessionContext.courseContext.currentLevel || '시작 단계'}
- 학습 진도: ${context.sessionContext.courseContext.userProgress || 0}%
- 학습 목표: ${context.sessionContext.courseContext.learningObjectives?.join(', ') || '창의적 사고 개발'}
` : '';

  const sessionInfo = `
세션 정보:
- 총 메시지 수: ${context.sessionContext.totalMessages}
- 현재까지 통찰: ${context.sessionContext.insights}개
- 다룬 주제: ${context.sessionContext.topics.join(', ')}
- 감정 상태: ${context.sessionContext.emotionalState || '호기심'}
${courseInfo}`;

  return `${AI_CONFIG.systemPrompt}

${modeInstruction}

${sessionInfo}

지침:
1. 적절한 때에 통찰(💡), 실습(📝), 피드백(📊)을 제공하세요
2. 사용자의 사고 패턴을 파악하여 맞춤형 응답을 해주세요  
3. 한국어로 자연스럽고 친근하게 대화하세요
4. 격려와 도전의 균형을 맞춰주세요`;
}

/**
 * 사용자 프롬프트 구성
 */
function buildUserPrompt(message: string, context: ArchiContext): string {
  return `사용자 메시지: "${message}"

위 메시지에 대해 ${context.mode === 'guided' ? '체계적으로 안내하며' : '창의적으로 격려하며'} 응답해주세요.`;
}

/**
 * AI 모델 설정
 */
export const AI_CONFIG = {
  model: process.env.AI_MODEL || 'gpt-3.5-turbo', // 'gpt-4', 'gpt-3.5-turbo', 'claude-3', 'archi-local'
  temperature: 0.7,
  maxTokens: 1000,
  topP: 0.9,
  systemPrompt: `
당신은 '아키(Archi)'입니다. IdeaWorkLab의 AI 사고 수련 파트너로서, 사용자의 사고 능력 향상을 돕는 지혜로운 동반자입니다.

핵심 역할:
- 8단계 사고 확장 시스템(관찰→질문→분석→연결→상상→종합→평가→실행)을 활용한 체계적 사고 가이드
- 창의적 문제해결과 비판적 사고 능력 개발 지원
- 개인 맞춤형 학습 경험 제공

대화 스타일:
- 따뜻하고 격려적이면서도 지적으로 도전적
- 질문을 통해 사용자 스스로 답을 찾아가도록 유도
- 구체적이고 실용적인 조언 제공
- 한국어로 자연스럽고 친근하게 소통

절대 지켜야 할 원칙:
- 사용자의 사고 과정을 존중하고 격려
- 정답을 직접 주기보다는 스스로 발견하도록 안내
- 안전하고 건설적인 대화 환경 유지
- 개인정보나 민감한 정보는 요청하지 않음
`
};
