/**
 * IdeaWorkLab v4.1 - 강의 세션 페이지
 * 모바일 중심 수업 페이지 UI/UX 상세 설계
 * '싱글 스크롤 서사' 구조로 구현된 몰입감 있는 학습 경험
 * 
 * UI/UX 가이드라인:
 * - Junior Mode: 더 큰 터치 영역, 드래그 앤 드롭 인터랙션, 애니메이션 중심
 * - Youth Mode: 채팅 인터페이스 중심, 소셜 요소, 게임화된 피드백
 * - Pro Mode: 간결한 UI, 키보드 단축키, 효율성 중심의 인터페이스
 */

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, Play, ChevronRight, CheckCircle, Star, Award,
  MessageCircle, Lightbulb, Target, TrendingUp, Sparkles,
  ArrowRight, ArrowLeft, Home, BookOpen, RotateCcw,
  Volume2, VolumeX, Pause, SkipForward, Heart,
  Zap, Gift, Trophy, Clock, Users, Eye, ThumbsUp,
  Send, Mic, MicOff, Camera, CameraOff, Share2,
  Download, Flag, HelpCircle, Settings, Menu
} from 'lucide-react';

interface CourseSessionPageProps {
  language?: 'ko' | 'en';
  user?: User | null;
  onNavigate?: (page: string, params?: any) => void;
  sessionId?: string;
  courseId?: string;
  targetAudience?: 'junior' | 'youth' | 'pro'; // 대상별 UI 모드
}

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  user_type: 'guest' | 'member' | 'instructor' | 'admin';
}

interface SessionStep {
  id: number;
  title: string;
  type: 'intro' | 'learning' | 'practice' | 'achievement' | 'reflection';
  status: 'pending' | 'current' | 'completed';
  duration?: number;
  character?: 'saenggagi' | 'archi' | 'mirumi' | 'banjjaki';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'character';
  character?: 'saenggagi' | 'archi' | 'mirumi' | 'banjjaki';
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'system' | 'exercise';
  metadata?: any;
}

// ScrollArea를 div로 대체 (기본 스크롤 사용)
const ScrollArea: React.FC<{ children: React.ReactNode; className?: string; ref?: any }> = ({ children, className, ...props }) => (
  <div className={`overflow-y-auto ${className}`} {...props}>
    {children}
  </div>
);

export const CourseSessionPage: React.FC<CourseSessionPageProps> = ({
  language = 'ko',
  user,
  onNavigate = () => {},
  sessionId = 'session-1-1',
  courseId = 'systematic-thinking',
  targetAudience = 'youth'
}) => {

  // State Management
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showCharacterIntro, setShowCharacterIntro] = useState(true);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [sessionStartTime] = useState(new Date());
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Session Configuration
  const sessionConfig = {
    id: sessionId,
    title: '체계적 사고의 기초: 문제 분석과 구조화',
    description: '복잡한 문제를 작은 단위로 나누어 체계적으로 접근하는 방법을 학습합니다.',
    totalSteps: 5,
    estimatedDuration: 25, // minutes
    course: {
      title: 'Level 4-6: 체계적 사고 고급',
      phase: 1,
      lesson: 1
    }
  };

  // 5단계 세션 흐름 정의
  const sessionSteps: SessionStep[] = [
    {
      id: 1,
      title: '문제 상황 인식',
      type: 'intro',
      status: currentStep === 1 ? 'current' : currentStep > 1 ? 'completed' : 'pending',
      duration: 3,
      character: 'saenggagi'
    },
    {
      id: 2,
      title: '핵심 원리 학습',
      type: 'learning',
      status: currentStep === 2 ? 'current' : currentStep > 2 ? 'completed' : 'pending',
      duration: 8,
      character: 'archi'
    },
    {
      id: 3,
      title: '실습과 상호작용',
      type: 'practice',
      status: currentStep === 3 ? 'current' : currentStep > 3 ? 'completed' : 'pending',
      duration: 10,
      character: 'mirumi'
    },
    {
      id: 4,
      title: '임무 완수',
      type: 'achievement',
      status: currentStep === 4 ? 'current' : currentStep > 4 ? 'completed' : 'pending',
      duration: 2,
      character: 'banjjaki'
    },
    {
      id: 5,
      title: '회고와 정리',
      type: 'reflection',
      status: currentStep === 5 ? 'current' : currentStep > 5 ? 'completed' : 'pending',
      duration: 2,
      character: 'archi'
    }
  ];

  // Character Configuration
  const characters = {
    saenggagi: {
      name: '생각이',
      role: '논리적 분석 도우미',
      avatar: '🤔',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: '체계적이고 논리적인 사고를 도와주는 친구'
    },
    archi: {
      name: '아키',
      role: 'AI 설계 전문가',
      avatar: '🦊',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: '지혜로운 여우, 사고의 구조를 설계하는 전문가'
    },
    mirumi: {
      name: '미루미',
      role: '실행력 코치',
      avatar: '🐨',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      description: '미루는 습관을 극복하도록 도와주는 코치'
    },
    banjjaki: {
      name: '반짝이',
      role: '창의성 영감가',
      avatar: '⭐',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: '번뜩이는 아이디어와 영감을 주는 친구'
    }
  };

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionStartTime]);

  // Progress Calculation
  useEffect(() => {
    const totalSteps = sessionSteps.length;
    const completedSteps = sessionSteps.filter(step => step.status === 'completed').length;
    const progress = (completedSteps / totalSteps) * 100;
    setSessionProgress(progress);
  }, [currentStep]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Step Navigation
  const goToNextStep = () => {
    if (currentStep < sessionSteps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Chat Functions
  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: currentMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        character: sessionSteps[currentStep - 1].character,
        content: generateAIResponse(currentMessage),
        timestamp: new Date(),
        type: 'text'
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const currentCharacter = sessionSteps[currentStep - 1].character;
    
    // Pro Mode: Direct, efficient responses
    if (targetAudience === 'pro') {
      return `[${characters[currentCharacter || 'archi'].name}] 좋은 접근입니다. 다음 단계로 진행하세요.`;
    }
    
    // Junior Mode: Encouraging, detailed responses
    if (targetAudience === 'junior') {
      return `[${characters[currentCharacter || 'archi'].name}] 와! 정말 잘 생각해봤어요! 🌟 ${userInput}에 대한 당신의 생각이 인상적이에요. 함께 더 깊이 탐구해볼까요?`;
    }
    
    // Youth Mode: Conversational, engaging responses
    return `[${characters[currentCharacter || 'archi'].name}] 흥미로운 관점이네요! ${userInput}에서 핵심을 잘 파악하셨어요. 이제 이걸 어떻게 실제로 적용할 수 있을지 생각해봅시다! 💡`;
  };

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current character
  const getCurrentCharacter = () => {
    const step = sessionSteps[currentStep - 1];
    return characters[step.character || 'archi'];
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* 상단 고정 학습 상태 바 (Sticky Header) */}
      <div className="sticky top-0 z-50 bg-white border-b border-architect-gray-300 shadow-architect-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-3 md:py-4">
            
            {/* 좌측: 네비게이션 및 세션 정보 */}
            <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('course-dashboard')}
                className="flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">뒤로</span>
              </Button>
              
              <div className="min-w-0 flex-1">
                <h1 className="text-body md:text-h4 font-bold text-architect-gray-900 truncate">
                  {sessionConfig.title}
                </h1>
                <div className="flex items-center gap-2 text-xs md:text-small text-architect-gray-600">
                  <span>{sessionConfig.course.title}</span>
                  <span>•</span>
                  <span>Phase {sessionConfig.course.phase}-{sessionConfig.course.lesson}</span>
                </div>
              </div>
            </div>

            {/* 우측: 시간 및 설정 */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <div className="text-small text-architect-gray-600 hidden sm:block">
                {formatTime(timeSpent)}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="w-8 h-8 p-0"
              >
                {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>

              {/* Pro Mode: 추가 설정 메뉴 */}
              {targetAudience === 'pro' && (
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <Settings className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* 진행률 바 */}
          <div className="pb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <span className="text-small font-semibold text-architect-gray-900">
                  {currentStep} / {sessionSteps.length}
                </span>
                <span className="text-small text-architect-gray-600">
                  {sessionSteps[currentStep - 1]?.title}
                </span>
              </div>
              <span className="text-small text-architect-gray-600">
                {Math.round(sessionProgress)}% 완료
              </span>
            </div>
            <Progress 
              value={sessionProgress} 
              className="h-2 bg-architect-gray-100"
            />
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="container mx-auto py-4 md:py-6">
        
        {/* 단계별 콘텐츠 렌더링 */}
        {currentStep === 1 && (
          /* 1단계: 문제 상황 제시 - 웹툰 형식 인트로 */
          <div className="space-y-6">
            
            {/* 캐릭터 인트로 카드 */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500 rounded-full flex items-center justify-center text-2xl md:text-3xl flex-shrink-0">
                    🤔
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl p-4 shadow-sm relative">
                      <div className="absolute -left-2 top-4 w-4 h-4 bg-white transform rotate-45"></div>
                      <h3 className="text-h4 font-bold text-architect-gray-900 mb-2">
                        안녕! 나는 생각이야 🤔
                      </h3>
                      <p className="text-body text-architect-gray-700 leading-relaxed">
                        오늘 우리가 풀어야 할 문제를 만나러 가볼까? 복잡해 보이는 문제도 차근차근 나누어 보면 
                        해결책이 보일 거야!
                      </p>
                      
                      {/* Junior Mode: 더 큰 버튼과 애니메이션 */}
                      {targetAudience === 'junior' && (
                        <div className="mt-4">
                          <Button 
                            className="animate-pulse"
                            size="lg"
                            onClick={() => setShowCharacterIntro(false)}
                          >
                            <Heart className="w-5 h-5 mr-2" />
                            함께 시작해요!
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 문제 상황 시나리오 */}
            <Card className="border-2 border-architect-primary/20 bg-architect-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-architect-primary" />
                  오늘의 도전 과제
                </CardTitle>
                <CardDescription>
                  실제 상황을 통해 체계적 사고의 필요성을 경험해보세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white rounded-xl p-6 border border-architect-gray-300">
                  <h4 className="text-h4 font-bold text-architect-gray-900 mb-3">
                    📚 상황: 새 프로젝트 기획
                  </h4>
                  <p className="text-body text-architect-gray-700 leading-relaxed mb-4">
                    당신은 회사에서 새로운 모바일 앱 개발 프로젝트를 맡게 되었습니다. 
                    6개월 내에 출시해야 하고, 팀원은 5명, 예산은 제한적입니다. 
                    어디서부터 시작해야 할까요?
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-600 text-xs">❌</span>
                      </div>
                      <p className="text-small text-architect-gray-700">
                        <strong>일반적인 접근:</strong> "일단 시작해보자!" 하고 바로 개발에 뛰어든다.
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 text-xs">✅</span>
                      </div>
                      <p className="text-small text-architect-gray-700">
                        <strong>체계적 접근:</strong> 문제를 작은 단위로 나누어 단계별로 분석하고 계획한다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Youth Mode: 소셜 요소 추가 */}
                {targetAudience === 'youth' && (
                  <div className="flex items-center justify-between text-small text-architect-gray-600 bg-architect-gray-100/50 rounded-lg p-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>1,247명이 이 문제에 도전했어요</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>98% 성공률</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={goToNextStep}
                    size={targetAudience === 'junior' ? 'lg' : 'default'}
                  >
                    <Lightbulb className="w-5 h-5 mr-2" />
                    해결 방법 배우기
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 2 && (
          /* 2단계: 핵심 원리 학습 */
          <div className="space-y-6">
            
            {/* 아키 캐릭터 소개 */}
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    🦊
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl p-4 shadow-sm relative">
                      <div className="absolute -left-2 top-4 w-4 h-4 bg-white transform rotate-45"></div>
                      <h3 className="text-h4 font-bold text-architect-gray-900 mb-2">
                        안녕하세요! 저는 AI 아키입니다 🦊
                      </h3>
                      <p className="text-body text-architect-gray-700 leading-relaxed">
                        체계적 사고의 핵심 원리를 알려드릴게요. 복잡한 문제를 해결하는 3단계 프레임워크를 배워봅시다!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 학습 콘텐츠 블록들 */}
            <div className="grid gap-6">
              
              {/* 영상 학습 블록 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-architect-primary" />
                    핵심 개념 영상 (5분)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-architect-gray-100 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-architect-primary/10 to-architect-secondary/10"></div>
                    <Button 
                      className="relative z-10"
                      size={targetAudience === 'junior' ? 'lg' : 'default'}
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>
                  </div>
                  
                  {/* Pro Mode: 영상 컨트롤 */}
                  {targetAudience === 'pro' && (
                    <div className="flex items-center justify-between text-small text-architect-gray-600">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <SkipForward className="w-4 h-4" />
                        </Button>
                        <span>1.5x 배속</span>
                      </div>
                      <span>03:24 / 05:00</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 이론 학습 블록 */}
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    3단계 체계적 사고 프레임워크
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  {/* 단계별 설명 */}
                  {[
                    {
                      step: 1,
                      title: '문제 분해 (Decompose)',
                      description: '복잡한 문제를 작은 단위로 나누어 각각을 명확히 정의합니다.',
                      icon: '🔍',
                      color: 'border-blue-300 bg-blue-50'
                    },
                    {
                      step: 2,
                      title: '우선순위 설정 (Prioritize)',
                      description: '나누어진 문제들 중 가장 중요하고 시급한 것부터 순서를 정합니다.',
                      icon: '📊',
                      color: 'border-purple-300 bg-purple-50'
                    },
                    {
                      step: 3,
                      title: '단계별 실행 (Execute)',
                      description: '우선순위에 따라 하나씩 해결해나가며 전체 목표를 달성합니다.',
                      icon: '🎯',
                      color: 'border-green-300 bg-green-50'
                    }
                  ].map((framework, index) => (
                    <div key={framework.step} className={`p-4 rounded-xl border ${framework.color}`}>
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{framework.icon}</div>
                        <div className="flex-1">
                          <h4 className="text-body font-bold text-architect-gray-900 mb-2">
                            {framework.step}. {framework.title}
                          </h4>
                          <p className="text-small text-architect-gray-700 leading-relaxed">
                            {framework.description}
                          </p>
                          
                          {/* Junior Mode: 더 상세한 예시 추가 */}
                          {targetAudience === 'junior' && (
                            <div className="mt-3 p-3 bg-white/80 rounded-lg">
                              <p className="text-xs text-architect-gray-600">
                                💡 <strong>쉬운 예시:</strong> 방 정리하기 → 
                                {framework.step === 1 && "옷, 책, 장난감으로 나누기"}
                                {framework.step === 2 && "자주 쓰는 것부터 정리하기"}
                                {framework.step === 3 && "하나씩 차례대로 정리하기"}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center pt-4">
                    <Button 
                      onClick={goToNextStep}
                      size={targetAudience === 'junior' ? 'lg' : 'default'}
                    >
                      <Target className="w-5 h-5 mr-2" />
                      실습해보기
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          /* 3단계: 상호작용 실습 - 챗봇 인터페이스 중심 */
          <div className="space-y-6">
            
            {/* 실습 안내 */}
            <Card className="border-2 border-gray-200 bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    🐨
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl p-4 shadow-sm relative">
                      <div className="absolute -left-2 top-4 w-4 h-4 bg-white transform rotate-45"></div>
                      <h3 className="text-h4 font-bold text-architect-gray-900 mb-2">
                        이제 실습 시간이야! 🐨
                      </h3>
                      <p className="text-body text-architect-gray-700 leading-relaxed">
                        앞서 배운 3단계 프레임워크를 실제 문제에 적용해보자. 
                        나는 미루미, 실행력을 기를 수 있도록 도와줄게!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 챗봇 인터페이스 */}
            <Card className="min-h-[400px] md:min-h-[500px]">
              <CardHeader className="border-b border-architect-gray-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    AI 실습 파트너와 대화하기
                  </CardTitle>
                  
                  {/* Youth Mode: 사회적 요소 */}
                  {targetAudience === 'youth' && (
                    <div className="flex items-center gap-2 text-small text-architect-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>온라인</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex flex-col h-[400px] md:h-[500px]">
                {/* 채팅 메시지 영역 */}
                <ScrollArea 
                  ref={chatContainerRef}
                  className="flex-1 p-4 space-y-4"
                >
                  {/* 초기 메시지 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      🐨
                    </div>
                    <div className="flex-1">
                      <div className="bg-architect-gray-100 rounded-2xl rounded-tl-md p-3 max-w-[80%]">
                        <p className="text-small text-architect-gray-900">
                          자, 이제 앞에서 본 모바일 앱 프로젝트 문제를 3단계로 나누어 해결해보자! 
                          첫 번째 단계인 '문제 분해'부터 시작해볼까?
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 사용자 채팅 메시지들 */}
                  {chatMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex items-start gap-3 ${
                        message.sender === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-architect-primary text-white' 
                          : 'bg-gray-500'
                      }`}>
                        {message.sender === 'user' ? '👤' : '🐨'}
                      </div>
                      <div className="flex-1">
                        <div className={`rounded-2xl p-3 max-w-[80%] ${
                          message.sender === 'user' 
                            ? 'bg-architect-primary text-white rounded-tr-md ml-auto' 
                            : 'bg-architect-gray-100 text-architect-gray-900 rounded-tl-md'
                        }`}>
                          <p className="text-small">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* 타이핑 인디케이터 */}
                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                        🐨
                      </div>
                      <div className="bg-architect-gray-100 rounded-2xl rounded-tl-md p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-architect-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-architect-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-architect-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </ScrollArea>

                {/* 메시지 입력 영역 */}
                <div className="border-t border-architect-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    
                    {/* Junior Mode: 음성 입력 버튼 */}
                    {targetAudience === 'junior' && (
                      <Button variant="ghost" size="sm" className="flex-shrink-0">
                        <Mic className="w-4 h-4" />
                      </Button>
                    )}

                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder={
                          targetAudience === 'junior' ? "생각을 자유롭게 말해보세요!" :
                          targetAudience === 'pro' ? "답변을 입력하세요" :
                          "어떻게 문제를 나누어볼까요?"
                        }
                        className="w-full p-3 pr-12 border border-architect-gray-300 rounded-xl focus:border-architect-primary focus:ring-2 focus:ring-architect-primary/10 outline-none"
                      />
                      
                      {/* Pro Mode: 키보드 단축키 힌트 */}
                      {targetAudience === 'pro' && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-architect-gray-500">
                          Enter
                        </div>
                      )}
                    </div>

                    <Button 
                      onClick={sendMessage}
                      disabled={!currentMessage.trim()}
                      className="flex-shrink-0"
                      size={targetAudience === 'junior' ? 'lg' : 'default'}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* 진행 상황 표시 */}
                  <div className="mt-3 flex items-center justify-between text-xs text-architect-gray-600">
                    <span>실습 진행률: 67%</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setPracticeCompleted(true);
                        goToNextStep();
                      }}
                      className="text-architect-primary"
                    >
                      완료하기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 4 && (
          /* 4단계: 임무 완수 - 성공 애니메이션 */
          <div className="space-y-6">
            
            {/* 성공 애니메이션 카드 */}
            <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10"></div>
              <CardContent className="p-8 text-center relative z-10">
                
                {/* 애니메이션 요소들 */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl animate-bounce shadow-lg">
                    🎉
                  </div>
                  
                  {/* 반짝이 효과 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-4 border-yellow-300 rounded-full animate-ping opacity-30"></div>
                  </div>
                </div>

                <h2 className="text-h2 font-black text-architect-gray-900 mb-4">
                  🌟 임무 완수! 🌟
                </h2>
                
                <p className="text-body-lg text-architect-gray-700 leading-relaxed mb-6 max-w-md mx-auto">
                  축하합니다! 체계적 사고 프레임워크를 성공적으로 적용하여 복잡한 문제를 해결했습니다.
                </p>

                {/* 성과 요약 */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-h3 font-bold text-architect-primary mb-1">3</div>
                    <div className="text-small text-architect-gray-600">단계 완료</div>
                  </div>
                  <div className="text-center">
                    <div className="text-h3 font-bold text-orange-500 mb-1">85%</div>
                    <div className="text-small text-architect-gray-600">정확도</div>
                  </div>
                  <div className="text-center">
                    <div className="text-h3 font-bold text-green-500 mb-1">+50</div>
                    <div className="text-small text-architect-gray-600">경험치</div>
                  </div>
                </div>

                {/* 성장한 생각이 캐릭터 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-2xl relative">
                      🤔
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                        ✨
                      </div>
                    </div>
                    <div className="text-h4 font-bold text-architect-gray-900">
                      생각이가 레벨업했어요!
                    </div>
                  </div>
                  
                  <p className="text-body text-architect-gray-700 leading-relaxed">
                    "와! 정말 체계적으로 문제를 해결했네요! 이제 더 복잡한 문제도 자신 있게 도전할 수 있을 것 같아요! 🚀"
                  </p>
                </div>

                {/* Junior Mode: 더 큰 축하 효과 */}
                {targetAudience === 'junior' && (
                  <div className="mb-6">
                    <div className="text-6xl mb-4">🎊🎉🎊</div>
                    <p className="text-body-lg font-bold text-architect-primary">
                      정말 멋져요! 앞으로 어떤 어려운 문제라도 척척 해결할 수 있을 거예요!
                    </p>
                  </div>
                )}

                <Button 
                  onClick={goToNextStep}
                  size={targetAudience === 'junior' ? 'lg' : 'default'}
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  학습 정리하기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* 획득한 배지 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  새로 획득한 성취
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl">
                    🏆
                  </div>
                  <div className="flex-1">
                    <h4 className="text-body font-bold text-architect-gray-900 mb-1">
                      체계적 사고 입문자
                    </h4>
                    <p className="text-small text-architect-gray-700">
                      3단계 프레임워크를 성공적으로 적용하여 문제를 해결했습니다.
                    </p>
                  </div>
                  <Badge className="bg-orange-500 text-white">NEW</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 5 && (
          /* 5단계: 회고 및 정리 */
          <div className="space-y-6">
            
            {/* AI 아키의 수련 일지 */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    🦊
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-h4 font-bold text-architect-gray-900 mb-2">
                      AI 아키가 정리한 수련 일지
                    </CardTitle>
                    <CardDescription>
                      오늘 학습한 내용을 AI가 분석하여 개인 맞춤형으로 정리했습니다.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* 학습 요약 */}
                <div className="bg-white rounded-xl p-6 border border-architect-gray-300">
                  <h4 className="text-body font-bold text-architect-gray-900 mb-4">
                    📝 오늘의 학습 요약
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-small font-semibold text-architect-gray-900 mb-1">
                          체계적 사고 3단계 프레임워크 학습 완료
                        </p>
                        <p className="text-xs text-architect-gray-700">
                          문제 분해 → 우선순위 설정 → 단계별 실행
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-small font-semibold text-architect-gray-900 mb-1">
                          실제 프로젝트 사례에 프레임워크 적용
                        </p>
                        <p className="text-xs text-architect-gray-700">
                          모바일 앱 개발 프로젝트를 체계적으로 분석
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-small font-semibold text-architect-gray-900 mb-1">
                          AI와의 대화형 실습 경험
                        </p>
                        <p className="text-xs text-architect-gray-700">
                          미루미와 함께 실행력 향상 연습
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 개선 포인트 */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                  <h4 className="text-body font-bold text-architect-gray-900 mb-4">
                    💡 다음에 더 발전시킬 점
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Target className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-small text-architect-gray-700">
                        우선순위 설정 시 더 다양한 기준을 고려해보세요 (시간, 리소스, 영향도 등)
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Target className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-small text-architect-gray-700">
                        각 단계별로 구체적인 실행 계획을 세우는 연습이 필요합니다
                      </p>
                    </div>
                  </div>
                </div>

                {/* 학습 통계 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-architect-gray-300">
                    <div className="text-h4 font-bold text-architect-primary mb-1">
                      {formatTime(timeSpent)}
                    </div>
                    <div className="text-xs text-architect-gray-600">소요 시간</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-lg border border-architect-gray-300">
                    <div className="text-h4 font-bold text-orange-500 mb-1">
                      {chatMessages.length}
                    </div>
                    <div className="text-xs text-architect-gray-600">대화 횟수</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-lg border border-architect-gray-300">
                    <div className="text-h4 font-bold text-green-500 mb-1">85%</div>
                    <div className="text-xs text-architect-gray-600">이해도</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-lg border border-architect-gray-300">
                    <div className="text-h4 font-bold text-blue-600 mb-1">A</div>
                    <div className="text-xs text-architect-gray-600">종합 평가</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 피드백 및 다음 단계 */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* 간단한 피드백 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    학습 피드백
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      size={targetAudience === 'junior' ? 'lg' : 'default'}
                    >
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      이 세션이 도움이 되었어요
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      size={targetAudience === 'junior' ? 'lg' : 'default'}
                    >
                      <Download className="w-4 h-4 mr-2 text-architect-primary" />
                      수련 일지 다운로드
                    </Button>
                    
                    {/* Youth Mode: 공유 기능 */}
                    {targetAudience === 'youth' && (
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <Share2 className="w-4 h-4 mr-2 text-blue-600" />
                        성과 공유하기
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 다음 단계 안내 */}
              <Card className="border-2 border-architect-primary/20 bg-architect-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-architect-primary" />
                    다음 학습 추천
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg border border-architect-gray-300">
                      <h5 className="text-small font-semibold text-architect-gray-900 mb-2">
                        추천 다음 세션
                      </h5>
                      <p className="text-xs text-architect-gray-700 mb-3">
                        "복잡한 데이터 분석과 의사결정" - 오늘 배운 내용을 더 심화학습해보세요
                      </p>
                      <Badge className="bg-architect-primary text-white text-xs">
                        매칭률 95%
                      </Badge>
                    </div>

                    <Button 
                      onClick={() => onNavigate('course-dashboard')}
                      className="w-full"
                      size={targetAudience === 'junior' ? 'lg' : 'default'}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      다음 세션 시작하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 세션 완료 확인 */}
            <div className="text-center pt-8">
              <p className="text-body text-architect-gray-700 mb-6">
                🎉 세션을 완료했습니다! 오늘도 한 단계 성장한 당신을 축하해요!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => onNavigate('course-dashboard')}
                  size="lg"
                >
                  <Home className="w-5 h-5 mr-2" />
                  학습 대시보드로
                </Button>
                
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-architect-primary text-architect-primary hover:bg-architect-primary hover:text-white"
                  size="lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  세션 다시 체험하기
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 하단 네비게이션 (Pro Mode에서만 표시) */}
        {targetAudience === 'pro' && (
          <div className="flex items-center justify-between pt-8 border-t border-architect-gray-300">
            <Button 
              onClick={goToPreviousStep}
              disabled={currentStep === 1}
              variant="outline"
              className="flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전 단계
            </Button>
            
            <div className="flex items-center gap-2">
              {sessionSteps.map((step) => (
                <div 
                  key={step.id}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    step.status === 'completed' ? 'bg-green-500' :
                    step.status === 'current' ? 'bg-architect-primary' :
                    'bg-architect-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <Button 
              onClick={goToNextStep}
              disabled={currentStep === sessionSteps.length}
              variant="outline"
              className="flex-shrink-0"
            >
              다음 단계
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* 플로팅 도움말 버튼 (Junior Mode) */}
      {targetAudience === 'junior' && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button 
            className="w-14 h-14 rounded-full bg-architect-primary text-white shadow-lg"
            title="도움말"
          >
            <HelpCircle className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* 빠른 메뉴 (Youth Mode) */}
      {targetAudience === 'youth' && (
        <div className="fixed bottom-6 left-6 z-40">
          <div className="flex flex-col gap-3">
            <Button 
              variant="outline"
              className="w-12 h-12 rounded-full bg-white border-architect-primary text-architect-primary"
              title="친구에게 공유"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline"
              className="w-12 h-12 rounded-full bg-white border-blue-600 text-blue-600"
              title="AI 도우미 호출"
            >
              <Zap className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSessionPage;