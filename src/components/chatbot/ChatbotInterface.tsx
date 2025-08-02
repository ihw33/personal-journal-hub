/**
 * ===================================================================
 * IdeaWorkLab v3.3 Chatbot Interface Component
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * AI 파트너 '아키(Archi)' 메인 인터페이스 컴포넌트
 * ===================================================================
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChatbotInterfaceProps, 
  ChatMessage, 
  LearningSession, 
  SessionMode 
} from './types';
import { 
  ChatbotAPI, 
  validateMessage, 
  validateSessionTitle, 
  sanitizeInput, 
  generateSessionTitle,
  LocalStorageHelper,
  debounce,
  handleApiError
} from './helpers';
import { 
  DEFAULT_MESSAGES, 
  LIMITS, 
  UI_SETTINGS, 
  ARCHI_CONFIG 
} from './constants';
import ConversationHistory from './ConversationHistory';
import ModeToggle from './ModeToggle';
import TypingIndicator from './TypingIndicator';

const ChatbotInterface: React.FC<ChatbotInterfaceProps> = ({
  sessionId: initialSessionId,
  mode: initialMode = 'guided',
  onSessionCreate,
  onSessionEnd,
  className = '',
}) => {
  // 상태 관리
  const [currentSession, setCurrentSession] = useState<LearningSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMode, setCurrentMode] = useState<SessionMode>(initialMode);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState('');

  // 세션 초기화
  useEffect(() => {
    if (initialSessionId) {
      loadSession(initialSessionId);
    } else {
      // 마지막 세션 복원 시도
      const lastSessionId = LocalStorageHelper.getCurrentSession();
      if (lastSessionId) {
        loadSession(lastSessionId);
      }
    }
  }, [initialSessionId]);

  // 초안 메시지 복원
  useEffect(() => {
    const draftMessage = LocalStorageHelper.getDraftMessage();
    if (draftMessage) {
      setInputMessage(draftMessage);
    }
  }, []);

  // 초안 메시지 저장 (디바운스)
  const saveDraftMessage = useCallback(
    debounce((message: string) => {
      LocalStorageHelper.saveDraftMessage(message);
    }, 1000),
    []
  );

  // 세션 로드
  const loadSession = async (sessionId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const historyResponse = await ChatbotAPI.getChatHistory(sessionId);
      
      if (historyResponse.success && historyResponse.data) {
        setCurrentSession(historyResponse.data.session);
        setMessages(historyResponse.data.messages);
        setCurrentMode(historyResponse.data.session.mode);
        LocalStorageHelper.saveCurrentSession(sessionId);
      } else {
        setError(historyResponse.error || '세션을 불러올 수 없습니다.');
      }
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  // 새 세션 생성
  const createNewSession = async (title?: string, initialMessage?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const sessionTitle = title || (initialMessage ? generateSessionTitle(initialMessage) : '새로운 사고 수련');
      
      const sessionResponse = await ChatbotAPI.createSession({
        title: sessionTitle,
        mode: currentMode,
        topics: [],
        initialMessage,
      });

      if (sessionResponse.success && sessionResponse.data) {
        const newSession = sessionResponse.data.session;
        setCurrentSession(newSession);
        
        // 환영 메시지 추가
        const welcomeMessages: ChatMessage[] = [];
        if (sessionResponse.data.welcomeMessage) {
          welcomeMessages.push(sessionResponse.data.welcomeMessage);
        }
        if (sessionResponse.data.initialUserMessage) {
          welcomeMessages.push(sessionResponse.data.initialUserMessage);
        }
        
        setMessages(welcomeMessages);
        LocalStorageHelper.saveCurrentSession(newSession.id);
        LocalStorageHelper.clearDraftMessage();
        
        if (onSessionCreate) {
          onSessionCreate(newSession);
        }
      } else {
        setError(sessionResponse.error || '세션을 생성할 수 없습니다.');
      }
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setIsLoading(false);
      setShowNewSessionModal(false);
    }
  };

  // 메시지 전송
  const sendMessage = async () => {
    const validation = validateMessage(inputMessage);
    if (!validation.valid) {
      setError(validation.error!);
      return;
    }

    if (!currentSession) {
      // 세션이 없으면 새 세션을 생성하면서 메시지 전송
      await createNewSession(undefined, inputMessage);
      setInputMessage('');
      return;
    }

    try {
      setIsLoading(true);
      setIsTyping(true);
      setError(null);

      const sanitizedMessage = sanitizeInput(inputMessage);
      
      const response = await ChatbotAPI.sendMessage({
        sessionId: currentSession.id,
        message: sanitizedMessage,
        mode: currentMode,
      });

      if (response.success && response.data) {
        // 새 메시지들 추가
        setMessages(prev => [
          ...prev,
          response.data!.userMessage,
          response.data!.archiMessage,
        ]);

        // 세션 정보 업데이트
        setCurrentSession(prev => prev ? {
          ...prev,
          totalMessages: response.data!.sessionUpdate.totalMessages,
          insights: response.data!.sessionUpdate.insights,
          progress: response.data!.sessionUpdate.progress,
        } : null);

        setInputMessage('');
        LocalStorageHelper.clearDraftMessage();
      } else {
        setError(response.error || '메시지를 전송할 수 없습니다.');
      }
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsTyping(false), UI_SETTINGS.TYPING_ANIMATION_DURATION);
    }
  };

  // 키보드 이벤트 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 모드 변경
  const handleModeChange = (newMode: SessionMode) => {
    setCurrentMode(newMode);
    
    // 현재 세션이 있으면 세션의 모드도 업데이트
    if (currentSession) {
      ChatbotAPI.updateSession(currentSession.id, {});
    }
  };

  // 메시지 평가
  const handleMessageRate = async (messageId: string, rating: number) => {
    try {
      await ChatbotAPI.rateMessage(messageId, rating);
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, userRating: rating } : msg
      ));
    } catch (error) {
      console.error('Rating failed:', error);
    }
  };

  // 메시지 도움됨 표시
  const handleMessageHelpful = async (messageId: string, helpful: boolean) => {
    try {
      await ChatbotAPI.rateMessage(messageId, undefined, helpful);
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, userFoundHelpful: helpful } : msg
      ));
    } catch (error) {
      console.error('Helpful marking failed:', error);
    }
  };

  // 세션 종료
  const handleEndSession = async () => {
    if (currentSession) {
      try {
        await ChatbotAPI.updateSession(currentSession.id, { 
          status: 'completed',
          emotionalEnd: 'enlightened'
        });
        
        LocalStorageHelper.clearCurrentSession();
        setCurrentSession(null);
        setMessages([]);
        
        if (onSessionEnd) {
          onSessionEnd(currentSession.id);
        }
      } catch (error) {
        setError(handleApiError(error));
      }
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white rounded-lg shadow-lg ${className}`}>
      {/* 헤더 */}
      <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">
              🤖
            </div>
            <div>
              <h2 className="text-lg font-semibold">{ARCHI_CONFIG.NAME}</h2>
              <p className="text-sm opacity-90">{ARCHI_CONFIG.FULL_NAME}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {currentSession && (
              <div className="text-right">
                <div className="text-sm font-medium">{currentSession.title}</div>
                <div className="text-xs opacity-75">
                  {currentSession.totalMessages}개 메시지 • {currentSession.insights}개 통찰
                </div>
              </div>
            )}
            
            <button
              onClick={() => setShowNewSessionModal(true)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              title="새 세션 시작"
            >
              ✨
            </button>
            
            {currentSession && (
              <button
                onClick={handleEndSession}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                title="세션 종료"
              >
                🏁
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 모드 선택 */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-gray-50">
        <ModeToggle
          mode={currentMode}
          onModeChange={handleModeChange}
          disabled={isLoading}
        />
      </div>

      {/* 대화 영역 */}
      <div className="flex-1 min-h-0">
        <ConversationHistory
          sessionId={currentSession?.id || ''}
          messages={messages}
          loading={isLoading}
          onMessageRate={handleMessageRate}
          onMessageHelpful={handleMessageHelpful}
        />
      </div>

      {/* 타이핑 인디케이터 */}
      {isTyping && (
        <div className="flex-shrink-0 px-4 py-2">
          <TypingIndicator 
            isVisible={isTyping} 
            brainState="thinking" 
          />
        </div>
      )}

      {/* 오류 메시지 */}
      {error && (
        <div className="flex-shrink-0 px-4 py-2">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <span className="text-red-600">⚠️</span>
              <div className="flex-1">
                <p className="text-sm text-red-800">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-xs text-red-600 hover:text-red-800 mt-1"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 입력 영역 */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <div className="flex space-x-3">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
                saveDraftMessage(e.target.value);
              }}
              onKeyPress={handleKeyPress}
              placeholder={DEFAULT_MESSAGES.PLACEHOLDER_MESSAGE}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              maxLength={LIMITS.MAX_MESSAGE_LENGTH}
              disabled={isLoading}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {inputMessage.length}/{LIMITS.MAX_MESSAGE_LENGTH}
              </span>
              <div className="flex space-x-2">
                <span className="text-xs text-gray-500">
                  Shift+Enter: 줄바꿈 • Enter: 전송
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <span>전송</span>
            <span>➤</span>
          </button>
        </div>
      </div>

      {/* 새 세션 모달 */}
      {showNewSessionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">새로운 사고 수련 시작</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  세션 제목
                </label>
                <input
                  type="text"
                  value={newSessionTitle}
                  onChange={(e) => setNewSessionTitle(e.target.value)}
                  placeholder="예: 창의적 문제해결 탐구"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={LIMITS.MAX_SESSION_TITLE_LENGTH}
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowNewSessionModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => createNewSession(newSessionTitle || undefined)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? '생성 중...' : '시작하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotInterface;