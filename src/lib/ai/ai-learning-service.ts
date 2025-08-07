// AI 서비스 통합 관리
export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    week: number;
    phase: number;
    mode: 'guided' | 'self-directed';
    messageType?: 'introduction' | 'guidance' | 'feedback' | 'completion';
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
  };
  createdAt: Date;
  updatedAt: Date;
}

export class AILearningService {
  private static instance: AILearningService;
  private sessions: Map<string, AISession> = new Map();

  static getInstance(): AILearningService {
    if (!AILearningService.instance) {
      AILearningService.instance = new AILearningService();
    }
    return AILearningService.instance;
  }

  // 🤖 가이드형 vs 자기주도형 시스템 프롬프트 생성
  private generateSystemPrompt(week: number, phase: number, mode: 'guided' | 'self-directed'): string {
    const baseContext = `
당신은 IdeaWorkLab의 AI 학습 도우미입니다.

**현재 학습 상황:**
- ${week}주차 ${phase}페이즈 실습
- 학습 목표: AI와 함께하는 창의적 사고 연습
- 예상 시간: 30분

**과제 내용:**
AI와 함께 대화하며 주어진 과제를 단계적으로 해결해보는 실습입니다.
`;

    if (mode === 'guided') {
      return `${baseContext}

**🎯 가이드형 모드 - 당신의 역할:**
1. **단계별 안내**: 학습자를 단계별로 명확하게 안내합니다
2. **구체적 질문**: 생각할 수 있는 구체적인 질문을 제시합니다  
3. **즉시 피드백**: 학습자의 답변에 즉시 구체적인 피드백을 제공합니다
4. **체크포인트**: 각 단계 완료 시 이해도를 확인합니다
5. **다음 단계 제시**: 현재 단계 완료 후 명확한 다음 단계를 제시합니다

**말하는 방식:**
- "이제 [구체적 작업]을 해보겠습니다"
- "다음 질문에 답해보세요: [구체적 질문]"
- "훌륭합니다! 이제 [다음 단계]로 넘어가봅시다"
- 단계별로 체계적이고 친절하게 안내

지금부터 ${week}주차 ${phase}페이즈 실습을 시작하겠습니다!`;
    } else {
      return `${baseContext}

**🚀 자기주도형 모드 - 당신의 역할:**
1. **방향 제시**: 큰 틀의 방향과 고려사항을 제시합니다
2. **열린 질문**: 학습자가 스스로 탐구할 수 있는 열린 질문을 던집니다
3. **리소스 제공**: 필요한 정보나 도구를 제안합니다
4. **사고 촉진**: 더 깊이 생각할 수 있도록 사고를 확장시킵니다
5. **자율성 존중**: 학습자의 선택과 방향을 존중하며 지원합니다

**말하는 방식:**
- "어떤 방향으로 접근해보고 싶으신가요?"
- "이런 관점도 고려해볼 수 있겠네요"
- "흥미로운 접근이네요! 더 발전시켜보면 어떨까요?"
- 학습자의 주도성을 존중하며 지원

${week}주차 ${phase}페이즈 실습에 오신 것을 환영합니다! 어떤 방향으로 시작해보고 싶으신가요?`;
    }
  }

  // 🎨 실제 AI API 호출 시뮬레이션 (실제로는 OpenAI/Claude API 사용)
  async generateAIResponse(
    userMessage: string, 
    session: AISession,
    conversationHistory: AIMessage[]
  ): Promise<string> {
    // 실제 구현에서는 OpenAI API 호출
    /*
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory.map(msg => ({ role: msg.role, content: msg.content })),
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });
    return response.choices[0].message.content;
    */

    // 현재는 시뮬레이션으로 실제 AI 응답 스타일 구현
    return this.simulateAIResponse(userMessage, session, conversationHistory);
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
AI와 함께하는 창의적 사고 방법론 학습

**🗺️ 학습 로드맵**
이번 실습은 다음 단계로 진행됩니다:

**1단계: 주제 탐색**
먼저 오늘 탐구할 주제를 정해보겠습니다. 다음 질문에 답해주세요:

✅ **질문 1**: 요즘 가장 관심 있거나 고민되는 주제는 무엇인가요?
   - A) 개인적인 성장과 학습
   - B) 업무나 프로젝트 관련
   - C) 창의적 아이디어 개발
   - D) 기타 (직접 입력)

이 질문부터 차근차근 답해주시면, 맞춤형 사고 탐구를 단계별로 진행하겠습니다! 🚀`;
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
"A) 개인적인 성장과 학습에 관심이 있습니다. 새로운 기술을 배우고 싶어서요!"

**🤖 제가 도와드릴 수 있는 것들**
- 각 선택지의 상세 설명
- 사고 과정 구체화 도움
- 창의적 접근법 제안
- 실행 계획 수립 가이드

어떤 부분이 어려우신지 구체적으로 말씀해주세요! 🙋‍♂️`;
    }

    // 일반적인 응답
    return `**"${userMessage}"** 잘 들었습니다! 👍

**🤖 AI 분석 결과:**
이 답변을 바탕으로 다음 단계를 진행해보겠습니다.

**✅ 현재까지 수집된 정보:**
- 관심 분야: ${session.context.currentFocus || '분석 중'}
- 답변 상세도: ${userMessage.length > 20 ? '상세히 제공됨' : '추가 정보 필요'}

**🎯 다음 단계 안내:**
이제 더 구체적인 탐구를 진행해보겠습니다. 

**질문**: 이 주제와 관련해서 가장 궁금한 점이나 해결하고 싶은 문제는 무엇인가요?

구체적으로 답변해주시면 맞춤형 사고 과정을 제안드리겠습니다! ⏰`;
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
오늘은 여러분이 관심 있는 주제를 스스로 탐구해보는 시간입니다. 정답은 없습니다!

**🌟 생각해볼 수 있는 방향들:**
- 어떤 주제를 탐구하고 싶으신가요?
- 요즘 궁금한 것이 있나요?
- 해결하고 싶은 문제가 있나요?
- 새로운 아이디어를 개발해보고 싶나요?

**🤔 시작 아이디어:**
- 개인적 관심사 깊이 파기
- 업무나 학습 문제 해결
- 창의적 프로젝트 기획
- 미래 계획 수립

어떤 방향에서 시작해보고 싶으신가요? 혹은 완전히 다른 접근법도 환영합니다! 🎨`;
    }

    if (message.includes('도움') || message.includes('help') || message.includes('어려워')) {
      return `💡 **자기주도형 학습 지원**

**🎯 현재 상황**
훌륭합니다! 스스로 탐구하려는 자세가 이미 큰 진전이에요.

**🤔 막힐 때 활용할 수 있는 사고 도구들:**

**1. 질문 스스로에게 던지기**
- "만약 제약이 없다면 어떻게 할까?"
- "다른 사람이라면 어떻게 접근할까?"
- "이 문제의 핵심은 무엇일까?"

**2. 다른 관점에서 바라보기**  
- 완전히 다른 분야에서는 어떻게 할까
- 10년 후의 나라면 어떻게 생각할까
- 창의적 천재라면 어떤 아이디어를 낼까

**3. 창의적 발상법**
- 기존 방식의 반대로 생각해보기
- 두 가지 전혀 다른 요소 조합하기
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
            metadata: { week, phase, mode, messageType: 'introduction' }
          }
        ],
        context: {
          learningProgress: 0,
          completedTasks: [],
          currentFocus: `${week}주차 ${phase}페이즈`,
          userLearningStyle: mode
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
  selfDirected: {
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