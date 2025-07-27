import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft,
  CheckCircle,
  BookOpen,
  Rocket,
  Star,
  FileText,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

import { PhaseSubmissionForm } from './PhaseSubmissionForm';
import { PhaseSubmissionPreview } from './PhaseSubmissionPreview';
import { PHASE_SUBMISSION_CONTENT, INITIAL_SUBMISSION_DATA } from './constants';
import { PhaseSubmissionData, ChatSession, ContentText } from './types';

interface PhaseSubmissionPageProps {
  language: 'ko' | 'en';
  week: number;
  phase: number;
  mode: 'guided' | 'self-directed';
  onNavigate: (page: string, journalId?: string, category?: string, week?: number, phase?: number, mode?: 'guided' | 'self-directed') => void;
}

export function PhaseSubmissionPage({ language, week, phase, mode, onNavigate }: PhaseSubmissionPageProps) {
  const [submissionData, setSubmissionData] = useState<PhaseSubmissionData>({
    ...INITIAL_SUBMISSION_DATA,
    week,
    phase,
    learningMode: mode
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showChatPreview, setShowChatPreview] = useState(false);

  // Load chat session from localStorage
  useEffect(() => {
    const sessionKey = `chat-session-${week}`;
    const savedSession = localStorage.getItem(sessionKey);
    
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        const session: ChatSession = {
          ...parsed,
          startTime: new Date(parsed.startTime),
          lastActivity: new Date(parsed.lastActivity),
          messages: parsed.messages.map((msg: unknown) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })),
          metadata: {
            ...parsed.metadata,
            phaseTransitions: parsed.metadata.phaseTransitions.map((pt: unknown) => ({
              ...pt,
              timestamp: new Date(pt.timestamp)
            }))
          }
        };
        
        setSubmissionData(prev => ({
          ...prev,
          chatSession: session,
          aiToolUsed: session.aiProvider
        }));
      } catch (error) {
        console.error('Failed to load chat session:', error);
      }
    }
  }, [week]);

  const content = PHASE_SUBMISSION_CONTENT[language] as ContentText;
  const phaseInfo = content.phaseInfo[phase];

  const handleInputChange = (field: keyof PhaseSubmissionData, value: unknown) => {
    setSubmissionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Mock submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Phase Submission Data for Instructor:', submissionData);
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const getModeColor = () => {
    return mode === 'guided' 
      ? 'bg-blue-50 border-blue-200 text-blue-700'
      : 'bg-green-50 border-green-200 text-green-700';
  };

  const getModeIcon = () => {
    return mode === 'guided' ? (
      <BookOpen className="w-4 h-4 text-blue-500" />
    ) : (
      <Rocket className="w-4 h-4 text-green-500" />
    );
  };

  const exportChatSession = () => {
    if (!submissionData.chatSession) return;
    
    const exportData = {
      session: submissionData.chatSession,
      exportedAt: new Date().toISOString(),
      phase: phase,
      week: week,
      mode: mode
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-chat-phase${phase}-week${week}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('AI 대화 내용이 다운로드되었습니다!');
  };

  const copyConversationSummary = () => {
    if (!submissionData.chatSession) return;
    
    const summary = submissionData.chatSession.messages
      .map(msg => `[${msg.role.toUpperCase()}]: ${msg.content}`)
      .join('\n\n');
    
    navigator.clipboard.writeText(summary);
    toast.success('대화 내용이 복사되었습니다!');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="container mx-auto px-6 py-4">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('course-phase', undefined, undefined, week, phase, mode)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {content.backToPhase}
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-6 py-16 text-center">
          <Card className="max-w-2xl mx-auto border-2 border-green-200 bg-green-50">
            <CardContent className="p-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.submittedTitle}</h2>
              <p className="text-lg text-gray-600 mb-8">{content.submittedMessage}</p>
              
              {/* Phase 제출 정보 요약 */}
              <div className="bg-white rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">📋 Phase {phase} 제출 요약</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">학습 방식:</span>
                    <Badge className={`ml-2 ${getModeColor()}`}>
                      {getModeIcon()}
                      <span className="ml-1">{mode === 'guided' ? '가이드형' : '자기주도형'}</span>
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-600">AI 대화:</span>
                    <span className="ml-2 font-medium">
                      {submissionData.chatSession ? 
                        `${submissionData.chatSession.metadata.totalMessages}개 메시지` : 
                        '없음'
                      }
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">만족도:</span>
                    <div className="ml-2 inline-flex">
                      {Array.from({ length: submissionData.satisfaction }, (_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {submissionData.submissionType === 'continue-to-next' && phase < 3 ? (
                  <Button 
                    onClick={() => onNavigate('course-phase', undefined, undefined, week, phase + 1, mode)}
                    className="bg-iwl-purple hover:bg-iwl-purple/90 text-white font-semibold px-8 py-3"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    {content.nextPhase}
                  </Button>
                ) : (
                  <Button 
                    onClick={() => onNavigate('course-submit', undefined, undefined, week)}
                    className="bg-iwl-purple hover:bg-iwl-purple/90 text-white font-semibold px-8 py-3"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    {content.viewWeeklySubmission}
                  </Button>
                )}
                
                <Button 
                  variant="outline"
                  onClick={() => onNavigate('course-phase', undefined, undefined, week, phase, mode)}
                  className="border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white font-semibold px-8 py-3"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Phase 다시 보기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('course-phase', undefined, undefined, week, phase, mode)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Phase {phase}로 돌아가기
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{content.title}</h1>
                <p className="text-sm text-gray-600">{content.subtitle}</p>
              </div>
            </div>
            <Badge className={getModeColor()}>
              {getModeIcon()}
              <span className="ml-1">{mode === 'guided' ? '가이드형' : '자기주도형'}</span>
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <PhaseSubmissionForm
                submissionData={submissionData}
                content={content}
                phaseInfo={phaseInfo}
                phase={phase}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                showChatPreview={showChatPreview}
                onToggleChatPreview={() => setShowChatPreview(!showChatPreview)}
                onCopyConversation={copyConversationSummary}
                onExportChat={exportChatSession}
              />
            </div>

            {/* Instructor Preview Sidebar */}
            <div className="lg:col-span-1">
              <PhaseSubmissionPreview
                submissionData={submissionData}
                content={content}
                mode={mode}
                phase={phase}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}