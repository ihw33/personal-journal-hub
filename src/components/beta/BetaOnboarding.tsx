// v116: 베타 사용자 온보딩 플로우
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Rocket, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Star,
  Gift,
  Users,
  MessageSquare,
  Target,
  Brain,
  Lightbulb,
  Calendar,
  Award,
  Sparkles,
  Play,
  BookOpen,
  Heart,
  Coffee,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';

interface BetaOnboardingProps {
  language: 'ko' | 'en';
  onComplete: () => void;
  onNavigate: (page: string) => void;
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  content: {
    type: 'welcome' | 'benefits' | 'tutorial' | 'preferences' | 'community';
    data: any;
  };
}

export function BetaOnboarding({ language, onComplete, onNavigate }: BetaOnboardingProps) {
  const { user, updatePersonalizationData } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [userPreferences, setUserPreferences] = useState({
    learningStyle: 'mixed' as 'visual' | 'auditory' | 'kinesthetic' | 'mixed',
    preferredStudyTime: 'evening' as 'morning' | 'afternoon' | 'evening',
    difficultyPreference: 'medium' as 'easy' | 'medium' | 'hard' | 'adaptive',
    interests: [] as string[],
    goals: [] as string[]
  });

  const content = {
    ko: {
      title: "베타 테스터 온보딩",
      subtitle: "AI와 함께하는 새로운 학습 여정을 시작해보세요",
      steps: [
        {
          id: 'welcome',
          title: '환영합니다!',
          description: '베타 테스터로 선정되신 것을 축하합니다',
          icon: Rocket,
          content: {
            type: 'welcome' as const,
            data: {
              title: '🎉 베타 테스터가 되신 것을 축하합니다!',
              subtitle: 'AI와 함께하는 혁신적인 학습 경험을 시작해보세요',
              highlights: [
                {
                  icon: Gift,
                  title: '프리미엄 6개월 무료',
                  description: '모든 프리미엄 기능을 무료로 체험하세요'
                },
                {
                  icon: Users,
                  title: '베타 커뮤니티 참여',
                  description: '다른 베타 테스터들과 경험을 공유하세요'
                },
                {
                  icon: MessageSquare,
                  title: '개발팀과 직접 소통',
                  description: '피드백을 통해 서비스 개선에 참여하세요'
                },
                {
                  icon: Award,
                  title: '베타 테스터 인증',
                  description: '특별한 배지와 인증서를 받으세요'
                }
              ]
            }
          }
        },
        {
          id: 'tutorial',
          title: 'AI 학습 체험',
          description: 'AI와 함께하는 학습 방법을 알아보세요',
          icon: Brain,
          content: {
            type: 'tutorial' as const,
            data: {
              title: '🤖 AI와 함께하는 학습이란?',
              subtitle: '제주도 여행 기획을 통해 AI 협업을 자연스럽게 배우는 혁신적인 방법',
              features: [
                {
                  icon: Target,
                  title: '실무 중심 학습',
                  description: '실제 여행 계획을 세우며 AI 활용법을 자연스럽게 체득'
                },
                {
                  icon: Lightbulb,
                  title: '창의적 사고 확장',
                  description: 'AI와의 대화를 통해 새로운 아이디어와 관점 발견'
                },
                {
                  icon: Zap,
                  title: '즉시 피드백',
                  description: '실시간으로 AI가 제공하는 맞춤형 가이드와 조언'
                }
              ],
              modes: [
                {
                  name: '가이드형',
                  description: '단계별 체계적 안내',
                  suitable: '체계적 학습을 선호하는 분'
                },
                {
                  name: '자기주도형',
                  description: '창의적 자율 탐구',
                  suitable: '자유로운 탐구를 선호하는 분'
                }
              ]
            }
          }
        },
        {
          id: 'preferences',
          title: '학습 선호도 설정',
          description: '맞춤형 학습 경험을 위한 선호도를 설정하세요',
          icon: Star,
          content: {
            type: 'preferences' as const,
            data: {
              title: '🎯 맞춤형 학습 설정',
              subtitle: '더 나은 학습 경험을 위해 선호도를 알려주세요',
              questions: [
                {
                  id: 'learningStyle',
                  question: '선호하는 학습 스타일은?',
                  options: [
                    { value: 'visual', label: '시각적 학습', description: '그림, 도표, 차트를 통한 학습' },
                    { value: 'auditory', label: '청각적 학습', description: '설명, 토론을 통한 학습' },
                    { value: 'kinesthetic', label: '체험적 학습', description: '직접 해보며 배우는 학습' },
                    { value: 'mixed', label: '혼합형', description: '다양한 방식을 조합한 학습' }
                  ]
                },
                {
                  id: 'preferredStudyTime',
                  question: '선호하는 학습 시간은?',
                  options: [
                    { value: 'morning', label: '오전 (6-12시)', description: '집중력이 높은 아침 시간' },
                    { value: 'afternoon', label: '오후 (12-18시)', description: '활동적인 오후 시간' },
                    { value: 'evening', label: '저녁 (18-24시)', description: '여유로운 저녁 시간' }
                  ]
                },
                {
                  id: 'difficultyPreference',
                  question: '선호하는 난이도는?',
                  options: [
                    { value: 'easy', label: '쉬움', description: '기초부터 차근차근' },
                    { value: 'medium', label: '보통', description: '적당한 도전과 학습' },
                    { value: 'hard', label: '어려움', description: '높은 수준의 도전' },
                    { value: 'adaptive', label: '적응형', description: 'AI가 자동으로 조절' }
                  ]
                }
              ]
            }
          }
        },
        {
          id: 'community',
          title: '베타 커뮤니티',
          description: '베타 테스터 커뮤니티에 참여하세요',
          icon: Users,
          content: {
            type: 'community' as const,
            data: {
              title: '👥 베타 커뮤니티에 오신 것을 환영합니다',
              subtitle: '함께 성장하고 경험을 나누는 특별한 공간',
              benefits: [
                {
                  icon: Coffee,
                  title: '경험 공유',
                  description: '다른 베타 테스터들과 학습 경험과 팁을 공유하세요'
                },
                {
                  icon: Lightbulb,
                  title: '아이디어 교환',
                  description: '창의적인 아이디어와 인사이트를 서로 나누세요'
                },
                {
                  icon: Heart,
                  title: '서로 응원',
                  description: '학습 과정에서 서로를 격려하고 동기부여하세요'
                },
                {
                  icon: Sparkles,
                  title: '특별한 이벤트',
                  description: '베타 테스터만을 위한 특별한 이벤트에 참여하세요'
                }
              ],
              guidelines: [
                '서로를 존중하고 배려하는 마음으로 소통해주세요',
                '건설적인 피드백과 의견을 나누어주세요',
                '개인정보 보호를 위해 민감한 정보는 공유하지 마세요',
                '스팸이나 광고성 게시물은 삼가해주세요'
              ]
            }
          }
        }
      ],
      navigation: {
        next: '다음',
        previous: '이전',
        skip: '건너뛰기',
        complete: '온보딩 완료',
        startJourney: '학습 여정 시작하기'
      }
    },
    en: {
      title: "Beta Tester Onboarding",
      subtitle: "Start your new learning journey with AI"
    }
  };

  const t = content[language];
  const steps = t.steps;
  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  // 단계 완료 처리
  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }

    if (isLastStep) {
      handleOnboardingComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  // 온보딩 완료 처리
  const handleOnboardingComplete = async () => {
    try {
      // 사용자 선호도 저장
      if (user) {
        await updatePersonalizationData({
          preferences: userPreferences
        });
      }

      // 온보딩 완료 표시
      localStorage.setItem('beta-onboarding-completed', 'true');
      localStorage.setItem('beta-onboarding-date', new Date().toISOString());

      toast.success('🎉 온보딩이 완료되었습니다! 이제 AI와 함께 학습을 시작해보세요.');
      onComplete();
      
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      toast.error('온보딩 완료 중 오류가 발생했습니다.');
    }
  };

  // 선호도 업데이트
  const updatePreference = (key: string, value: any) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* 헤더 */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
              <p className="text-sm text-gray-600">{t.subtitle}</p>
            </div>
            <Badge className="bg-purple-100 text-purple-700">
              베타 테스터
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 진행률 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                진행률: {currentStep + 1}/{steps.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% 완료
              </span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </div>

          {/* 단계 네비게이션 */}
          <div className="flex items-center justify-center mb-8 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all ${
                    index === currentStep 
                      ? 'bg-purple-600 text-white' 
                      : completedSteps.includes(index)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : index === currentStep ? (
                      <step.icon className="w-4 h-4" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-current"></div>
                    )}
                    <span className="font-medium hidden sm:inline">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 현재 단계 컨텐츠 */}
          <Card className="border-2 border-purple-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <currentStepData.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-2">
                  {currentStepData.title}
                </CardTitle>
                <p className="text-gray-600">{currentStepData.description}</p>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {/* Welcome 단계 */}
              {currentStepData.content.type === 'welcome' && (
                <div className="text-center space-y-6">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {currentStepData.content.data.title}
                    </h3>
                    <p className="text-gray-600">
                      {currentStepData.content.data.subtitle}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {currentStepData.content.data.highlights.map((highlight: any, index: number) => (
                      <div key={index} className="bg-white border border-purple-200 rounded-lg p-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <highlight.icon className="w-6 h-6 text-purple-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">{highlight.title}</h4>
                        <p className="text-sm text-gray-600">{highlight.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tutorial 단계 */}
              {currentStepData.content.type === 'tutorial' && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {currentStepData.content.data.title}
                    </h3>
                    <p className="text-gray-600">
                      {currentStepData.content.data.subtitle}
                    </p>
                  </div>

                  {/* 특징 */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {currentStepData.content.data.features.map((feature: any, index: number) => (
                      <div key={index} className="text-center p-4 bg-purple-50 rounded-lg">
                        <feature.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-xs text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* 학습 모드 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">🎯 두 가지 학습 모드</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentStepData.content.data.modes.map((mode: any, index: number) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-1">{mode.name}</h5>
                          <p className="text-sm text-gray-600 mb-2">{mode.description}</p>
                          <p className="text-xs text-purple-600">{mode.suitable}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences 단계 */}
              {currentStepData.content.type === 'preferences' && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {currentStepData.content.data.title}
                    </h3>
                    <p className="text-gray-600">
                      {currentStepData.content.data.subtitle}
                    </p>
                  </div>

                  {currentStepData.content.data.questions.map((question: any, qIndex: number) => (
                    <div key={question.id} className="space-y-3">
                      <h4 className="font-medium text-gray-900">{question.question}</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {question.options.map((option: any, oIndex: number) => (
                          <button
                            key={option.value}
                            onClick={() => updatePreference(question.id, option.value)}
                            className={`p-4 text-left border rounded-lg transition-colors ${
                              userPreferences[question.id as keyof typeof userPreferences] === option.value
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="font-medium text-gray-900">{option.label}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Community 단계 */}
              {currentStepData.content.type === 'community' && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {currentStepData.content.data.title}
                    </h3>
                    <p className="text-gray-600">
                      {currentStepData.content.data.subtitle}
                    </p>
                  </div>

                  {/* 커뮤니티 혜택 */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {currentStepData.content.data.benefits.map((benefit: any, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <benefit.icon className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                          <h5 className="font-medium text-gray-900">{benefit.title}</h5>
                          <p className="text-sm text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 커뮤니티 가이드라인 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">📋 커뮤니티 가이드라인</h4>
                    <ul className="space-y-2">
                      {currentStepData.content.data.guidelines.map((guideline: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {guideline}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 네비게이션 버튼 */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.navigation.previous}
                </Button>

                <Button
                  onClick={handleStepComplete}
                  className="bg-purple-600 text-white flex items-center gap-2"
                >
                  {isLastStep ? (
                    <>
                      <Rocket className="w-4 h-4" />
                      {t.navigation.startJourney}
                    </>
                  ) : (
                    <>
                      {t.navigation.next}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}