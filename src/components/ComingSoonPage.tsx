'use client';

import React, { useState } from 'react';
import { 
  Brain, 
  Lightbulb, 
  Target, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Zap,
  Heart,
  Star,
  Mail,
  Loader2
} from 'lucide-react';

interface ComingSoonPageProps {
  onEmailSubmit?: (email: string) => Promise<void>;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ onEmailSubmit }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      if (onEmailSubmit) {
        await onEmailSubmit(email);
      }
      setIsSubmitted(true);
    } catch (error) {
      setError('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-architect-primary via-architect-secondary to-architect-primary/90 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,111,0,0.1),transparent_50%)]" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  Coming Soon
                </span>
              </div>
              
              <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  AI와 함께하는
                </span>
                <span className="block bg-gradient-to-r from-architect-accent to-yellow-300 bg-clip-text text-transparent">
                  새로운 생각정리
                </span>
              </h1>
              
              <p className="mt-6 text-xl text-white/90 leading-relaxed">
                AI-Enhanced Thinking for Modern Minds
              </p>
              
              <p className="mt-4 text-lg text-white/80 leading-relaxed max-w-2xl">
                AI 기반 도구로 인지적 잠재력을 해제하고, 사고 과정을 증폭시키며, 
                창의성을 향상시키고, 아이디어를 실행 가능한 통찰력으로 변환하세요.
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-architect-accent/30 to-architect-ai-primary/30 blur-2xl rounded-full" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-architect-accent">87%</div>
                      <div className="text-sm text-white/80">창작력 향상</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-architect-ai-primary">3.2x</div>
                      <div className="text-sm text-white/80">더 빠른 통찰</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-300">45%</div>
                      <div className="text-sm text-white/80">시간 절약</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-300">92%</div>
                      <div className="text-sm text-white/80">만족도</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-architect-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-architect-gray-900 mb-6">
              혹시 이런 경험, 있으신가요?
            </h2>
            <p className="text-xl text-architect-gray-700 max-w-4xl mx-auto leading-relaxed">
              "아이디어는 많은데 정작 제대로 정리해서 실행으로 옮기기는 어렵다..."<br />
              "생각이 머릿속에서만 맴돌고, 명확한 결론에 도달하지 못한다..."<br />
              현대를 살아가는 우리 모두가 공감하는 이야기입니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-400">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-architect-gray-900 mb-4">
                "시간이 없어서..."
              </h3>
              <p className="text-architect-gray-700 leading-relaxed">
                <span className="italic">"회의가 끝나고 나서도 뭔가 놓친 게 있는 것 같은데..."</span><br />
                바쁜 일상 속, 깊이 생각할 여유도 없이 급하게 결정하고 지나가버린 순간들. 
                나중에 후회하며 '그때 좀 더 생각해볼걸...' 하고 아쉬워했던 경험들.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-400">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-architect-gray-900 mb-4">
                "정보가 너무 많아서..."
              </h3>
              <p className="text-architect-gray-700 leading-relaxed">
                <span className="italic">"유튜브, 블로그, 책... 다 봤는데 정작 내 결론은?"</span><br />
                인터넷 검색 한 번이면 수만 개의 정보가 쏟아지는 시대. 
                정말 중요한 핵심을 찾기도 전에 정보의 바다에서 길을 잃어버린 느낌.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-400">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-architect-gray-900 mb-4">
                "어떻게 정리해야 할지..."
              </h3>
              <p className="text-architect-gray-700 leading-relaxed">
                <span className="italic">"노트에 적긴 했는데, 나중에 보니 뭔 소린지 모르겠어..."</span><br />
                메모장은 가득 차 있지만 체계도 없고, 연결점도 보이지 않고. 
                내가 뭘 생각했는지조차 다시 찾아보기 어려운 그런 경험들.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <p className="text-2xl font-medium text-architect-gray-800 max-w-3xl mx-auto">
              이런 고민, <span className="text-architect-primary font-bold">당신만의 문제가 아닙니다.</span><br />
              <span className="text-lg text-architect-gray-600 mt-2 block">하지만 이제 달라질 수 있습니다.</span>
            </p>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-architect-gray-900 mb-6">
                <span className="text-architect-primary">AI 파트너</span>와 함께하는
                <br />
                혁신적인 생각정리
              </h2>
              <p className="text-xl text-architect-gray-700 mb-8">
                IWL은 단순한 노트 앱이 아닙니다. AI가 당신의 생각을 이해하고, 
                더 깊은 통찰로 이끌어주는 지적 파트너입니다.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-architect-ai-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-architect-ai-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-architect-gray-900 mb-2">
                      실시간 AI 협력
                    </h3>
                    <p className="text-architect-gray-700">
                      작성하는 동안 AI가 맥락을 이해하고 관련된 질문과 통찰을 제안합니다.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-architect-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-5 w-5 text-architect-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-architect-gray-900 mb-2">
                      창의적 연결고리
                    </h3>
                    <p className="text-architect-gray-700">
                      과거 작성한 내용들 사이의 숨겨진 연결점을 AI가 발견하고 제안합니다.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-architect-gray-900 mb-2">
                      개인화된 성장
                    </h3>
                    <p className="text-architect-gray-700">
                      당신의 사고 패턴을 학습하여 점점 더 정확하고 유용한 도움을 제공합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-architect-primary/20 to-architect-ai-primary/20 blur-2xl rounded-3xl" />
              <div className="relative bg-gradient-to-br from-white to-architect-gray-100 rounded-3xl p-8 shadow-2xl border border-architect-gray-300">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm text-architect-gray-600 ml-4">IWL AI Assistant</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-architect-primary/10 rounded-2xl p-4">
                      <p className="text-architect-gray-800 text-sm">
                        "오늘 회의에서 나온 아이디어들을 정리하고 싶어."
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-4 shadow-md">
                      <p className="text-architect-gray-800 text-sm mb-2">
                        💡 <strong>AI가 제안:</strong>
                      </p>
                      <p className="text-architect-gray-700 text-sm">
                        "3주 전에 작성한 '혁신 프로세스' 저널과 연결점이 있어 보입니다. 
                        다음 관점에서 정리해보시겠어요?"
                      </p>
                      <div className="mt-3 space-y-1">
                        <div className="text-xs text-architect-gray-600">• 실행 가능성 분석</div>
                        <div className="text-xs text-architect-gray-600">• 리소스 요구사항</div>
                        <div className="text-xs text-architect-gray-600">• 예상되는 장애물</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-gradient-to-b from-architect-gray-100 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-architect-gray-900 mb-6">
              아키와 함께하는 3단계 여정
            </h2>
            <p className="text-xl text-architect-gray-700 max-w-4xl mx-auto">
              복잡한 설정도, 어려운 학습도 필요 없습니다. 
              그저 평소처럼 생각을 적기만 하면, 아키가 함께합니다.
            </p>
          </div>

          {/* 아키와의 상호작용 시연 */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-architect-primary/5 to-architect-ai-primary/5 rounded-3xl p-8 border border-architect-primary/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-architect-primary to-architect-ai-primary rounded-full flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-architect-gray-900">아키와의 실제 대화</span>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  {/* 사용자 메시지 */}
                  <div className="flex justify-end">
                    <div className="bg-architect-primary/10 rounded-2xl rounded-br-md p-4 max-w-sm">
                      <p className="text-architect-gray-800">
                        "새로운 프로젝트 아이디어가 있는데, 어떻게 시작해야 할지 모르겠어."
                      </p>
                    </div>
                  </div>
                  
                  {/* 아키 응답 */}
                  <div className="flex justify-start items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-architect-primary to-architect-ai-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-md p-4 shadow-lg max-w-lg">
                      <p className="text-architect-gray-800 mb-3">
                        흥미로운 프로젝트네요! 먼저 세 가지 질문으로 시작해볼까요:
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-architect-gray-700">
                          <div className="w-1.5 h-1.5 bg-architect-primary rounded-full"></div>
                          이 프로젝트로 해결하고 싶은 문제는 무엇인가요?
                        </div>
                        <div className="flex items-center gap-2 text-architect-gray-700">
                          <div className="w-1.5 h-1.5 bg-architect-secondary rounded-full"></div>
                          누구를 위한 프로젝트인가요?
                        </div>
                        <div className="flex items-center gap-2 text-architect-gray-700">
                          <div className="w-1.5 h-1.5 bg-architect-ai-primary rounded-full"></div>
                          성공했다면 어떤 모습일까요?
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 사용자 후속 */}
                  <div className="flex justify-end">
                    <div className="bg-architect-primary/10 rounded-2xl rounded-br-md p-4 max-w-sm">
                      <p className="text-architect-gray-800">
                        "아, 이렇게 질문을 받으니까 훨씬 명확해지네!"
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 시각적 설명 */}
                <div className="lg:pl-8">
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <h4 className="text-lg font-semibold text-architect-gray-900 mb-4">
                      🎯 이런 식으로 도와드려요
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-architect-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Zap className="h-3 w-3 text-architect-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-architect-gray-900">맥락 파악</p>
                          <p className="text-sm text-architect-gray-600">상황을 이해하고 핵심을 찾아냅니다</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-architect-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Target className="h-3 w-3 text-architect-secondary" />
                        </div>
                        <div>
                          <p className="font-medium text-architect-gray-900">핵심 질문</p>
                          <p className="text-sm text-architect-gray-600">생각을 정리하는 핵심 질문들을 제안</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-architect-ai-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Lightbulb className="h-3 w-3 text-architect-ai-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-architect-gray-900">새로운 관점</p>
                          <p className="text-sm text-architect-gray-600">놓쳤을 수도 있는 새로운 아이디어 제안</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Enhanced Connection Lines with Animation */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-architect-primary via-architect-secondary to-architect-ai-primary opacity-60" />
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-architect-primary via-architect-secondary to-architect-ai-primary animate-pulse" />
            
            {/* Step 1 - Enhanced */}
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-architect-gray-200 hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-gradient-to-r from-architect-primary to-architect-primary/80 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
              </div>
              <div className="pt-8">
                <div className="w-20 h-20 bg-gradient-to-br from-architect-primary/10 to-architect-primary/5 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <Brain className="h-10 w-10 text-architect-primary" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-architect-accent rounded-full flex items-center justify-center">
                      <Sparkles className="h-2.5 w-2.5 text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-architect-gray-900 mb-4 text-center">
                  🤝 아키와 첫 만남
                </h3>
                <p className="text-architect-gray-700 text-center leading-relaxed">
                  <span className="font-medium text-architect-primary">"오늘 뭘 생각해보고 싶으세요?"</span><br />
                  평소처럼 자유롭게 생각을 적어보세요. 
                  아키가 바로 맥락을 파악하고 함께 탐구할 방향을 제안합니다.
                </p>
                <div className="mt-4 p-3 bg-architect-gray-50 rounded-lg">
                  <p className="text-xs text-architect-gray-600 text-center">
                    💡 예: "요즘 일이 너무 복잡해서 정리가 안 돼"
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 2 - Enhanced */}
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-architect-gray-200 hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-gradient-to-r from-architect-secondary to-architect-secondary/80 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
              </div>
              <div className="pt-8">
                <div className="w-20 h-20 bg-gradient-to-br from-architect-secondary/10 to-architect-secondary/5 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <Lightbulb className="h-10 w-10 text-architect-secondary" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="h-2.5 w-2.5 text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-architect-gray-900 mb-4 text-center">
                  💭 깊이 있는 대화
                </h3>
                <p className="text-architect-gray-700 text-center leading-relaxed">
                  <span className="font-medium text-architect-secondary">"이 부분을 좀 더 자세히 살펴볼까요?"</span><br />
                  아키가 핵심 질문들을 던지고, 새로운 관점을 제안하며, 
                  여러분의 생각을 체계적으로 정리해나갑니다.
                </p>
                <div className="mt-4 p-3 bg-architect-gray-50 rounded-lg">
                  <p className="text-xs text-architect-gray-600 text-center">
                    🎯 연결고리 발견 → 우선순위 정리 → 실행 계획
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 3 - Enhanced */}
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-architect-gray-200 hover:shadow-2xl transition-all duration-300 group">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-gradient-to-r from-architect-ai-primary to-architect-ai-primary/80 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
              </div>
              <div className="pt-8">
                <div className="w-20 h-20 bg-gradient-to-br from-architect-ai-primary/10 to-architect-ai-primary/5 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <Sparkles className="h-10 w-10 text-architect-ai-primary" />
                    <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-2.5 w-2.5 text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-architect-gray-900 mb-4 text-center">
                  ✨ 놀라운 결과
                </h3>
                <p className="text-architect-gray-700 text-center leading-relaxed">
                  <span className="font-medium text-architect-ai-primary">"이제 명확해졌네요!"</span><br />
                  혼자서는 몇 시간이 걸렸을 생각 정리가 
                  아키와 함께라면 몇 분 만에 깔끔하게 완성됩니다.
                </p>
                <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <p className="text-xs text-architect-gray-600 text-center">
                    🎉 명확한 방향 + 구체적 실행안 + 새로운 아이디어
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action for this section */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-architect-primary/10 to-architect-ai-primary/10 rounded-2xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-architect-primary to-architect-ai-primary rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-lg font-semibold text-architect-gray-900">
                  이런 경험, 함께 해보고 싶지 않으세요?
                </p>
                <p className="text-architect-gray-600">
                  아키는 이미 준비되어 있습니다. 여러분을 기다리고 있어요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Vision Section */}
      <section className="py-24 bg-gradient-to-br from-architect-primary via-architect-secondary to-architect-primary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,111,0,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,188,212,0.1),transparent_70%)]" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              AI와 함께하는 미래를 상상해보세요
            </h2>
            <p className="text-xl text-white/90 max-w-4xl mx-auto">
              더 이상 혼자 고민하지 마세요. AI 파트너와 함께 생각의 한계를 뛰어넘고, 
              창의성을 발휘하며, 더 나은 결정을 내리는 새로운 시대가 시작됩니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                <Users className="h-8 w-8 text-architect-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-3">협력적 사고</h3>
              <p className="text-white/80 text-sm">
                AI와 인간의 집단지성이 만나 더 큰 창의성을 발휘합니다.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                <Star className="h-8 w-8 text-yellow-300" />
              </div>
              <h3 className="text-lg font-semibold mb-3">개인화된 성장</h3>
              <p className="text-white/80 text-sm">
                당신만의 사고 패턴을 이해하고 맞춤형 도움을 제공합니다.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                <Heart className="h-8 w-8 text-pink-300" />
              </div>
              <h3 className="text-lg font-semibold mb-3">감성적 지능</h3>
              <p className="text-white/80 text-sm">
                논리적 사고와 감성적 이해가 조화를 이루는 균형잡힌 통찰력.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                <Zap className="h-8 w-8 text-architect-ai-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-3">즉시 실행</h3>
              <p className="text-white/80 text-sm">
                생각에서 행동까지, AI가 실행 가능한 계획을 함께 만듭니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-architect-gray-900 mb-6">
              미래를 먼저 경험해보세요
            </h2>
            <p className="text-xl text-architect-gray-700 mb-8">
              얼리 어답터로 참여하시면 특별한 혜택과 함께 
              새로운 생각정리의 혁명을 먼저 만나볼 수 있습니다.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center justify-center gap-3 p-4 bg-architect-gray-100 rounded-2xl">
                <CheckCircle className="h-6 w-6 text-architect-ai-primary" />
                <span className="text-architect-gray-800 font-medium">평생 50% 할인</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-architect-gray-100 rounded-2xl">
                <CheckCircle className="h-6 w-6 text-architect-ai-primary" />
                <span className="text-architect-gray-800 font-medium">프리미엄 기능 무료</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-architect-gray-100 rounded-2xl">
                <CheckCircle className="h-6 w-6 text-architect-ai-primary" />
                <span className="text-architect-gray-800 font-medium">개발진과 직접 소통</span>
              </div>
            </div>
          </div>
          
          <div className="max-w-md mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-architect-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="이메일 주소를 입력하세요"
                    className="w-full pl-12 pr-4 py-4 text-lg border border-architect-gray-300 rounded-2xl focus:ring-2 focus:ring-architect-primary focus:border-architect-primary transition-colors"
                    disabled={isSubmitting}
                  />
                </div>
                
                {error && (
                  <p className="text-red-600 text-sm text-center">{error}</p>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-architect-primary to-architect-secondary text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      등록 중...
                    </>
                  ) : (
                    <>
                      베타 테스터 신청하기
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
                
                <p className="text-sm text-architect-gray-600 text-center">
                  스팸은 절대 보내지 않습니다. 언제든지 구독을 취소할 수 있습니다.
                </p>
              </form>
            ) : (
              <div className="text-center p-8 bg-green-50 rounded-2xl">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  환영합니다!
                </h3>
                <p className="text-green-700">
                  베타 테스터 신청이 완료되었습니다. 
                  출시 소식을 가장 먼저 전해드릴게요.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-architect-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-architect-accent to-architect-ai-primary bg-clip-text text-transparent mb-4">
              IWL
            </div>
            <p className="text-architect-gray-300 mb-8">
              AI와 함께하는 새로운 생각정리
            </p>
            <div className="flex justify-center space-x-6 text-sm text-architect-gray-400">
              <span>© 2025 Idea Work Lab</span>
              <span>•</span>
              <span>개인정보처리방침</span>
              <span>•</span>
              <span>이용약관</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoonPage;