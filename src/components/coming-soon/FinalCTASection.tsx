'use client';

import React from 'react';
import { CheckCircle, Mail, ArrowRight, Loader2 } from 'lucide-react';

interface FinalCTASectionProps {
  email: string;
  setEmail: (email: string) => void;
  error: string;
  setError: (error: string) => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = React.memo(({
  email,
  setEmail,
  error,
  setError,
  isSubmitting,
  isSubmitted,
  onSubmit,
}) => {
  return (
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
            <form onSubmit={onSubmit} className="space-y-6">
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
  );
});

FinalCTASection.displayName = 'FinalCTASection';

export default FinalCTASection;