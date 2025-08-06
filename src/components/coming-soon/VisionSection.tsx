'use client';

import React from 'react';
import { Users, Star, Heart, Zap } from 'lucide-react';

const VisionSection: React.FC = React.memo(() => {
  return (
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
  );
});

VisionSection.displayName = 'VisionSection';

export default VisionSection;