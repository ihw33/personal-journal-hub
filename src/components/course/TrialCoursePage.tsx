"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  CheckCircle, 
  Clock, 
  Star, 
  MapPin, 
  Brain, 
  MessageCircle, 
  Target,
  Sparkles,
  BookOpen,
  Users,
  Award,
  Lock,
  Unlock,
  Coffee,
  Lightbulb,
  FileText,
  Video,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { useBetaFlag, BetaFeature } from '../../lib/betaFlags';
import { BetaFeedback } from '../ui/BetaFeedback';

interface TrialCoursePageProps {
  language: 'ko' | 'en';
  onNavigate: (page: string, journalId?: string, category?: string, week?: number, phase?: number, mode?: 'guided' | 'self-directed') => void;
}

export function TrialCoursePage({ language, onNavigate }: TrialCoursePageProps) {
  const { user, getUserType } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // v115: 베타 기능 플래그 hooks
  const { isEnabled: isTrialCourseEnabled, logUsage: logTrialCourseUsage } = useBetaFlag('trialCourse');
  const { isEnabled: isFeedbackSystemEnabled } = useBetaFlag('feedbackSystem');

  const userType = getUserType();

  // 비로그인 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (userType === 'guest') {
      toast.info('체험강의는 회원가입 후 이용 가능합니다.');
      onNavigate('auth');
      return;
    }

    // v115: 체험강의 접근 로깅
    if (isTrialCourseEnabled) {
      logTrialCourseUsage('page_loaded');
    }
  }, [userType, onNavigate, isTrialCourseEnabled, logTrialCourseUsage]);

  const content = {
    ko: {
      title: '무료 체험강의',
      subtitle: 'AI와 함께하는 여행 기획 맛보기',
      welcomeTitle: '체험강의에 오신 것을 환영합니다!',
      welcomeDescription: '30분 체험으로 AI 협업의 매력을 느껴보세요',
      duration: '약 30분 소요',
      freeLabel: '무료',
      trialComplete: '체험완료',
      startTrial: '체험 시작하기',
      nextStep: '다음 단계',
      prevStep: '이전 단계',
      backToHome: '홈으로 돌아가기',
      completeTrial: '체험 완료하기',
      upgradeNow: '정식 과정 시작하기',
      congratsTitle: '🎉 체험강의 완주를 축하합니다!',
      congratsMessage: '이제 정식 과정에서 더 깊이 있는 AI 협업을 경험해보세요',
      learnedTitle: '체험에서 배운 것들',
      nextStepsTitle: '다음 단계 안내',
      fullCourseFeatures: {
        title: '정식 과정에서는',
        items: [
          '8주 완성 커리큘럼',
          '개인 맞춤 AI 멘토',
          '실제 여행 계획 완성',
          '커뮤니티 멤버십',
          '수료증 발급'
        ]
      },
      steps: [
        {
          id: 1,
          title: 'AI와 첫 만남',
          description: 'AI 협업의 기본 원리를 이해해보세요',
          duration: '5분',
          type: 'introduction',
          content: {
            title: 'AI와의 협업이란?',
            description: 'AI는 당신의 생각을 확장시켜주는 파트너입니다',
            keyPoints: [
              'AI는 도구가 아닌 협업 파트너',
              '인간의 창의성 + AI의 정보처리력',
              '더 나은 결과를 위한 시너지',
              '효율적인 의사결정 지원'
            ],
            tips: [
              '명확한 질문하기',
              '구체적인 정보 제공하기',
              '피드백 주고받기',
              '창의적 아이디어 발전시키기'
            ]
          }
        },
        {
          id: 2,
          title: '제주도 기본 정보 수집',
          description: 'AI와 함께 제주도의 매력을 탐색해보세요',
          duration: '10분',
          type: 'research',
          content: {
            title: '제주도 여행 계획의 시작',
            description: 'AI와 함께 제주도의 숨겨진 매력을 발견해보세요',
            prompt: '제주도 3박 4일 여행을 계획하고 있어요. 봄 시즌(4월)에 방문 예정이고, 자연 경관과 로컬 맛집을 좋아합니다. 어떤 지역들을 중심으로 여행하면 좋을까요?',
            expectedResponse: 'AI가 제안할 수 있는 내용들',
            keyAreas: [
              '서귀포 - 천지연폭포, 정방폭포',
              '성산일출봉 - 일출 명소',
              '한라산 - 봄 철쭉 감상',
              '제주시 - 동문시장, 흑돼지 거리'
            ]
          }
        },
        {
          id: 3,
          title: '개인 맞춤 일정 만들기',
          description: 'AI와 대화하며 나만의 여행 일정을 설계해보세요',
          duration: '10분',
          type: 'planning',
          content: {
            title: '나만의 제주도 여행 일정',
            description: '개인의 취향과 상황을 반영한 맞춤 일정을 만들어보세요',
            scenarios: [
              {
                title: '커플 여행객',
                preference: '로맨틱한 장소, 사진 스팟',
                suggestion: '성산일출봉 일출 → 섭지코지 → 월정리 해변'
              },
              {
                title: '가족 여행객',
                preference: '아이들이 즐길 수 있는 곳',
                suggestion: '테디베어박물관 → 한라산 둘레길 → 제주 민속촌'
              },
              {
                title: '혼자 여행객',
                preference: '힐링과 여유로운 시간',
                suggestion: '카페 투어 → 해안 산책로 → 독서하기 좋은 장소'
              }
            ]
          }
        },
        {
          id: 4,
          title: '체험 완료',
          description: '축하합니다! AI 협업의 가능성을 경험하셨습니다',
          duration: '5분',
          type: 'completion',
          content: {
            title: '체험강의 완주 축하합니다!',
            description: '이제 정식 과정에서 더 깊이 있는 학습을 시작해보세요',
            achievements: [
              'AI 협업의 기본 원리 이해',
              '효과적인 질문법 습득',
              '개인 맞춤 결과 도출',
              'AI와의 창의적 대화 경험'
            ],
            nextSteps: [
              '정식 8주 과정 수강',
              '개인 AI 멘토와 1:1 학습',
              '실제 여행 계획 완성',
              '커뮤니티 참여 및 경험 공유'
            ]
          }
        }
      ]
    },
    en: {
      title: 'Free Trial Course',
      subtitle: 'AI-Powered Travel Planning Preview',
      welcomeTitle: 'Welcome to the Trial Course!',
      welcomeDescription: 'Experience the magic of AI collaboration in 30 minutes',
      duration: 'About 30 minutes',
      freeLabel: 'Free',
      trialComplete: 'Trial Complete',
      startTrial: 'Start Trial',
      nextStep: 'Next Step',
      prevStep: 'Previous Step',
      backToHome: 'Back to Home',
      completeTrial: 'Complete Trial',
      upgradeNow: 'Start Full Course',
      congratsTitle: '🎉 Congratulations on Completing the Trial!',
      congratsMessage: 'Now experience deeper AI collaboration in the full course',
      learnedTitle: 'What You Learned',
      nextStepsTitle: 'Next Steps'
    }
  };

  const t = content[language];

  const currentStepData = t.steps[currentStep];
  const isLastStep = currentStep === t.steps.length - 1;
  const isFirstStep = currentStep === 0;
  const isCompleted = completedSteps.includes(currentStep);

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    // v115: 단계 완료 로깅
    if (isTrialCourseEnabled) {
      logTrialCourseUsage(`step_${currentStep + 1}_completed`);
    }
    
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    } else {
      // 체험 완료 처리
      toast.success('🎉 체험강의 완주를 축하합니다!');
      if (isTrialCourseEnabled) {
        logTrialCourseUsage('trial_completed');
      }
    }
  };

  const handleStartAIPractice = () => {
    // AI 실습으로 이동 (체험용 특별 모드)
    onNavigate('ai-practice', undefined, undefined, 0, 1, 'guided');
  };

  const handleUpgrade = () => {
    toast.info('정식 과정 등록 페이지로 이동합니다.');
    onNavigate('course-jeju');
  };

  // 로딩 중이거나 비로그인 상태에서는 로딩 표시
  if (userType === 'guest') {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-iwl-purple mx-auto mb-4"></div>
        <p>로그인 페이지로 이동 중...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate('home')}
                className="text-gray-600 hover:text-iwl-purple"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToHome}
              </Button>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-700">
                {t.freeLabel}
              </Badge>
              <div className="text-sm text-gray-600">
                <Clock className="w-4 h-4 inline mr-1" />
                {t.duration}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 진행률 표시 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                진행률: {currentStep + 1}/{t.steps.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentStep + 1) / t.steps.length) * 100)}% 완료
              </span>
            </div>
            <Progress 
              value={((currentStep + 1) / t.steps.length) * 100} 
              className="h-2"
            />
          </div>

          {/* 단계별 네비게이션 */}
          <div className="flex items-center justify-center mb-8 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {t.steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all ${
                    index === currentStep 
                      ? 'bg-iwl-gradient text-white' 
                      : completedSteps.includes(index)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : index === currentStep ? (
                      <Play className="w-4 h-4" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-current"></div>
                    )}
                    <span className="font-medium hidden sm:inline">{step.title}</span>
                  </div>
                  {index < t.steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 현재 단계 컨텐츠 */}
          <Card className="border-2 border-iwl-purple/20 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-gray-900 mb-2">
                    {currentStepData.title}
                  </CardTitle>
                  <p className="text-gray-600">{currentStepData.description}</p>
                </div>
                <Badge className="bg-iwl-gradient text-white">
                  <Clock className="w-3 h-3 mr-1" />
                  {currentStepData.duration}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              {currentStepData.type === 'introduction' && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-iwl-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {currentStepData.content.title}
                    </h3>
                    <p className="text-gray-600">
                      {currentStepData.content.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-iwl-purple-50 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-iwl-purple" />
                        핵심 포인트
                      </h4>
                      <ul className="space-y-2">
                        {currentStepData.content.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-iwl-blue-50 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-iwl-blue" />
                        실용 팁
                      </h4>
                      <ul className="space-y-2">
                        {currentStepData.content.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {currentStepData.type === 'research' && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {currentStepData.content.title}
                    </h3>
                    <p className="text-gray-600">
                      {currentStepData.content.description}
                    </p>
                  </div>

                  <div className="bg-white border-2 border-iwl-purple/20 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-iwl-purple" />
                      AI에게 질문해보기
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-700 italic">"{currentStepData.content.prompt}"</p>
                    </div>
                    <Button
                      onClick={handleStartAIPractice}
                      className="w-full bg-iwl-gradient hover:opacity-90 text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      AI와 대화 시작하기
                    </Button>
                  </div>

                  <div className="bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">
                      AI가 제안할 수 있는 지역들
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {currentStepData.content.keyAreas.map((area, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-iwl-purple" />
                            <span className="font-medium text-gray-900">{area}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStepData.type === 'planning' && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {currentStepData.content.title}
                    </h3>
                    <p className="text-gray-600">
                      {currentStepData.content.description}
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {currentStepData.content.scenarios.map((scenario, index) => (
                      <Card key={index} className="border border-gray-200 hover:border-iwl-purple/30 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-iwl-gradient rounded-full flex items-center justify-center flex-shrink-0">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-2">
                                {scenario.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-3">
                                <span className="font-medium">선호:</span> {scenario.preference}
                              </p>
                              <div className="bg-iwl-purple-50 rounded-lg p-3">
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium text-iwl-purple">AI 추천:</span> {scenario.suggestion}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {currentStepData.type === 'completion' && (
                <div className="text-center space-y-6">
                  <div className="mb-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {t.congratsTitle}
                    </h3>
                    <p className="text-gray-600">
                      {t.congratsMessage}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-green-500" />
                        {t.learnedTitle}
                      </h4>
                      <ul className="space-y-2 text-left">
                        {currentStepData.content.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-iwl-purple-50 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-iwl-purple" />
                        {t.fullCourseFeatures.title}
                      </h4>
                      <ul className="space-y-2 text-left">
                        {t.fullCourseFeatures.items.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <Star className="w-4 h-4 text-iwl-purple mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleUpgrade}
                      size="lg"
                      className="bg-iwl-gradient hover:opacity-90 text-white font-semibold px-8 py-3"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      {t.upgradeNow}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button
                      onClick={() => onNavigate('home')}
                      variant="outline"
                      size="lg"
                      className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3"
                    >
                      나중에 결정하기
                    </Button>
                  </div>
                </div>
              )}

              {/* 액션 버튼 (완료 단계가 아닐 때만) */}
              {currentStepData.type !== 'completion' && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <Button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    variant="outline"
                    disabled={isFirstStep}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t.prevStep}
                  </Button>

                  <Button
                    onClick={handleStepComplete}
                    className="bg-iwl-gradient hover:opacity-90 text-white flex items-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? '처리 중...' : isLastStep ? t.completeTrial : t.nextStep}
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* v115: 베타 피드백 수집 */}
          <BetaFeature flagKey="feedbackSystem" fallback={null}>
            <div className="mt-8">
              <BetaFeedback
                featureKey="trialCourse"
                featureName="체험강의"
                context={{
                  currentStep: currentStep + 1,
                  totalSteps: t.steps.length,
                  completedSteps: completedSteps.length,
                  stepType: currentStepData?.type
                }}
              />
            </div>
          </BetaFeature>
        </div>
      </div>
    </div>
  );
}