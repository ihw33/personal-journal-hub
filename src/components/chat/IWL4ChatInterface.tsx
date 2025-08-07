'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useDesignMode } from '@/components/design-mode/DesignModeProvider';
import { DesignModeCard, DesignModeButton, DesignModeInput } from '@/components/design-mode/DesignModeAwareComponent';
import { ThemeAwareButton } from '@/components/ui/theme-aware/ThemeAwareButton';
import { ThemeAwareCard, ThemeAwareCardContent } from '@/components/ui/theme-aware/ThemeAwareCard';
import { ThemeAwareInput } from '@/components/ui/theme-aware/ThemeAwareInput';
import { webSocketManager } from '@/lib/websocket/websocket-manager';
import { AILearningService, type LearningContext, type ChatMessage } from '@/services/ai-learning-service';
import { CharacterAvatar, ChatCharacterAvatar } from './CharacterAvatar';
import type { UserLevel } from '@/lib/theme/theme-system';

// IWL 4.0 통합 채팅 인터페이스 타입 정의
export interface IWL4ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: number;
  characterId?: string; // AI 캐릭터 ID (생각이, 아키, 미루미, 반짝이)
  sessionId?: string;
  metadata?: {
    week?: number;
    phase?: number;
    thinkingLevel?: number;
    emotions?: string[];
    confidence?: number;
  };
}

export interface IWL4ChatSession {
  id: string;
  title: string;
  mode: 'guided' | 'self-directed';
  week: number;
  phase: number;
  level: UserLevel;
  characterId: string;
  messages: IWL4ChatMessage[];
  createdAt: number;
  updatedAt: number;
  status: 'active' | 'paused' | 'completed';
}

export interface IWL4ChatInterfaceProps {
  sessionId?: string;
  week?: number;
  phase?: number;
  mode?: 'guided' | 'self-directed';
  characterId?: string;
  onSessionCreate?: (session: IWL4ChatSession) => void;
  onSessionUpdate?: (session: IWL4ChatSession) => void;
  onMessageSend?: (message: IWL4ChatMessage) => void;
  className?: string;
}

// AI 캐릭터 정보
const AI_CHARACTERS = {
  '생각이': {
    id: '생각이',
    name: '생각이',
    emoji: '🤔',
    color: '#6B73FF',
    role: '깊이 생각하는 친구',
    description: '복잡한 문제를 차근차근 분석해주는 사고력 전문가',
    personality: 'thoughtful'
  },
  '아키': {
    id: '아키',
    name: '아키',
    emoji: '🏗️',
    color: '#FF6B6B',
    role: '체계적인 설계자',
    description: '아이디어를 체계적으로 구조화하고 설계해주는 전문가',
    personality: 'systematic'
  },
  '미루미': {
    id: '미루미',
    name: '미루미',
    emoji: '🌊',
    color: '#4ECDC4',
    role: '흐름을 읽는 친구',
    description: '상황의 흐름과 맥락을 파악해주는 직관적 사고 전문가',
    personality: 'intuitive'
  },
  '반짝이': {
    id: '반짝이',
    name: '반짝이',
    emoji: '✨',
    color: '#FFE66D',
    role: '창의적인 영감가',
    description: '새로운 아이디어와 창의적 솔루션을 제안하는 전문가',
    personality: 'creative'
  }
};

export function IWL4ChatInterface({
  sessionId,
  week = 1,
  phase = 1,
  mode = 'guided',
  characterId = '생각이',
  onSessionCreate,
  onSessionUpdate,
  onMessageSend,
  className = ''
}: IWL4ChatInterfaceProps) {
  const { currentLevel } = useTheme();
  const [currentSession, setCurrentSession] = useState<IWL4ChatSession | null>(null);
  const [messages, setMessages] = useState<IWL4ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiService = useRef<AILearningService | null>(null);
  
  const currentCharacter = AI_CHARACTERS[characterId as keyof typeof AI_CHARACTERS] || AI_CHARACTERS['생각이'];

  // AI Learning Service 초기화
  useEffect(() => {
    const context: LearningContext = {
      sessionId: sessionId || '',
      userLevel: currentLevel as UserLevel,
      characterId,
      week,
      phase,
      mode
    };
    
    aiService.current = new AILearningService(context);
  }, [sessionId, currentLevel, characterId, week, phase, mode]);

  // 메시지 자동 스크롤
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // WebSocket 연결 관리
  useEffect(() => {
    const connectionId = 'iwl4-chat';
    
    const connectWebSocket = async () => {
      try {
        await webSocketManager.connect(connectionId, {
          url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws',
          reconnectAttempts: 3,
          heartbeatInterval: 30000
        });
        setWsConnected(true);
      } catch (error) {
        console.error('WebSocket 연결 실패:', error);
        setWsConnected(false);
      }
    };

    // 메시지 수신 처리
    const unsubscribe = webSocketManager.subscribe(connectionId, 'chat_message', (wsMessage) => {
      const aiMessage: IWL4ChatMessage = {
        id: wsMessage.id,
        type: 'ai',
        content: wsMessage.payload.content,
        timestamp: wsMessage.timestamp,
        characterId: wsMessage.payload.characterId,
        sessionId: currentSession?.id,
        metadata: wsMessage.payload.metadata
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    });

    // 연결 상태 모니터링
    const unsubscribeStatus = webSocketManager.onStatusChange(connectionId, (status) => {
      setWsConnected(status === 'connected');
    });

    connectWebSocket();

    return () => {
      unsubscribe();
      unsubscribeStatus();
      webSocketManager.disconnect(connectionId);
    };
  }, [currentSession?.id]);

  // 세션 초기화
  useEffect(() => {
    if (sessionId) {
      // 기존 세션 로드
      loadSession(sessionId);
    } else {
      // 새 세션 생성
      createNewSession();
    }
  }, [sessionId, week, phase, mode, characterId]);

  const loadSession = async (id: string) => {
    setIsLoading(true);
    try {
      // 로컬스토리지 또는 API에서 세션 로드
      const savedSession = localStorage.getItem(`iwl4-session-${id}`);
      if (savedSession) {
        const session: IWL4ChatSession = JSON.parse(savedSession);
        setCurrentSession(session);
        setMessages(session.messages);
      }
    } catch (error) {
      console.error('세션 로드 실패:', error);
      createNewSession();
    } finally {
      setIsLoading(false);
    }
  };

  const createNewSession = async () => {
    const newSession: IWL4ChatSession = {
      id: `iwl4-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: `${week}주차 ${phase}단계 학습`,
      mode,
      week,
      phase,
      level: currentLevel,
      characterId,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: 'active'
    };

    setCurrentSession(newSession);
    setMessages([]);
    
    // 환영 메시지 생성 및 추가
    try {
      const welcomeContent = await generateWelcomeMessage(newSession);
      const welcomeMessage: IWL4ChatMessage = {
        id: `welcome-${Date.now()}`,
        type: 'ai',
        content: welcomeContent,
        timestamp: Date.now(),
        characterId,
        sessionId: newSession.id
      };
      
      setMessages([welcomeMessage]);
      onSessionCreate?.(newSession);
      saveSession(newSession);
    } catch (error) {
      console.error('환영 메시지 생성 실패:', error);
      // 기본 환영 메시지로 폴백
      const fallbackMessage: IWL4ChatMessage = {
        id: `welcome-${Date.now()}`,
        type: 'ai',
        content: `${currentCharacter.emoji} 안녕하세요! 저는 ${currentCharacter.name}입니다.`,
        timestamp: Date.now(),
        characterId,
        sessionId: newSession.id
      };
      
      setMessages([fallbackMessage]);
      onSessionCreate?.(newSession);
      saveSession(newSession);
    }
  };

  const generateWelcomeMessage = async (session: IWL4ChatSession): Promise<string> => {
    if (!aiService.current) {
      return `${currentCharacter.emoji} 안녕하세요! 저는 ${currentCharacter.name}입니다. ${currentCharacter.description}
      
      ${session.week}주차 ${session.phase}단계 ${session.mode === 'guided' ? '가이드' : '자유'} 학습을 시작합니다.
      
      어떤 것부터 시작해볼까요?`;
    }

    try {
      // AI Learning Service를 사용한 개성 있는 환영 메시지 생성
      const response = await aiService.current.generateResponse('', []);
      return response.message;
    } catch (error) {
      console.error('환영 메시지 생성 실패:', error);
      return `${currentCharacter.emoji} 안녕하세요! 저는 ${currentCharacter.name}입니다. ${currentCharacter.description}
      
      ${session.week}주차 ${session.phase}단계 ${session.mode === 'guided' ? '가이드' : '자유'} 학습을 시작합니다.
      
      어떤 것부터 시작해볼까요?`;
    }
  };

  const saveSession = (session: IWL4ChatSession) => {
    try {
      localStorage.setItem(`iwl4-session-${session.id}`, JSON.stringify(session));
    } catch (error) {
      console.error('세션 저장 실패:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !currentSession || isLoading) return;

    const userMessage: IWL4ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'user',
      content: inputValue.trim(),
      timestamp: Date.now(),
      sessionId: currentSession.id
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // WebSocket을 통한 실시간 메시지 전송
      if (wsConnected) {
        webSocketManager.send('iwl4-chat', 'user_message', {
          content: userMessage.content,
          sessionId: currentSession.id,
          characterId,
          week,
          phase,
          mode,
          level: currentLevel
        });
      } else {
        // WebSocket 연결이 없는 경우 AI 서비스 직접 호출
        if (!aiService.current) {
          throw new Error('AI 서비스가 초기화되지 않았습니다.');
        }

        // 현재 메시지들을 ChatMessage 형태로 변환
        const messageHistory: ChatMessage[] = messages.map(msg => ({
          id: msg.id,
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content,
          timestamp: new Date(msg.timestamp),
          characterId: msg.characterId,
          metadata: {
            messageType: 'explanation' as const,
            learningPhase: phase,
            topicTags: [],
            sentimentScore: 0,
            engagementLevel: 0.5
          }
        }));

        const aiResponse = await aiService.current.generateResponse(
          userMessage.content,
          messageHistory
        );

        const aiMessage: IWL4ChatMessage = {
          id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'ai',
          content: aiResponse.message,
          timestamp: Date.now(),
          characterId,
          sessionId: currentSession.id,
          metadata: {
            week,
            phase,
            thinkingLevel: aiResponse.progressUpdate?.currentPhase || phase,
            emotions: [],
            confidence: 0.8
          }
        };

        setMessages(prev => [...prev, aiMessage]);
      }

      // 세션 업데이트
      const updatedSession = {
        ...currentSession,
        messages: [...messages, userMessage],
        updatedAt: Date.now()
      };
      
      setCurrentSession(updatedSession);
      saveSession(updatedSession);
      onMessageSend?.(userMessage);
      onSessionUpdate?.(updatedSession);

    } catch (error) {
      console.error('메시지 전송 실패:', error);
      
      // 에러 메시지 표시
      const errorMessage: IWL4ChatMessage = {
        id: `error-${Date.now()}`,
        type: 'system',
        content: '죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.',
        timestamp: Date.now(),
        sessionId: currentSession.id
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <DesignModeCard className={`iwl4-chat-interface h-full flex flex-col ${className}`}>
      {/* 채팅 헤더 */}
      <div 
        className="flex items-center justify-between p-4 border-b"
        style={{ borderColor: 'var(--iwl-border)' }}
      >
        <div className="flex items-center gap-3">
          <CharacterAvatar
            characterId={characterId}
            size="md"
            isActive={true}
            isTyping={isTyping}
            showStatus={false}
            mood={isLoading ? 'thinking' : 'default'}
          />
          <div>
            <h3 className="font-medium" style={{ color: 'var(--iwl-text)' }}>
              {currentCharacter.name}
            </h3>
            <p className="text-sm" style={{ color: 'var(--iwl-text-muted)' }}>
              {currentCharacter.role}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* 연결 상태 표시 */}
          <div 
            className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-green-400' : 'bg-gray-400'}`}
            title={wsConnected ? '실시간 연결됨' : '오프라인'}
          />
          <span className="text-xs" style={{ color: 'var(--iwl-text-muted)' }}>
            {week}주차 {phase}단계
          </span>
        </div>
      </div>

      {/* 메시지 영역 */}
      <ThemeAwareCardContent useIWLTheme className="flex-1 overflow-hidden p-0">
        <div className="h-full overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start gap-2 max-w-[80%]">
                {message.type === 'ai' && (
                  <ChatCharacterAvatar
                    characterId={characterId}
                    messageType="explanation"
                    isLatest={message.id === messages[messages.length - 1]?.id}
                    size="sm"
                    className="flex-shrink-0"
                  />
                )}
                
                <div
                  className={`message-bubble px-4 py-2 ${
                    message.type === 'user' ? 'user ml-2' : message.type === 'system' ? 'system text-center text-sm opacity-70' : 'ai'
                  } design-mode-transition`}
                  style={{
                    backgroundColor: message.type === 'user' 
                      ? 'var(--iwl-design-primary)' 
                      : message.type === 'system'
                      ? 'var(--iwl-design-surface)'
                      : 'var(--iwl-design-surface-elevated)',
                    color: message.type === 'user' 
                      ? 'white' 
                      : 'var(--iwl-design-text)',
                    border: message.type !== 'user' ? '1px solid var(--iwl-design-border)' : 'none',
                    borderRadius: 'var(--iwl-border-radius)'
                  }}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.metadata && (
                    <div className="mt-2 text-xs opacity-60">
                      {message.metadata.confidence && (
                        <span>신뢰도: {Math.round(message.metadata.confidence * 100)}%</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* 타이핑 인디케이터 */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2">
                <CharacterAvatar
                  characterId={characterId}
                  size="sm"
                  isTyping={true}
                  mood="thinking"
                />
                <div 
                  className="px-4 py-2 rounded-lg border"
                  style={{ 
                    backgroundColor: 'var(--iwl-surface)',
                    borderColor: 'var(--iwl-border)'
                  }}
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ThemeAwareCardContent>

      {/* 입력 영역 */}
      <div 
        className="p-4 border-t"
        style={{ borderColor: 'var(--iwl-border)' }}
      >
        <div className="flex gap-2">
          <DesignModeInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`${currentCharacter.name}와 대화해보세요...`}
            disabled={isLoading}
            className="flex-1"
          />
          <DesignModeButton
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-4"
          >
            {isLoading ? '...' : '전송'}
          </DesignModeButton>
        </div>
        
        {/* 모드 표시 */}
        <div className="mt-2 flex items-center justify-between text-xs" style={{ color: 'var(--iwl-text-muted)' }}>
          <span>{mode === 'guided' ? '🎯 가이드 모드' : '🎨 자유 모드'}</span>
          <span>Enter로 전송, Shift+Enter로 줄바꿈</span>
        </div>
      </div>
    </DesignModeCard>
  );
}