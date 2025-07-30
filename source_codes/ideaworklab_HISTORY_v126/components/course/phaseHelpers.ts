import { BookOpen, Rocket, HelpCircle, Lightbulb, Target, Zap, CheckCircle, Brain, BarChart3 } from 'lucide-react';

export const getModeIcon = (mode: 'guided' | 'self-directed' | null) => {
  if (mode === 'guided') return <BookOpen className="w-4 h-4 text-blue-500" />;
  if (mode === 'self-directed') return <Rocket className="w-4 h-4 text-green-500" />;
  return <HelpCircle className="w-4 h-4 text-gray-500" />;
};

export const getModeColor = (mode: 'guided' | 'self-directed' | null) => {
  if (mode === 'guided') return 'bg-blue-50 border-blue-200 text-blue-700';
  if (mode === 'self-directed') return 'bg-green-50 border-green-200 text-green-700';
  return 'bg-gray-50 border-gray-200 text-gray-700';
};

export const getPhaseTypeIcon = (type: string) => {
  switch (type) {
    case 'exploration': return <Lightbulb className="w-5 h-5" />;
    case 'analysis': return <BarChart3 className="w-5 h-5" />;
    case 'synthesis': return <Zap className="w-5 h-5" />;
    case 'evaluation': return <CheckCircle className="w-5 h-5" />;
    default: return <Brain className="w-5 h-5" />;
  }
};

export const getPhaseTypeColor = (type: string) => {
  switch (type) {
    case 'exploration': return 'text-purple-600 bg-purple-100';
    case 'analysis': return 'text-blue-600 bg-blue-100';
    case 'synthesis': return 'text-green-600 bg-green-100';
    case 'evaluation': return 'text-orange-600 bg-orange-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const PHASE_CONTENT = {
  ko: {
    title: 'Phase',
    subtitle: '단계별 학습',
    backToWeek: '주차로 돌아가기',
    modeChange: '모드 변경',
    aiChatbot: 'AI 챗봇',
    estimatedTime: '예상 시간',
    objective: '이 Phase의 목표',
    aiCollaboration: 'AI와 함께 학습하기',
    connectedConversation: '연결된 대화',
    autoSave: '자동 저장',
    startChatbot: 'AI 챗봇 시작하기',
    practiceTask: '실습 과제',
    guidedApproach: '단계별 가이드를 따라 체계적으로 학습합니다',
    selfDirectedApproach: '자유롭고 창의적으로 탐구합니다',
    submissionOptions: '실습 완료 후 어떻게 진행하시겠어요?',
    phaseSubmit: 'Phase별 즉시 제출',
    continueNext: '계속 진행하기',
    weeklySubmit: '주차별 통합 제출',
    nextPhase: '다음 Phase 시작',
    weekComplete: '주차 완료',
    phaseStatus: 'Phase 진행 상태',
    practiceComplete: '실습 완료',
    checkpoints: '체크포인트',
    deliverables: '결과물'
  },
  en: {
    title: 'Phase',
    subtitle: 'Phase Learning',
    backToWeek: 'Back to Week',
    modeChange: 'Change Mode',
    aiChatbot: 'AI Chatbot',
    estimatedTime: 'Estimated Time',
    objective: 'Phase Objective',
    aiCollaboration: 'Learning with AI',
    practiceTask: 'Practice Task'
  }
};