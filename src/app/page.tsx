
'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStartDiagnosis = () => {
    router.push('/diagnosis');
  };

  const handleLearnMoreAboutMethod = () => {
    router.push('/about');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-architect-gray-100 py-16">
      <section className="w-full max-w-screen-xl p-8 md:p-16 lg:p-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-hero font-black bg-architect-gradient-main text-transparent bg-clip-text">
              사고와 재능의 설계자
            </h1>
            <p className="text-h3 font-medium text-architect-gray-700 mt-4">
              AI와 함께 깊이 있는 사고력을 체계적으로 구축하세요
            </p>
            <p className="text-body-lg text-architect-gray-700 mt-8 leading-relaxed">
              전문가와 AI가 함께 설계한 8단계 사고 방법론으로 창의적 사고, 분석적 사고, 문제해결 능력을 체계적으로 키워보세요.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={handleStartDiagnosis}
                className="px-8 py-4 bg-architect-gradient-main text-white rounded-lg shadow-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                사고력 진단 시작하기
              </button>
              <button 
                onClick={handleLearnMoreAboutMethod}
                className="px-8 py-4 bg-transparent text-architect-primary border-2 border-architect-primary rounded-lg font-semibold hover:bg-architect-primary hover:text-white transition-all duration-300"
              >
                8단계 방법론 살펴보기
              </button>
            </div>
          </div>
          <div>
            <div className="relative w-full h-96 rounded-2xl bg-architect-future-gradient shadow-ai">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl"></div>
            </div>
          </div>
        </div>
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="text-architect-success">
            <p className="text-h4 font-bold">98%</p>
            <p className="text-small">사용자 만족도</p>
          </div>
          <div className="text-architect-info">
            <p className="text-h4 font-bold">1,000+</p>
            <p className="text-small">전문가 검증</p>
          </div>
          <div className="text-architect-ai-primary">
            <p className="text-h4 font-bold">AI 기반</p>
            <p className="text-small">개인화 학습</p>
          </div>
          <div className="text-architect-gray-700">
            <p className="text-h4 font-bold">기업 교육</p>
            <p className="text-small">파트너</p>
          </div>
        </div>
      </section>
    </div>
  );
}
