/**
 * IdeaWorkLab v4.0 FinalCTASection
 * 최종 행동 유도 섹션 - 무료 데모 신청 및 추가 정보
 */

import React from 'react';
import { Button } from '../ui/button';
import { Sparkles, Play, BookOpen, CheckCircle } from 'lucide-react';

interface FinalCTASectionProps {
  language?: 'ko' | 'en';
  onNavigate?: (page: string, params?: any) => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  language = 'ko',
  onNavigate = () => {}
}) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-500 to-blue-500 relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 rounded-full bg-white/20"></div>
        <div className="absolute top-32 right-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/15"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 md:w-40 md:h-40 rounded-full bg-white/10"></div>
        <div className="absolute bottom-32 right-10 w-18 h-18 md:w-28 md:h-28 rounded-full bg-white/25"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 md:mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 backdrop-blur-sm">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
            지금 바로 AI 파트너 '아키'를 만나보세요
          </h2>
          
          <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto">
            단 15분의 무료 데모 세션으로 당신의 사고력이 어떻게 체계적으로 발전할 수 있는지 직접 경험해보세요. 
            개인 맞춤형 AI 멘토 '아키'가 당신을 기다리고 있습니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-8">
            <Button 
              size="lg"
              onClick={() => onNavigate('trial-course')}
              className="bg-white text-purple-600 hover:bg-white/90 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <Play className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              무료 데모 세션 신청하기
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate('about')}
              className="border-white/40 text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold backdrop-blur-sm w-full sm:w-auto"
            >
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              더 자세히 알아보기
            </Button>
          </div>

          {/* 신뢰 지표 */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto text-white/80 mb-6 md:mb-12">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-xs md:text-sm">무료 체험</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-xs md:text-sm">AI 지원</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">15분</div>
              <div className="text-xs md:text-sm">빠른 시작</div>
            </div>
          </div>

          {/* 추가 혜택 안내 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">
              무료 데모 세션에서 경험할 수 있는 것들
            </h3>
            <div className="grid md:grid-cols-3 gap-3 md:gap-4 text-xs md:text-sm text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white flex-shrink-0" />
                <span>개인 맞춤 사고력 진단</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white flex-shrink-0" />
                <span>AI 아키와의 실제 대화</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white flex-shrink-0" />
                <span>맞춤형 학습 계획 제안</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;