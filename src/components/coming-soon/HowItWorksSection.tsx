'use client';

import React from 'react';
import { 
  Brain, 
  Lightbulb, 
  Target, 
  Sparkles, 
  CheckCircle, 
  Star, 
  Heart,
  Zap
} from 'lucide-react';

const HowItWorksSection: React.FC = React.memo(() => {
  return (
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
  );
});

HowItWorksSection.displayName = 'HowItWorksSection';

export default HowItWorksSection;