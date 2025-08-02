/**
 * IdeaWorkLab v4.0 SocialProofSection
 * 사회적 증거 섹션 - 사용자 만족도, 전문가 검증 등 통계 표시
 */

import React from 'react';
import { Heart, Award, TrendingUp, Users } from 'lucide-react';

interface SocialProofSectionProps {
  language?: 'ko' | 'en';
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({
  language = 'ko'
}) => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            검증된 성과로 증명하는 신뢰
          </h2>
          <p className="text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
            실제 사용자들이 경험한 성과와 전문가들의 검증을 통해 확인된 학습 효과를 확인해보세요.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {/* 사용자 만족도 */}
          <div className="text-center p-4 md:p-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
              <Heart className="w-5 h-5 md:w-8 md:h-8 text-white" />
            </div>
            <div className="text-2xl md:text-4xl font-black text-purple-600 mb-1 md:mb-2">98%</div>
            <div className="text-sm md:text-base font-semibold text-gray-900 mb-1">사용자 만족도</div>
            <div className="text-xs md:text-sm text-gray-700">실제 사용자 피드백 기반</div>
          </div>

          {/* 전문가 검증 */}
          <div className="text-center p-4 md:p-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
              <Award className="w-5 h-5 md:w-8 md:h-8 text-white" />
            </div>
            <div className="text-2xl md:text-4xl font-black text-blue-600 mb-1 md:mb-2">1,000+</div>
            <div className="text-sm md:text-base font-semibold text-gray-900 mb-1">전문가 검증</div>
            <div className="text-xs md:text-sm text-gray-700">교육·심리학 전문가 협력</div>
          </div>

          {/* 학습 완료율 */}
          <div className="text-center p-4 md:p-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
              <TrendingUp className="w-5 h-5 md:w-8 md:h-8 text-white" />
            </div>
            <div className="text-2xl md:text-4xl font-black text-cyan-600 mb-1 md:mb-2">92%</div>
            <div className="text-sm md:text-base font-semibold text-gray-900 mb-1">학습 완료율</div>
            <div className="text-xs md:text-sm text-gray-700">업계 평균 대비 3배 높음</div>
          </div>

          {/* 활성 사용자 */}
          <div className="text-center p-4 md:p-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
              <Users className="w-5 h-5 md:w-8 md:h-8 text-white" />
            </div>
            <div className="text-2xl md:text-4xl font-black text-emerald-600 mb-1 md:mb-2">5,000+</div>
            <div className="text-sm md:text-base font-semibold text-gray-900 mb-1">활성 사용자</div>
            <div className="text-xs md:text-sm text-gray-700">매일 함께 성장하는 학습자</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;