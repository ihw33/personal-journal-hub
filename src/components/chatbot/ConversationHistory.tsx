/**
 * ===================================================================
 * IdeaWorkLab v3.3 Conversation History Component
 * "사고와 재능의 설계자 (The Architect of Thought and Talent)"
 * 
 * AI 파트너 '아키(Archi)'와의 대화 기록 표시 컴포넌트
 * ===================================================================
 */

'use client';

import React, { useRef, useEffect } from 'react';
import { ConversationHistoryProps, ChatMessage } from './types';
import { 
  formatTime, 
  getMessageTypeColor, 
  getMessageTypeIcon, 
  estimateReadingTime,
  scrollToBottom 
} from './helpers';
import { ARCHI_CONFIG, COLORS, ICONS } from './constants';
import { TypingText } from './TypingIndicator';

const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  sessionId,
  messages,
  loading = false,
  onMessageRate,
  onMessageHelpful,
  className = '',
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 새 메시지 추가 시 자동 스크롤
  useEffect(() => {
    if (messagesEndRef.current && containerRef.current) {
      scrollToBottom(containerRef.current);
    }
  }, [messages]);

  const renderMessage = (message: ChatMessage, index: number) => {
    const isUser = message.sender === 'user';
    const isLastMessage = index === messages.length - 1;

    return (
      <div
        key={message.id}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className={`max-w-3xl w-full ${isUser ? 'pl-12' : 'pr-12'}`}>
          {/* 메시지 헤더 */}
          <div className={`flex items-center space-x-2 mb-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                🤖
              </div>
            )}
            
            <span className="text-sm font-medium text-gray-700">
              {isUser ? '사용자' : ARCHI_CONFIG.NAME}
            </span>

            {/* 메시지 타입 표시 */}
            {!isUser && (message.isInsight || message.isExercise || message.isFeedback) && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                message.isInsight 
                  ? 'bg-yellow-100 text-yellow-800'
                  : message.isExercise
                  ? 'bg-green-100 text-green-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {getMessageTypeIcon(message)} {
                  message.isInsight ? '통찰' 
                  : message.isExercise ? '실습' 
                  : '피드백'
                }
              </span>
            )}

            <span className="text-xs text-gray-500">
              {formatTime(message.timestamp)}
            </span>

            {!isUser && message.processingTime && (
              <span className="text-xs text-gray-400">
                ({message.processingTime}ms)
              </span>
            )}
          </div>

          {/* 메시지 내용 */}
          <div className={`relative ${getMessageTypeColor(message)} rounded-lg p-4 shadow-sm`}>
            {/* 말풍선 꼬리 */}
            <div className={`absolute top-3 ${
              isUser 
                ? 'right-[-8px] border-l-8 border-l-blue-100 border-r-transparent' 
                : 'left-[-8px] border-r-8 border-r-gray-100 border-l-transparent'
            } border-t-4 border-b-4 border-t-transparent border-b-transparent`} />

            {/* 메시지 텍스트 */}
            <div className="space-y-2">
              {isLastMessage && !isUser && loading ? (
                <TypingText 
                  text={message.content} 
                  speed={30}
                />
              ) : (
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              )}

              {/* 토픽 태그 */}
              {!isUser && message.topics && message.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {message.topics.map((topic, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              )}

              {/* 읽기 시간 표시 */}
              {!isUser && (
                <div className="text-xs text-gray-500 mt-2">
                  예상 읽기 시간: {estimateReadingTime(message.content)}분
                </div>
              )}
            </div>

            {/* 브레인 상태 표시 */}
            {!isUser && message.brainState && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>아키 상태:</span>
                  <span className={`px-2 py-1 rounded-full ${
                    message.brainState === 'thinking' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : message.brainState === 'insights'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {message.brainState === 'thinking' ? '🤔 사고 중' 
                     : message.brainState === 'insights' ? '💡 통찰 모드'
                     : '😊 준비됨'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 사용자 평가 버튼 (아키 메시지만) */}
          {!isUser && onMessageRate && onMessageHelpful && (
            <div className="flex items-center justify-end space-x-2 mt-2">
              {/* 별점 평가 */}
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => onMessageRate(message.id, rating)}
                    className={`text-sm transition-colors ${
                      message.userRating && message.userRating >= rating
                        ? 'text-yellow-500'
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>

              {/* 도움됨 버튼 */}
              <button
                onClick={() => onMessageHelpful(message.id, !message.userFoundHelpful)}
                className={`text-xs px-2 py-1 rounded-full transition-colors ${
                  message.userFoundHelpful
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                }`}
              >
                👍 {message.userFoundHelpful ? '도움됨' : '도움되나요?'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* 대화 영역 */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scroll-smooth"
        style={{ maxHeight: '70vh' }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
              🤖
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                안녕하세요! 저는 {ARCHI_CONFIG.NAME}입니다
              </h3>
              <p className="text-gray-500 max-w-md">
                {ARCHI_CONFIG.FULL_NAME}로서 여러분의 사고력 향상을 도와드리겠습니다. 
                궁금한 것이나 함께 탐구하고 싶은 주제가 있으시면 언제든 말씀해주세요!
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => renderMessage(message, index))}
            
            {/* 로딩 상태 */}
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="max-w-3xl w-full pr-12">
                  <div className="bg-gray-100 rounded-lg p-4 animate-pulse">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* 스크롤 하단 버튼 */}
      <div className="flex justify-center py-2">
        <button
          onClick={() => containerRef.current && scrollToBottom(containerRef.current)}
          className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          ↓ 최신 메시지로 이동
        </button>
      </div>
    </div>
  );
};

// 메시지 필터 컴포넌트
export const MessageFilter: React.FC<{
  onFilterChange: (filter: string) => void;
  currentFilter: string;
  className?: string;
}> = ({ onFilterChange, currentFilter, className = '' }) => {
  const filters = [
    { key: 'all', label: '전체', icon: '💬' },
    { key: 'insights', label: '통찰', icon: '💡' },
    { key: 'exercises', label: '실습', icon: '📝' },
    { key: 'feedback', label: '피드백', icon: '📊' },
  ];

  return (
    <div className={`flex space-x-2 ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
            currentFilter === filter.key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span>{filter.icon}</span>
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
};

// 대화 통계 컴포넌트
export const ConversationStats: React.FC<{
  messages: ChatMessage[];
  className?: string;
}> = ({ messages, className = '' }) => {
  const stats = messages.reduce((acc, message) => {
    if (message.sender === 'user') {
      acc.userMessages++;
    } else {
      acc.archiMessages++;
      if (message.isInsight) acc.insights++;
      if (message.isExercise) acc.exercises++;
      if (message.isFeedback) acc.feedback++;
    }
    return acc;
  }, {
    userMessages: 0,
    archiMessages: 0,
    insights: 0,
    exercises: 0,
    feedback: 0,
  });

  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <h4 className="text-sm font-medium text-gray-700 mb-3">대화 통계</h4>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">{stats.userMessages}</div>
          <div className="text-xs text-gray-500">사용자 메시지</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-purple-600">{stats.archiMessages}</div>
          <div className="text-xs text-gray-500">아키 응답</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-yellow-600">{stats.insights}</div>
          <div className="text-xs text-gray-500">통찰</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">{stats.exercises}</div>
          <div className="text-xs text-gray-500">실습</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-orange-600">{stats.feedback}</div>
          <div className="text-xs text-gray-500">피드백</div>
        </div>
      </div>
    </div>
  );
};

export default ConversationHistory;