/**
 * IWL 4.0 - Helena & Rio 통합 채팅 인터페이스
 * 기존 Archi AI 시스템과 호환되는 채팅 인터페이스
 */

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Send, Bot, User, Brain, Sparkles, Clock, 
  MessageCircle, Settings, Lightbulb, Target
} from 'lucide-react';

// Integration Types - Compatible with existing IWL system
interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'archi';
  timestamp: string;
  metadata?: {
    brainState?: 'thinking' | 'ready' | 'insights';
    isInsight?: boolean;
    isExercise?: boolean;
    isFeedback?: boolean;
  };
}

interface ArchiResponse {
  content: string;
  brainState: 'thinking' | 'ready' | 'insights';
  isInsight: boolean;
  isExercise: boolean;
  isFeedback: boolean;
}

interface CourseContext {
  courseId?: string;
  phaseId?: string;
  weekId?: string;
}

interface IWL4ChatInterfaceProps {
  userLevel: 'guest' | 'junior' | 'youth' | 'adult' | 'instructor' | 'admin';
  sessionId?: string;
  courseContext?: CourseContext;
  onMessageSend?: (message: string) => void;
  onSessionChange?: (sessionId: string) => void;
  mode?: 'guided' | 'self-directed' | 'discovery' | 'learning';
}

export const IWL4ChatInterface: React.FC<IWL4ChatInterfaceProps> = ({
  userLevel,
  sessionId = 'default-session',
  courseContext,
  onMessageSend,
  onSessionChange,
  mode = 'guided'
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentBrainState, setCurrentBrainState] = useState<'thinking' | 'ready' | 'insights'>('ready');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helena & Rio 디자인 적용을 위한 레벨별 설정
  const getLevelConfig = () => {
    const configs = {
      junior: {
        theme: 'from-pink-50 to-orange-50',
        primary: 'from-pink-400 to-orange-400',
        character: '생각이',
        avatar: '🌱',
        greeting: '안녕! 함께 생각해볼까?',
        style: 'rounded-3xl shadow-lg border-2 border-pink-200'
      },
      youth: {
        theme: 'from-purple-50 to-blue-50',
        primary: 'from-purple-500 to-blue-500',
        character: '아키',
        avatar: '⚡',
        greeting: '준비됐어? 새로운 도전을 시작하자!',
        style: 'rounded-2xl shadow-xl border border-purple-300'
      },
      adult: {
        theme: 'from-blue-50 to-indigo-50',
        primary: 'from-blue-600 to-indigo-600',
        character: '아키',
        avatar: '🧠',
        greeting: '체계적인 사고 훈련을 시작하겠습니다.',
        style: 'rounded-xl shadow-lg border border-blue-200'
      },
      guest: {
        theme: 'from-gray-50 to-slate-50',
        primary: 'from-slate-600 to-gray-600',
        character: '아키',
        avatar: '🤖',
        greeting: 'IdeaWorkLab에 오신 것을 환영합니다!',
        style: 'rounded-xl shadow-md border border-gray-200'
      },
      instructor: {
        theme: 'from-green-50 to-emerald-50',
        primary: 'from-green-600 to-emerald-600',
        character: '아키 (강사모드)',
        avatar: '📚',
        greeting: '강사 모드로 전환되었습니다.',
        style: 'rounded-xl shadow-lg border border-green-200'
      },
      admin: {
        theme: 'from-red-50 to-rose-50',
        primary: 'from-red-600 to-rose-600',
        character: '시스템 AI',
        avatar: '⚙️',
        greeting: '관리자 모드입니다.',
        style: 'rounded-xl shadow-lg border border-red-200'
      }
    };
    return configs[userLevel] || configs.adult;
  };

  const config = getLevelConfig();

  // 메시지 전송 - 기존 API 엔드포인트와 호환
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setCurrentBrainState('thinking');

    // 외부 콜백 호출
    onMessageSend?.(inputMessage);

    try {
      // 기존 API 엔드포인트와 호환되는 호출
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: inputMessage,
          mode,
          courseContext
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const archiResponse: ArchiResponse = await response.json();

      const aiMessage: ChatMessage = {
        id: `archi-${Date.now()}`,
        content: archiResponse.content,
        sender: 'archi',
        timestamp: new Date().toISOString(),
        metadata: {
          brainState: archiResponse.brainState,
          isInsight: archiResponse.isInsight,
          isExercise: archiResponse.isExercise,
          isFeedback: archiResponse.isFeedback
        }
      };

      setMessages(prev => [...prev, aiMessage]);
      setCurrentBrainState(archiResponse.brainState);

    } catch (error) {
      console.error('Chat error:', error);
      
      // 에러 처리 - Mock 응답
      const errorMessage: ChatMessage = {
        id: `archi-error-${Date.now()}`,
        content: '죄송합니다. 일시적인 문제가 발생했습니다. 다시 시도해 주세요.',
        sender: 'archi',
        timestamp: new Date().toISOString(),
        metadata: { brainState: 'ready' }
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setCurrentBrainState('ready');
    } finally {
      setIsTyping(false);
    }
  };

  // 메시지 타입별 스타일링
  const getMessageStyle = (message: ChatMessage) => {
    if (message.sender === 'user') {
      return `bg-gradient-to-r ${config.primary} text-white ml-auto`;
    }

    const { metadata } = message;
    if (metadata?.isInsight) {
      return 'bg-yellow-50 border border-yellow-200 text-yellow-900';
    }
    if (metadata?.isExercise) {
      return 'bg-green-50 border border-green-200 text-green-900';
    }
    if (metadata?.isFeedback) {
      return 'bg-blue-50 border border-blue-200 text-blue-900';
    }
    
    return 'bg-white border border-gray-200 text-gray-900';
  };

  // 스크롤 자동 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 초기 인사말 설정
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: config.greeting,
        sender: 'archi',
        timestamp: new Date().toISOString(),
        metadata: { brainState: 'ready' }
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  return (
    <Card className={`w-full max-w-4xl mx-auto ${config.style} bg-gradient-to-br ${config.theme}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${config.primary} rounded-full flex items-center justify-center text-white text-xl`}>
              {config.avatar}
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">
                {config.character}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  currentBrainState === 'thinking' ? 'bg-orange-400 animate-pulse' :
                  currentBrainState === 'insights' ? 'bg-yellow-400' :
                  'bg-green-400'
                }`}></div>
                {currentBrainState === 'thinking' ? '생각중...' :
                 currentBrainState === 'insights' ? '통찰 모드' :
                 '대화 준비'}
              </div>
            </div>
          </CardTitle>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {mode} 모드
            </Badge>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 메시지 영역 */}
        <div className="h-96 overflow-y-auto space-y-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-xl ${getMessageStyle(message)}`}>
                {message.sender === 'archi' && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{config.avatar}</span>
                    <span className="text-xs font-medium opacity-70">
                      {config.character}
                    </span>
                    {message.metadata?.isInsight && (
                      <Badge className="bg-yellow-200 text-yellow-800 border-none text-xs">
                        <Lightbulb className="w-3 h-3 mr-1" />
                        인사이트
                      </Badge>
                    )}
                    {message.metadata?.isExercise && (
                      <Badge className="bg-green-200 text-green-800 border-none text-xs">
                        <Target className="w-3 h-3 mr-1" />
                        실습
                      </Badge>
                    )}
                  </div>
                )}
                <div className="leading-relaxed">{message.content}</div>
                <div className="text-xs opacity-50 mt-2">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {/* 타이핑 인디케이터 */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-3 rounded-xl max-w-[80%]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{config.avatar}</span>
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

        {/* 입력 영역 */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="메시지를 입력하세요..."
            className={`flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              userLevel === 'junior' ? 'focus:ring-pink-400 border-pink-200' :
              userLevel === 'youth' ? 'focus:ring-purple-400 border-purple-200' :
              'focus:ring-blue-400 border-blue-200'
            }`}
            disabled={isTyping}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className={`bg-gradient-to-r ${config.primary} hover:opacity-90 text-white px-6`}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* 빠른 액션 버튼들 */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputMessage('오늘의 학습 목표를 알려주세요')}
            className="text-xs"
          >
            💡 학습 목표
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputMessage('피드백을 받고 싶어요')}
            className="text-xs"
          >
            📝 피드백 요청
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputMessage('다음 단계는 무엇인가요?')}
            className="text-xs"
          >
            🚀 다음 단계
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IWL4ChatInterface;