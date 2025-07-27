import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
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
  MinusCircle
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

interface ChatSession {
  id: string;
  week: number;
  mode: 'guided' | 'self-directed';
  startTime: Date;
  lastActivity: Date;
  currentPhase: number;
  messages: ChatMessage[];
  aiProvider: 'claude' | 'chatgpt';
  metadata: {
    totalMessages: number;
    userMessages: number;
    assistantMessages: number;
    sessionDuration: number;
    phaseTransitions: { phase: number; timestamp: Date }[];
  };
}

interface IntegratedChatbotProps {
  week: number;
  phase: number;
  mode: 'guided' | 'self-directed';
  isOpen: boolean;
  onToggle: () => void;
  onSessionUpdate: (session: ChatSession) => void;
}

export function IntegratedChatbot({ 
  week, 
  phase, 
  mode, 
  isOpen, 
  onToggle,
  onSessionUpdate 
}: IntegratedChatbotProps) {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiProvider, setAiProvider] = useState<'claude' | 'chatgpt'>('claude');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or load existing session (SSR 안전)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionKey = `chat-session-${week}`;
      const savedSession = localStorage.getItem(sessionKey);
    
    if (savedSession) {
      const parsed = JSON.parse(savedSession);
      // Convert date strings back to Date objects
      const session: ChatSession = {
        ...parsed,
        startTime: new Date(parsed.startTime),
        lastActivity: new Date(parsed.lastActivity),
        messages: parsed.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })),
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
    }
  }, [week]);

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
  }, [phase, session]);

  const saveSession = (sessionToSave: ChatSession) => {
    const sessionKey = `chat-session-${week}`;
    localStorage.setItem(sessionKey, JSON.stringify(sessionToSave));
    onSessionUpdate(sessionToSave);
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
      // Mock AI response (in real implementation, call actual AI API)
      const aiResponse = await mockAIResponse(currentMessage, phase, mode, session.messages);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  // Mock AI response function (replace with actual AI API calls)
  const mockAIResponse = async (
    message: string, 
    currentPhase: number, 
    learningMode: 'guided' | 'self-directed',
    previousMessages: ChatMessage[]
  ): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get context from previous messages
    const recentContext = previousMessages
      .slice(-6) // Last 6 messages for context
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    // Phase-specific responses
    const phaseContext = {
      1: "최초 탐색 단계에서 제주도 여행 정보를 체계적으로 수집하는 중입니다.",
      2: "심화 탐색 단계에서 수집된 정보를 재분류하고 심화하는 중입니다.", 
      3: "수집 정리 단계에서 모든 정보를 실행 가능한 형태로 정리하는 중입니다."
    };

    // Mode-specific approach
    const modeContext = learningMode === 'guided' 
      ? "가이드형 모드로 단계별 템플릿을 활용한 체계적 접근을 하고 있습니다."
      : "자기주도형 모드로 창의적이고 독창적인 접근을 시도하고 있습니다.";

    // Generate contextual response
    return `안녕하세요! ${phaseContext[currentPhase as keyof typeof phaseContext]} ${modeContext}

이전 대화를 참고하여 답변드리겠습니다:

**${message}에 대한 AI 답변:**

${getPhaseSpecificResponse(message, currentPhase, learningMode)}

더 궁금한 점이 있으시면 언제든 말씀해주세요. 이전 대화 내용도 계속 기억하고 있으니 연결해서 생각해보겠습니다! 🤖✨`;
  };

  const getPhaseSpecificResponse = (message: string, phase: number, mode: 'guided' | 'self-directed'): string => {
    const responses = {
      1: mode === 'guided' 
        ? "1단계에서는 체계적인 카테고리별 정보 수집이 중요합니다. 제공된 템플릿을 활용하여 자연관광지, 음식, 숙박, 교통, 액티비티 순서로 차근차근 정보를 모아보세요."
        : "1단계에서는 자유로운 관점으로 제주도를 탐색해보세요. 감정 기반, 테마별, 또는 개인적 관심사 중심으로 독창적인 접근을 시도해보시기 바랍니다.",
      2: mode === 'guided'
        ? "2단계에서는 1단계 정보를 여행 스타일별로 재분류하고 실용적 요소들을 추가합니다. 힐링형, 액티브형, 미식형, 문화형으로 나누어 체계적으로 정리해보세요."
        : "2단계에서는 1단계 정보를 새로운 관점으로 재구성해보세요. 시간대별, 감정별, 또는 나만의 독특한 기준으로 창의적인 분류를 시도해보시기 바랍니다.",
      3: mode === 'guided'
        ? "3단계에서는 모든 정보를 실행 가능한 체크리스트로 만듭니다. 여행 전 준비사항, 일차별 계획, 놓치기 쉬운 포인트까지 구체적으로 정리해보세요."
        : "3단계에서는 나만의 독창적인 정리 방식을 찾아보세요. 스토리보드, 감정 여행지도, 또는 개인적 의미가 담긴 프레임워크로 완성해보시기 바랍니다."
    };
    
    return responses[phase as keyof typeof responses] || responses[1];
  };

  const exportChat = () => {
    if (!session) return;
    
    const exportData = {
      session: session,
      exportedAt: new Date().toISOString(),
      summary: {
        week: session.week,
        mode: session.mode,
        totalMessages: session.metadata.totalMessages,
        duration: Math.round((new Date().getTime() - session.startTime.getTime()) / 1000 / 60),
        phasesCovered: [...new Set(session.messages.map(m => m.phase))]
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-session-week${week}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('대화 내용이 다운로드되었습니다!');
  };

  const clearChat = () => {
    if (!session) return;
    
    const clearedSession = {
      ...session,
      messages: [],
      metadata: {
        ...session.metadata,
        totalMessages: 0,
        userMessages: 0,
        assistantMessages: 0
      }
    };
    
    setSession(clearedSession);
    saveSession(clearedSession);
    toast.success('대화 내용이 초기화되었습니다.');
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('메시지가 복사되었습니다!');
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

  if (!session) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onToggle}>
      <SheetContent className="w-[90vw] sm:w-[600px] lg:w-[700px] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-iwl-purple" />
                  AI와 함께하는 Phase {phase}
                </SheetTitle>
                <SheetDescription className="flex items-center gap-2 mt-1">
                  {getModeIcon()}
                  <span>{mode === 'guided' ? '가이드형' : '자기주도형'} 모드</span>
                  <span>•</span>
                  <span>{week}주차</span>
                </SheetDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <div className="grid grid-cols-2 gap-4">
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
                    <label className="text-sm font-medium">메시지 수</label>
                    <div className="mt-1 text-sm text-gray-600">
                      {session.metadata.totalMessages}개 (사용자: {session.metadata.userMessages}, AI: {session.metadata.assistantMessages})
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" onClick={exportChat}>
                    <Download className="w-4 h-4 mr-1" />
                    내보내기
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearChat}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    초기화
                  </Button>
                </div>
              </div>
            )}

            {/* Session Status */}
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>시작: {session.startTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>Phase: {session.metadata.phaseTransitions.map(pt => pt.phase).join(' → ')}</span>
              </div>
              <Badge variant="outline" className="border-iwl-purple text-iwl-purple">
                {session.metadata.totalMessages}개 메시지
              </Badge>
            </div>
          </SheetHeader>

          {!isMinimized && (
            <>
              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {session.messages.length === 0 ? (
                    <div className="text-center py-12">
                      <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">AI와 대화를 시작해보세요!</h3>
                      <p className="text-gray-600 mb-4">
                        Phase {phase}에 관련된 질문이나 도움이 필요한 내용을 자유롭게 말씀해주세요.
                      </p>
                      <div className="text-sm text-gray-500">
                        💡 팁: 이전 Phase의 대화 내용도 기억하고 있으니 연결해서 질문하셔도 됩니다!
                      </div>
                    </div>
                  ) : (
                    session.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className={`rounded-lg p-4 ${
                            message.role === 'user' 
                              ? 'bg-iwl-gradient text-white' 
                              : 'bg-gray-50 text-gray-900'
                          }`}>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                {getMessageIcon(message.messageType)}
                                <span className="text-xs font-medium">
                                  {message.role === 'user' ? '나' : 'AI'}
                                </span>
                                {message.phase && (
                                  <Badge variant="outline" className="text-xs">
                                    Phase {message.phase}
                                  </Badge>
                                )}
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
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="bg-gray-50 rounded-lg p-4 max-w-[85%]">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span className="text-sm">AI가 생각하고 있습니다...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-6 border-t bg-white">
                <div className="flex gap-3">
                  <Textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder={`Phase ${phase}에 대해 AI와 대화해보세요...`}
                    className="flex-1 min-h-[60px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!currentMessage.trim() || isLoading}
                    className="bg-iwl-gradient hover:opacity-90 text-white px-6"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>Enter로 전송, Shift+Enter로 줄바꿈</span>
                  <span>AI: {aiProvider}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Floating Chat Button Component
interface FloatingChatButtonProps {
  week: number;
  phase: number;
  mode: 'guided' | 'self-directed';
  onToggle: () => void;
  hasUnreadMessages?: boolean;
}

export function FloatingChatButton({ 
  week, 
  phase, 
  mode, 
  onToggle, 
  hasUnreadMessages = false 
}: FloatingChatButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onToggle}
        className="bg-iwl-gradient hover:opacity-90 text-white rounded-full w-14 h-14 shadow-lg fab-animation relative"
      >
        <MessageCircle className="w-6 h-6" />
        {hasUnreadMessages && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">•</span>
          </div>
        )}
      </Button>
      <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 min-w-[200px] border opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all">
        <div className="text-sm font-medium text-gray-900">AI 챗봇</div>
        <div className="text-xs text-gray-600 mt-1">
          Phase {phase} • {mode === 'guided' ? '가이드형' : '자기주도형'}
        </div>
      </div>
    </div>
  );
}