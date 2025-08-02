'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase, getAuthErrorMessage } from '@/lib/supabase/client';

interface FormData {
  password: string;
  confirmPassword: string;
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  const language = 'ko'; // Default language

  // URL에서 토큰 정보 확인
  useEffect(() => {
    const checkToken = async () => {
      try {
        // URL 해시나 쿼리 파라미터에서 토큰 확인
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        if (type === 'recovery' && accessToken && refreshToken) {
          // Supabase 세션 설정
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error('Token validation error:', error);
            setIsValidToken(false);
            setError('유효하지 않은 재설정 링크입니다.');
          } else {
            setIsValidToken(true);
          }
        } else {
          setIsValidToken(false);
          setError('유효하지 않은 재설정 링크입니다.');
        }
      } catch (error) {
        console.error('Token check error:', error);
        setIsValidToken(false);
        setError('링크 확인 중 오류가 발생했습니다.');
      }
    };

    checkToken();
  }, []);

  // 다국어 콘텐츠
  const content = {
    ko: {
      title: '새 비밀번호 설정',
      subtitle: '계정 보안을 위해 강력한 비밀번호를 설정해주세요',
      password: '새 비밀번호',
      confirmPassword: '비밀번호 확인',
      passwordPlaceholder: '8자 이상의 새 비밀번호',
      confirmPasswordPlaceholder: '비밀번호를 다시 입력하세요',
      updatePassword: '비밀번호 변경',
      backToLogin: '로그인으로 돌아가기',
      successMessage: '비밀번호가 성공적으로 변경되었습니다!',
      redirectMessage: '잠시 후 로그인 페이지로 이동합니다.',
      
      validation: {
        passwordRequired: '새 비밀번호를 입력해주세요',
        passwordMinLength: '비밀번호는 최소 8자 이상이어야 합니다',
        passwordWeak: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다',
        confirmPasswordRequired: '비밀번호 확인을 입력해주세요',
        passwordMismatch: '비밀번호가 일치하지 않습니다'
      },

      security: {
        title: '비밀번호 보안 가이드',
        requirements: [
          '최소 8자 이상',
          '영문 대소문자 포함',
          '숫자 포함',
          '특수문자 포함',
          '개인정보 포함 금지'
        ]
      },

      errors: {
        invalidToken: '유효하지 않은 재설정 링크입니다',
        expiredToken: '재설정 링크가 만료되었습니다',
        tokenCheckFailed: '링크 확인 중 오류가 발생했습니다'
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
    
    return errors;
  };

  // 비밀번호 업데이트
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
      // Supabase 비밀번호 업데이트
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      });
      
      if (error) {
        setError(getAuthErrorMessage(error));
        return;
      }
      
      setSuccess(t.successMessage);
      
      // 2초 후 로그인 페이지로 리다이렉트
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
      
    } catch (error) {
      console.error('Password update error:', error);
      setError('비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.');
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

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordStrengthColor = 
    passwordStrength <= 1 ? 'bg-architect-error' :
    passwordStrength <= 2 ? 'bg-architect-warning' :
    passwordStrength <= 3 ? 'bg-architect-info' :
    'bg-architect-success';

  // 토큰 확인 중일 때 로딩 표시
  if (isValidToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-architect-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-h3 font-bold text-architect-gray-900 mb-2">
            링크 확인 중...
          </h1>
          <p className="text-body text-architect-gray-600">
            잠시만 기다려주세요
          </p>
        </div>
      </div>
    );
  }

  // 유효하지 않은 토큰일 때
  if (isValidToken === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-error/5 py-12 px-4">
        <div className="container mx-auto max-w-md">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-architect-gray-300/50 text-center">
            <div className="w-16 h-16 bg-architect-error rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-h3 font-bold text-architect-gray-900 mb-4">
              {t.errors.invalidToken}
            </h1>
            <p className="text-body text-architect-gray-600 mb-6">
              재설정 링크가 유효하지 않거나 만료되었습니다. 새로운 재설정 링크를 요청해주세요.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => router.push('/auth/password-reset')}
                className="w-full"
              >
                새 재설정 링크 요청
              </Button>
              <Button
                onClick={() => router.push('/auth/login')}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToLogin}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          
          {/* 좌측: 브랜딩 및 보안 가이드 */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-h1 font-black bg-architect-gradient-main bg-clip-text text-transparent leading-tight">
                {t.title}
              </h1>
              <p className="text-body-lg text-architect-gray-700 leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* 보안 가이드 */}
            <div className="p-6 bg-gradient-to-r from-architect-info/5 to-architect-primary/5 rounded-2xl border border-architect-info/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-architect-info" />
                <h3 className="text-h4 font-bold text-architect-gray-900">
                  {t.security.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {t.security.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-architect-info flex-shrink-0" />
                    <span className="text-small text-architect-gray-700">
                      {requirement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 우측: 비밀번호 재설정 폼 */}
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-architect-gray-300/50">
              
              {/* 폼 헤더 */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-architect-gradient-main rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-h3 font-bold text-architect-gray-900 mb-2">
                  {t.title}
                </h2>
                <p className="text-body text-architect-gray-600">
                  새로운 비밀번호를 입력해주세요
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
                  <div>
                    <span className="text-body text-architect-success block">
                      {success}
                    </span>
                    <span className="text-small text-architect-gray-600">
                      {t.redirectMessage}
                    </span>
                  </div>
                </div>
              )}

              {/* 비밀번호 재설정 폼 */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 새 비밀번호 입력 */}
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

                {/* 비밀번호 변경 버튼 */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-body font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      변경 중...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {t.updatePassword}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-architect-gray-100/30 via-white to-architect-primary/5">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-architect-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-h3 font-bold text-architect-gray-900 mb-2">
            페이지 로딩 중...
          </h1>
          <p className="text-body text-architect-gray-600">
            잠시만 기다려주세요
          </p>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}