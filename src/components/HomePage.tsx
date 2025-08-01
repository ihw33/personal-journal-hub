/**
 * IdeaWorkLab v4.0 HomePage
 * 완전한 메인 페이지 - 6개 섹션 조립 컴포넌트 (리팩터링 완료)
 * 각 섹션별 컴포넌트를 조합하여 완성된 홈페이지 구성
 */

import React from 'react';
import { Button } from './ui/button';
import { Play } from 'lucide-react';

// 분리된 섹션 컴포넌트들 import
import { SocialProofSection } from './home/SocialProofSection';
import { WhyIWLSection } from './home/WhyIWLSection';
import { FeaturedCoursesSection } from './home/FeaturedCoursesSection';
import { FeaturedJournalsSection } from './home/FeaturedJournalsSection';
import { FinalCTASection } from './home/FinalCTASection';

// TODO: HeroSectionV3 컴포넌트 생성 후 import
// import { HeroSectionV3 } from './HeroSectionV3';

interface HomePageProps {
  language?: 'ko' | 'en';
  onNavigate?: (page: string, params?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language = 'ko',
  onNavigate = () => {}
}) => {

  return (
    <div className="min-h-screen bg-background">
      
      {/* Section 1: Hero Section */}
      <section className="relative">
        {/* TODO: HeroSectionV3 컴포넌트 생성 후 주석 해제 */}
        {/* <HeroSectionV3 
          language={language}
          onNavigate={onNavigate}
        /> */}
        {/* 임시 Hero Section - IWL 브랜드 컬러 적용 */}
        <div className="min-h-[60vh] bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              사고력의 새로운 차원을 경험하세요
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              AI와 함께하는 체계적 사고력 학습 플랫폼 IdeaWorkLab
            </p>
            <Button 
              size="lg"
              onClick={() => onNavigate('trial-course')}
              className="bg-white text-purple-600 hover:bg-white/90"
            >
              <Play className="w-5 h-5 mr-2" />
              무료 데모 체험하기
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2: Social Proof (사회적 증거) */}
      <SocialProofSection language={language} />

      {/* Section 3: '왜 IdeaWorkLab인가?' */}
      <WhyIWLSection language={language} />

      {/* Section 4: 대표 강의 소개 */}
      <FeaturedCoursesSection 
        language={language} 
        onNavigate={onNavigate}
      />

      {/* Section 5: 전문가 저널 맛보기 */}
      <FeaturedJournalsSection 
        language={language} 
        onNavigate={onNavigate}
      />

      {/* Section 6: 최종 CTA (행동 유도) */}
      <FinalCTASection 
        language={language} 
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default HomePage;