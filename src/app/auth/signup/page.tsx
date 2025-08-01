'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome, AlertCircle, CheckCircle2, Shield, Users, Brain } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { auth, getAuthErrorMessage } from '@/lib/supabase/client';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Agreements {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreements, setAgreements] = useState<Agreements>({
    terms: false,
    privacy: false,
    marketing: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const language = 'ko'; // Default language

  // 다국어 콘텐츠
  const content = {
    ko: {
      title: '회원가입',
      subtitle: '사고와 재능의 설계자가 되어보세요',
      name: '이름',
      email: '이메일',
      password: '비밀번호',
      confirmPassword: '비밀번호 확인',
      signupButton: '회원가입',
      alreadyHaveAccount: '이미 계정이 있으신가요?',
      signIn: '로그인',
      socialSignup: '소셜 회원가입',
      orContinueWith: '또는 다음으로 계속하기',
      googleSignup: 'Google로 회원가입',
      githubSignup: 'GitHub로 회원가입',
      joinCommunity: '사고 설계자 커뮤니티에 참여하세요',
      secureSignup: '안전한 회원가입',
      namePlaceholder: '홍길동',
      emailPlaceholder: 'your@email.com',
      passwordPlaceholder: '8자 이상의 비밀번호',
      confirmPasswordPlaceholder: '비밀번호를 다시 입력하세요',
      agreements: {
        terms: '서비스 이용약관에 동의합니다',
        privacy: '개인정보처리방침에 동의합니다',
        marketing: '마케팅 정보 수신에 동의합니다 (선택)',
        viewTerms: '약관 보기',
        viewPrivacy: '개인정보정책 보기'
      },
      benefits: {
        title: '가입 후 얻게 되는 것들',
        items: [
          'AI와 협업하는 체계적 사고 훈련',
          '개인 맞춤형 학습 진도 관리',
          '8단계 사고 방법론 완전 습득',
          '전문가 피드백 및 동료 학습',
          '평생 학습 기록 및 성장 추적'
        ]
      },
      validation: {
        nameRequired: '이름을 입력해주세요',
        nameMinLength: '이름은 2자 이상이어야 합니다',
        emailRequired: '이메일을 입력해주세요',
        emailInvalid: '올바른 이메일 형식을 입력해주세요',
        passwordRequired: '비밀번호를 입력해주세요',
        passwordMinLength: '비밀번호는 최소 8자 이상이어야 합니다',
        passwordWeak: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다',
        confirmPasswordRequired: '비밀번호 확인을 입력해주세요',
        passwordMismatch: '비밀번호가 일치하지 않습니다',
        termsRequired: '서비스 이용약관에 동의해주세요',
        privacyRequired: '개인정보처리방침에 동의해주세요'
      }
    }
  };

  const t = content[language];

  // 비밀번호 강도 검사
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-zA-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  // 폼 검증
  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.name) {
      errors.push(t.validation.nameRequired);
    } else if (formData.name.length < 2) {
      errors.push(t.validation.nameMinLength);
    }
    
    if (!formData.email) {
      errors.push(t.validation.emailRequired);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push(t.validation.emailInvalid);
    }
    
    if (!formData.password) {
      errors.push(t.validation.passwordRequired);
    } else if (formData.password.length < 8) {
      errors.push(t.validation.passwordMinLength);
    } else if (getPasswordStrength(formData.password) < 3) {
      errors.push(t.validation.passwordWeak);
    }
    
    if (!formData.confirmPassword) {
      errors.push(t.validation.confirmPasswordRequired);
    } else if (formData.password !== formData.confirmPassword) {
      errors.push(t.validation.passwordMismatch);
    }
    
    if (!agreements.terms) {
      errors.push(t.validation.termsRequired);
    }
    
    if (!agreements.privacy) {
      errors.push(t.validation.privacyRequired);
    }
    
    return errors;
  };

  // 회원가입 처리
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
      // Supabase 회원가입
      const { data, error } = await auth.signUp(
        formData.email, 
        formData.password,
        { name: formData.name }
      );
      
      if (error) {
        setError(getAuthErrorMessage(error));
        return;
      }
      
      if (data.user) {
        setSuccess('회원가입이 완료되었습니다! 이메일 인증을 완료해주세요.');
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 소셜 회원가입 처리
  const handleSocialSignup = async (provider: 'google' | 'github') => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { error } = await auth.signInWithOAuth(provider);
      
      if (error) {
        setError(getAuthErrorMessage(error));
      }
      // OAuth 리다이렉트가 발생하므로 별도 처리 불필요
    } catch (error) {
      console.error('Social signup error:', error);
      setError('소셜 회원가입 중 오류가 발생했습니다.');
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

  // 약관 동의 변경 처리
  const handleAgreementChange = (field: keyof Agreements) => (checked: boolean) => {
    setAgreements(prev => ({
      ...prev,
      [field]: checked
    }));
    if (error) setError(null);
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordStrengthColor = 
    passwordStrength <= 1 ? 'bg-architect-error' :
    passwordStrength <= 2 ? 'bg-architect-warning' :
    passwordStrength <= 3 ? 'bg-architect-info' :
    'bg-architect-success';

  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-accent/5 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        
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
              {t.alreadyHaveAccount}
            </span>
            <Button
              variant="outline"
              onClick={() => router.push('/auth/login')}
              className="px-6"
            >
              {t.signIn}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* 좌측: 브랜딩 및 혜택 섹션 */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-h1 font-black bg-architect-gradient-main bg-clip-text text-transparent leading-tight">
                {t.joinCommunity}
              </h1>
              <p className="text-body-lg text-architect-gray-700 leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* 통계 지표 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-architect-gray-300/30">
                <div className="w-12 h-12 bg-architect-gradient-main rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-h4 font-bold text-architect-gray-900">
                  10,000+
                </div>
                <div className="text-small text-architect-gray-600">
                  활성 사용자
                </div>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-architect-gray-300/30">
                <div className="w-12 h-12 bg-architect-accent rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="text-h4 font-bold text-architect-gray-900">
                  95%
                </div>
                <div className="text-small text-architect-gray-600">
                  사고력 향상
                </div>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-architect-gray-300/30">
                <div className="w-12 h-12 bg-architect-success rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-h4 font-bold text-architect-gray-900">
                  100%
                </div>
                <div className="text-small text-architect-gray-600">
                  {t.secureSignup}
                </div>
              </div>
            </div>

            {/* 혜택 리스트 */}
            <div className="space-y-6">
              <h3 className="text-h3 font-bold text-architect-gray-900">
                {t.benefits.title}
              </h3>
              <div className="space-y-4">
                {t.benefits.items.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-architect-gray-300/30">
                    <div className="w-6 h-6 bg-architect-gradient-main rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-body text-architect-gray-700 leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 우측: 회원가입 폼 */}
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-architect-gray-300/50">
              
              {/* 폼 헤더 */}
              <div className="text-center mb-8">
                <h2 className="text-h3 font-bold text-architect-gray-900 mb-2">
                  {t.title}
                </h2>
                <p className="text-body text-architect-gray-600">
                  지금 시작하여 사고의 설계자가 되어보세요
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

              {/* 회원가입 폼 */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 이름 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-body font-medium text-architect-gray-900">
                    {t.name}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-architect-gray-500" />
                    <Input
                      id="name"
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={formData.name}
                      onChange={handleChange('name')}
                      className="pl-12 h-12"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

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
                  
                  {/* 비밀번호 강도 표시 */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-2 flex-1 rounded-full transition-colors ${
                              passwordStrength >= level ? passwordStrengthColor : 'bg-architect-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-architect-gray-600 mt-1">
                        보안 강도: {passwordStrength === 1 ? '약함' : passwordStrength === 2 ? '보통' : passwordStrength === 3 ? '좋음' : '강함'}
                      </div>
                    </div>
                  )}
                </div>

                {/* 비밀번호 확인 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-body font-medium text-architect-gray-900">
                    {t.confirmPassword}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-architect-gray-500" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t.confirmPasswordPlaceholder}
                      value={formData.confirmPassword}
                      onChange={handleChange('confirmPassword')}
                      className="pl-12 pr-12 h-12"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-architect-gray-500 hover:text-architect-gray-700 transition-colors"
                      disabled={isSubmitting}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* 비밀번호 일치 확인 */}
                  {formData.confirmPassword && (
                    <div className={`text-xs mt-1 ${
                      formData.password === formData.confirmPassword 
                        ? 'text-architect-success' 
                        : 'text-architect-error'
                    }`}>
                      {formData.password === formData.confirmPassword 
                        ? '비밀번호가 일치합니다'
                        : '비밀번호가 일치하지 않습니다'
                      }
                    </div>
                  )}
                </div>

                {/* 약관 동의 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={agreements.terms}
                      onCheckedChange={handleAgreementChange('terms')}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor="terms" className="text-body text-architect-gray-700 cursor-pointer">
                        {t.agreements.terms}
                      </label>
                      <button
                        type="button"
                        onClick={() => window.open('/terms', '_blank')}
                        className="ml-2 text-small text-architect-primary hover:text-architect-secondary transition-colors"
                        disabled={isSubmitting}
                      >
                        {t.agreements.viewTerms}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacy"
                      checked={agreements.privacy}
                      onCheckedChange={handleAgreementChange('privacy')}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor="privacy" className="text-body text-architect-gray-700 cursor-pointer">
                        {t.agreements.privacy}
                      </label>
                      <button
                        type="button"
                        onClick={() => window.open('/privacy', '_blank')}
                        className="ml-2 text-small text-architect-primary hover:text-architect-secondary transition-colors"
                        disabled={isSubmitting}
                      >
                        {t.agreements.viewPrivacy}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="marketing"
                      checked={agreements.marketing}
                      onCheckedChange={handleAgreementChange('marketing')}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                    <label htmlFor="marketing" className="text-body text-architect-gray-600 cursor-pointer">
                      {t.agreements.marketing}
                    </label>
                  </div>
                </div>

                {/* 회원가입 버튼 */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-body font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      계정 생성 중...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {t.signupButton}
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

              {/* 소셜 회원가입 */}
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialSignup('google')}
                  disabled={isSubmitting}
                  className="w-full h-12 border-2 border-architect-gray-300 hover:border-architect-primary hover:bg-architect-primary/5 transition-all duration-300"
                >
                  <Chrome className="w-5 h-5 mr-3 text-red-500" />
                  <span className="text-body font-medium text-architect-gray-700">
                    {t.googleSignup}
                  </span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialSignup('github')}
                  disabled={isSubmitting}
                  className="w-full h-12 border-2 border-architect-gray-300 hover:border-architect-primary hover:bg-architect-primary/5 transition-all duration-300"
                >
                  <Github className="w-5 h-5 mr-3 text-architect-gray-900" />
                  <span className="text-body font-medium text-architect-gray-700">
                    {t.githubSignup}
                  </span>
                </Button>
              </div>

              {/* 하단 링크 */}
              <div className="mt-8 text-center">
                <span className="text-small text-architect-gray-600">
                  {t.alreadyHaveAccount}{' '}
                </span>
                <button
                  onClick={() => router.push('/auth/login')}
                  className="text-small text-architect-primary hover:text-architect-secondary transition-colors font-semibold"
                  disabled={isSubmitting}
                >
                  {t.signIn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}