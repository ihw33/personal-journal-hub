import { useState, useEffect, useCallback } from 'react';
import { AILearningService } from '@/lib/ai/ai-learning-service';
import type { 
  LearningSession, 
  ExtendedUser, 
  AIMessage, 
  IWL4State, 
  IWL4Event,
  IWL4EventHandler,
  UserLevel,
  ThemeConfig 
} from '@/types/iwl4-integration';

// 기본 테마 설정
const DEFAULT_THEMES: Record<UserLevel, ThemeConfig> = {
  junior: {
    level: 'junior',
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFE66D',
      background: '#FFF8F0',
      surface: '#FFFFFF',
      text: '#2D3748',
      textMuted: '#718096',
      border: '#E2E8F0',
      success: '#48BB78',
      warning: '#ED8936',
      error: '#E53E3E'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'JetBrains Mono'
    },
    spacing: {
      base: 4,
      scale: 1.2
    },
    animations: {
      duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
  },
  youth: {
    level: 'youth',
    colors: {
      primary: '#667EEA',
      secondary: '#764BA2',
      accent: '#F093FB',
      background: '#F7FAFC',
      surface: '#FFFFFF',
      text: '#2D3748',
      textMuted: '#718096',
      border: '#E2E8F0',
      success: '#48BB78',
      warning: '#ED8936',
      error: '#E53E3E'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'JetBrains Mono'
    },
    spacing: {
      base: 4,
      scale: 1.25
    },
    animations: {
      duration: {
        fast: '200ms',
        normal: '350ms',
        slow: '600ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
  },
  adult: {
    level: 'adult',
    colors: {
      primary: '#2B6CB0',
      secondary: '#2D3748',
      accent: '#ED8936',
      background: '#FFFFFF',
      surface: '#F7FAFC',
      text: '#1A202C',
      textMuted: '#4A5568',
      border: '#CBD5E0',
      success: '#38A169',
      warning: '#D69E2E',
      error: '#C53030'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'JetBrains Mono'
    },
    spacing: {
      base: 4,
      scale: 1.3
    },
    animations: {
      duration: {
        fast: '250ms',
        normal: '400ms',
        slow: '700ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
  },
  instructor: {
    level: 'instructor',
    colors: {
      primary: '#553C9A',
      secondary: '#1A365D',
      accent: '#F6AD55',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#1A202C',
      textMuted: '#4A5568',
      border: '#CBD5E0',
      success: '#38A169',
      warning: '#D69E2E',
      error: '#C53030'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'JetBrains Mono'
    },
    spacing: {
      base: 4,
      scale: 1.4
    },
    animations: {
      duration: {
        fast: '300ms',
        normal: '500ms',
        slow: '800ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
  },
  admin: {
    level: 'admin',
    colors: {
      primary: '#1A202C',
      secondary: '#2D3748',
      accent: '#F56565',
      background: '#F7FAFC',
      surface: '#FFFFFF',
      text: '#1A202C',
      textMuted: '#4A5568',
      border: '#CBD5E0',
      success: '#38A169',
      warning: '#D69E2E',
      error: '#C53030'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'JetBrains Mono'
    },
    spacing: {
      base: 4,
      scale: 1.5
    },
    animations: {
      duration: {
        fast: '350ms',
        normal: '600ms',
        slow: '900ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
  }
};

interface UseIWL4IntegrationProps {
  userId: string;
  userLevel?: UserLevel;
  initialTheme?: UserLevel;
  debug?: boolean;
}

export function useIWL4Integration({
  userId,
  userLevel = 'adult',
  initialTheme,
  debug = false
}: UseIWL4IntegrationProps) {
  // 상태 관리
  const [state, setState] = useState<IWL4State>({
    isInitialized: false,
    currentUser: null,
    currentSession: null,
    currentTheme: DEFAULT_THEMES[initialTheme || userLevel],
    config: {
      ai: {
        provider: 'local',
        model: 'gpt-4',
        temperature: 0.7,
        max_tokens: 1000,
        timeout: 30000
      },
      characters: [],
      themes: DEFAULT_THEMES,
      features: {
        helena_rio_mode: true,
        level_based_theming: true,
        character_switching: true,
        progress_tracking: true,
        achievement_system: true,
        social_features: false
      },
      security: {
        rate_limit: {
          requests_per_minute: 60,
          requests_per_hour: 1000
        },
        content_filtering: false,
        session_timeout: 30 * 60 * 1000 // 30분
      }
    },
    eventHandlers: {}
  });

  // AI 서비스 인스턴스
  const aiService = AILearningService.getInstance();

  // 이벤트 발생 함수
  const emitEvent = useCallback((event: IWL4Event) => {
    if (debug) {
      console.log('[IWL4] Event emitted:', event);
    }

    const handlers = state.eventHandlers[event.type] || [];
    handlers.forEach(handler => {
      try {
        handler(event);
      } catch (error) {
        console.error('[IWL4] Event handler error:', error);
      }
    });
  }, [state.eventHandlers, debug]);

  // 이벤트 핸들러 등록
  const addEventListener = useCallback((eventType: string, handler: IWL4EventHandler) => {
    setState(prev => ({
      ...prev,
      eventHandlers: {
        ...prev.eventHandlers,
        [eventType]: [...(prev.eventHandlers[eventType] || []), handler]
      }
    }));
  }, []);

  // 이벤트 핸들러 제거
  const removeEventListener = useCallback((eventType: string, handler: IWL4EventHandler) => {
    setState(prev => ({
      ...prev,
      eventHandlers: {
        ...prev.eventHandlers,
        [eventType]: (prev.eventHandlers[eventType] || []).filter(h => h !== handler)
      }
    }));
  }, []);

  // 테마 변경
  const switchTheme = useCallback((level: UserLevel) => {
    setState(prev => ({
      ...prev,
      currentTheme: DEFAULT_THEMES[level]
    }));
    
    if (debug) {
      console.log('[IWL4] Theme switched to:', level);
    }
  }, [debug]);

  // 세션 시작
  const startSession = useCallback(async (
    courseId: string,
    week: number,
    phase: number,
    mode: 'guided' | 'self-directed' = 'guided',
    character: 'helena' | 'rio' | 'archi' = 'archi'
  ): Promise<LearningSession | null> => {
    try {
      if (debug) {
        console.log('[IWL4] Starting session:', { courseId, week, phase, mode, character });
      }

      // AI 서비스를 통해 세션 생성
      const aiSession = await aiService.createSession(userId, week, phase, mode);
      
      // IWL4 세션 객체 생성
      const session: LearningSession = {
        id: aiSession.id,
        userId: aiSession.userId,
        courseId,
        week: aiSession.week,
        phase: aiSession.phase,
        mode: aiSession.mode,
        character,
        messages: aiSession.messages.map(msg => ({
          id: `${msg.timestamp.getTime()}-${Math.random()}`,
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp,
          metadata: {
            ...msg.metadata,
            character
          }
        })),
        progress: {
          currentStep: 1,
          totalSteps: 10,
          completedTasks: [],
          learningProgress: aiSession.context.learningProgress
        },
        context: {
          userLearningStyle: aiSession.context.userLearningStyle,
          currentFocus: aiSession.context.currentFocus,
          previousSessions: [],
          insights: []
        },
        createdAt: aiSession.createdAt,
        updatedAt: aiSession.updatedAt
      };

      setState(prev => ({
        ...prev,
        currentSession: session
      }));

      // 이벤트 발생
      emitEvent({
        type: 'session_started',
        payload: { sessionId: session.id, userId }
      });

      return session;
    } catch (error) {
      console.error('[IWL4] Failed to start session:', error);
      
      emitEvent({
        type: 'error_occurred',
        payload: { error: 'Failed to start session', context: { courseId, week, phase, mode } }
      });

      return null;
    }
  }, [userId, aiService, debug, emitEvent]);

  // 메시지 전송
  const sendMessage = useCallback(async (content: string): Promise<AIMessage | null> => {
    if (!state.currentSession) {
      console.error('[IWL4] No active session');
      return null;
    }

    try {
      if (debug) {
        console.log('[IWL4] Sending message:', content);
      }

      // 사용자 메시지 생성
      const userMessage: AIMessage = {
        id: `user-${Date.now()}-${Math.random()}`,
        role: 'user',
        content,
        timestamp: new Date(),
        metadata: {
          week: state.currentSession.week,
          phase: state.currentSession.phase,
          mode: state.currentSession.mode,
          character: state.currentSession.character
        }
      };

      // 이벤트 발생
      emitEvent({
        type: 'message_sent',
        payload: { sessionId: state.currentSession.id, messageId: userMessage.id, content }
      });

      // AI 서비스를 통해 응답 생성
      const { aiResponse, updatedSession } = await aiService.processMessage(
        state.currentSession.id,
        content
      );

      // AI 메시지 생성
      const aiMessage: AIMessage = {
        id: `ai-${Date.now()}-${Math.random()}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        metadata: {
          week: state.currentSession.week,
          phase: state.currentSession.phase,
          mode: state.currentSession.mode,
          character: state.currentSession.character,
          messageType: 'guidance'
        }
      };

      // 세션 업데이트
      const updatedIWLSession: LearningSession = {
        ...state.currentSession,
        messages: [...state.currentSession.messages, userMessage, aiMessage],
        progress: {
          ...state.currentSession.progress,
          learningProgress: updatedSession.context.learningProgress
        },
        updatedAt: new Date()
      };

      setState(prev => ({
        ...prev,
        currentSession: updatedIWLSession
      }));

      // 이벤트 발생
      emitEvent({
        type: 'message_received',
        payload: { 
          sessionId: state.currentSession.id, 
          messageId: aiMessage.id, 
          content: aiResponse, 
          character: state.currentSession.character 
        }
      });

      return aiMessage;
    } catch (error) {
      console.error('[IWL4] Failed to send message:', error);
      
      emitEvent({
        type: 'error_occurred',
        payload: { error: 'Failed to send message', context: { content } }
      });

      return null;
    }
  }, [state.currentSession, aiService, debug, emitEvent]);

  // 세션 완료
  const completeSession = useCallback(() => {
    if (!state.currentSession) return;

    const duration = Date.now() - state.currentSession.createdAt.getTime();
    
    setState(prev => ({
      ...prev,
      currentSession: prev.currentSession ? {
        ...prev.currentSession,
        completedAt: new Date()
      } : null
    }));

    emitEvent({
      type: 'session_completed',
      payload: { 
        sessionId: state.currentSession.id, 
        duration, 
        progress: state.currentSession.progress.learningProgress 
      }
    });

    if (debug) {
      console.log('[IWL4] Session completed:', state.currentSession.id);
    }
  }, [state.currentSession, debug, emitEvent]);

  // 초기화
  useEffect(() => {
    if (!state.isInitialized) {
      setState(prev => ({
        ...prev,
        isInitialized: true
      }));

      if (debug) {
        console.log('[IWL4] Integration initialized for user:', userId);
      }
    }
  }, [state.isInitialized, userId, debug]);

  return {
    // 상태
    isInitialized: state.isInitialized,
    currentUser: state.currentUser,
    currentSession: state.currentSession,
    currentTheme: state.currentTheme,
    config: state.config,

    // 메서드
    startSession,
    sendMessage,
    completeSession,
    switchTheme,
    addEventListener,
    removeEventListener,

    // 유틸리티
    emitEvent,
    debug
  };
}