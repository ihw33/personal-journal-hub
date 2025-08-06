'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

const HeroSection: React.FC = React.memo(() => {
  return (
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
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;