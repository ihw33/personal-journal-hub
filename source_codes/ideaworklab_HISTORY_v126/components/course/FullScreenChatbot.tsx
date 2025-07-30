import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  MessageCircle,
  Send,
  Bot,
  User,
  Copy,
  Save,
  Download,
  Trash2,
  RefreshCw,
  Settings,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Zap,
  Brain,
  Target,
  BookOpen,
  Rocket,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MinusCircle,
  ArrowLeft,
  Home,
  CheckSquare,
  ArrowRight,
  Play
} from 'lucide-react';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  phase: number;
  week: number;
  messageType?: 'question' | 'insight' | 'summary' | 'guidance';
}

interface PhaseCompletion {
  [phase: number]: {
    isCompleted: boolean;
    completionTime: Date;
    completionNotes: string;
  };
}

interface ChatSession {
  id: string;
  week: number;
  mode: 'guided' | 'self-directed';
  startTime: Date;
  lastActivity: Date;
  currentPhase: number;
  messages: ChatMessage[];
  aiProvider: 'claude' | 'chatgpt';
  phaseCompletions: PhaseCompletion;
  metadata: {
    totalMessages: number;
    userMessages: number;
    assistantMessages: number;
    sessionDuration: number;
    phaseTransitions: { phase: number; timestamp: Date }[];
  };
}

interface FullScreenChatbotProps {
  week: number;
  phase: number;
  mode: 'guided' | 'self-directed';
  user: any;
  onNavigate: (page: string, params?: any, userId?: string, week?: number, phase?: number, mode?: string) => void;
  language: 'ko' | 'en';
}

export function FullScreenChatbot({ 
  week, 
  phase, 
  mode, 
  user,
  onNavigate,
  language 
}: FullScreenChatbotProps) {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiProvider, setAiProvider] = useState<'claude' | 'chatgpt'>('claude');
  const [showSettings, setShowSettings] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [completionNotes, setCompletionNotes] = useState('');
  const [useRealAI, setUseRealAI] = useState(false); // Toggle between mock and real AI
  const [showQuestionSidebar, setShowQuestionSidebar] = useState(true); // 질문 사이드바 표시 여부
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]); // 선택된 질문들
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or load existing session
  useEffect(() => {
    // 페이지 진입 시 스크롤 최상단으로
    window.scrollTo(0, 0);
    
    const sessionKey = `chat-session-${week}`;
    const savedSession = localStorage.getItem(sessionKey);
    
    if (savedSession) {
      const parsed = JSON.parse(savedSession);
      const session: ChatSession = {
        ...parsed,
        startTime: new Date(parsed.startTime),
        lastActivity: new Date(parsed.lastActivity),
        messages: parsed.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })),
        phaseCompletions: parsed.phaseCompletions || {},
        metadata: {
          ...parsed.metadata,
          phaseTransitions: parsed.metadata.phaseTransitions.map((pt: any) => ({
            ...pt,
            timestamp: new Date(pt.timestamp)
          }))
        }
      };
      setSession(session);
      setAiProvider(session.aiProvider);
    } else {
      // Create new session
      const newSession: ChatSession = {
        id: `session-${week}-${Date.now()}`,
        week,
        mode,
        startTime: new Date(),
        lastActivity: new Date(),
        currentPhase: phase,
        messages: [],
        aiProvider: 'claude',
        phaseCompletions: {},
        metadata: {
          totalMessages: 0,
          userMessages: 0,
          assistantMessages: 0,
          sessionDuration: 0,
          phaseTransitions: [{ phase, timestamp: new Date() }]
        }
      };
      setSession(newSession);
      saveSession(newSession);
    }

    // 저장된 질문들 로드 및 웰컴 메시지 추가
    loadSavedQuestions();
    addWelcomeMessageWithQuestions();
  }, [week]);

  // 저장된 질문들 로드
  const loadSavedQuestions = () => {
    const questionsData = localStorage.getItem(`questions-phase-${phase}`);
    if (questionsData) {
      const { selectedQuestions: questions } = JSON.parse(questionsData);
      setSelectedQuestions(questions || []);
    }
  };

  // 웰컴 메시지에 선택한 질문들 포함
  const addWelcomeMessageWithQuestions = () => {
    setTimeout(() => {
      if (!session) return;
      
      const questionsData = localStorage.getItem(`questions-phase-${phase}`);
      let welcomeContent = '';
      
      if (questionsData) {
        const { selectedQuestions: questions, mode: questionMode } = JSON.parse(questionsData);
        
        if (questions && questions.length > 0) {
          welcomeContent = `🎯 **Phase ${phase} AI 실습을 시작합니다!**

${questionMode === 'guided' ? '📋 **선택한 가이드 질문들:**' : '✍️ **작성한 나만의 질문들:**'}

${questions.map((q: string, index: number) => `${index + 1}. ${q}`).join('\n')}

💡 **실습 진행 방법:**
• 위 질문들을 하나씩 저에게 물어보시거나
• 질문을 변형하거나 추가해서 대화해보세요
• 자유롭게 다른 내용도 물어보실 수 있습니다

어떤 질문부터 시작해보시겠어요? 🤖✨`;
        } else {
          welcomeContent = `🎯 **Phase ${phase} AI 실습을 시작합니다!**

${mode === 'guided' ? '📋 **가이드형 학습**' : '✍️ **자기주도형 학습**'}

💬 **자유롭게 대화를 시작해보세요:**
• Phase ${phase}에 관련된 질문이나 궁금한 점
• 학습 과제에 대한 도움 요청
• 아이디어나 생각을 정리하고 싶은 내용

Phase ${phase}에 대해 어떤 것부터 이야기해볼까요? 🤖✨`;
        }
      } else {
        welcomeContent = `🎯 **Phase ${phase} AI 실습을 시작합니다!**

${mode === 'guided' ? '📋 **가이드형 학습**' : '✍️ **자기주도형 학습**'}

💬 **자유롭게 대화를 시작해보세요:**
• Phase ${phase}에 관련된 질문이나 궁금한 점
• 학습 과제에 대한 도움 요청
• 아이디어나 생각을 정리하고 싶은 내용

Phase ${phase}에 대해 어떤 것부터 이야기해볼까요? 🤖✨`;
      }

      const welcomeMessage: ChatMessage = {
        id: `welcome-${Date.now()}`,
        content: welcomeContent,
        role: 'assistant',
        timestamp: new Date(),
        phase,
        week,
        messageType: 'guidance'
      };

      setSession(prev => {
        if (!prev) return prev;
        const updatedSession = {
          ...prev,
          messages: [...prev.messages, welcomeMessage]
        };
        saveSession(updatedSession);
        return updatedSession;
      });
    }, 800);
  };

  // Handle phase transitions
  useEffect(() => {
    if (session && session.currentPhase !== phase) {
      const updatedSession = {
        ...session,
        currentPhase: phase,
        lastActivity: new Date(),
        metadata: {
          ...session.metadata,
          phaseTransitions: [
            ...session.metadata.phaseTransitions,
            { phase, timestamp: new Date() }
          ]
        }
      };
      
      // Add phase transition message
      const transitionMessage: ChatMessage = {
        id: `transition-${Date.now()}`,
        content: `🔄 Phase ${phase}로 이동했습니다. 이전 대화 내용을 참고하여 계속 진행하겠습니다.`,
        role: 'assistant',
        timestamp: new Date(),
        phase,
        week,
        messageType: 'guidance'
      };
      
      updatedSession.messages.push(transitionMessage);
      setSession(updatedSession);
      saveSession(updatedSession);
    }
    
    // Phase 변경 시 해당 Phase의 질문들 로드
    loadSavedQuestions();
  }, [phase, session]);

  const saveSession = (sessionToSave: ChatSession) => {
    const sessionKey = `chat-session-${week}`;
    localStorage.setItem(sessionKey, JSON.stringify(sessionToSave));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session?.messages]);

  const sendMessage = async () => {
    if (!currentMessage.trim() || !session || isLoading) return;

    setIsLoading(true);
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: currentMessage,
      role: 'user',
      timestamp: new Date(),
      phase,
      week,
      messageType: 'question'
    };

    const updatedSession = {
      ...session,
      messages: [...session.messages, userMessage],
      lastActivity: new Date(),
      metadata: {
        ...session.metadata,
        totalMessages: session.metadata.totalMessages + 1,
        userMessages: session.metadata.userMessages + 1
      }
    };

    setSession(updatedSession);
    setCurrentMessage('');

    try {
      // Use real AI or mock response based on toggle
      const aiResponse = useRealAI 
        ? await realAIResponse(currentMessage, phase, mode, session.messages, aiProvider)
        : await mockAIResponse(currentMessage, phase, mode, session.messages);
      
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
        phase,
        week,
        messageType: 'insight'
      };

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, assistantMessage],
        lastActivity: new Date(),
        metadata: {
          ...updatedSession.metadata,
          totalMessages: updatedSession.metadata.totalMessages + 1,
          assistantMessages: updatedSession.metadata.assistantMessages + 1
        }
      };

      setSession(finalSession);
      saveSession(finalSession);
      
    } catch (error) {
      toast.error('AI 응답 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('AI Response Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Real AI response function (placeholder for actual implementation)
  const realAIResponse = async (
    message: string, 
    currentPhase: number, 
    learningMode: 'guided' | 'self-directed',
    previousMessages: ChatMessage[],
    provider: 'claude' | 'chatgpt'
  ): Promise<string> => {
    // This would connect to actual AI APIs like OpenAI or Anthropic
    // For now, return enhanced mock response with note
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    
    const context = getPhaseContext(currentPhase, learningMode);
    const previousContext = previousMessages.slice(-5).map(msg => 
      `${msg.role}: ${msg.content}`
    ).join('\n');
    
    return `[실제 AI 연동 준비 중 - ${provider.toUpperCase()}]

**Phase ${currentPhase} ${learningMode === 'guided' ? '가이드형' : '자기주도형'} 모드**

${context}

**"${message}"에 대한 AI 분석:**

${getEnhancedResponse(message, currentPhase, learningMode)}

**맥락 기반 추천:**
- 이전 대화를 바탕으로 한 개인화된 조언
- 다음 단계로 진행하기 위한 구체적 가이드
- 창의적 관점에서의 새로운 접근 방법

더 깊이 있는 대화를 원하시면 언제든 말씀해주세요! ��✨

*실제 서비스에서는 OpenAI GPT-4, Claude 3.5 등의 최신 AI가 실시간으로 응답합니다.*`;
  };

  // Mock AI response function (현재 사용 중)
  const mockAIResponse = async (
    message: string, 
    currentPhase: number, 
    learningMode: 'guided' | 'self-directed',
    previousMessages: ChatMessage[]
  ): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const context = getPhaseContext(currentPhase, learningMode);
    
    return `**AI 학습 도우미 응답**

${context}

**"${message}"에 대한 분석:**

${getPhaseSpecificResponse(message, currentPhase, learningMode)}

**추가 학습 가이드:**
${getAdditionalGuidance(currentPhase, learningMode)}

더 궁금한 점이 있으시면 언제든 말씀해주세요! 🤖✨`;
  };

  const getPhaseContext = (phase: number, mode: 'guided' | 'self-directed'): string => {
    const contexts = {
      1: `**Phase 1: 최초 탐색 단계**
${mode === 'guided' ? '체계적인 정보 수집과 분류를 통해 제주도 여행의 기초 틀을 마련하는 단계입니다.' : '자유로운 관점으로 제주도를 탐색하며 개인만의 독특한 시각을 발견하는 단계입니다.'}`,
      2: `**Phase 2: 심화 탐색 단계**
${mode === 'guided' ? '1단계에서 수집한 정보를 여행 스타일별로 재분류하고 실용적 요소들을 추가하는 단계입니다.' : '1단계 정보를 새로운 관점으로 재구성하며 창의적인 분류 체계를 만드는 단계입니다.'}`,
      3: `**Phase 3: 수집 정리 단계**
${mode === 'guided' ? '모든 정보를 실행 가능한 체크리스트로 만들어 완성된 여행 계획을 수립하는 단계입니다.' : '나만의 독창적인 정리 방식으로 개인적 의미가 담긴 여행 프레임워크를 완성하는 단계입니다.'}`
    };
    
    return contexts[phase as keyof typeof contexts] || contexts[1];
  };

  const getPhaseSpecificResponse = (message: string, phase: number, mode: 'guided' | 'self-directed'): string => {
    const responses = {
      1: mode === 'guided' 
        ? `체계적인 카테고리별 정보 수집에 집중해보세요:
• 자연관광지: 성산일출봉, 한라산, 우도 등
• 음식: 흑돼지, 해산물, 감귤 등 특산품
• 숙박: 위치별 특성과 예산 고려
• 교통: 렌터카, 버스, 택시 비교분석
• 액티비티: 개인 취향에 맞는 체험 선별`
        : `자유로운 관점으로 제주도를 탐색해보세요:
• 감정 기반: 어떤 느낌의 여행을 원하는지
• 테마별: 힐링, 모험, 문화 등 개인적 관심사
• 독창적 접근: 남들과 다른 나만의 제주 발견
• 직관적 선택: 첫 느낌과 끌림에 따른 장소 선정`,
      2: mode === 'guided'
        ? `1단계 정보를 체계적으로 재분류해보세요:
• 힐링형: 자연과 휴식 중심의 코스
• 액티브형: 체험과 활동 중심의 코스  
• 미식형: 맛집과 특산품 중심의 코스
• 문화형: 역사와 전통 중심의 코스
각 유형별 최적의 동선과 일정을 구성하세요.`
        : `1단계 정보를 창의적으로 재구성해보세요:
• 시간대별: 일출, 낮, 일몰별 최적 장소
• 감정별: 설렘, 평온, 경이로움 등 감정 흐름
• 독특한 기준: 색깔별, 소리별, 향기별 분류
• 개인적 의미: 나에게 특별한 기준으로 재정리`,
      3: mode === 'guided'
        ? `실행 가능한 체크리스트를 만들어보세요:
• 여행 전 준비사항: 예약, 준비물, 일정 확인
• 일차별 구체적 계획: 시간, 장소, 비용 포함
• 놓치기 쉬운 포인트: 날씨, 교통, 예약 팁
• 비상 계획: 대안 코스와 변경 대응책`
        : `나만의 독창적인 완성 방식을 찾아보세요:
• 스토리보드: 여행을 이야기로 구성
• 감정 여행지도: 감정 변화 중심의 동선
• 개인적 프레임워크: 나만의 여행 철학 반영
• 창의적 기록: 독특한 방식의 여행 기록 계획`
    };
    
    return responses[phase as keyof typeof responses] || responses[1];
  };

  const getAdditionalGuidance = (phase: number, mode: 'guided' | 'self-directed'): string => {
    if (phase === 1) {
      return mode === 'guided' 
        ? "💡 정보 수집 팁: 공식 관광청 자료 → 개인 블로그 → 최신 리뷰 순으로 확인하세요."
        : "💡 창의적 탐색 팁: 검색어를 다양하게 바꿔가며 의외의 정보를 발견해보세요.";
    } else if (phase === 2) {
      return mode === 'guided'
        ? "💡 분류 팁: 각 카테고리별로 우선순위를 매기고 연관성을 찾아보세요."
        : "💡 재구성 팁: 기존의 틀을 벗어나 완전히 새로운 시각으로 접근해보세요.";
    } else {
      return mode === 'guided'
        ? "💡 실행 팁: 시간 여유를 두고 유연한 계획을 세워보세요."
        : "💡 완성 팁: 여행 후에도 기억에 남을 나만의 방식을 만들어보세요.";
    }
  };

  const getEnhancedResponse = (message: string, phase: number, mode: 'guided' | 'self-directed'): string => {
    return `${getPhaseSpecificResponse(message, phase, mode)}

**AI 맞춤 조언:**
• 메시지 분석 결과, 창의적 접근을 선호하시는 것 같습니다
• 체계적 정리보다는 직관적 선택을 중시하시네요  
• 다음 질문은 좀 더 구체적인 상황을 가정해보시면 좋겠습니다
• 개인적 경험과 연결지어 생각��보시는 것을 추천합니다`;
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('메시지가 복사되었습니다!');
  };

  // 질문 복사 기능
  const copyQuestion = (question: string) => {
    navigator.clipboard.writeText(question);
    toast.success('질문이 복사되었습니다! 채팅창에 붙여넣기 하세요.');
  };

  // 질문을 채팅창에 바로 입력
  const insertQuestion = (question: string) => {
    setCurrentMessage(question);
    toast.success('질문이 입력되었습니다!');
  };

  const getMessageIcon = (messageType?: string) => {
    switch (messageType) {
      case 'question': return <User className="w-4 h-4" />;
      case 'insight': return <Lightbulb className="w-4 h-4" />;
      case 'summary': return <FileText className="w-4 h-4" />;
      case 'guidance': return <Target className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  const getModeIcon = () => {
    return mode === 'guided' ? (
      <BookOpen className="w-4 h-4 text-blue-500" />
    ) : (
      <Rocket className="w-4 h-4 text-green-500" />
    );
  };

  const handlePhaseCompletion = () => {
    if (!session) return;

    const updatedSession = {
      ...session,
      phaseCompletions: {
        ...session.phaseCompletions,
        [phase]: {
          isCompleted: true,
          completionTime: new Date(),
          completionNotes
        }
      },
      lastActivity: new Date()
    };

    setSession(updatedSession);
    saveSession(updatedSession);
    
    toast.success(`Phase ${phase} 학습이 완료되었습니다!`);
    setShowCompletionDialog(false);
    
    // 다음 단계로 진행 옵션 제공
    setTimeout(() => {
      const shouldContinue = confirm('다음 Phase로 진행하시겠습니까?');
      if (shouldContinue && phase < 3) {
        // 다음 Phase로 이동
        onNavigate('course-phase', undefined, undefined, week, phase + 1, mode);
      } else {
        // 주차 학습 페이지로 돌아가기
        onNavigate('weekly-learning', undefined, undefined, week);
      }
    }, 1000);
  };

  const getCompletionProgress = () => {
    if (!session) return 0;
    
    // Phase별 메시지 수 계산 (현재 Phase의 메시지만)
    const phaseMessages = session.messages.filter(msg => msg.phase === phase);
    const phaseMessageCount = phaseMessages.length;
    
    // 현재 Phase의 시작 시간 찾기
    const phaseStart = session.metadata.phaseTransitions.find(pt => pt.phase === phase);
    const startTime = phaseStart ? phaseStart.timestamp : session.startTime;
    
    // 메시지 수와 대화 시간을 기반으로 진행률 계산 (매우 관대한 ��준)
    const messageScore = Math.min(phaseMessageCount / 3, 1) * 70; // 3개 메시지로 70% 달성
    const timeScore = Math.min((Date.now() - startTime.getTime()) / (1 * 60 * 1000), 1) * 30; // 1분으로 30% 달성
    
    return Math.min(messageScore + timeScore, 100);
  };

  const shouldShowCompletionButton = () => {
    if (!session) return false;
    
    // 현재 Phase가 이미 완료되었는지 확인
    const currentPhaseCompletion = session.phaseCompletions[phase];
    if (currentPhaseCompletion?.isCompleted) return false;
    
    // Phase별 메시지 수 계산
    const phaseMessages = session.messages.filter(msg => msg.phase === phase);
    const phaseMessageCount = phaseMessages.length;
    
    // 현재 Phase의 시작 시간 찾기
    const phaseStart = session.metadata.phaseTransitions.find(pt => pt.phase === phase);
    const startTime = phaseStart ? phaseStart.timestamp.getTime() : session.startTime.getTime();
    
    // 더욱 완화된 조건: 1개 이상의 메시지와 30초 이상의 학습 시간 (테스트용)
    const hasEnoughMessages = phaseMessageCount >= 1;
    const hasEnoughTime = (Date.now() - startTime) >= (30 * 1000); // 30초로 완화
    
    return hasEnoughMessages && hasEnoughTime;
  };

  const isPhaseCompleted = () => {
    return session?.phaseCompletions[phase]?.isCompleted || false;
  };

  if (!session) return null;

  const completionProgress = getCompletionProgress();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('weekly-learning', undefined, undefined, week)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                주차 학습으로 돌아가기
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-iwl-purple" />
                  <h1 className="text-xl font-bold text-gray-900">
                    AI와 함께하는 Phase {phase}
                  </h1>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  {getModeIcon()}
                  <span>{mode === 'guided' ? '가이드형' : '자기주도형'} 모드</span>
                  <span>•</span>
                  <span>{week}주차</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-iwl-purple text-white">
                {session.messages.filter(msg => msg.phase === phase).length}개 메시지
              </Badge>
              {isPhaseCompleted() && (
                <Badge className="bg-green-500 text-white flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  완료
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQuestionSidebar(!showQuestionSidebar)}
                className={selectedQuestions.length > 0 ? 'border-iwl-purple text-iwl-purple' : ''}
              >
                <FileText className="w-4 h-4 mr-1" />
                질문 ({selectedQuestions.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Progress Alert */}
          {shouldShowCompletionButton() && (
            <Alert className="mt-4 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">학습 완료 조건 달성!</span> Phase {phase} 학습을 완료하고 제출할 수 있습니다.
                  </div>
                  <Button 
                    onClick={() => setShowCompletionDialog(true)}
                    className="bg-green-600 hover:bg-green-700 text-white ml-4"
                    size="sm"
                  >
                    <CheckSquare className="w-4 h-4 mr-2" />
                    Phase 완료하기
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">AI 제공자</label>
                  <Select value={aiProvider} onValueChange={(value: 'claude' | 'chatgpt') => setAiProvider(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claude">Claude</SelectItem>
                      <SelectItem value="chatgpt">ChatGPT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">AI 모드</label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="realAI"
                      checked={useRealAI}
                      onChange={(e) => setUseRealAI(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="realAI" className="text-sm">
                      {useRealAI ? 'Real AI' : 'Mock AI'}
                    </label>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {useRealAI ? '실제 AI API 연동' : '데모용 응답'}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Phase {phase} 진행률</label>
                  <div className="mt-1 space-y-2">
                    <Progress value={completionProgress} className="h-2" />
                    <div className="text-xs text-gray-600">
                      {Math.round(completionProgress)}% 완료 
                      {session.metadata.phaseTransitions.find(pt => pt.phase === phase) && (
                        <span> • 시작: {session.metadata.phaseTransitions.find(pt => pt.phase === phase)?.timestamp.toLocaleTimeString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}  
      <div className="flex-1 flex">
        {/* Question Sidebar */}
        {showQuestionSidebar && selectedQuestions.length > 0 && (
          <div className="w-80 bg-white border-r flex flex-col">
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-iwl-purple" />
                  선택한 질문들
                </h3>
                <Badge className="bg-iwl-purple text-white text-xs">
                  {selectedQuestions.length}개
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {mode === 'guided' ? '선택한 가이드 질문들' : '작성한 나만의 질문들'}
              </p>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {selectedQuestions.map((question, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 rounded-lg p-3 border hover:border-iwl-purple/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-medium text-iwl-purple">
                        질문 {index + 1}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => insertQuestion(question)}
                          className="h-6 w-6 p-0 hover:bg-iwl-purple/10"
                          title="채팅창에 입력"
                        >
                          <ArrowRight className="w-3 h-3 text-iwl-purple" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyQuestion(question)}
                          className="h-6 w-6 p-0 hover:bg-gray-200"
                          title="복사"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {question}
                    </p>
                  </div>
                ))}
              </div>
              
              {selectedQuestions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">
                    실습 과제에서 질문을 선택하거나<br/>
                    작성하면 여기에 표시됩니다
                  </p>
                </div>
              )}
            </ScrollArea>
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-4">
            {session.messages.filter(msg => msg.phase === phase).length === 0 ? (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-medium text-gray-900 mb-2">Phase {phase} AI 대화 시작!</h3>
                <p className="text-lg text-gray-600 mb-4">
                  Phase {phase}에 관련된 질문이나 도움이 필요한 내용을 자유롭게 말씀해주세요.
                </p>
                <div className="text-sm text-gray-500">
                  💡 팁: 이전 Phase의 학습 내용도 연결해서 질문하실 수 있습니다!
                </div>
                {isPhaseCompleted() && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-center gap-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">이미 완료된 Phase입니다</span>
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                      완료 시간: {session.phaseCompletions[phase]?.completionTime.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              session.messages
                .filter(msg => msg.phase === phase || msg.messageType === 'guidance')
                .map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`rounded-xl p-6 ${
                        message.role === 'user' 
                          ? 'bg-iwl-gradient text-white' 
                          : 'bg-white text-gray-900 border shadow-sm'
                      }`}>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            {getMessageIcon(message.messageType)}
                            <span className="font-medium text-sm">
                              {message.role === 'user' ? '나' : `AI${useRealAI ? ' (Real)' : ' (Demo)'}`}
                            </span>
                            {message.phase && (
                              <Badge variant="outline" className={`text-xs ${
                                message.role === 'user' ? 'border-white/30 text-white/80' : ''
                              }`}>
                                Phase {message.phase}
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-6 w-6 p-0 opacity-50 hover:opacity-100 ${
                              message.role === 'user' ? 'text-white hover:bg-white/10' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => copyMessage(message.content)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </div>
                        <div className={`text-xs mt-3 ${
                          message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )}
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="bg-white rounded-xl p-6 max-w-[80%] border shadow-sm">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm">
                      {useRealAI ? '실�� AI가 생각하고 있습니다...' : 'AI가 생각하고 있습니다...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="bg-white border-t p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <Textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder={`Phase ${phase}에 대해 AI와 대화해보세요...${isPhaseCompleted() ? ' (이미 완료됨)' : ''}`}
                className="flex-1 min-h-[60px] resize-none text-base"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={isLoading}
              />
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={sendMessage}
                  disabled={!currentMessage.trim() || isLoading}
                  className="bg-iwl-gradient hover:opacity-90 text-white px-8 h-auto"
                >
                  <Send className="w-5 h-5" />
                </Button>
                {shouldShowCompletionButton() && (
                  <Button 
                    onClick={() => setShowCompletionDialog(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 text-sm"
                    size="sm"
                  >
                    <CheckSquare className="w-4 h-4 mr-1" />
                    완료
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
              <span>Enter로 전송, Shift+Enter로 줄바꿈</span>
              <div className="flex items-center gap-4">
                <span>AI: {useRealAI ? 'Real' : 'Demo'} ({aiProvider})</span>
                <span>Phase {phase} 진행률: {Math.round(completionProgress)}%</span>
                <span>전체 Phase: {session.metadata.phaseTransitions.map(pt => pt.phase).join(' → ')}</span>
              </div>
            </div>
          </div>
        </div>
        
        </div>
      </div>

      {/* Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Phase {phase} 학습 완료
            </DialogTitle>
            <DialogDescription>
              Phase {phase} 학습을 완료하고 제출하시겠습니까? 완료 후에는 다음 Phase로 진행하거나 주차 학습으로 돌아갈 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">학습 소감 및 메모 (선택사항)</label>
              <Textarea
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                placeholder="이번 Phase에서 배운 점이나 느낀 점을 자유롭게 작성해주세요..."
                className="mt-1"
                rows={3}
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Phase {phase} 메시지 수:</span>
                  <span className="font-medium">{session.messages.filter(msg => msg.phase === phase).length}개</span>
                </div>
                <div className="flex justify-between">
                  <span>Phase {phase} 학습 시간:</span>
                  <span className="font-medium">
                    {(() => {
                      const phaseStart = session.metadata.phaseTransitions.find(pt => pt.phase === phase);
                      const startTime = phaseStart ? phaseStart.timestamp.getTime() : session.startTime.getTime();
                      return Math.round((Date.now() - startTime) / (60 * 1000));
                    })()}분
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>진행률:</span>
                  <span className="font-medium">{Math.round(completionProgress)}%</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCompletionDialog(false)}>
              취소
            </Button>
            <Button onClick={handlePhaseCompletion} className="bg-green-600 hover:bg-green-700 text-white">
              <CheckSquare className="w-4 h-4 mr-2" />
              Phase 완료하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}