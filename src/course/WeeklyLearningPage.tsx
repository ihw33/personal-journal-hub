import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { ModeSelector } from './ModeSelector';
import { PhaseProgress } from './PhaseProgress';
import { 
  ArrowLeft,
  ArrowRight,
  Play,
  Clock,
  Target,
  CheckCircle,
  BookOpen,
  Rocket,
  Users,
  TrendingUp,
  Brain,
  Lightbulb,
  Star,
  Calendar,
  Award,
  BarChart3,
  Lock,
  AlertCircle
} from 'lucide-react';

import { JEJU_COURSE_DATA, WeekData } from './courseData';
import { IntegratedChatbot, FloatingChatButton } from './IntegratedChatbot';

interface ChatSession {
  id: string;
  week: number;
  mode: 'guided' | 'self-directed';
  startTime: Date;
  lastActivity: Date;
  currentPhase: number;
  messages: any[];
  aiProvider: 'claude' | 'chatgpt';
  metadata: {
    totalMessages: number;
    userMessages: number;
    assistantMessages: number;
    sessionDuration: number;
    phaseTransitions: { phase: number; timestamp: Date }[];
  };
}

interface WeeklyLearningPageProps {
  language: 'ko' | 'en';
  week: number;
  onNavigate: (page: string, journalId?: string, category?: string, week?: number, phase?: number, mode?: 'guided' | 'self-directed') => void;
}

function WeeklyLearningPage({ language, week, onNavigate }: WeeklyLearningPageProps) {
  const { user, getUserType } = useAuth();
  const [selectedMode, setSelectedMode] = useState<'guided' | 'self-directed' | null>(null);
  const [completedPhases, setCompletedPhases] = useState<{ [key: number]: boolean }>({});
  const [weekProgress, setWeekProgress] = useState(0);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);

  // 실제 주차 데이터 가져오기
  const weekData: WeekData = JEJU_COURSE_DATA.find(w => w.id === week) || JEJU_COURSE_DATA[0];

  // 인증 체크
  useEffect(() => {
    const userType = getUserType();
    if (userType === 'guest') {
      // 비로그인 사용자는 로그인 페이지로 리다이렉트
      onNavigate('auth');
      return;
    }
  }, [user, getUserType, onNavigate]);

  useEffect(() => {
    // 로컬 스토리지에서 진행률 로드
    const savedProgress = localStorage.getItem(`week-${week}-progress`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedPhases(progress.phases || {});
      setWeekProgress(progress.weekProgress || 0);
    }
  }, [week]);

  const content = {
    ko: {
      title: `${week}주차 학습`,
      subtitle: weekData.subtitle,
      description: weekData.description,
      backToCourse: '코스 개요로 돌아가기',
      selectMode: '학습 방식 선택',
      objectives: '학습 목표',
      outcomes: '예상 결과물',
      phases: 'Phase별 학습',
      resources: '학습 자료',
      aiCollaboration: 'AI 협력 가이드',
      startPhase: 'Phase 시작하기',
      duration: '예상 소요 시간',
      difficulty: '난이도',
      completed: '완료됨',
      inProgress: '진행 중',
      notStarted: '시작 전',
      locked: '잠금됨',
      weekProgress: '주차 진행률',
      nextWeek: '다음 주차',
      prevWeek: '이전 주차',
      guidedMode: '가이드형',
      selfDirectedMode: '자기주도형',
      beginnerLevel: '초급',
      intermediateLevel: '중급',
      advancedLevel: '고급',
      phaseLockedMessage: '이전 페이즈를 완료하면 잠금 해제됩니다',
      sequentialLearning: '순차 학습',
      sequentialDesc: '페이즈는 순서대로 진행됩니다. 이전 페이즈를 완료해야 다음 페이즈를 시작할 수 있습니다.'
    },
    en: {
      title: `Week ${week} Learning`,
      subtitle: weekData.subtitle,
      description: weekData.description,
      backToCourse: 'Back to Course Overview',
      selectMode: 'Select Learning Mode',
      objectives: 'Learning Objectives',
      outcomes: 'Expected Outcomes',
      phases: 'Phase-by-Phase Learning',
      resources: 'Learning Resources',
      aiCollaboration: 'AI Collaboration Guide',
      startPhase: 'Start Phase',
      duration: 'Estimated Duration',
      difficulty: 'Difficulty',
      completed: 'Completed',
      inProgress: 'In Progress',
      notStarted: 'Not Started',
      locked: 'Locked',
      weekProgress: 'Week Progress',
      nextWeek: 'Next Week',
      prevWeek: 'Previous Week',
      guidedMode: 'Guided',
      selfDirectedMode: 'Self-Directed',
      beginnerLevel: 'Beginner',
      intermediateLevel: 'Intermediate',
      advancedLevel: 'Advanced',
      phaseLockedMessage: 'Complete previous phase to unlock',
      sequentialLearning: 'Sequential Learning',
      sequentialDesc: 'Phases must be completed in order. Complete the previous phase to start the next one.'
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
              ? '주차별 학습에 접근하려면 먼저 로그인해주세요.' 
              : 'Please log in to access weekly learning.'}
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

  const handleModeSelect = (mode: 'guided' | 'self-directed') => {
    setSelectedMode(mode);
  };

  const handlePhaseStart = (phaseId: number) => {
    if (!selectedMode) return;
    setCurrentPhase(phaseId);
    setIsChatbotOpen(true);
    // 기존 방식도 유지 (실제 Phase 페이지로 이동)
    // onNavigate('course-phase', undefined, undefined, week, phaseId, selectedMode);
  };

  const handleChatSessionUpdate = (session: ChatSession) => {
    setChatSession(session);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // 페이즈 잠금 상태 확인
  const isPhaseUnlocked = (phaseId: number) => {
    if (phaseId === 1) return true; // 첫 번째 페이즈는 항상 열려있음
    return completedPhases[phaseId - 1]; // 이전 페이즈가 완료되어야 함
  };

  const calculateProgress = () => {
    const totalPhases = weekData.phases.length;
    const completed = Object.values(completedPhases).filter(Boolean).length;
    return totalPhases > 0 ? Math.round((completed / totalPhases) * 100) : 0;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return t.beginnerLevel;
      case 'intermediate': return t.intermediateLevel;
      case 'advanced': return t.advancedLevel;
      default: return t.beginnerLevel;
    }
  };

  const getPhaseTypeIcon = (type: string) => {
    switch (type) {
      case 'exploration': return <Lightbulb className="w-4 h-4" />;
      case 'analysis': return <BarChart3 className="w-4 h-4" />;
      case 'synthesis': return <Target className="w-4 h-4" />;
      case 'evaluation': return <Award className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getPhaseTypeColor = (type: string) => {
    switch (type) {
      case 'exploration': return 'bg-purple-100 text-purple-700';
      case 'analysis': return 'bg-blue-100 text-blue-700';
      case 'synthesis': return 'bg-green-100 text-green-700';
      case 'evaluation': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPhaseStatus = (phaseId: number) => {
    if (completedPhases[phaseId]) {
      return { status: 'completed', color: 'bg-green-100 text-green-700 border-green-300', text: t.completed };
    } else if (!isPhaseUnlocked(phaseId)) {
      return { status: 'locked', color: 'bg-gray-100 text-gray-500 border-gray-300', text: t.locked };
    } else {
      return { status: 'available', color: 'bg-blue-100 text-blue-700 border-blue-300', text: t.notStarted };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('course-jeju')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.backToCourse}
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={getDifficultyColor(weekData.difficulty)}>
                {getDifficultyText(weekData.difficulty)}
              </Badge>
              <div className="text-right">
                <div className="text-sm text-gray-600">{t.duration}</div>
                <div className="font-semibold text-iwl-purple">{weekData.duration}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Week Overview */}
          <Card className="border-2 border-iwl-purple/20 bg-iwl-purple-50">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {week}주차: {weekData.title}
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">{weekData.description}</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-iwl-purple mb-1">
                    {calculateProgress()}%
                  </div>
                  <div className="text-sm text-gray-600">{t.weekProgress}</div>
                  <Progress value={calculateProgress()} className="w-24 mt-2" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 rounded-xl p-6 border border-iwl-purple/20">
                  <div className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-iwl-purple mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg">🎯 {t.objectives}</h4>
                      <ul className="space-y-2">
                        {weekData.objectives.map((objective, index) => (
                          <li key={index} className="text-gray-700 flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 rounded-xl p-6 border border-iwl-purple/20">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-iwl-blue mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg">📊 {t.outcomes}</h4>
                      <ul className="space-y-2">
                        {weekData.outcomes.map((outcome, index) => (
                          <li key={index} className="text-gray-700 flex items-start gap-2">
                            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mode Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-iwl-purple" />
                {t.selectMode}
              </CardTitle>
              <p className="text-gray-600">학습 스타일에 맞는 방식을 선택하세요</p>
            </CardHeader>
            <CardContent>
              <ModeSelector 
                selectedMode={selectedMode} 
                onModeSelect={handleModeSelect}
                language={language}
              />
            </CardContent>
          </Card>

          {/* Sequential Learning Notice */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2 text-lg">📚 {t.sequentialLearning}</h4>
                  <p className="text-blue-800">{t.sequentialDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phase Learning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-iwl-purple" />
                {t.phases}
              </CardTitle>
              <p className="text-gray-600">단계별로 체계적인 학습을 진행합니다</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weekData.phases.map((phase, index) => {
                  const isUnlocked = isPhaseUnlocked(phase.id);
                  const phaseStatus = getPhaseStatus(phase.id);
                  
                  return (
                    <Card 
                      key={phase.id}
                      className={`transition-all duration-200 border-2 ${
                        isUnlocked && selectedMode 
                          ? 'border-iwl-purple/30 hover:border-iwl-purple/50 hover:shadow-md' 
                          : !isUnlocked
                          ? 'border-gray-200 bg-gray-50'
                          : 'border-gray-200 opacity-60'
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              isUnlocked 
                                ? completedPhases[phase.id] 
                                  ? 'bg-green-100' 
                                  : 'bg-iwl-purple-100'
                                : 'bg-gray-100'
                            }`}>
                              {!isUnlocked ? (
                                <Lock className="w-5 h-5 text-gray-400" />
                              ) : completedPhases[phase.id] ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <span className="font-bold text-iwl-purple">P{phase.id}</span>
                              )}
                            </div>
                            <div className={`${!isUnlocked ? 'opacity-50' : ''}`}>
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900 text-lg">{phase.title}</h4>
                                <Badge className={getPhaseTypeColor(phase.type)}>
                                  {getPhaseTypeIcon(phase.type)}
                                  <span className="ml-1 capitalize">{phase.type}</span>
                                </Badge>
                              </div>
                              <p className="text-gray-600 mb-2">{phase.subtitle}</p>
                              <p className="text-sm text-gray-500">{phase.description}</p>
                              <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Clock className="w-4 h-4" />
                                  {phase.duration}
                                </div>
                                <div className="text-sm text-gray-500">
                                  체크포인트: {phase.checkpoints.length}개
                                </div>
                                <div className="text-sm text-gray-500">
                                  결과물: {phase.deliverables.length}개
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={phaseStatus.color}>
                              {phaseStatus.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                              {phaseStatus.status === 'locked' && <Lock className="w-3 h-3 mr-1" />}
                              {phaseStatus.text}
                            </Badge>
                            <Button
                              onClick={() => handlePhaseStart(phase.id)}
                              disabled={!selectedMode || !isUnlocked}
                              className={`${
                                selectedMode && isUnlocked
                                  ? 'bg-iwl-purple hover:bg-iwl-purple/90 text-white' 
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {!isUnlocked ? (
                                <Lock className="w-4 h-4 mr-2" />
                              ) : (
                                <Play className="w-4 h-4 mr-2" />
                              )}
                              {!isUnlocked ? t.locked : t.startPhase}
                            </Button>
                          </div>
                        </div>
                        
                        {/* 잠금된 페이즈 메시지 */}
                        {!isUnlocked && (
                          <div className="mt-4 p-3 bg-gray-100 rounded-lg border-l-4 border-gray-300">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <AlertCircle className="w-4 h-4" />
                              {t.phaseLockedMessage}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* AI Collaboration Guide */}
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Brain className="w-5 h-5" />
                {t.aiCollaboration}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <h4 className="font-medium text-green-900 mb-3">🤖 이번 주차 AI 협력 가이드</h4>
                  <p className="text-green-800 mb-4">{weekData.aiCollaboration.overview}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-green-900 mb-2">핵심 기법</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        {weekData.aiCollaboration.keyTechniques.map((technique, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            {technique}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-green-900 mb-2">주의사항</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        {weekData.aiCollaboration.commonPitfalls.map((pitfall, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            {pitfall}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-iwl-purple" />
                {t.resources}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {weekData.resources.map((resource, index) => (
                  <div key={resource.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{resource.title}</h4>
                      <div className="flex gap-2">
                        <Badge variant={resource.required ? "default" : "secondary"} className="text-xs">
                          {resource.required ? '필수' : '선택'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                    <div className="flex gap-2">
                      {resource.url && (
                        <Button variant="outline" size="sm">
                          링크 열기
                        </Button>
                      )}
                      {resource.downloadable && (
                        <Button variant="outline" size="sm">
                          다운로드
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Week Navigation */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  {week > 1 && (
                    <Button 
                      variant="outline"
                      onClick={() => onNavigate('course-week', undefined, undefined, week - 1)}
                      className="gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {week - 1}주차: {JEJU_COURSE_DATA.find(w => w.id === week - 1)?.title}
                    </Button>
                  )}
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">전체 진행률</div>
                  <div className="text-lg font-bold text-iwl-purple">{week}/8 주차</div>
                  <Progress value={(week / 8) * 100} className="w-32 mt-2" />
                </div>

                <div>
                  {week < 8 && (
                    <Button 
                      onClick={() => onNavigate('course-week', undefined, undefined, week + 1)}
                      className="bg-iwl-purple hover:bg-iwl-purple/90 text-white gap-2"
                    >
                      {week + 1}주차: {JEJU_COURSE_DATA.find(w => w.id === week + 1)?.title}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Integrated Chatbot */}
      {selectedMode && (
        <>
          <IntegratedChatbot
            week={week}
            phase={currentPhase}
            mode={selectedMode}
            isOpen={isChatbotOpen}
            onToggle={toggleChatbot}
            onSessionUpdate={handleChatSessionUpdate}
          />
          
          <FloatingChatButton
            week={week}
            phase={currentPhase}
            mode={selectedMode}
            onToggle={toggleChatbot}
            hasUnreadMessages={false}
          />
        </>
      )}
    </div>
  );
}

export { WeeklyLearningPage };