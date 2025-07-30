

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
import { generateGeminiResponse } from '@/services/geminiService';
import { getCourseContext } from '@/lib/courseContext';

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
  aiProvider: 'claude' | 'chatgpt' | 'gemini';
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
  const [aiProvider, setAiProvider] = useState<'claude' | 'chatgpt' | 'gemini'>('gemini');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionKey = `chat-session-${week}`;
      const savedSession = localStorage.getItem(sessionKey);
    
    if (savedSession) {
      const parsed = JSON.parse(savedSession);
      const sessionData: ChatSession = {
        ...parsed,
        startTime: new Date(parsed.startTime),
        lastActivity: new Date(parsed.lastActivity),
        messages: parsed.messages.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) })),
        metadata: {
          ...parsed.metadata,
          phaseTransitions: parsed.metadata.phaseTransitions.map((pt: any) => ({ ...pt, timestamp: new Date(pt.timestamp) }))
        }
      };
      setSession(sessionData);
      setAiProvider(sessionData.aiProvider || 'gemini');
    } else {
      const newSession: ChatSession = {
        id: `session-${week}-${Date.now()}`,
        week,
        mode,
        startTime: new Date(),
        lastActivity: new Date(),
        currentPhase: phase,
        messages: [],
        aiProvider: 'gemini',
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

  useEffect(() => {
    if (session && session.currentPhase !== phase) {
      const updatedSession = {
        ...session,
        currentPhase: phase,
        lastActivity: new Date(),
        metadata: {
          ...session.metadata,
          phaseTransitions: [ ...session.metadata.phaseTransitions, { phase, timestamp: new Date() } ]
        }
      };
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
      const courseContext = getCourseContext();
      const fullPrompt = `${courseContext}\n\n---\n\nBased on the context above, please answer the following question.\nUser Question: ${currentMessage}`;

      const aiResponse = await generateGeminiResponse(fullPrompt);
      
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
      console.error("Error sending message:", error);
      toast.error('AI 응답 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const exportChat = () => {
    if (!session) return;
    const exportData = { session, exportedAt: new Date().toISOString() };
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
    const clearedSession = { ...session, messages: [], metadata: { ...session.metadata, totalMessages: 0, userMessages: 0, assistantMessages: 0 } };
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
    return mode === 'guided' ? <BookOpen className="w-4 h-4 text-blue-500" /> : <Rocket className="w-4 h-4 text-green-500" />;
  };

  if (!session) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onToggle}>
      <SheetContent className="w-[90vw] sm:w-[600px] lg:w-[700px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="flex items-center gap-2"><MessageCircle className="w-5 h-5 text-iwl-purple" />AI와 함께하는 Phase {phase}</SheetTitle>
                <SheetDescription className="flex items-center gap-2 mt-1">{getModeIcon()}<span>{mode === 'guided' ? '가이드형' : '자기주도형'} 모드</span><span>•</span><span>{week}주차</span></SheetDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)}><Settings className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)}>{isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</Button>
              </div>
            </div>
            {showSettings && (
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">AI 제공자</label>
                    <Select value={aiProvider} onValueChange={(value: 'claude' | 'chatgpt' | 'gemini') => setAiProvider(value)}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gemini">Gemini</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                        <SelectItem value="chatgpt">ChatGPT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">메시지 수</label>
                    <div className="mt-1 text-sm text-gray-600">{session.metadata.totalMessages}개 (사용자: {session.metadata.userMessages}, AI: {session.metadata.assistantMessages})</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" onClick={exportChat}><Download className="w-4 h-4 mr-1" />내보내기</Button>
                  <Button variant="outline" size="sm" onClick={clearChat}><Trash2 className="w-4 h-4 mr-1" />초기화</Button>
                </div>
              </div>
            )}
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>시작: {session.startTime.toLocaleTimeString()}</span></div>
              <div className="flex items-center gap-1"><Target className="w-4 h-4" /><span>Phase: {session.metadata.phaseTransitions.map(pt => pt.phase).join(' → ')}</span></div>
              <Badge variant="outline" className="border-iwl-purple text-iwl-purple">{session.metadata.totalMessages}개 메시지</Badge>
            </div>
          </SheetHeader>
          {!isMinimized && (
            <>
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {session.messages.length === 0 ? (
                    <div className="text-center py-12">
                      <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">AI와 대화를 시작해보세요!</h3>
                      <p className="text-gray-600 mb-4">Phase {phase}에 관련된 질문이나 도움이 필요한 내용을 자유롭게 말씀해주세요.</p>
                      <div className="text-sm text-gray-500">💡 팁: 이전 Phase의 대화 내용도 기억하고 있으니 연결해서 질문하셔도 됩니다!</div>
                    </div>
                  ) : (
                    session.messages.map((message) => (
                      <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className={`rounded-lg p-4 ${message.role === 'user' ? 'bg-iwl-gradient text-white' : 'bg-gray-50 text-gray-900'}`}>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">{getMessageIcon(message.messageType)}<span className="text-xs font-medium">{message.role === 'user' ? '나' : 'AI'}</span>{message.phase && (<Badge variant="outline" className="text-xs">Phase {message.phase}</Badge>)}</div>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-50 hover:opacity-100" onClick={() => copyMessage(message.content)}><Copy className="w-3 h-3" /></Button>
                            </div>
                            <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                            <div className="text-xs opacity-75 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="bg-gray-50 rounded-lg p-4 max-w-[85%]">
                        <div className="flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /><span className="text-sm">AI가 생각하고 있습니다...</span></div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              <div className="p-6 border-t bg-white">
                <div className="flex gap-3">
                  <Textarea value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} placeholder={`Phase ${phase}에 대해 AI와 대화해보세요...`} className="flex-1 min-h-[60px] resize-none" onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} />
                  <Button onClick={sendMessage} disabled={!currentMessage.trim() || isLoading} className="bg-iwl-gradient hover:opacity-90 text-white px-6"><Send className="w-4 h-4" /></Button>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500"><span>Enter로 전송, Shift+Enter로 줄바꿈</span><span>AI: {aiProvider}</span></div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface FloatingChatButtonProps {
  week: number;
  phase: number;
  mode: 'guided' | 'self-directed';
  onToggle: () => void;
  hasUnreadMessages?: boolean;
}

export function FloatingChatButton({ week, phase, mode, onToggle, hasUnreadMessages = false }: FloatingChatButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button onClick={onToggle} className="bg-iwl-gradient hover:opacity-90 text-white rounded-full w-14 h-14 shadow-lg fab-animation relative">
        <MessageCircle className="w-6 h-6" />
        {hasUnreadMessages && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"><span className="text-xs text-white font-bold">•</span></div>
        )}
      </Button>
      <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 min-w-[200px] border opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all">
        <div className="text-sm font-medium text-gray-900">AI 챗봇</div>
        <div className="text-xs text-gray-600 mt-1">Phase {phase} • {mode === 'guided' ? '가이드형' : '자기주도형'}</div>
      </div>
    </div>
  );
}
