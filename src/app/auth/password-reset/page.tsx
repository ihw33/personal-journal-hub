'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Clock, Shield, RefreshCw } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ResetStep = 'email' | 'sent' | 'expired';

export default function PasswordResetPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [currentStep, setCurrentStep] = useState<ResetStep>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [lastSentTime, setLastSentTime] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const language = 'ko'; // Default language

  // 다국어 콘텐츠
  const content = {
    ko: {
      title: '비밀번호 찾기',
      subtitle: '계정에 다시 접근하실 수 있도록 도와드리겠습니다',
      email: '이메일 주소',
      emailPlaceholder: '가입 시 사용한 이메일을 입력하세요',
      sendResetLink: '재설정 링크 보내기',
      backToLogin: '로그인으로 돌아가기',
      
      // 이메일 전송 완료 단계
      checkEmailTitle: '이메일을 확인해주세요',
      checkEmailSubtitle: '비밀번호 재설정 링크를 보내드렸습니다',
      emailSentTo: '다음 이메일로 재설정 링크를 보내드렸습니다:',
      emailInstructions: '이메일에서 "비밀번호 재설정" 링크를 클릭하여 새로운 비밀번호를 설정하세요.',
      emailNotReceived: '이메일을 받지 못하셨나요?',
      resendEmail: '재전송',
      checkSpamFolder: '스팸 폴더도 확인해보세요',
      linkExpiresIn: '링크는 1시간 후 만료됩니다',
      
      // 재전송 제한
      resendLimitReached: '재전송 횟수가 제한되었습니다',
      tryAgainLater: '잠시 후 다시 시도해주세요',
      
      // 검증 메시지
      validation: {
        emailRequired: '이메일을 입력해주세요',
        emailInvalid: '올바른 이메일 형식을 입력해주세요'
      },
      
      // 도움말
      helpSteps: {
        title: '비밀번호 재설정 단계',
        steps: [
          '가입 시 사용한 이메일 주소를 입력하세요',
          '재설정 링크를 이메일로 받으세요',
          '링크를 클릭하여 새 비밀번호를 설정하세요',
          '새 비밀번호로 로그인하세요'
        ]
      },
      
      security: {
        title: '보안 안내',
        points: [
          '재설정 링크는 1시간 동안만 유효합니다',
          '링크는 한 번만 사용할 수 있습니다',
          '의심스러운 요청은 즉시 고객센터에 신고해주세요'
        ]
      }
    }
  };

  const t = content[language];

  // 이메일 검증
  const validateEmail = () => {
    if (!email) {
      return t.validation.emailRequired;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return t.validation.emailInvalid;
    }
    return null;
  };

  // 재설정 링크 전송
  const handleSendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateEmail();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      // 실제 비밀번호 재설정 API 호출 (데모용)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentStep('sent');
      setLastSentTime(new Date());
      setResendCount(prev => prev + 1);
      setSuccess('재설정 링크를 이메일로 보내드렸습니다.');
    } catch (error) {
      setError('재설정 링크 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 재전송 처리
  const handleResend = async () => {
    if (resendCount >= 3) {
      return; // 재전송 제한
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // 실제 재전송 API 호출 (데모용)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResendCount(prev => prev + 1);
      setLastSentTime(new Date());
      setSuccess('재설정 링크를 다시 보내드렸습니다.');
    } catch (error) {
      setError('재전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 마스킹된 이메일 표시
  const getMaskedEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) return email;
    
    const maskedLocal = localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1];
    return `${maskedLocal}@${domain}`;
  };

  // 재전송 가능 여부 확인
  const canResend = resendCount < 3 && (!lastSentTime || (Date.now() - lastSentTime.getTime()) > 60000); // 1분 후 재전송 가능

  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-info/5 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* 상단 네비게이션 */}
        <div className="flex items-center justify-between mb-12">
          <Logo 
            size="sm" 
            language={language}
            onClick={() => router.push('/')}
            className="transition-transform hover:scale-105"
          />
          
          <Button
            variant="outline"
            onClick={() => router.push('/auth/login')}
            className="px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToLogin}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* 좌측: 브랜딩 및 도움말 섹션 */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-h1 font-black bg-architect-gradient-main bg-clip-text text-transparent leading-tight">
                {currentStep === 'email' ? t.title : t.checkEmailTitle}
              </h1>
              <p className="text-body-lg text-architect-gray-700 leading-relaxed">
                {currentStep === 'email' ? t.subtitle : t.checkEmailSubtitle}
              </p>
            </div>

            {/* 단계별 도움말 */}
            {currentStep === 'email' && (
              <div className="space-y-6">
                <h3 className="text-h3 font-bold text-architect-gray-900">
                  {t.helpSteps.title}
                </h3>
                <div className="space-y-4">
                  {t.helpSteps.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-architect-gray-300/30">
                      <div className="w-8 h-8 bg-architect-gradient-main rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-small font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-body text-architect-gray-700 leading-relaxed">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 보안 안내 */}
            <div className="p-6 bg-gradient-to-r from-architect-info/5 to-architect-primary/5 rounded-2xl border border-architect-info/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-architect-info" />
                <h3 className="text-h4 font-bold text-architect-gray-900">
                  {t.security.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {t.security.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-architect-info mt-0.5 flex-shrink-0" />
                    <span className="text-small text-architect-gray-700">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 우측: 폼 섹션 */}
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-architect-gray-300/50">
              
              {currentStep === 'email' && (
                <>
                  {/* 이메일 입력 폼 */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-architect-gradient-main rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-h3 font-bold text-architect-gray-900 mb-2">
                      {t.title}
                    </h2>
                    <p className="text-body text-architect-gray-600">
                      가입 시 사용한 이메일을 입력해주세요
                    </p>
                  </div>

                  {/* 에러/성공 메시지 */}
                  {error && (
                    <div className="mb-6 p-4 bg-architect-error/10 border border-architect-error/20 rounded-xl flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-architect-error flex-shrink-0" />
                      <span className="text-body text-architect-error">
                        {error}
                      </span>
                    </div>
                  )}

                  {success && (
                    <div className="mb-6 p-4 bg-architect-success/10 border border-architect-success/20 rounded-xl flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-architect-success flex-shrink-0" />
                      <span className="text-body text-architect-success">
                        {success}
                      </span>
                    </div>
                  )}

                  {/* 이메일 입력 폼 */}
                  <form onSubmit={handleSendReset} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email" className="text-body font-medium text-architect-gray-900">
                        {t.email}
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-architect-gray-500" />
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder={t.emailPlaceholder}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError(null);
                          }}
                          className="pl-12 h-12"
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className="w-full h-12 text-body font-semibold"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          전송 중...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {t.sendResetLink}
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </form>
                </>
              )}

              {currentStep === 'sent' && (
                <>
                  {/* 이메일 전송 완료 */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-architect-success rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-h3 font-bold text-architect-gray-900 mb-2">
                      {t.checkEmailTitle}
                    </h2>
                    <p className="text-body text-architect-gray-600">
                      {t.checkEmailSubtitle}
                    </p>
                  </div>

                  {/* 성공 메시지 */}
                  {success && (
                    <div className="mb-6 p-4 bg-architect-success/10 border border-architect-success/20 rounded-xl flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-architect-success flex-shrink-0" />
                      <span className="text-body text-architect-success">
                        {success}
                      </span>
                    </div>
                  )}

                  {error && (
                    <div className="mb-6 p-4 bg-architect-error/10 border border-architect-error/20 rounded-xl flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-architect-error flex-shrink-0" />
                      <span className="text-body text-architect-error">
                        {error}
                      </span>
                    </div>
                  )}

                  {/* 이메일 정보 */}
                  <div className="space-y-6">
                    <div className="p-4 bg-architect-gray-100 rounded-xl">
                      <div className="text-small text-architect-gray-600 mb-1">
                        {t.emailSentTo}
                      </div>
                      <div className="text-body font-semibold text-architect-gray-900">
                        {getMaskedEmail(email)}
                      </div>
                    </div>

                    <div className="text-body text-architect-gray-700 leading-relaxed">
                      {t.emailInstructions}
                    </div>

                    {/* 만료 시간 표시 */}
                    <div className="flex items-center gap-2 p-3 bg-architect-warning/10 rounded-lg border border-architect-warning/20">
                      <Clock className="w-4 h-4 text-architect-warning" />
                      <span className="text-small text-architect-warning">
                        {t.linkExpiresIn}
                      </span>
                    </div>

                    {/* 재전송 섹션 */}
                    <div className="border-t border-architect-gray-300 pt-6">
                      <div className="text-center">
                        <p className="text-body text-architect-gray-600 mb-4">
                          {t.emailNotReceived}
                        </p>
                        
                        {resendCount < 3 ? (
                          <div className="space-y-3">
                            <Button
                              onClick={handleResend}
                              disabled={!canResend || isSubmitting}
                              variant="outline"
                              className="btn-architect-secondary"
                            >
                              {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                  재전송 중...
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <RefreshCw className="w-4 h-4" />
                                  {t.resendEmail}
                                </div>
                              )}
                            </Button>
                            
                            <p className="text-xs text-architect-gray-500">
                              {t.checkSpamFolder}
                            </p>
                            
                            {resendCount > 0 && (
                              <p className="text-xs text-architect-gray-500">
                                재전송 횟수: {resendCount}/3
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="p-4 bg-architect-error/10 rounded-xl border border-architect-error/20">
                            <AlertCircle className="w-5 h-5 text-architect-error mx-auto mb-2" />
                            <p className="text-body text-architect-error text-center">
                              {t.resendLimitReached}
                            </p>
                            <p className="text-small text-architect-gray-600 text-center mt-1">
                              {t.tryAgainLater}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 로그인으로 돌아가기 */}
                    <Button
                      onClick={() => router.push('/auth/login')}
                      variant="outline"
                      className="w-full h-12"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t.backToLogin}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}