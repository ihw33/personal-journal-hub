'use client';

import React, { useState } from 'react';
import { 
  Brain, 
  Lightbulb, 
  Target, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Zap,
  Heart,
  Star,
  Mail,
  Loader2
} from 'lucide-react';

interface ComingSoonPageProps {
  onEmailSubmit?: (email: string) => Promise<void>;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ onEmailSubmit }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      if (onEmailSubmit) {
        await onEmailSubmit(email);
      }
      setIsSubmitted(true);
    } catch (error) {
      setError('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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

      {/* The Problem Section */}
      <section className="py-24 bg-architect-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-architect-gray-900 mb-6">
              현대인의 생각정리, 왜 이렇게 어려울까요?
            </h2>
            <p className="text-xl text-architect-gray-700 max-w-3xl mx-auto">
              디지털 시대에 우리는 더 많은 정보와 아이디어에 노출되지만, 
              정작 깊이 있는 사고는 더 어려워졌습니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-architect-gray-900 mb-4">
                시간 부족
              </h3>
              <p className="text-architect-gray-700">
                바쁜 일상 속에서 깊이 있게 생각할 시간을 찾기 어렵습니다. 
                급하게 결정하고, 표면적으로만 이해하게 됩니다.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-architect-gray-900 mb-4">
                정보 과부하
              </h3>
              <p className="text-architect-gray-700">
                무수히 많은 정보 속에서 정말 중요한 것을 골라내고 
                체계적으로 정리하는 것이 점점 더 어려워집니다.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-architect-gray-900 mb-4">
                체계 부족
              </h3>
              <p className="text-architect-gray-700">
                생각을 효과적으로 정리하고 발전시킬 수 있는 
                체계적인 방법론이나 도구가 부족합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
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

      {/* How it Works Section */}
      <section className="py-24 bg-gradient-to-b from-architect-gray-100 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-architect-gray-900 mb-6">
              어떻게 작동하나요?
            </h2>
            <p className="text-xl text-architect-gray-700 max-w-3xl mx-auto">
              3단계로 간단하게 시작하여, AI와 함께 더 깊은 생각의 세계로 들어가세요.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-architect-primary via-architect-secondary to-architect-ai-primary" />
            
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-architect-gray-200">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-architect-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
              </div>
              <div className="pt-8">
                <div className="w-16 h-16 bg-architect-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Brain className="h-8 w-8 text-architect-primary" />
                </div>
                <h3 className="text-xl font-semibold text-architect-gray-900 mb-4 text-center">
                  AI와 함께 시작하기
                </h3>
                <p className="text-architect-gray-700 text-center">
                  생각을 자유롭게 적어보세요. AI가 맥락을 이해하고 
                  더 깊이 탐구할 수 있는 질문들을 제안합니다.
                </p>
              </div>
            </div>
            
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-architect-gray-200">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-architect-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
              </div>
              <div className="pt-8">
                <div className="w-16 h-16 bg-architect-secondary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Lightbulb className="h-8 w-8 text-architect-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-architect-gray-900 mb-4 text-center">
                  함께 생각해보기
                </h3>
                <p className="text-architect-gray-700 text-center">
                  AI와 대화하며 아이디어를 발전시키고, 새로운 관점을 
                  발견하며, 더 체계적으로 정리해나갑니다.
                </p>
              </div>
            </div>
            
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-architect-gray-200">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-architect-ai-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
              </div>
              <div className="pt-8">
                <div className="w-16 h-16 bg-architect-ai-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Sparkles className="h-8 w-8 text-architect-ai-primary" />
                </div>
                <h3 className="text-xl font-semibold text-architect-gray-900 mb-4 text-center">
                  멋진 결과 만들기
                </h3>
                <p className="text-architect-gray-700 text-center">
                  혼자서는 못 만드는 깊이 있는 통찰과 창의적인 
                  해결책을 AI와 함께 만들어냅니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Vision Section */}
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

      {/* Final CTA Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-architect-gray-900 mb-6">
              미래를 먼저 경험해보세요
            </h2>
            <p className="text-xl text-architect-gray-700 mb-8">
              얼리 어답터로 참여하시면 특별한 혜택과 함께 
              새로운 생각정리의 혁명을 먼저 만나볼 수 있습니다.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center justify-center gap-3 p-4 bg-architect-gray-100 rounded-2xl">
                <CheckCircle className="h-6 w-6 text-architect-ai-primary" />
                <span className="text-architect-gray-800 font-medium">평생 50% 할인</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-architect-gray-100 rounded-2xl">
                <CheckCircle className="h-6 w-6 text-architect-ai-primary" />
                <span className="text-architect-gray-800 font-medium">프리미엄 기능 무료</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-architect-gray-100 rounded-2xl">
                <CheckCircle className="h-6 w-6 text-architect-ai-primary" />
                <span className="text-architect-gray-800 font-medium">개발진과 직접 소통</span>
              </div>
            </div>
          </div>
          
          <div className="max-w-md mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-architect-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="이메일 주소를 입력하세요"
                    className="w-full pl-12 pr-4 py-4 text-lg border border-architect-gray-300 rounded-2xl focus:ring-2 focus:ring-architect-primary focus:border-architect-primary transition-colors"
                    disabled={isSubmitting}
                  />
                </div>
                
                {error && (
                  <p className="text-red-600 text-sm text-center">{error}</p>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-architect-primary to-architect-secondary text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      등록 중...
                    </>
                  ) : (
                    <>
                      베타 테스터 신청하기
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
                
                <p className="text-sm text-architect-gray-600 text-center">
                  스팸은 절대 보내지 않습니다. 언제든지 구독을 취소할 수 있습니다.
                </p>
              </form>
            ) : (
              <div className="text-center p-8 bg-green-50 rounded-2xl">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  환영합니다!
                </h3>
                <p className="text-green-700">
                  베타 테스터 신청이 완료되었습니다. 
                  출시 소식을 가장 먼저 전해드릴게요.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-architect-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-architect-accent to-architect-ai-primary bg-clip-text text-transparent mb-4">
              IWL
            </div>
            <p className="text-architect-gray-300 mb-8">
              AI와 함께하는 새로운 생각정리
            </p>
            <div className="flex justify-center space-x-6 text-sm text-architect-gray-400">
              <span>© 2025 Idea Work Lab</span>
              <span>•</span>
              <span>개인정보처리방침</span>
              <span>•</span>
              <span>이용약관</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoonPage;