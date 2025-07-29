"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
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
  AlertCircle,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';
import { JEJU_COURSE_DATA } from './course/courseData';
import type { WeekData, PhaseData } from './course/types';
import { AILearningService, AIModeComparison, type AISession, type AIMessage } from './course/AIService';
import { BetaFlagService, useBetaFlag, BetaFeature } from '../lib/betaFlags';
import { BetaFeedback } from './ui/BetaFeedback';

interface AIPracticePageProps {
  language: 'ko' | 'en';
  onNavigate: (page: string, journalId?: string, category?: string, week?: number, phase?: number, mode?: 'guided' | 'self-directed') => void;
  week?: number;
  phase?: number;
  mode?: 'guided' | 'self-directed' | null;
}

export function AIPracticePage({ language, onNavigate, week = 1, phase = 1, mode = null }: AIPracticePageProps) {
  const { user, getUserType } = useAuth();
  
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [taskProgress, setTaskProgress] = useState(0);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [currentSession, setCurrentSession] = useState<AISession | null>(null);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  // v115: 베타 기능 플래그 hooks
  const { isEnabled: isAiChatbotEnabled, logUsage: logAiChatbotUsage } = useBetaFlag('aiChatbot');
  const { isEnabled: isAiOptimizationEnabled } = useBetaFlag('aiOptimization');
  const { isEnabled: isFeedbackSystemEnabled } = useBetaFlag('feedbackSystem');
  const { isEnabled: isErrorReportingEnabled } = useBetaFlag('errorReporting');

  // 인증 체크 및 베타 플래그 설정
  useEffect(() => {
    const userType = getUserType();
    if (userType === 'guest') {
      // 비로그인 사용자는 로그인 페이지로 리다이렉트
      onNavigate('auth');
      return;
    }

    // v115: 베타 플래그 서비스에 사용자 컨텍스트 설정
    const betaService = BetaFlagService.getInstance();
    betaService.setUserContext(
      user?.id || 'anonymous',
      userType
    );

    // AI 챗봇 기능 사용 로깅
    if (isAiChatbotEnabled) {
      logAiChatbotUsage('page_loaded');
    }
  }, [user, getUserType, onNavigate, isAiChatbotEnabled, logAiChatbotUsage]);

  // AI 서비스 인스턴스
  const aiService = AILearningService.getInstance();
  
  // v114: AI 성능 최적화 초기화
  React.useEffect(() => {
    // v114 최적화: 캐시된 프롬프트 사용으로 응답 속도 개선
    console.log('🚀 v114 AI 챗봇 최적화 시스템 활성화');
  }, []);

  // 스크롤 제어를 위한 ref
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 안전한 데이터 접근을 위한 데이터 검증
  const getWeekData = (): WeekData | null => {
    try {
      if (!JEJU_COURSE_DATA || !Array.isArray(JEJU_COURSE_DATA)) {
        console.warn('JEJU_COURSE_DATA is not available');
        return null;
      }
      return JEJU_COURSE_DATA.find(w => w && w.id === week) || null;
    } catch (error) {
      console.error('Error accessing week data:', error);
      return null;
    }
  };

  const getPhaseData = (): PhaseData | null => {
    try {
      const weekData = getWeekData();
      if (!weekData || !weekData.phases || !Array.isArray(weekData.phases)) {
        return null;
      }
      return weekData.phases.find(p => p && p.id === phase) || null;
    } catch (error) {
      console.error('Error accessing phase data:', error);
      return null;
    }
  };

  // 폴백 데이터 생성
  const createFallbackData = () => {
    const fallbackWeekData = {
      id: week,
      title: `${week}주차`,
      subtitle: "AI와 함께 학습하기",
      description: "AI와 대화하며 실습을 진행해보세요.",
      phases: []
    };

    const fallbackPhaseData = {
      id: phase,
      title: `${phase}페이즈`,
      subtitle: "AI 실습",
      type: "practice" as const,
      duration: "30분",
      description: "AI와 함께하는 실습 학습",
      guidedContent: {
        title: "AI와 함께하는 실습",
        description: "AI와 대화하며 실습을 진행해보세요.",
        objective: "AI 협력을 통한 학습 목표 달성",
        duration: "30분"
      },
      selfDirectedContent: {
        title: "자율 실습",
        description: "스스로 계획을 세워 실습을 진행해보세요.",
        objective: "자기주도적 학습을 통한 목표 달성",
        duration: "30분"
      },
      checkpoints: [],
      deliverables: []
    };

    return { fallbackWeekData, fallbackPhaseData };
  };

  // 현재 데이터 또는 폴백 데이터 사용
  const currentWeekData = getWeekData();
  const currentPhaseData = getPhaseData();
  const { fallbackWeekData, fallbackPhaseData } = createFallbackData();

  const safeWeekData = currentWeekData || fallbackWeekData;
  const safePhaseData = currentPhaseData || fallbackPhaseData;
  const practiceMode = mode || 'guided';

  // 메시지가 추가될 때마다 스크롤을 맨 아래로
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI 세션 초기화
  useEffect(() => {
    initializeAISession();
  }, [week, phase, practiceMode]);

  const content = {
    ko: {
      title: "AI와 함께하는 실습",
      subtitle: "주차별 과제를 AI와 함께 단계적으로 실습해보세요",
      backToWeek: "주차로 돌아가기",
      currentWeek: "현재 주차",
      currentPhase: "현재 페이즈",
      taskProgress: "과제 진행률",
      completed: "완료",
      inProgress: "진행 중",
      submit: "제출하기",
      continue: "계속하기",
      restart: "다시 시작",
      copy: "복사",
      typing: "AI가 응답하고 있습니다...",
      placeholder: "AI와 대화하며 과제를 진행해보세요...",
      taskObjective: "과제 목표",
      practiceSteps: "실습 단계",
      aiHelper: "AI 도우미",
      submitTask: "과제 제출",
      getHelp: "도움 요청",
      viewSubmission: "제출 내용 보기",
      noData: "실습 데이터를 불러오는 중입니다...",
      dataError: "데이터를 불러올 수 없습니다. 다시 시도해주세요.",
      welcomeMessage: "AI 실습 도우미입니다! 함께 학습해보세요.",
      modeInfo: "학습 모드 정보",
      aiAnalyzing: "AI가 분석 중입니다...",
      sessionError: "세션 생성 중 오류가 발생했습니다.",
      initializationError: "AI 세션 초기화 중 오류가 발생했습니다.",
      retryInitialization: "다시 시도"
    },
    en: {
      title: "Practice with AI",
      subtitle: "Practice weekly assignments step by step with AI",
      backToWeek: "Back to Week",
      currentWeek: "Current Week",
      currentPhase: "Current Phase",
      taskProgress: "Task Progress",
      completed: "Completed",
      inProgress: "In Progress",
      submit: "Submit",
      continue: "Continue",
      restart: "Restart",
      copy: "Copy",
      typing: "AI is responding...",
      placeholder: "Practice the task by chatting with AI...",
      taskObjective: "Task Objective",
      practiceSteps: "Practice Steps",
      aiHelper: "AI Helper",
      submitTask: "Submit Task",
      getHelp: "Get Help",
      viewSubmission: "View Submission",
      noData: "Loading practice data...",
      dataError: "Failed to load data. Please try again.",
      welcomeMessage: "AI Practice Assistant here! Let's learn together.",
      modeInfo: "Learning Mode Info",
      aiAnalyzing: "AI is analyzing...",
      sessionError: "Error creating session.",
      initializationError: "Error initializing AI session.",
      retryInitialization: "Retry"
    }
  };

  const t = content[language];
  const userType = getUserType();

  // 비로그인 사용자인 경우 로딩 화면 표시
  if (userType === 'guest') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {language === 'ko' ? '로그인이 필요합니다' : 'Login Required'}
          </h2>
          <p className="text-gray-500 mb-6">
            {language === 'ko' 
              ? 'AI 실습에 접근하려면 먼저 로그인해주세요.' 
              : 'Please log in to access AI practice.'}
          </p>
          <Button 
            onClick={() => onNavigate('auth')}
            className="bg-iwl-gradient hover:opacity-90 text-white"
          >
            {language === 'ko' ? '로그인하기' : 'Go to Login'}
          </Button>
        </div>
      </div>
    );
  }

  // 🤖 AI 세션 초기화
  const initializeAISession = async () => {
    try {
      setIsLoading(true);
      setInitializationError(null);

      // v115: AI 챗봇 기능이 비활성화된 경우 체크
      if (!isAiChatbotEnabled) {
        setInitializationError('AI 챗봇 기능이 현재 사용할 수 없습니다.');
        return;
      }
      
      const session = await aiService.createSession(
        user?.id || 'user-demo',
        week,
        phase,
        practiceMode
      );
      
      setCurrentSession(session);
      setMessages(session.messages.filter(msg => msg.role !== 'system'));
      setTaskProgress(session.context.learningProgress);
      
      // v114: 캐시된 프롬프트로 성능 개선된 메시지 처리 (v115: 최적화 플래그 체크)
      if (isAiOptimizationEnabled) {
        const welcomeResult = await aiService.processMessage(session.id, '시작');
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: welcomeResult.aiResponse,
          timestamp: new Date()
        }]);
        setCurrentSession(welcomeResult.updatedSession);
      }

      // v115: 세션 생성 로깅
      logAiChatbotUsage('session_created');
      
    } catch (error) {
      console.error('Failed to initialize AI session:', error);
      
      // v115: 오류 리포팅 시스템
      if (isErrorReportingEnabled) {
        const errorData = {
          timestamp: new Date().toISOString(),
          userId: user?.id || 'anonymous',
          error: error instanceof Error ? error.message : 'Unknown error',
          context: { week, phase, mode: practiceMode },
          action: 'initialize_ai_session'
        };
        localStorage.setItem('beta-error-reports', JSON.stringify([
          ...JSON.parse(localStorage.getItem('beta-error-reports') || '[]'),
          errorData
        ]));
      }
      
      setInitializationError(t.initializationError);
      toast.error(t.sessionError);
    } finally {
      setIsLoading(false);
    }
  };

  // 💬 메시지 전송 처리
  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading || !currentSession) return;
    
    setIsLoading(true);
    
    try {
      // 사용자 메시지 먼저 표시
      const userMessage: AIMessage = {
        role: 'user',
        content: currentMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      const savedMessage = currentMessage;
      setCurrentMessage('');
      
      // v115: 메시지 전송 로깅
      logAiChatbotUsage('message_sent');
      
      // AI 응답 처리
      // v114: 캐시된 프롬프트로 성능 개선된 메시지 처리 (v115: 최적화 플래그 체크)
      const result = await aiService.processMessage(currentSession.id, savedMessage);
      
      // AI 응답 추가
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: result.aiResponse,
        timestamp: new Date()
      }]);
      
      // 세션 업데이트
      setCurrentSession(result.updatedSession);
      setTaskProgress(result.updatedSession.context.learningProgress);
      
      // 완료 체크
      if (result.updatedSession.context.learningProgress >= 90) {
        setIsTaskCompleted(true);
        logAiChatbotUsage('task_completed');
      }
      
    } catch (error) {
      console.error('Failed to process message:', error);
      
      // v115: 오류 리포팅 시스템
      if (isErrorReportingEnabled) {
        const errorData = {
          timestamp: new Date().toISOString(),
          userId: user?.id || 'anonymous',
          error: error instanceof Error ? error.message : 'Unknown error',
          context: { week, phase, mode: practiceMode, messageLength: savedMessage.length },
          action: 'send_message'
        };
        localStorage.setItem('beta-error-reports', JSON.stringify([
          ...JSON.parse(localStorage.getItem('beta-error-reports') || '[]'),
          errorData
        ]));
      }
      
      toast.error('메시지 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitTask = () => {
    onNavigate('course-phase-submit', undefined, undefined, week, phase, practiceMode);
  };

  const handleBackToWeek = () => {
    onNavigate('course-week', undefined, undefined, week);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success(language === 'ko' ? '메시지가 복사되었습니다!' : 'Message copied!');
  };

  const clearChat = async () => {
    setMessages([]);
    setTaskProgress(0);
    setIsTaskCompleted(false);
    setCurrentSession(null);
    setInitializationError(null);
    toast.success(language === 'ko' ? '실습이 초기화되었습니다.' : 'Practice session reset.');
    
    // 새 세션 시작
    setTimeout(() => initializeAISession(), 500);
  };

  // 현재 모드 정보 가져오기
  const currentModeInfo = AIModeComparison[practiceMode];

  // 초기화 오류 표시
  if (initializationError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t.initializationError}</h2>
            <p className="text-gray-600 mb-6">
              AI 세션을 초기화하는 중 문제가 발생했습니다. 네트워크 연결을 확인하고 다시 시도해주세요.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={initializeAISession} className="bg-iwl-gradient text-white">
                {t.retryInitialization}
              </Button>
              <Button variant="outline" onClick={handleBackToWeek}>
                {t.backToWeek}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToWeek}
                className="text-gray-600 hover:text-iwl-purple"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToWeek}
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-iwl-purple text-iwl-purple">
                {t.currentWeek}: {week}
              </Badge>
              <Badge className="bg-iwl-gradient text-white">
                {t.currentPhase}: {phase}
              </Badge>
              <Badge className={practiceMode === 'guided' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                {currentModeInfo.name}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 lg:overflow-y-auto">
            {/* Task Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-iwl-purple" />
                  {t.taskObjective}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">{safePhaseData.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {safePhaseData.subtitle || safePhaseData.description || "이 페이즈의 실습을 AI와 함께 진행해보세요."}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>{t.taskProgress}</span>
                    <span>{taskProgress}%</span>
                  </div>
                  <Progress value={taskProgress} className="h-2" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {isTaskCompleted ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-600">{t.completed}</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="text-amber-600">{t.inProgress}</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 🎯 학습 모드 정보 */}
            <Card className="border-2 border-dashed border-iwl-purple/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-iwl-purple" />
                  {t.modeInfo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className={practiceMode === 'guided' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                      {currentModeInfo.name}
                    </Badge>
                    <span className="text-sm text-gray-600">{currentModeInfo.description}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="font-medium text-gray-700">특징:</div>
                    {currentModeInfo.characteristics.map((char, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Zap className="w-3 h-3 text-iwl-purple flex-shrink-0 mt-0.5" />
                        <span>{char}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-3 bg-iwl-purple-50 rounded-lg">
                    <div className="text-xs text-iwl-purple">
                      <strong>{currentModeInfo.suitableFor}</strong>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      AI 스타일: {currentModeInfo.aiStyle}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.practiceSteps}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleSubmitTask}
                  disabled={!isTaskCompleted}
                  className="w-full bg-iwl-gradient text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {t.submitTask}
                </Button>
                <Button
                  variant="outline"
                  onClick={clearChat}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t.restart}
                </Button>
              </CardContent>
            </Card>

            {/* AI Helper Info */}
            <Card className="border-2 border-dashed border-iwl-purple/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-iwl-purple" />
                  {t.aiHelper}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{practiceMode === 'guided' ? '단계별 체계적 가이드' : '창의적 사고 촉진'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>{practiceMode === 'guided' ? '즉시 피드백 제공' : '열린 질문과 제안'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>실시간 진도 관리</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* v115: 베타 피드백 수집 */}
            <BetaFeature flagKey="feedbackSystem" fallback={null}>
              <BetaFeedback
                featureKey="aiChatbot"
                featureName="AI 챗봇"
                context={{
                  week,
                  phase,
                  mode: practiceMode,
                  messagesCount: messages.length,
                  progress: taskProgress
                }}
              />
            </BetaFeature>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3 flex flex-col h-full">
            <Card className="flex flex-col h-full">
              {/* Chat Header */}
              <CardHeader className="flex-shrink-0 bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-iwl-purple" />
                      {week}주차 {phase}페이즈 • {currentModeInfo.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {safePhaseData.title} • {currentModeInfo.aiStyle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-iwl-purple text-iwl-purple">
                      {messages.length}개 메시지
                    </Badge>
                    {currentSession && (
                      <Badge className="bg-green-100 text-green-700">
                        세션 활성
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-4"
                style={{ minHeight: 0 }}
              >
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {t.welcomeMessage}
                    </h3>
                    <p className="text-gray-600">
                      {currentModeInfo.description} • {safePhaseData.subtitle}
                    </p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={`${message.timestamp.getTime()}-${index}`}
                      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`rounded-lg p-4 ${
                          message.role === 'user' 
                            ? 'bg-iwl-gradient text-white' 
                            : 'bg-gray-50 text-gray-900 border'
                        }`}>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              {message.role === 'user' ? (
                                <User className="w-4 h-4" />
                              ) : (
                                <Bot className="w-4 h-4" />
                              )}
                              <span className="text-xs font-medium">
                                {message.role === 'user' 
                                  ? '나' 
                                  : `AI ${currentModeInfo.name} 도우미`
                                }
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                              onClick={() => copyMessage(message.content)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </div>
                          <div className="text-xs opacity-75 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {/* 로딩 인디케이터 */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-50 rounded-lg p-4 max-w-[85%] border">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Bot className="w-4 h-4" />
                        <span className="text-xs font-medium">AI {currentModeInfo.name} 도우미</span>
                      </div>
                      <div className="text-sm mt-2 flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-iwl-purple rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-iwl-purple rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-iwl-purple rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-gray-500">{t.aiAnalyzing}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* 스크롤 앵커 */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex-shrink-0 p-6 border-t bg-white">
                <div className="flex gap-3">
                  <Textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder={t.placeholder}
                    className="flex-1 min-h-[60px] max-h-[120px] resize-none"
                    disabled={isLoading}
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
                    className="bg-iwl-gradient hover:opacity-90 text-white px-6"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>Enter로 전송, Shift+Enter로 줄바꿈</span>
                  <span>AI {currentModeInfo.name} 모드 • {week}주차 {phase}페이즈</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}