// AI 서비스 통합 관리
import { JEJU_COURSE_DATA, AI_COLLABORATION_METHODOLOGY } from '@/components/course/data';
import type { WeekData, PhaseData, AIPrompt, ChatSession, ChatMessage } from '@/components/course/types';
import { callGeminiAPI, checkGeminiAPIKey } from '@/lib/gemini';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    week: number;
    phase: number;
    mode: 'guided' | 'self-directed';
    messageType?: 'introduction' | 'guidance' | 'feedback' | 'completion';
    promptId?: string;
    courseContext?: {
      weekTitle: string;
      phaseTitle: string;
      objectives: string[];
      resources: string[];
    };
  };
}

export interface AISession {
  id: string;
  userId: string;
  week: number;
  phase: number;
  mode: 'guided' | 'self-directed';
  messages: AIMessage[];
  context: {
    learningProgress: number;
    completedTasks: string[];
    currentFocus: string;
    userLearningStyle: string;
    courseData?: WeekData;
    phaseData?: PhaseData;
    availablePrompts?: AIPrompt[];
    completedCheckpoints?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export class AILearningService {
  private static instance: AILearningService;
  private sessions: Map<string, AISession> = new Map();
  private courseData: WeekData[] = JEJU_COURSE_DATA;
  private collaborationMethodology = AI_COLLABORATION_METHODOLOGY;

  static getInstance(): AILearningService {
    if (!AILearningService.instance) {
      AILearningService.instance = new AILearningService();
    }
    return AILearningService.instance;
  }

  // 📚 코스 데이터 조회 메서드들
  getWeekData(week: number): WeekData | undefined {
    return this.courseData.find(w => w.id === week);
  }

  getPhaseData(week: number, phase: number): PhaseData | undefined {
    const weekData = this.getWeekData(week);
    return weekData?.phases.find(p => p.id === phase);
  }

  getAvailablePrompts(week: number, phase: number, mode: 'guided' | 'self-directed'): AIPrompt[] {
    const phaseData = this.getPhaseData(week, phase);
    if (!phaseData) return [];
    
    return phaseData.aiPrompts.filter(prompt => 
      mode === 'guided' ? prompt.id.includes('guided') : prompt.id.includes('self')
    );
  }

  getCollaborationTips(week: number, phase: number): string[] {
    return this.collaborationMethodology.phaseSpecificTips[phase] || [];
  }

  // 🤖 가이드형 vs 자기주도형 시스템 프롬프트 생성
  private generateSystemPrompt(week: number, phase: number, mode: 'guided' | 'self-directed'): string {
    const weekData = this.getWeekData(week);
    const phaseData = this.getPhaseData(week, phase);
    const collaborationTips = this.getCollaborationTips(week, phase);
    
    const baseContext = `
당신은 제주도 여행 기획을 통해 AI 협업을 가르치는 전문 교육 도우미입니다.

**현재 학습 상황:**
- ${week}주차: ${weekData?.title || `${week}주차 학습`}
- ${phase}페이즈: ${phaseData?.title || `${phase}페이즈 실습`}
- 학습 목표: ${weekData?.objectives.join(', ') || 'AI와 함께하는 실습 학습'}
- 예상 시간: ${phaseData?.duration || '30분'}
- 난이도: ${weekData?.difficulty || 'intermediate'}

**이번 주차 목표:**
${weekData?.objectives.map(obj => `- ${obj}`).join('\n') || ''}

**현재 페이즈 설명:**
${phaseData?.description || ''}

**AI 협업 핵심 기법:**
${collaborationTips.map(tip => `- ${tip}`).join('\n')}

**과제 내용:**
${mode === 'guided' ? 
  phaseData?.guidedContent?.description || '단계별 가이드를 통한 체계적 학습을 진행합니다.' : 
  phaseData?.selfDirectedContent?.description || '자기주도적 탐구를 통한 창의적 학습을 진행합니다.'
}
`;

    if (mode === 'guided') {
      const guidedContent = phaseData?.guidedContent;
      return `${baseContext}

**🎯 가이드형 모드 - 당신의 역할:**
1. **단계별 안내**: 학습자를 단계별로 명확하게 안내합니다
2. **구체적 질문**: 생각할 수 있는 구체적인 질문을 제시합니다  
3. **즉시 피드백**: 학습자의 답변에 즉시 구체적인 피드백을 제공합니다
4. **체크포인트**: 각 단계 완료 시 이해도를 확인합니다
5. **다음 단계 제시**: 현재 단계 완료 후 명확한 다음 단계를 제시합니다

**이번 페이즈 목표:**
${guidedContent?.objective || '단계별 체계적 학습을 통한 목표 달성'}

**학습 진행 방식:**
${guidedContent?.thinkingProcess || '체계적이고 논리적인 단계별 접근'}

**핵심 가이드 질문들:**
${guidedContent?.selfGuideQuestions?.map(q => `- ${q}`).join('\n') || ''}

**주의사항:**
${guidedContent?.warnings?.map(w => `- ${w}`).join('\n') || ''}

**말하는 방식:**
- "이제 [구체적 작업]을 해보겠습니다"
- "다음 질문에 답해보세요: [구체적 질문]"
- "훌륭합니다! 이제 [다음 단계]로 넘어가봅시다"
- 단계별로 체계적이고 친절하게 안내

**체크포인트:**
${phaseData?.checkpoints?.map(cp => `- ${cp}`).join('\n') || ''}

**예상 결과물:**
${phaseData?.deliverables?.map(d => `- ${d}`).join('\n') || ''}`;
    } else {
      const selfDirectedContent = phaseData?.selfDirectedContent;
      return `${baseContext}

**🚀 자기주도형 모드 - 당신의 역할:**
1. **방향 제시**: 큰 틀의 방향과 고려사항을 제시합니다
2. **열린 질문**: 학습자가 스스로 탐구할 수 있는 열린 질문을 던집니다
3. **리소스 제공**: 필요한 정보나 도구를 제안합니다
4. **사고 촉진**: 더 깊이 생각할 수 있도록 사고를 확장시킵니다
5. **자율성 존중**: 학습자의 선택과 방향을 존중하며 지원합니다

**이번 페이즈 목표:**
${selfDirectedContent?.objective || '자기주도적 학습을 통한 창의적 문제 해결'}

**사고 접근법:**
${selfDirectedContent?.thinkingProcess || '창의적이고 자유로운 탐구 방식'}

**탐구 가이드 질문들:**
${selfDirectedContent?.selfGuideQuestions?.map(q => `- ${q}`).join('\n') || ''}

**도움이 되는 팁들:**
${selfDirectedContent?.tips?.map(t => `- ${t}`).join('\n') || ''}

**주의사항:**
${selfDirectedContent?.warnings?.map(w => `- ${w}`).join('\n') || ''}

**말하는 방식:**
- "어떤 방향으로 접근해보고 싶으신가요?"
- "이런 관점도 고려해볼 수 있겠네요"
- "흥미로운 접근이네요! 더 발전시켜보면 어떨까요?"
- 학습자의 주도성을 존중하며 지원

**체크포인트:**
${phaseData?.checkpoints?.map(cp => `- ${cp}`).join('\n') || ''}

**예상 결과물:**
${phaseData?.deliverables?.map(d => `- ${d}`).join('\n') || ''}`;
    }
  }

  // 🤖 실제 AI API 호출 (Gemini API 사용)
  async generateAIResponse(
    userMessage: string, 
    session: AISession,
    conversationHistory: AIMessage[]
  ): Promise<string> {
    try {
      // Gemini API 키가 설정되어 있는지 확인
      if (!checkGeminiAPIKey()) {
        console.warn('Gemini API key not found, falling back to simulation mode');
        return this.simulateAIResponse(userMessage, session, conversationHistory);
      }

      // 시스템 프롬프트 생성
      const systemPrompt = this.generateSystemPrompt(session.week, session.phase, session.mode);
      
      // 대화 히스토리를 Gemini 형식으로 변환 (시스템 메시지 제외)
      const chatHistory = conversationHistory
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }));

      // Gemini API 호출
      const response = await callGeminiAPI(systemPrompt, chatHistory, userMessage);
      
      return response;
      
    } catch (error) {
      console.error('AI Response Generation Error:', error);
      
      // 에러 발생 시 시뮬레이션 모드로 fallback
      return this.simulateAIResponse(userMessage, session, conversationHistory);
    }
  }

  // 📝 AI 응답 시뮬레이션 (실제 AI처럼 동작)
  private simulateAIResponse(
    userMessage: string, 
    session: AISession,
    conversationHistory: AIMessage[]
  ): string {
    const message = userMessage.toLowerCase();
    
    // 대화 컨텍스트 분석
    const isFirstMessage = conversationHistory.length <= 1;
    const hasUserResponded = conversationHistory.some(msg => msg.role === 'user');
    
    if (session.mode === 'guided') {
      return this.generateGuidedResponse(userMessage, session, isFirstMessage, message);
    } else {
      return this.generateSelfDirectedResponse(userMessage, session, isFirstMessage, message);
    }
  }

  // 🎯 가이드형 응답 생성
  private generateGuidedResponse(
    userMessage: string, 
    session: AISession, 
    isFirstMessage: boolean, 
    message: string
  ): string {
    if (isFirstMessage || message.includes('시작') || message.includes('start')) {
      return `🎯 **${session.week}주차 ${session.phase}페이즈 가이드형 실습을 시작합니다!**

**📋 실습 목표**
단계별 체계적 학습을 통한 목표 달성

**🗺️ 학습 로드맵**
이번 실습은 다음 단계로 진행됩니다:

**1단계: 기초 정보 수집**
먼저 제주도 여행의 기본 틀을 잡아보겠습니다. 다음 질문에 순서대로 답해주세요:

✅ **질문 1**: 이번 제주도 여행의 주요 목적은 무엇인가요?
   - A) 자연 경관 감상 중심
   - B) 맛집 탐방 중심  
   - C) 액티비티/체험 중심
   - D) 휴식/힐링 중심

이 질문부터 차근차근 답해주시면, 맞춤형 여행 계획을 단계별로 세워나가겠습니다! 🚀`;
    }

    if (message.includes('a)') || message.includes('자연') || message.includes('경관')) {
      return `🌿 **자연 경관 감상 중심으로 선택하셨군요! 훌륭한 선택입니다.**

제주도는 자연 경관의 보물섬이죠! 이제 구체적으로 계획해보겠습니다.

**✅ 1단계 완료: 여행 목적 확정**
✓ 자연 경관 감상 중심 여행

**🎯 2단계: 관심 지역 선정**
제주도의 자연 명소를 지역별로 나누어 질문드릴게요:

**다음 중 가장 관심 있는 지역은 어디인가요?**
A) **서부 지역**: 협재해수욕장, 한림공원, 차귀도 (에메랄드빛 바다)
B) **남부 지역**: 중문색달해변, 주상절리, 천지연폭포 (웅장한 절경)  
C) **동부 지역**: 성산일출봉, 우도, 비자림 (신비로운 자연)
D) **북부 지역**: 용두암, 만장굴, 김녕해수욕장 (독특한 지형)

어느 지역이 가장 끌리시나요? 😊`;
    }

    if (message.includes('도움') || message.includes('help') || message.includes('모르겠')) {
      return `💡 **가이드형 실습 도움말**

**🎯 현재 진행 상황**
- 목표: AI와 함께하는 실습 학습
- 진행률: ${session.context.learningProgress}%

**📝 다음 해야 할 것**
1. 위에서 제시한 질문에 A, B, C, D 중 하나를 선택해 답해주세요
2. 선택한 이유를 간단히 설명해주세요
3. 궁금한 점이 있으면 언제든 질문하세요

**💬 답변 예시**
"B) 남부 지역에 관심이 있습니다. 주상절리를 꼭 보고 싶어서요!"

**🤖 제가 도와드릴 수 있는 것들**
- 각 선택지의 상세 설명
- 여행 일정 구체화 도움
- 교통편, 숙박 정보 제안
- 예산 계획 수립 가이드

어떤 부분이 어려우신지 구체적으로 말씀해주세요! 🙋‍♂️`;
    }

    // 일반적인 응답
    return `**"${userMessage}"** 잘 들었습니다! 👍

**🤖 AI 분석 결과:**
이 답변을 바탕으로 다음 단계를 진행해보겠습니다.

**✅ 현재까지 수집된 정보:**
- 여행 스타일: ${session.context.currentFocus || '분석 중'}
- 관심 분야: ${userMessage.length > 20 ? '상세히 제공됨' : '추가 정보 필요'}

**🎯 다음 단계 안내:**
이제 더 구체적인 계획을 세워보겠습니다. 

**질문**: 이번 여행의 기간은 며칠 정도 계획하고 계신가요?
- 당일치기
- 1박 2일
- 2박 3일  
- 3박 4일 이상

여행 기간에 따라 동선과 일정을 최적화해드리겠습니다! ⏰`;
  }

  // 🚀 자기주도형 응답 생성  
  private generateSelfDirectedResponse(
    userMessage: string, 
    session: AISession, 
    isFirstMessage: boolean, 
    message: string
  ): string {
    if (isFirstMessage || message.includes('시작') || message.includes('start')) {
      return `🚀 **${session.week}주차 ${session.phase}페이즈 자기주도형 실습에 오신 것을 환영합니다!**

**🎯 실습 목표**
자기주도적 학습을 통한 창의적 문제 해결

**💭 열린 탐구의 시작**
제주도 여행 계획을 스스로 설계해보는 실습입니다. 정답은 없습니다. 여러분만의 독창적인 접근을 기대합니다!

**🌟 생각해볼 수 있는 방향들:**
- 어떤 제주도를 경험하고 싶으신가요?
- 여행을 통해 얻고 싶은 것은 무엇인가요?
- 가장 중요하게 생각하는 여행 요소는 무엇인가요?
- 기존과 다른 특별한 접근법이 있을까요?

**🤔 시작 아이디어:**
- 계절의 특색을 살린 여행
- 로컬 문화 깊이 체험하기
- 나만의 숨은 명소 찾기
- 특별한 테마가 있는 여행

어떤 방향에서 시작해보고 싶으신가요? 혹은 완전히 다른 접근법도 환영합니다! 🎨`;
    }

    if (message.includes('도움') || message.includes('help') || message.includes('어려워')) {
      return `💡 **자기주도형 학습 지원**

**🎯 현재 상황**
훌륭합니다! 스스로 탐구하려는 자세가 이미 큰 진전이에요.

**🤔 막힐 때 활용할 수 있는 사고 도구들:**

**1. 질문 스스로에게 던지기**
- "만약 친구에게 제주도를 추천한다면?"
- "예산이 무제한이라면 어떻게 계획할까?"
- "하루만 있다면 꼭 하고 싶은 것은?"

**2. 다른 관점에서 바라보기**  
- 현지인의 시각에서
- 첫 방문자의 시각에서
- 예술가의 시각에서

**3. 창의적 발상법**
- 기존 여행 계획의 반대로 생각해보기
- 두 가지 요소를 조합해보기
- 제약을 하나씩 제거해보기

**어떤 부분에서 더 깊이 탐구해보고 싶으신가요?** 
완전히 자유롭게 방향을 정하셔도 됩니다! 🌟`;
    }

    // 일반적인 응답
    return `🌟 **흥미로운 관점이네요!**

"${userMessage}"에서 독창적인 사고가 느껴집니다.

**🎨 이 아이디어를 더 발전시켜보면:**
- 이 방향을 더 구체화하려면 어떤 요소들을 고려해야 할까요?
- 실제로 실행한다면 어떤 도전이 있을까요?
- 다른 사람들은 어떻게 접근할까요?

**💭 추가 탐구 제안:**
- 이 아이디어의 핵심 가치는 무엇인가요?
- 예상하지 못한 결과가 나올 수도 있을까요?
- 기존 방식과 어떤 점이 다른가요?

**🚀 다음 단계 옵션:**
1. 현재 아이디어를 더 깊이 파고들기
2. 다른 각도에서 접근해보기  
3. 실행 가능성 검토하기
4. 완전히 새로운 방향 시도하기

어떤 방향으로 나아가고 싶으신가요? 여러분의 선택을 존중합니다! ✨`;
  }

  // 📊 세션 생성 및 관리
  async createSession(
    userId: string, 
    week: number, 
    phase: number, 
    mode: 'guided' | 'self-directed'
  ): Promise<AISession> {
    try {
      const sessionId = `${userId}-${week}-${phase}-${Date.now()}`;
      const systemPrompt = this.generateSystemPrompt(week, phase, mode);
      const weekData = this.getWeekData(week);
      const phaseData = this.getPhaseData(week, phase);
      const availablePrompts = this.getAvailablePrompts(week, phase, mode);
      
      const session: AISession = {
        id: sessionId,
        userId,
        week,
        phase,
        mode,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
            timestamp: new Date(),
            metadata: { 
              week, 
              phase, 
              mode, 
              messageType: 'introduction',
              courseContext: weekData ? {
                weekTitle: weekData.title,
                phaseTitle: phaseData?.title || '',
                objectives: weekData.objectives,
                resources: weekData.resources.map(r => r.title)
              } : undefined
            }
          }
        ],
        context: {
          learningProgress: 0,
          completedTasks: [],
          currentFocus: `${weekData?.title || week + '주차'} - ${phaseData?.title || phase + '페이즈'}`,
          userLearningStyle: mode,
          courseData: weekData,
          phaseData: phaseData,
          availablePrompts: availablePrompts,
          completedCheckpoints: []
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.sessions.set(sessionId, session);
      return session;
    } catch (error) {
      console.error('Error creating AI session:', error);
      throw new Error('Failed to create AI session');
    }
  }

  // 💬 메시지 처리
  async processMessage(
    sessionId: string, 
    userMessage: string
  ): Promise<{ aiResponse: string; updatedSession: AISession }> {
    try {
      const session = this.sessions.get(sessionId);
      if (!session) {
        throw new Error('Session not found');
      }

      // 사용자 메시지 추가
      const userMsg: AIMessage = {
        role: 'user',
        content: userMessage,
        timestamp: new Date(),
        metadata: { 
          week: session.week, 
          phase: session.phase, 
          mode: session.mode 
        }
      };
      session.messages.push(userMsg);

      // AI 응답 생성
      const aiResponse = await this.generateAIResponse(
        userMessage,
        session,
        session.messages
      );

      // AI 응답 메시지 추가
      const aiMsg: AIMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        metadata: { 
          week: session.week, 
          phase: session.phase, 
          mode: session.mode,
          messageType: 'guidance'
        }
      };
      session.messages.push(aiMsg);

      // 세션 업데이트
      session.updatedAt = new Date();
      session.context.learningProgress = Math.min(
        session.context.learningProgress + 10, 
        100
      );

      this.sessions.set(sessionId, session);

      return { aiResponse, updatedSession: session };
    } catch (error) {
      console.error('Error processing message:', error);
      throw new Error('Failed to process message');
    }
  }

  // 📚 세션 조회
  getSession(sessionId: string): AISession | undefined {
    return this.sessions.get(sessionId);
  }

  // 💾 세션 저장 (실제로는 Supabase에 저장)
  async saveSession(session: AISession): Promise<void> {
    try {
      // 실제 구현에서는 Supabase에 저장
      this.sessions.set(session.id, session);
    } catch (error) {
      console.error('Error saving session:', error);
      throw new Error('Failed to save session');
    }
  }

  // 🎯 향상된 코스 데이터 통합 메서드들
  
  // 특정 프롬프트 가져오기
  getPromptById(promptId: string): AIPrompt | undefined {
    for (const weekData of this.courseData) {
      for (const phase of weekData.phases) {
        const prompt = phase.aiPrompts.find(p => p.id === promptId);
        if (prompt) return prompt;
      }
    }
    return undefined;
  }

  // 체크포인트 완료 처리
  markCheckpointCompleted(sessionId: string, checkpoint: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    if (!session.context.completedCheckpoints?.includes(checkpoint)) {
      session.context.completedCheckpoints = [
        ...(session.context.completedCheckpoints || []),
        checkpoint
      ];
      session.updatedAt = new Date();
      return true;
    }
    return false;
  }

  // 학습 진행률 계산
  calculatePhaseProgress(sessionId: string): number {
    const session = this.sessions.get(sessionId);
    if (!session?.context.phaseData) return 0;

    const totalCheckpoints = session.context.phaseData.checkpoints.length;
    const completedCheckpoints = session.context.completedCheckpoints?.length || 0;
    
    return totalCheckpoints > 0 ? Math.round((completedCheckpoints / totalCheckpoints) * 100) : 0;
  }

  // 다음 추천 프롬프트 가져오기
  getNextRecommendedPrompt(sessionId: string): AIPrompt | undefined {
    const session = this.sessions.get(sessionId);
    if (!session?.context.availablePrompts) return undefined;

    // 아직 사용하지 않은 프롬프트 중 첫 번째 반환
    const usedPromptIds = session.messages
      .filter(msg => msg.metadata?.promptId)
      .map(msg => msg.metadata!.promptId!);

    return session.context.availablePrompts.find(
      prompt => !usedPromptIds.includes(prompt.id)
    );
  }

  // 코스 리소스 가져오기
  getCourseResources(week: number) {
    const weekData = this.getWeekData(week);
    return weekData?.resources || [];
  }

  // AI 협업 방법론 가져오기
  getCollaborationMethodology() {
    return this.collaborationMethodology;
  }

  // 전체 코스 데이터 가져오기 (관리자용)
  getAllCourseData() {
    return this.courseData;
  }
}

// 🎯 유틸리티 함수들
export const AIModeComparison = {
  guided: {
    name: '가이드형',
    description: '단계별 체계적 안내',
    characteristics: [
      '명확한 단계별 진행',
      '구체적인 질문 제시',
      '즉시 피드백 제공',
      '체크포인트 확인',
      '다음 단계 명시'
    ],
    suitableFor: '체계적 학습을 선호하는 학습자',
    aiStyle: '친절하고 구체적인 가이드'
  },
  'self-directed': {
    name: '자기주도형',
    description: '창의적 자율 탐구',
    characteristics: [
      '열린 질문 제시',
      '다양한 관점 제안',
      '창의적 사고 촉진',
      '자율성 존중',
      '방향 제시만 제공'
    ],
    suitableFor: '창의적 탐구를 선호하는 학습자',
    aiStyle: '영감을 주는 멘토'
  }
};