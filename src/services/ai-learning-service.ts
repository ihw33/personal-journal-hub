/**
 * IWL 4.0 AI Learning Service
 * 캐릭터 개성을 반영한 지능형 학습 지원 시스템
 */

import { 
  AI_CHARACTERS_DETAILED, 
  generateCharacterResponse,
  getRecommendedCharacter,
  type AICharacterPersonality 
} from '@/lib/ai/character-personality';
import type { UserLevel } from '@/lib/theme/theme-system';

export interface LearningContext {
  sessionId: string;
  userId?: string;
  userLevel: UserLevel;
  characterId: string;
  week: number;
  phase: number;
  mode: 'guided' | 'self-directed';
  topic?: string;
  previousMessages?: ChatMessage[];
  learningGoals?: string[];
  currentProgress?: number; // 0-100
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  characterId?: string;
  metadata?: {
    messageType?: 'greeting' | 'question' | 'explanation' | 'encouragement' | 'summary' | 'farewell';
    learningPhase?: number;
    topicTags?: string[];
    sentimentScore?: number; // -1 to 1
    engagementLevel?: number; // 0 to 1
  };
}

export interface LearningResponse {
  message: string;
  characterId: string;
  messageType: 'greeting' | 'question' | 'explanation' | 'encouragement' | 'summary' | 'farewell';
  suggestions?: string[];
  nextSteps?: string[];
  visualElements?: string[];
  learningTips?: string[];
  progressUpdate?: {
    currentPhase: number;
    completion: number;
    achievements: string[];
  };
}

export class AILearningService {
  private character: AICharacterPersonality;
  private context: LearningContext;

  constructor(context: LearningContext) {
    this.context = context;
    this.character = AI_CHARACTERS_DETAILED[context.characterId];
    
    if (!this.character) {
      throw new Error(`Character ${context.characterId} not found`);
    }
  }

  /**
   * 사용자 메시지에 대한 캐릭터별 맞춤 응답 생성
   */
  async generateResponse(userMessage: string, messageHistory: ChatMessage[] = []): Promise<LearningResponse> {
    try {
      const messageType = this.determineMessageType(userMessage, messageHistory);
      const baseResponse = this.generateBaseResponse(userMessage, messageType);
      const enhancedResponse = await this.enhanceWithPersonality(baseResponse, messageType);
      
      return {
        message: enhancedResponse,
        characterId: this.context.characterId,
        messageType,
        suggestions: this.generateSuggestions(userMessage, messageType),
        nextSteps: this.generateNextSteps(messageType),
        visualElements: this.getVisualElements(messageType),
        learningTips: this.generateLearningTips(messageType),
        progressUpdate: this.calculateProgress(messageHistory.length)
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      return this.generateFallbackResponse();
    }
  }

  /**
   * 메시지 타입 분류
   */
  private determineMessageType(userMessage: string, history: ChatMessage[]): LearningResponse['messageType'] {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // 첫 메시지인 경우
    if (history.length === 0) {
      return 'greeting';
    }
    
    // 마지막 메시지인 경우
    if (lowerMessage.includes('끝') || lowerMessage.includes('마무리') || lowerMessage.includes('고마워')) {
      return 'farewell';
    }
    
    // 질문인 경우
    if (lowerMessage.includes('?') || lowerMessage.includes('어떻게') || lowerMessage.includes('왜') || 
        lowerMessage.includes('뭐가') || lowerMessage.includes('무엇')) {
      return 'question';
    }
    
    // 요약 요청인 경우
    if (lowerMessage.includes('정리') || lowerMessage.includes('요약') || lowerMessage.includes('결론')) {
      return 'summary';
    }
    
    // 격려가 필요한 경우 (부정적 표현)
    if (lowerMessage.includes('어려워') || lowerMessage.includes('힘들어') || lowerMessage.includes('모르겠어')) {
      return 'encouragement';
    }
    
    // 기본적으로 설명 타입
    return 'explanation';
  }

  /**
   * 기본 응답 생성
   */
  private generateBaseResponse(userMessage: string, messageType: LearningResponse['messageType']): string {
    const patterns = this.character.responsePatterns[messageType];
    return patterns[Math.floor(Math.random() * patterns.length)];
  }

  /**
   * 캐릭터 개성을 반영한 응답 강화
   */
  private async enhanceWithPersonality(baseResponse: string, messageType: LearningResponse['messageType']): Promise<string> {
    const levelAdaptation = this.character.levelAdaptations[this.context.userLevel];
    const teachingStyle = this.character.teachingMethodology.approach;
    
    // 학습 단계별 맞춤 내용 추가
    const phaseGuidance = this.character.teachingMethodology.learningPhases[this.context.phase] || '';
    
    // 캐릭터별 특화 응답 생성
    let enhancedResponse = baseResponse;
    
    switch (this.context.characterId) {
      case '생각이':
        enhancedResponse = this.enhanceLogicalResponse(baseResponse, messageType);
        break;
      case '아키':
        enhancedResponse = this.enhanceCreativeResponse(baseResponse, messageType);
        break;
      case '미루미':
        enhancedResponse = this.enhanceEmpatheticResponse(baseResponse, messageType);
        break;
      case '반짝이':
        enhancedResponse = this.enhanceMotivationalResponse(baseResponse, messageType);
        break;
    }
    
    // 학습 맥락 추가
    if (phaseGuidance && messageType !== 'greeting' && messageType !== 'farewell') {
      enhancedResponse += `\n\n${this.context.phase}단계에서는 "${phaseGuidance}"에 집중해봅시다!`;
    }
    
    return enhancedResponse;
  }

  /**
   * 생각이 - 논리적 응답 강화
   */
  private enhanceLogicalResponse(response: string, messageType: LearningResponse['messageType']): string {
    const logicalFrameworks = [
      '첫째, 둘째, 셋째 순으로 정리해보면',
      '원인과 결과를 분석해보겠습니다',
      '논리적 순서에 따라 단계별로 살펴보죠',
      '근거와 결론을 명확히 구분해서'
    ];
    
    if (messageType === 'explanation' || messageType === 'question') {
      const framework = logicalFrameworks[Math.floor(Math.random() * logicalFrameworks.length)];
      return `${response}\n\n${framework}...`;
    }
    
    return response;
  }

  /**
   * 아키 - 창의적 응답 강화
   */
  private enhanceCreativeResponse(response: string, messageType: LearningResponse['messageType']): string {
    const creativeElements = [
      '🎨 새로운 관점에서 접근해보면',
      '💡 창의적인 아이디어로 발전시켜보죠',
      '🚀 혁신적인 방법을 상상해봅시다',
      '✨ 기존과는 다른 방식으로 생각해보면'
    ];
    
    if (messageType === 'explanation' || messageType === 'encouragement') {
      const element = creativeElements[Math.floor(Math.random() * creativeElements.length)];
      return `${response}\n\n${element}...`;
    }
    
    return response;
  }

  /**
   * 미루미 - 공감적 응답 강화
   */
  private enhanceEmpatheticResponse(response: string, messageType: LearningResponse['messageType']): string {
    const empatheticElements = [
      '💝 당신의 마음을 충분히 이해해요',
      '🤗 함께 천천히 풀어나가봅시다',
      '🌸 당신의 노력을 인정하고 지지합니다',
      '💕 마음 편하게 자신의 속도로 진행해요'
    ];
    
    if (messageType === 'encouragement' || messageType === 'explanation') {
      const element = empatheticElements[Math.floor(Math.random() * empatheticElements.length)];
      return `${response}\n\n${element}.`;
    }
    
    return response;
  }

  /**
   * 반짝이 - 동기부여 응답 강화
   */
  private enhanceMotivationalResponse(response: string, messageType: LearningResponse['messageType']): string {
    const motivationalElements = [
      '🎯 목표를 향한 한 걸음 더 나아가봅시다!',
      '🏆 이미 훌륭한 진전을 보이고 있어요!',
      '⚡ 에너지를 모아서 도전해봅시다!',
      '🚀 성공을 향한 로켓처럼 출발!'
    ];
    
    if (messageType === 'encouragement' || messageType === 'explanation') {
      const element = motivationalElements[Math.floor(Math.random() * motivationalElements.length)];
      return `${response}\n\n${element}`;
    }
    
    return response;
  }

  /**
   * 맥락별 제안 생성
   */
  private generateSuggestions(userMessage: string, messageType: LearningResponse['messageType']): string[] {
    const baseKeywords = this.character.specialty;
    const suggestions: string[] = [];
    
    switch (messageType) {
      case 'question':
        suggestions.push(
          `${baseKeywords[0]}의 관점에서 다시 생각해보기`,
          `구체적인 예시로 설명해보기`,
          `다른 사람의 의견도 들어보기`
        );
        break;
      case 'explanation':
        suggestions.push(
          `실제 경험과 연결해보기`,
          `더 깊이 탐구해보기`,
          `다음 단계로 발전시키기`
        );
        break;
      case 'encouragement':
        suggestions.push(
          `작은 목표부터 시작하기`,
          `성공 경험 되돌아보기`,
          `동기를 재확인하기`
        );
        break;
      default:
        suggestions.push(
          `${this.character.name}와 더 대화하기`,
          `관련 주제 더 탐색하기`,
          `실천 계획 세워보기`
        );
    }
    
    return suggestions;
  }

  /**
   * 다음 단계 안내 생성
   */
  private generateNextSteps(messageType: LearningResponse['messageType']): string[] {
    const currentPhase = this.context.phase;
    const nextPhase = Math.min(currentPhase + 1, 8);
    
    const steps: string[] = [];
    
    if (currentPhase < 8) {
      const nextPhaseDescription = this.character.teachingMethodology.learningPhases[nextPhase];
      if (nextPhaseDescription) {
        steps.push(`다음 ${nextPhase}단계: ${nextPhaseDescription}`);
      }
    }
    
    // 캐릭터별 맞춤 다음 단계
    switch (this.context.characterId) {
      case '생각이':
        steps.push('논리적 구조 더 깊이 분석하기', '증거와 근거 보강하기');
        break;
      case '아키':
        steps.push('새로운 아이디어 실험해보기', '창의적 조합 시도하기');
        break;
      case '미루미':
        steps.push('감정과 경험 더 나누기', '다른 사람 관점 이해하기');
        break;
      case '반짝이':
        steps.push('구체적 실행 계획 세우기', '첫 번째 액션 아이템 정하기');
        break;
    }
    
    return steps;
  }

  /**
   * 시각적 요소 제공
   */
  private getVisualElements(messageType: LearningResponse['messageType']): string[] {
    return this.character.specialFeatures.visualElements;
  }

  /**
   * 학습 팁 생성
   */
  private generateLearningTips(messageType: LearningResponse['messageType']): string[] {
    const levelAdaptation = this.character.levelAdaptations[this.context.userLevel];
    
    const tips = [
      `${levelAdaptation.vocabulary} 수준으로 학습하기`,
      `${levelAdaptation.motivationStyle}을 활용하기`,
      `${this.character.specialFeatures.interactionStyle} 적극 참여하기`
    ];
    
    // 학습 모드별 팁 추가
    if (this.context.mode === 'guided') {
      tips.push('단계별 가이드를 따라 체계적으로 학습하기');
    } else {
      tips.push('자신만의 속도와 방식으로 자유롭게 탐구하기');
    }
    
    return tips;
  }

  /**
   * 학습 진도 계산
   */
  private calculateProgress(messageCount: number): LearningResponse['progressUpdate'] {
    const baseProgress = Math.min((messageCount / 20) * 100, 90); // 메시지당 5% 진행도
    const phaseProgress = (this.context.phase - 1) * 12.5; // 8단계 × 12.5%
    const totalProgress = Math.min(baseProgress + phaseProgress, 100);
    
    const achievements: string[] = [];
    
    // 마일스톤 달성 체크
    if (messageCount >= 5) achievements.push('적극적 참여자');
    if (messageCount >= 10) achievements.push('꾸준한 학습자');
    if (this.context.phase >= 4) achievements.push('중급 사고력 달성');
    if (this.context.phase >= 7) achievements.push('고급 사고력 도전자');
    
    return {
      currentPhase: this.context.phase,
      completion: Math.round(totalProgress),
      achievements
    };
  }

  /**
   * 오류 시 기본 응답
   */
  private generateFallbackResponse(): LearningResponse {
    return {
      message: `${this.character.emoji} 죄송해요, 잠시 생각을 정리하고 있어요. 다시 말씀해주실래요?`,
      characterId: this.context.characterId,
      messageType: 'explanation',
      suggestions: ['다시 질문해보기', '다른 방식으로 표현해보기'],
      nextSteps: ['기본 개념부터 차근차근'],
      visualElements: ['💭 사고 정리 중'],
      learningTips: ['천천히 단계별로 접근하기']
    };
  }

  /**
   * 캐릭터 추천 시스템
   */
  static recommendCharacter(
    userLevel: UserLevel,
    learningPhase: number = 1,
    userPreferences?: {
      style?: 'analytical' | 'creative' | 'emotional' | 'goal-oriented';
      topics?: string[];
      previousCharacters?: string[];
    }
  ): string {
    return getRecommendedCharacter(
      userLevel,
      learningPhase,
      userPreferences?.style
    );
  }

  /**
   * 세션 요약 생성
   */
  generateSessionSummary(messages: ChatMessage[]): {
    summary: string;
    keyInsights: string[];
    achievements: string[];
    nextSessionRecommendations: string[];
  } {
    const messageCount = messages.length;
    const userMessages = messages.filter(m => m.role === 'user');
    const characterMessages = messages.filter(m => m.role === 'assistant');
    
    const summary = generateCharacterResponse(
      this.context.characterId,
      'summary',
      this.context.userLevel,
      `${messageCount}개의 메시지로 진행된 ${this.context.phase}단계 학습`
    );
    
    const keyInsights = [
      `${this.character.specialty[0]} 영역에서 ${Math.floor(messageCount / 3)}개의 핵심 개념 학습`,
      `${this.character.name}와의 상호작용을 통한 개인화된 학습 경험`,
      `${this.context.mode === 'guided' ? '체계적 가이드' : '자기주도적'} 학습 방식 적용`
    ];
    
    const achievements = this.calculateProgress(messageCount).achievements;
    
    const nextSessionRecommendations = [
      `다음 ${this.context.phase + 1}단계로 진행하기`,
      `${this.character.specialty[1]} 영역 더 탐구하기`,
      '다른 AI 캐릭터와도 대화해보기'
    ];
    
    return {
      summary,
      keyInsights,
      achievements,
      nextSessionRecommendations
    };
  }
}

export default AILearningService;