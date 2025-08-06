'use client';

import React from 'react';
import { Zap, Lightbulb, Target } from 'lucide-react';

const SolutionSection: React.FC = React.memo(() => {
  return (
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
  );
});

SolutionSection.displayName = 'SolutionSection';

export default SolutionSection;