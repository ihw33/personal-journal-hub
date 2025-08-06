'use client';

import { useState, useEffect } from 'react';
import { Send, ChevronRight, ChevronLeft, Sparkles, AlertCircle, CheckCircle, MessageSquare, BookOpen } from 'lucide-react';
import { useAuth } from '@/lib/supabase/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  character?: 'aki' | 'mirumi' | 'sparkle';
}

const courseData = {
  'course-1': {
    title: '초등 3학년 ~ 중등 1학년',
    currentSession: 7,
    totalSessions: 10,
    sessionTitle: '실행 관리',
    problem: '생각이가 방 정리를 계획했는데 막상 시작하니 어디서부터 해야 할지 모르겠어요!',
    objective: '계획을 실제로 실행하는 방법과 진행 상황을 관리하는 기술을 학습합니다.'
  }
};

export default function LearnCoursePage({ params }: { params: { courseId: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const course = courseData[params.courseId as keyof typeof courseData] || courseData['course-1'];

  useEffect(() => {
    // 초기 메시지 설정
    setMessages([
      {
        id: '1',
        role: 'system',
        content: course.problem,
        timestamp: new Date(),
        character: 'aki'
      },
      {
        id: '2',
        role: 'assistant',
        content: '안녕하세요! 저는 AI 멘토 아키예요. 오늘은 실행 관리에 대해 배워볼 거예요. 생각이가 방 정리를 어떻게 시작하면 좋을까요? 🤔',
        timestamp: new Date(),
        character: 'aki'
      }
    ]);
  }, [course.problem]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-architect-gray-100">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-architect-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">로그인이 필요합니다</h2>
          <p className="text-architect-gray-600 mb-6">수업을 수강하려면 로그인이 필요합니다</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-6 py-3 bg-architect-primary text-white rounded-lg font-medium hover:bg-architect-secondary transition-colors"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        {
          content: '좋은 생각이에요! 큰 작업을 작은 단위로 나누는 것은 실행 관리의 핵심이에요. 그럼 각 구역별로 어떤 순서로 정리하면 좋을까요?',
          character: 'aki' as const
        },
        {
          content: '잘하고 있어요! 이렇게 체계적으로 접근하면 훨씬 쉽게 목표를 달성할 수 있어요. ✨',
          character: 'sparkle' as const
        }
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse.content,
        timestamp: new Date(),
        character: randomResponse.character
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);

      // Progress step
      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-architect-gray-100">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-architect-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <Link
                href="/learn"
                className="p-2 hover:bg-architect-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-bold">{course.title}</h1>
                <p className="text-sm text-architect-gray-600">
                  세션 {course.currentSession}/{course.totalSessions}: {course.sessionTitle}
                </p>
              </div>
            </div>
            <div className="text-sm text-architect-gray-600">
              {currentStep}/5 단계
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-architect-gray-200 rounded-full h-1">
            <div
              className="bg-architect-primary h-1 rounded-full transition-all"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Problem Introduction */}
        <div className="bg-gradient-to-r from-architect-primary/10 to-architect-secondary/10 p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-bold mb-2">오늘의 수련</h2>
          <p className="text-architect-gray-700">{course.problem}</p>
          <div className="mt-4 p-4 bg-white rounded-lg">
            <p className="text-sm font-medium text-architect-primary mb-2">학습 목표</p>
            <p className="text-sm text-architect-gray-700">{course.objective}</p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="p-6 border-b border-architect-gray-200">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-architect-primary" />
              AI 멘토와의 대화
            </h3>
          </div>
          
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                  {message.role !== 'user' && message.character && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.character === 'aki' ? 'bg-architect-primary' :
                        message.character === 'mirumi' ? 'bg-architect-error' :
                        'bg-architect-accent'
                      } text-white text-sm font-bold`}>
                        {message.character === 'aki' ? 'A' :
                         message.character === 'mirumi' ? 'M' : 'S'}
                      </div>
                      <span className="text-sm text-architect-gray-600">
                        {message.character === 'aki' ? '아키' :
                         message.character === 'mirumi' ? '미루미' : '반짝이'}
                      </span>
                    </div>
                  )}
                  <div className={`p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-architect-primary text-white'
                      : message.role === 'system'
                      ? 'bg-architect-gray-100 text-architect-gray-700 italic'
                      : 'bg-architect-gray-100 text-architect-gray-900'
                  }`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-architect-gray-100 p-4 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-architect-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-architect-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-architect-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-architect-gray-200">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="답변을 입력하세요..."
                className="flex-1 px-4 py-3 border border-architect-gray-300 rounded-lg focus:ring-2 focus:ring-architect-primary focus:border-architect-primary"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-architect-primary text-white rounded-lg font-medium hover:bg-architect-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                전송
              </button>
            </form>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">학습 단계</h3>
          <div className="space-y-3">
            {[
              '문제 상황 이해하기',
              '핵심 원리 학습하기',
              'AI와 함께 실습하기',
              '결과물 확인하기',
              '학습 내용 정리하기'
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index + 1 <= currentStep
                    ? 'bg-architect-primary text-white'
                    : 'bg-architect-gray-200 text-architect-gray-500'
                }`}>
                  {index + 1 <= currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                <span className={`${
                  index + 1 <= currentStep
                    ? 'text-architect-gray-900 font-medium'
                    : 'text-architect-gray-500'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Session Button */}
        {currentStep === 5 && (
          <div className="mt-8 text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-architect-primary to-architect-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all">
              세션 완료하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}