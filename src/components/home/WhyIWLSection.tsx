/**
 * IdeaWorkLab v4.0 WhyIWLSection
 * '왜 IdeaWorkLab인가?' 섹션 - 핵심 가치 제안 설명
 */

import React from 'react';
import { Building, Sparkles, Cpu, Brain, Wand2, Layers, CheckCircle } from 'lucide-react';

interface WhyIWLSectionProps {
  language?: 'ko' | 'en';
}

export const WhyIWLSection: React.FC<WhyIWLSectionProps> = ({
  language = 'ko'
}) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            왜 IdeaWorkLab인가?
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            단순한 학습을 넘어서, AI와 함께하는 체계적 사고력 구축 시스템으로 
            당신의 잠재력을 완전히 새로운 차원으로 끌어올립니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          
          {/* 사고 확장 9단계 모델 */}
          <div className="text-center lg:col-span-1">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl">
              <Building className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
              사고 확장 9단계 모델
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6">
              <strong className="text-purple-600">당신이 성장할 경로입니다.</strong><br/>
              체계적이고 단계적인 사고력 발전 로드맵으로, 
              각자의 수준에 맞는 맞춤형 학습 경로를 제공합니다.
            </p>
            
            {/* 9단계 모델 다이어그램 placeholder */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 md:p-6 border-2 border-purple-200">
              <div className="text-sm font-medium text-purple-600 mb-3">
                9단계 사고 확장 모델
              </div>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {Array.from({ length: 9 }, (_, i) => (
                  <div key={i} className="text-center">
                    <div 
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto mb-1 text-white text-xs md:text-sm font-semibold ${
                        i < 3 ? 'bg-gradient-to-br from-purple-500 to-blue-500' : 
                        i < 6 ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 
                        'bg-gradient-to-br from-cyan-500 to-teal-500'
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div className="text-xs text-gray-600">
                      {i < 3 ? '기초' : i < 6 ? '심화' : '전문'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-600">
                모델 다이어그램이 들어갈 자리
              </div>
            </div>
          </div>

          {/* 캐릭터 세계관 */}
          <div className="text-center lg:col-span-1">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
              캐릭터 세계관
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6">
              <strong className="text-blue-600">당신의 성장을 도울 파트너들입니다.</strong><br/>
              생각이, 아키, 미루미, 반짝이 - 각각 고유한 역할을 가진 
              AI 캐릭터들이 당신의 학습 여정을 함께합니다.
            </p>
            
            {/* 캐릭터 소개 영역 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 md:p-6 border-2 border-blue-200">
              <div className="text-sm font-medium text-blue-600 mb-3">
                AI 학습 파트너들
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-xs md:text-sm font-medium">생각이</div>
                  <div className="text-xs text-gray-600">논리적 사고</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Wand2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-xs md:text-sm font-medium">아키</div>
                  <div className="text-xs text-gray-600">설계 전문가</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Layers className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-xs md:text-sm font-medium">미루미</div>
                  <div className="text-xs text-gray-600">극복 도우미</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-xs md:text-sm font-medium">반짝이</div>
                  <div className="text-xs text-gray-600">창의적 영감</div>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-600">
                캐릭터 소개가 들어갈 영역
              </div>
            </div>
          </div>

          {/* AI 협력 시스템 */}
          <div className="text-center md:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl">
              <Cpu className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
              AI 협력 시스템
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6">
              <strong className="text-cyan-600">AI를 '사고 파트너'로 활용하는 실습 중심의 데모를 경험해보세요.</strong><br/>
              최첨단 AI 기술과 검증된 교육 방법론이 결합된 세계 최초의 사고력 전문 학습 플랫폼입니다.
            </p>
            
            {/* AI 기능 미리보기 */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 md:p-6 border-2 border-cyan-200">
              <div className="text-sm font-medium text-cyan-600 mb-3">
                AI 협력 시스템 특징
              </div>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
                  <span>실시간 AI 대화 학습</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
                  <span>개인화된 학습 피드백</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
                  <span>적응형 난이도 조절</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-600 flex-shrink-0" />
                  <span>감정 지능 기반 상호작용</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyIWLSection;