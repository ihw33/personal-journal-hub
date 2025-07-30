import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
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
  Eye,
  Zap,
  BookOpen,
  Lock
} from 'lucide-react';

import { PracticeBlock } from './ContentBlocks';
import { PhaseOverview } from './PhaseOverview';
import { SubmissionOptions } from './SubmissionOptions';
import { JEJU_COURSE_DATA, WeekData, PhaseData } from './courseData';
import { ChatSession } from './types';
import { getModeIcon, getModeColor, getPhaseTypeIcon, getPhaseTypeColor, PHASE_CONTENT } from './phaseHelpers';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  user_type: 'guest' | 'member' | 'instructor' | 'admin';
  subscription_status?: 'active' | 'inactive' | 'trial';
  personalizationData?: any;
}

interface PhaseLearningPageProps {
  language: 'ko' | 'en';
  week: number;
  phase: number;
  mode: 'guided' | 'self-directed' | null;
  onNavigate: (page: string, journalId?: string, category?: string, week?: number, phase?: number, mode?: 'guided' | 'self-directed') => void;
}

export function PhaseLearningPage({ language, week, phase, mode, onNavigate }: PhaseLearningPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [completionStatus, setCompletionStatus] = useState<'not-started' | 'in-progress' | 'completed'>('not-started');

  // 실제 주차 및 Phase 데이터 가져오기
  const weekData: WeekData = JEJU_COURSE_DATA.find(w => w.id === week) || JEJU_COURSE_DATA[0];
  const phaseData: PhaseData = weekData.phases.find(p => p.id === phase) || weekData.phases[0];
  const t = PHASE_CONTENT[language];

  // 인증 체크 - App.tsx에서 이미 처리하므로 제거

  useEffect(() => {
    setCompletionStatus('in-progress');
    // 페이지 진입 시 스크롤 최상단으로
    window.scrollTo(0, 0);
  }, [phase, mode]);

  // App.tsx에서 사용자 인증이 이미 처리되므로 바로 진행


  if (!mode) {
    onNavigate('weekly-learning', undefined, undefined, week);
    return null;
  }

  const practiceContent = mode === 'guided' ? phaseData.guidedContent : phaseData.selfDirectedContent;
  const hasNextPhase = weekData.phases.some(p => p.id === phase + 1);

  const handleComplete = () => setCompletionStatus('completed');
  const handleModeChange = () => onNavigate('weekly-learning', undefined, undefined, week);

  // AI 실습으로 이동하는 핸들러
  const handleStartAIPractice = () => {
    onNavigate('course-phase', undefined, undefined, week, phase, mode);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('weekly-learning', undefined, undefined, week)}
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

          {/* 📚 실습과제 내용 섹션 - 가장 먼저 표시 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-iwl-purple-50 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-iwl-purple" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">📚 실습과제 상세 내용</h3>
                <p className="text-gray-600">
                  아래 과제 내용을 충분히 읽고 이해한 후, AI와 함께 실습을 진행하세요
                </p>
              </div>
              <Badge variant="secondary" className="ml-auto">{t.title} {phase}</Badge>
            </div>

            {/* 과제 내용 상세 */}
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
              mode={mode} // 모드 정보 전달
              onStartPractice={handleStartAIPractice}
            />
          </div>

          {/* 🤖 AI 실습 시작 섹션 - 과제 내용을 읽은 후에 배치 */}
          <Card className="border-2 border-iwl-purple/20 bg-gradient-to-br from-iwl-purple-50 to-iwl-blue-50">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-iwl-gradient rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    🤖 과제를 충분히 읽으셨나요?
                  </h3>
                  <p className="text-lg text-iwl-purple font-medium mb-3">
                    이제 AI와 함께 실습을 시작해보세���!
                  </p>
                  <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
                    위에서 읽은 과제 내용을 바탕으로 AI와의 실시간 대화를 통해 단계별로 실습을 진행합니다. 
                    모든 대화 내용은 자동으로 저장되며, Phase가 바뀌어도 이전 대화 맥락이 유지됩니다.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="bg-white/80 rounded-lg p-4 border border-iwl-purple/20">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-5 h-5 text-iwl-purple" />
                      <span className="font-medium text-gray-900">연결된 대화</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Phase 1→2→3까지 하나의 연결된 대화로 진행되어 맥락이 끊어지지 않습니다.
                    </p>
                  </div>
                  
                  <div className="bg-white/80 rounded-lg p-4 border border-iwl-purple/20">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-iwl-blue" />
                      <span className="font-medium text-gray-900">자동 저장</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      모든 대화 내용이 실시간으로 저장되어 제출 시 자동으로 포함됩니다.
                    </p>
                  </div>
                </div>

                <div className="bg-white/60 rounded-lg p-6 border border-iwl-purple/30">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="w-8 h-8 bg-iwl-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-iwl-purple">{phase}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{phaseData.title}</h4>
                    <Badge className="bg-iwl-gradient text-white">{phaseData.duration}</Badge>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {practiceContent.description}
                  </p>
                  
                  <Button 
                    onClick={handleStartAIPractice}
                    size="lg"
                    className="bg-iwl-gradient hover:opacity-90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all w-full"
                    id="ai-practice-start-btn"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    AI 실습 시작하기
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      💡 위에서 선택하거나 작성한 질문들이 AI 실습에서 활용됩니다
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-500 bg-white/50 rounded-lg p-4">
                  💡 <strong>실습 진행 방법:</strong> 위 버튼을 클릭하면 AI 실습 페이지로 이동하여 
                  해당 Phase의 과제를 AI와 함께 단계별로 진행할 수 있습니다. 
                  과제 내용에서 제공된 질문들과 예시 프롬프트를 활용해보세요!
                </div>
              </div>
            </CardContent>
          </Card>

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
    </div>
  );
}