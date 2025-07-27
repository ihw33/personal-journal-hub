import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft,
  RotateCcw,
  MessageCircle,
  CheckCircle,
  Clock,
  Play,
  Eye
} from 'lucide-react';

import { PracticeBlock } from './ContentBlocks';
import { IntegratedChatbot, FloatingChatButton } from './IntegratedChatbot';
import { PhaseOverview } from './PhaseOverview';
import { SubmissionOptions } from './SubmissionOptions';
import { AICollaborationGuide } from './AICollaborationGuide';
import { JEJU_COURSE_DATA, WeekData, PhaseData } from './courseData';
import { ChatSession } from './types';
import { getModeIcon, getModeColor, getPhaseTypeIcon, getPhaseTypeColor, PHASE_CONTENT } from './phaseHelpers';

interface PhaseLearningPageProps {
  language: 'ko' | 'en';
  week: number;
  phase: number;
  mode: 'guided' | 'self-directed' | null;
  onNavigate: (page: string, journalId?: string, category?: string, week?: number, phase?: number, mode?: 'guided' | 'self-directed') => void;
}

export function PhaseLearningPage({ language, week, phase, mode, onNavigate }: PhaseLearningPageProps) {
  const [completionStatus, setCompletionStatus] = useState<'not-started' | 'in-progress' | 'completed'>('not-started');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentChatSession, setCurrentChatSession] = useState<ChatSession | null>(null);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  // 실제 주차 및 Phase 데이터 가져오기
  const weekData: WeekData = JEJU_COURSE_DATA.find(w => w.id === week) || JEJU_COURSE_DATA[0];
  const phaseData: PhaseData = weekData.phases.find(p => p.id === phase) || weekData.phases[0];
  const t = PHASE_CONTENT[language];

  useEffect(() => {
    setCompletionStatus('in-progress');
  }, [phase, mode]);

  if (!mode) {
    onNavigate('course-week', undefined, undefined, week);
    return null;
  }

  const practiceContent = mode === 'guided' ? phaseData.guidedContent : phaseData.selfDirectedContent;
  const hasNextPhase = weekData.phases.some(p => p.id === phase + 1);

  const handleComplete = () => setCompletionStatus('completed');
  const handleModeChange = () => onNavigate('course-week', undefined, undefined, week);
  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    if (hasUnreadMessages) setHasUnreadMessages(false);
  };

  const handleSubmissionChoice = (type: 'phase-submit' | 'weekly-submit' | 'continue') => {
    if (type === 'phase-submit') {
      onNavigate('course-phase-submit', undefined, undefined, week, phase, mode);
    } else if (type === 'weekly-submit') {
      onNavigate('course-submit', undefined, undefined, week);
    } else {
      const nextPhaseData = weekData.phases.find(p => p.id === phase + 1);
      if (nextPhaseData) {
        onNavigate('course-phase', undefined, undefined, week, phase + 1, mode);
      } else {
        onNavigate('course-submit', undefined, undefined, week);
      }
    }
  };

  const handleChatSessionUpdate = (session: ChatSession) => {
    setCurrentChatSession(session);
    if (session.messages.length > 0) {
      const lastMessage = session.messages[session.messages.length - 1];
      if (lastMessage.role === 'assistant' && !isChatOpen) {
        setHasUnreadMessages(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('course-week', undefined, undefined, week)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.backToWeek} {week}
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-gray-900">
                    {t.title} {phase}: {phaseData.title}
                  </h1>
                  <Badge className={getModeColor(mode)}>
                    {getModeIcon(mode)}
                    <span className="ml-1">
                      {mode === 'guided' ? '가이드형' : '자기주도형'}
                    </span>
                  </Badge>
                  <Badge className={`${getPhaseTypeColor(phaseData.type)} border`}>
                    {getPhaseTypeIcon(phaseData.type)}
                    <span className="ml-1 capitalize">{phaseData.type}</span>
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{phaseData.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleModeChange}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                {t.modeChange}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleChatToggle}
                className="gap-2 border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white"
              >
                <MessageCircle className="w-4 h-4" />
                {t.aiChatbot}
                {hasUnreadMessages && (
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </Button>
              <div className="text-right">
                <div className="text-sm text-gray-600">{t.estimatedTime}</div>
                <div className="font-semibold text-iwl-purple">{phaseData.duration}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Phase Overview */}
          <PhaseOverview 
            phase={phase}
            phaseData={phaseData}
            practiceContent={practiceContent}
            language={language}
          />

          {/* AI Collaboration Guide */}
          <AICollaborationGuide
            language={language}
            onToggleChatbot={handleChatToggle}
            hasUnreadMessages={hasUnreadMessages}
          />

          {/* Practice Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-iwl-purple-50 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-iwl-purple" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">🛠️ {t.practiceTask}</h3>
                <p className="text-gray-600">
                  {mode === 'guided' 
                    ? t.guidedApproach
                    : t.selfDirectedApproach
                  }
                </p>
              </div>
              <Badge variant="secondary" className="ml-auto">{t.title} {phase}</Badge>
            </div>

            <PracticeBlock
              phaseNumber={phase}
              title={practiceContent.title}
              duration={practiceContent.duration}
              description={practiceContent.description}
              objective={practiceContent.objective}
              thinkingProcess={practiceContent.thinkingProcess}
              selfGuideQuestions={practiceContent.selfGuideQuestions}
              examplePrompts={phaseData.aiPrompts}
              tips={practiceContent.tips}
              warnings={practiceContent.warnings}
            />
          </div>

          {/* Submission Options */}
          <SubmissionOptions
            language={language}
            week={week}
            phase={phase}
            hasNextPhase={hasNextPhase}
            onSubmissionChoice={handleSubmissionChoice}
          />

          {/* Completion Status */}
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    completionStatus === 'completed' 
                      ? 'bg-green-500' 
                      : completionStatus === 'in-progress'
                      ? 'bg-yellow-500'
                      : 'bg-gray-300'
                  }`}>
                    {completionStatus === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : completionStatus === 'in-progress' ? (
                      <Clock className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t.title} {phase} {t.phaseStatus}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {completionStatus === 'completed' 
                        ? 'AI 대화와 함께 완료됨 - 언제든 제출하거나 다음 단계로 진행하세요' 
                        : completionStatus === 'in-progress'
                        ? 'AI와 대화하며 진행 중 - 실습을 완료하고 제출 방식을 선택하세요'
                        : '시작 전'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  {completionStatus !== 'completed' && (
                    <Button 
                      onClick={handleComplete}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {t.practiceComplete}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 통합 챗봇 */}
      <IntegratedChatbot
        week={week}
        phase={phase}
        mode={mode}
        isOpen={isChatOpen}
        onToggle={handleChatToggle}
        onSessionUpdate={handleChatSessionUpdate}
      />

      {/* 플로팅 챗봇 버튼 */}
      <FloatingChatButton
        week={week}
        phase={phase}
        mode={mode}
        onToggle={handleChatToggle}
        hasUnreadMessages={hasUnreadMessages}
      />
    </div>
  );
}