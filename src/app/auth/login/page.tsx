'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github, Chrome, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { auth, getAuthErrorMessage, PASSWORD_MIN_LENGTH } from '@/lib/supabase/client';
import { getSafeRedirectFromParams } from '@/lib/security/redirectSecurity';

interface FormData {
  email: string;
  password: string;
}

// LoginContent 컴포넌트 - useSearchParams 사용
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string>('/dashboard');

  const language = 'ko'; // Default language

  // 리다이렉트 URL 처리
  useEffect(() => {
    const safeRedirectUrl = getSafeRedirectFromParams(searchParams);
    setRedirectUrl(safeRedirectUrl);
  }, [searchParams]);

  // 다국어 콘텐츠
  const content = {
    ko: {
      title: '로그인',
      subtitle: '사고와 재능의 설계자와 함께 시작하세요',
      email: '이메일',
      password: '비밀번호',
      rememberMe: '로그인 상태 유지',
      loginButton: '로그인',
      forgotPassword: '비밀번호를 잊으셨나요?',
      noAccount: '계정이 없으신가요?',
      signUp: '회원가입',
      socialLogin: '소셜 로그인',
      orContinueWith: '또는 다음으로 계속하기',
      googleLogin: 'Google로 로그인',
      githubLogin: 'GitHub로 로그인',
      welcomeBack: '다시 오신 것을 환영합니다',
      secureLogin: '안전한 로그인 환경',
      emailPlaceholder: 'your@email.com',
      passwordPlaceholder: '비밀번호를 입력하세요',
      validation: {
        emailRequired: '이메일을 입력해주세요',
        emailInvalid: '올바른 이메일 형식을 입력해주세요',
        passwordRequired: '비밀번호를 입력해주세요',
        passwordMinLength: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다`
      }
    }
  };

  const t = content[language];

  // 폼 검증
  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.email) {
      errors.push(t.validation.emailRequired);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push(t.validation.emailInvalid);
    }
    
    if (!formData.password) {
      errors.push(t.validation.passwordRequired);
    } else if (formData.password.length < PASSWORD_MIN_LENGTH) {
      errors.push(t.validation.passwordMinLength);
    }
    
    return errors;
  };

  // 로그인 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Supabase 로그인
      const { data, error } = await auth.signIn(formData.email, formData.password);
      
      if (error) {
        setError(getAuthErrorMessage(error));
        return;
      }
      
      if (data.user) {
        setSuccess('로그인 성공! 페이지로 이동합니다.');
        setTimeout(() => {
          router.push(redirectUrl);
          router.refresh(); // 세션 상태 새로고침
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 소셜 로그인 처리
  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { error } = await auth.signInWithOAuth(provider);
      
      if (error) {
        setError(getAuthErrorMessage(error));
      }
      // OAuth 리다이렉트가 발생하므로 별도 처리 불필요
    } catch (error) {
      console.error('Social login error:', error);
      setError('소셜 로그인 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 입력 값 변경 처리
  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    if (error) setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* 상단 네비게이션 */}
        <div className="flex items-center justify-between mb-12">
          <Logo 
            size="sm" 
            language={language}
            onClick={() => router.push('/')}
            className="transition-transform hover:scale-105"
          />
          
          <div className="flex items-center gap-4">
            <span className="text-body text-architect-gray-700">
              {t.noAccount}
            </span>
            <Button
              variant="outline"
              onClick={() => router.push('/auth/signup')}
              className="px-6"
            >
              {t.signUp}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* 좌측: 브랜딩 섹션 */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-h1 font-black bg-architect-gradient-main bg-clip-text text-transparent leading-tight">
                {t.welcomeBack}
              </h1>
              <p className="text-body-lg text-architect-gray-700 leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* 신뢰 지표 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-architect-gray-300/30">
                <div className="w-12 h-12 bg-architect-gradient-main rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-h4 font-bold text-architect-gray-900">
                    98%
                  </div>
                  <div className="text-small text-architect-gray-600">
                    사용자 만족도
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-architect-gray-300/30">
                <div className="w-12 h-12 bg-architect-accent rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-h4 font-bold text-architect-gray-900">
                    256-bit
                  </div>
                  <div className="text-small text-architect-gray-600">
                    {t.secureLogin}
                  </div>
                </div>
              </div>
            </div>

            {/* 특징 리스트 */}
            <div className="space-y-4">
              {[
                'AI 기반 개인화 학습',
                '8단계 체계적 사고 방법론',
                '실시간 진도 추적 및 피드백'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-architect-gradient-main rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-body text-architect-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 우측: 로그인 폼 */}
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-architect-gray-300/50">
              
              {/* 폼 헤더 */}
              <div className="text-center mb-8">
                <h2 className="text-h3 font-bold text-architect-gray-900 mb-2">
                  {t.title}
                </h2>
                <p className="text-body text-architect-gray-600">
                  계정에 로그인하여 학습을 계속하세요
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

              {/* 로그인 폼 */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 이메일 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-body font-medium text-architect-gray-900">
                    {t.email}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-architect-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={formData.email}
                      onChange={handleChange('email')}
                      className="pl-12 h-12"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* 비밀번호 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-body font-medium text-architect-gray-900">
                    {t.password}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-architect-gray-500" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t.passwordPlaceholder}
                      value={formData.password}
                      onChange={handleChange('password')}
                      className="pl-12 pr-12 h-12"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-architect-gray-500 hover:text-architect-gray-700 transition-colors"
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* 옵션들 */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-architect-primary bg-white border-2 border-architect-gray-300 rounded focus:ring-architect-primary focus:ring-2 transition-colors"
                      disabled={isSubmitting}
                    />
                    <span className="text-small text-architect-gray-700">
                      {t.rememberMe}
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => router.push('/auth/password-reset')}
                    className="text-small text-architect-primary hover:text-architect-secondary transition-colors font-medium"
                    disabled={isSubmitting}
                  >
                    {t.forgotPassword}
                  </button>
                </div>

                {/* 로그인 버튼 */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-body font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      로그인 중...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {t.loginButton}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* 구분선 */}
              <div className="my-8">
                <Separator className="bg-architect-gray-300" />
                <div className="relative flex justify-center -top-3">
                  <span className="bg-white px-4 text-small text-architect-gray-500">
                    {t.orContinueWith}
                  </span>
                </div>
              </div>

              {/* 소셜 로그인 */}
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isSubmitting}
                  className="w-full h-12 border-2 border-architect-gray-300 hover:border-architect-primary hover:bg-architect-primary/5 transition-all duration-300"
                >
                  <Chrome className="w-5 h-5 mr-3 text-red-500" />
                  <span className="text-body font-medium text-architect-gray-700">
                    {t.googleLogin}
                  </span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin('github')}
                  disabled={isSubmitting}
                  className="w-full h-12 border-2 border-architect-gray-300 hover:border-architect-primary hover:bg-architect-primary/5 transition-all duration-300"
                >
                  <Github className="w-5 h-5 mr-3 text-architect-gray-900" />
                  <span className="text-body font-medium text-architect-gray-700">
                    {t.githubLogin}
                  </span>
                </Button>
              </div>

              {/* 하단 링크 */}
              <div className="mt-8 text-center">
                <span className="text-small text-architect-gray-600">
                  {t.noAccount}{' '}
                </span>
                <button
                  onClick={() => router.push('/auth/signup')}
                  className="text-small text-architect-primary hover:text-architect-secondary transition-colors font-semibold"
                  disabled={isSubmitting}
                >
                  {t.signUp}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 로딩 컴포넌트
function LoginLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-architect-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-body text-architect-gray-700">로그인 페이지를 준비하고 있습니다...</p>
      </div>
    </div>
  );
}

// 메인 컴포넌트 - Suspense 경계 제공
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}