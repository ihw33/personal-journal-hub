'use client';

import { useState, useRef, useEffect } from 'react';
import { AILearningService } from '@/services/AIService';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { 
  MessageCircle,
  Send,
  Bot,
  User,
  Copy,
  ArrowLeft,
  Target,
  CheckCircle,
  Clock,
  BookOpen,
  Lightbulb,
  FileText,
  Sparkles,
  RotateCcw,
  Upload,
  Brain,
  Zap,
  AlertCircle
} from 'lucide-react';

interface AIPracticePageProps {
  language: 'ko' | 'en';
  onNavigate?: (page: string, journalId?: string, category?: string, week?: number, phase?: number, mode?: 'guided' | 'self-directed') => void;
  week?: number;
  phase?: number;
  mode?: 'guided' | 'self-directed' | null;
}

interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'task' | 'feedback' | 'guidance';
}

export function AIPracticePage({ language, onNavigate, week = 1, phase = 1, mode = 'guided' }: AIPracticePageProps) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [taskProgress, setTaskProgress] = useState(0);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [aiSession, setAiSession] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiService = AILearningService.getInstance();

  const content = {
    ko: {
      title: 'AI와 함께 제주도 여행 계획하기',
      subtitle: `${week}주차 ${phase}단계: AI 협업 실습`,
      welcome: 'AI 어시스턴트와 함께 제주도 여행을 계획해보세요. 대화를 통해 나만의 특별한 여행 계획을 만들어갑니다.',
      inputPlaceholder: 'AI에게 메시지를 보내세요...',
      send: '전송',
      loading: 'AI가 응답을 생성하고 있습니다...',
      taskProgress: '과제 진행률',
      completed: '과제 완료!',
      backToCourse: '강의로 돌아가기',
      copyMessage: '메시지 복사',
      regenerate: '재생성',
      clear: '대화 초기화',
      aiAssistant: 'AI 어시스턴트',
      you: '나',
      taskObjective: '이번 단계 목표',
      taskDescription: 'AI와 대화하며 제주도 여행의 테마와 방향성을 정하고, 관심 있는 활동들을 탐색해보세요.',
      tips: [
        '구체적인 질문을 해보세요',
        '선호하는 여행 스타일을 말해보세요', 
        'AI의 제안에 대한 피드백을 주세요',
        '더 자세한 정보를 요청해보세요'
      ]
    },
    en: {
      title: 'Plan Jeju Island Trip with AI',
      subtitle: `Week ${week} Phase ${phase}: AI Collaboration Practice`,
      welcome: 'Plan your Jeju Island trip with an AI assistant. Create your unique travel plan through conversation.',
      inputPlaceholder: 'Send a message to AI...',
      send: 'Send',
      loading: 'AI is generating response...',
      taskProgress: 'Task Progress',
      completed: 'Task Completed!',
      backToCourse: 'Back to Course',
      copyMessage: 'Copy Message',
      regenerate: 'Regenerate',
      clear: 'Clear Chat',
      aiAssistant: 'AI Assistant',
      you: 'You',
      taskObjective: 'Phase Objective',
      taskDescription: 'Chat with AI to define your Jeju travel theme and direction, and explore activities of interest.',
      tips: [
        'Ask specific questions',
        'Share your travel preferences',
        'Give feedback on AI suggestions',
        'Request more detailed information'
      ]
    }
  };

  const t = content[language];

  // AI 세션 초기화 및 초기 메시지
  useEffect(() => {
    const initializeAISession = async () => {
      try {
        // AI 세션 생성
        const session = await aiService.createSession(
          `user-${Date.now()}`, // 임시 사용자 ID
          week,
          phase,
          mode
        );
        setAiSession(session);

        // 초기 AI 메시지 생성
        const welcomeMessage = language === 'ko' 
          ? `안녕하세요! 저는 제주도 여행 계획을 도와드릴 AI 어시스턴트입니다. 🌺

${week}주차 ${phase}단계에서는 AI와 협업하여 여행 계획의 기초를 다져보겠습니다.

먼저 몇 가지 질문으로 시작해볼까요?
1. 제주도 여행 기간은 얼마나 생각하고 계신가요?
2. 어떤 분위기의 여행을 원하시나요? (휴식, 액티비티, 문화탐방 등)
3. 제주도에서 꼭 해보고 싶은 것이 있다면 무엇인가요?

편하게 대화하듯이 말씀해 주세요! 😊`
          : `Hello! I'm an AI assistant here to help you plan your Jeju Island trip. 🌺

In Week ${week} Phase ${phase}, we'll work together to build the foundation of your travel plan.

Let's start with a few questions:
1. How long are you planning to stay in Jeju?
2. What kind of trip atmosphere do you want? (relaxation, activities, cultural exploration, etc.)
3. Is there anything you absolutely want to do in Jeju?

Please talk to me naturally! 😊`;

        const initialMessage: AIMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: welcomeMessage,
          timestamp: new Date(),
          type: 'guidance'
        };

        setMessages([initialMessage]);
      } catch (error) {
        console.error('Failed to initialize AI session:', error);
        // 에러 시 기본 메시지로 fallback
        const fallbackMessage: AIMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: language === 'ko' 
            ? '안녕하세요! AI 서비스 초기화 중 문제가 발생했습니다. 시뮬레이션 모드로 진행하겠습니다.'
            : 'Hello! There was an issue initializing the AI service. We\'ll proceed in simulation mode.',
          timestamp: new Date(),
          type: 'guidance'
        };
        setMessages([fallbackMessage]);
      }
    };

    initializeAISession();
  }, [week, phase, language]);

  // 메시지 전송
  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      // 실제 AI 서비스를 사용한 메시지 처리
      if (aiSession) {
        const result = await aiService.processMessage(aiSession.id, currentMessage);
        
        const aiResponse: AIMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: result.aiResponse,
          timestamp: new Date(),
          type: 'feedback'
        };

        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
        
        // 진행률 업데이트
        setTaskProgress(prev => Math.min(prev + 15, 100));
        
        if (taskProgress >= 85) {
          setIsTaskCompleted(true);
        }
      } else {
        // 세션이 없는 경우 시뮬레이션 모드로 fallback
        setTimeout(() => {
          const aiResponse: AIMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: generateAIResponse(currentMessage, language),
            timestamp: new Date(),
            type: 'feedback'
          };

          setMessages(prev => [...prev, aiResponse]);
          setIsLoading(false);
          
          // 진행률 업데이트
          setTaskProgress(prev => Math.min(prev + 15, 100));
          
          if (taskProgress >= 85) {
            setIsTaskCompleted(true);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('AI response error:', error);
      setIsLoading(false);
    }
  };

  // AI 응답 시뮬레이션
  const generateAIResponse = (userInput: string, lang: string): string => {
    const responses = {
      ko: [
        `좋은 아이디어네요! ${userInput}에 대해 더 구체적으로 알려주세요. 제주도에는 이와 관련된 다양한 옵션들이 있습니다.`,
        `흥미로운 선택입니다! 제주도에서 ${userInput}와 관련해서 추천드릴 만한 장소들을 찾아보겠습니다. 어떤 시간대를 선호하시나요?`,
        `${userInput}는 제주도 여행의 하이라이트가 될 것 같습니다! 이와 함께 즐길 수 있는 다른 활동들도 제안해드릴까요?`,
        `훌륭한 계획이에요! ${userInput}에 대한 정보를 더 자세히 안내해드리겠습니다. 예산은 어느 정도 생각하고 계신가요?`
      ],
      en: [
        `Great idea! Please tell me more specifically about ${userInput}. There are various options related to this in Jeju Island.`,
        `Interesting choice! I'll look for places in Jeju related to ${userInput}. What time of day do you prefer?`,
        `${userInput} sounds like it would be a highlight of your Jeju trip! Shall I suggest other activities you can enjoy along with this?`,
        `Excellent plan! I'll provide more detailed information about ${userInput}. What's your budget range?`
      ]
    };

    const langResponses = responses[lang];
    return langResponses[Math.floor(Math.random() * langResponses.length)];
  };

  // 메시지 복사
  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  // 대화 초기화
  const clearChat = () => {
    setMessages([]);
    setTaskProgress(0);
    setIsTaskCompleted(false);
  };

  // 스크롤 최하단으로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-iwl-purple-50 to-iwl-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate?.('course-week', undefined, undefined, week)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToCourse}
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl text-iwl-gradient mb-2">
              {t.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {t.subtitle}
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t.welcome}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* 사이드바 - 과제 정보 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-iwl-purple" />
                  {t.taskObjective}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  {t.taskDescription}
                </p>
                
                {/* 진행률 */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{t.taskProgress}</span>
                    <span>{taskProgress}%</span>
                  </div>
                  <Progress value={taskProgress} className="h-2" />
                </div>

                {isTaskCompleted && (
                  <Badge className="w-full justify-center bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {t.completed}
                  </Badge>
                )}

                {/* 팁 */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-1 text-yellow-500" />
                    Tips
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {t.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-iwl-purple rounded-full mt-2 mr-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 메인 채팅 영역 */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-row items-center justify-between">
                <div className="flex items-center">
                  <Bot className="w-6 h-6 mr-2 text-iwl-purple" />
                  <div>
                    <h3 className="text-lg font-semibold">{t.aiAssistant}</h3>
                    <p className="text-sm text-gray-500">제주도 여행 전문가</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={clearChat}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  {t.clear}
                </Button>
              </CardHeader>

              {/* 메시지 영역 */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.role === 'user' 
                              ? 'bg-iwl-gradient text-white' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {message.role === 'user' ? (
                              <User className="w-4 h-4" />
                            ) : (
                              <Bot className="w-4 h-4" />
                            )}
                          </div>
                          
                          <div className={`rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-iwl-gradient text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className={`text-xs ${
                                message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                              }`}>
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyMessage(message.content)}
                                className={`h-6 w-6 p-0 ${
                                  message.role === 'user' 
                                    ? 'text-white/70 hover:text-white' 
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%]">
                        <div className="flex items-start space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="bg-gray-100 rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                              </div>
                              <span className="text-xs text-gray-500">{t.loading}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              {/* 입력 영역 */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder={t.inputPlaceholder}
                    className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || isLoading}
                    className="self-end bg-iwl-gradient"
                  >
                    <Send className="w-4 h-4" />
                    <span className="sr-only">{t.send}</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}