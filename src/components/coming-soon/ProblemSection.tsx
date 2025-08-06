'use client';

import React from 'react';
import { Clock, Brain, Target } from 'lucide-react';

const ProblemSection: React.FC = React.memo(() => {
  return (
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
  );
});

ProblemSection.displayName = 'ProblemSection';

export default ProblemSection;