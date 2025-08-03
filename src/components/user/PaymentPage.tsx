'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { 
  CreditCard, 
  Check, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  ChevronLeft,
  Lock,
  Award,
  BookOpen,
  Brain,
  Sparkles,
  Crown,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface PaymentPageProps {
  user: User;
  onNavigate?: (page: string, params?: any) => void;
  selectedPlan?: 'basic' | 'premium' | 'pro';
}

interface PricingPlan {
  id: 'basic' | 'premium' | 'pro';
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  period: string;
  features: string[];
  popular?: boolean;
  icon: any;
  color: string;
  bgColor: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: '베이직',
    description: '개인 학습자를 위한 기본 플랜',
    price: 29000,
    period: '월',
    features: [
      '8단계 사고력 개발 코스 전체 접근',
      '기본 AI 파트너 아키와의 상호작용',
      '학습 진도 추적',
      '기본 진단 테스트',
      '커뮤니티 접근'
    ],
    icon: BookOpen,
    color: 'text-architect-primary',
    bgColor: 'bg-architect-primary/5'
  },
  {
    id: 'premium',
    name: '프리미엄',
    description: '적극적 학습자를 위한 추천 플랜',
    price: 49000,
    originalPrice: 59000,
    period: '월',
    features: [
      '베이직 플랜의 모든 기능',
      '개인 맞춤 학습 경로 제공',
      '고급 AI 파트너와 심화 대화',
      '1:1 멘토링 세션 (월 2회)',
      '상세 학습 분석 리포트',
      '프리미엄 학습 자료 다운로드',
      '우선 고객 지원'
    ],
    popular: true,
    icon: Crown,
    color: 'text-architect-accent',
    bgColor: 'bg-architect-accent/5'
  },
  {
    id: 'pro',
    name: '프로',
    description: '전문가 수준의 사고력 개발',
    price: 89000,
    originalPrice: 99000,
    period: '월',
    features: [
      '프리미엄 플랜의 모든 기능',
      '개인 맞춤 심화 코스 설계',
      '전담 멘토 배정',
      '무제한 1:1 코칭 세션',
      '기업/팀 워크숍 참여 기회',
      '사고력 인증서 발급',
      '평생 학습 커뮤니티 접근',
      '신규 코스 우선 체험'
    ],
    icon: Sparkles,
    color: 'text-architect-secondary',
    bgColor: 'bg-architect-secondary/5'
  }
];

// 입력값 새니타이징 함수
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>\"']/g, '').trim();
};

// 신용카드 번호 유효성 검사
const validateCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, '');
  return /^[0-9]{13,19}$/.test(cleaned);
};

// CVV 유효성 검사
const validateCVV = (cvv: string): boolean => {
  return /^[0-9]{3,4}$/.test(cvv);
};

// 만료일 유효성 검사 (MM/YY 형식)
const validateExpiryDate = (expiryDate: string): boolean => {
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!regex.test(expiryDate)) return false;
  
  const [month, year] = expiryDate.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const expYear = parseInt(year);
  const expMonth = parseInt(month);
  
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;
  
  return true;
};

// 카드 소유자 이름 유효성 검사
const validateCardHolder = (name: string): boolean => {
  const cleaned = name.trim();
  return cleaned.length >= 2 && /^[a-zA-Z가-힣\s]+$/.test(cleaned);
};

// 이메일 유효성 검사
const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const PaymentPage: React.FC<PaymentPageProps> = ({
  user,
  onNavigate,
  selectedPlan = 'premium'
}) => {
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState<'basic' | 'premium' | 'pro'>(selectedPlan);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'account'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    email: user?.email || '',
    agreement: false
  });
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  const selectedPlanData = pricingPlans.find(plan => plan.id === currentPlan)!;

  // 실시간 유효성 검사
  const validateField = (field: string, value: string): string => {
    const sanitized = sanitizeInput(value);
    
    switch (field) {
      case 'cardNumber':
        if (!sanitized) return '카드 번호를 입력해주세요.';
        if (!validateCardNumber(sanitized)) return '올바른 카드 번호를 입력해주세요. (13-19자리 숫자)';
        break;
      case 'expiryDate':
        if (!sanitized) return '만료일을 입력해주세요.';
        if (!validateExpiryDate(sanitized)) return '올바른 만료일을 입력해주세요. (MM/YY)';
        break;
      case 'cvv':
        if (!sanitized) return 'CVV를 입력해주세요.';
        if (!validateCVV(sanitized)) return '올바른 CVV를 입력해주세요. (3-4자리 숫자)';
        break;
      case 'cardHolder':
        if (!sanitized) return '카드 소유자 이름을 입력해주세요.';
        if (!validateCardHolder(sanitized)) return '올바른 이름을 입력해주세요. (2자 이상, 문자만)';
        break;
      case 'email':
        if (!sanitized) return '이메일을 입력해주세요.';
        if (!validateEmail(sanitized)) return '올바른 이메일 형식을 입력해주세요.';
        break;
    }
    return '';
  };

  // 모든 필드 유효성 검사
  const validateAllFields = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    Object.keys(paymentForm).forEach(field => {
      if (field !== 'agreement') {
        const error = validateField(field, paymentForm[field as keyof typeof paymentForm] as string);
        if (error) errors[field] = error;
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 입력값 변경 처리
  const handleInputChange = (field: string, value: string) => {
    const sanitized = sanitizeInput(value);
    
    // 카드 번호 포맷팅 (4자리마다 공백 추가)
    let formattedValue = sanitized;
    if (field === 'cardNumber') {
      formattedValue = sanitized.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    // 만료일 포맷팅 (MM/YY)
    else if (field === 'expiryDate') {
      formattedValue = sanitized.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5);
    }
    // CVV는 숫자만
    else if (field === 'cvv') {
      formattedValue = sanitized.replace(/\D/g, '').substring(0, 4);
    }
    
    setPaymentForm(prev => ({
      ...prev,
      [field]: formattedValue
    }));
    
    // 터치 상태 업데이트
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    // 실시간 유효성 검사
    const error = validateField(field, formattedValue);
    setValidationErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleNavigation = (page: string, params?: any) => {
    if (onNavigate) {
      onNavigate(page, params);
    } else {
      switch (page) {
        case 'dashboard':
          router.push('/dashboard');
          break;
        case 'payment-confirmation':
          router.push('/payment-confirmation');
          break;
        default:
          router.push('/');
      }
    }
  };

  const handlePayment = async () => {
    // 이용약관 동의 확인
    if (!paymentForm.agreement) {
      setValidationErrors(prev => ({
        ...prev,
        agreement: '이용약관에 동의해주세요.'
      }));
      return;
    }

    // 전체 필드 유효성 검사
    if (!validateAllFields()) {
      return;
    }

    setIsProcessing(true);
    setValidationErrors({});
    
    try {
      // 결제 처리 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      handleNavigation('payment-confirmation', {
        plan: currentPlan,
        amount: selectedPlanData.price,
        paymentMethod
      });
    } catch (error) {
      setValidationErrors({
        payment: '결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-50 to-white">
      {/* 헤더 */}
      <div className="bg-white border-b border-architect-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation('dashboard')}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              대시보드로 돌아가기
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-h3 font-bold text-architect-gray-900">프리미엄 업그레이드</h1>
              <p className="text-small text-architect-gray-600">
                더 깊이 있는 사고력 개발 여정을 시작하세요
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 플랜 선택 */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-h4 font-bold text-architect-gray-900 mb-2">
                플랜 선택
              </h2>
              <p className="text-body text-architect-gray-600">
                학습 목표에 맞는 최적의 플랜을 선택하세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all duration-200 ${
                    currentPlan === plan.id
                      ? 'ring-2 ring-architect-primary shadow-lg scale-105'
                      : 'hover:shadow-md hover:scale-102'
                  } ${plan.popular ? 'border-architect-accent' : 'border-architect-gray-200'}`}
                  onClick={() => setCurrentPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-architect-accent text-white">
                        인기 추천
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 ${plan.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <plan.icon className={`w-8 h-8 ${plan.color}`} />
                    </div>
                    <CardTitle className="text-h5">{plan.name}</CardTitle>
                    <CardDescription className="text-small">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="text-center">
                    <div className="mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {plan.originalPrice && (
                          <span className="text-body text-architect-gray-400 line-through">
                            ₩{plan.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-h3 font-bold text-architect-gray-900">
                          ₩{plan.price.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-small text-architect-gray-600">
                        / {plan.period}
                      </span>
                    </div>
                    
                    <div className="space-y-3 text-left">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-architect-success mt-0.5 flex-shrink-0" />
                          <span className="text-small text-architect-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {currentPlan === plan.id && (
                      <div className="mt-4 p-3 bg-architect-primary/5 rounded-lg">
                        <span className="text-small text-architect-primary font-medium">
                          선택된 플랜
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 결제 정보 */}
            <Card className="border-architect-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-architect-primary" />
                  결제 정보
                </CardTitle>
                <CardDescription>
                  안전한 결제를 위해 정확한 정보를 입력해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 전체 에러 메시지 */}
                {validationErrors.payment && (
                  <div className="p-4 bg-architect-error/10 border border-architect-error/20 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-architect-error flex-shrink-0" />
                    <span className="text-small text-architect-error">
                      {validationErrors.payment}
                    </span>
                  </div>
                )}

                {/* 이메일 */}
                <div className="space-y-2">
                  <Label htmlFor="email">이메일 주소</Label>
                  <Input
                    id="email"
                    type="email"
                    value={paymentForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="이메일을 입력하세요"
                    className={`${validationErrors.email && touched.email ? 'border-architect-error' : ''}`}
                  />
                  {validationErrors.email && touched.email && (
                    <p className="text-xs text-architect-error flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                {/* 카드 정보 */}
                <div className="space-y-4">
                  <Label>카드 정보</Label>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <Input
                        placeholder="카드 번호 (1234 5678 9012 3456)"
                        value={paymentForm.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        maxLength={19}
                        className={`${validationErrors.cardNumber && touched.cardNumber ? 'border-architect-error' : ''}`}
                      />
                      {validationErrors.cardNumber && touched.cardNumber && (
                        <p className="text-xs text-architect-error flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {validationErrors.cardNumber}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Input
                          placeholder="MM/YY"
                          value={paymentForm.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          maxLength={5}
                          className={`${validationErrors.expiryDate && touched.expiryDate ? 'border-architect-error' : ''}`}
                        />
                        {validationErrors.expiryDate && touched.expiryDate && (
                          <p className="text-xs text-architect-error flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {validationErrors.expiryDate}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Input
                          placeholder="CVV"
                          value={paymentForm.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          maxLength={4}
                          type="password"
                          className={`${validationErrors.cvv && touched.cvv ? 'border-architect-error' : ''}`}
                        />
                        {validationErrors.cvv && touched.cvv && (
                          <p className="text-xs text-architect-error flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {validationErrors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Input
                        placeholder="카드 소유자 이름"
                        value={paymentForm.cardHolder}
                        onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                        className={`${validationErrors.cardHolder && touched.cardHolder ? 'border-architect-error' : ''}`}
                      />
                      {validationErrors.cardHolder && touched.cardHolder && (
                        <p className="text-xs text-architect-error flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {validationErrors.cardHolder}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 이용약관 동의 */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-4 bg-architect-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="agreement"
                      checked={paymentForm.agreement}
                      onChange={(e) => {
                        setPaymentForm(prev => ({ ...prev, agreement: e.target.checked }));
                        if (validationErrors.agreement) {
                          setValidationErrors(prev => ({ ...prev, agreement: '' }));
                        }
                      }}
                      className="mt-1"
                    />
                    <div>
                      <Label htmlFor="agreement" className="text-small">
                        <span className="text-architect-gray-900">
                          이용약관 및 개인정보처리방침에 동의합니다
                        </span>
                      </Label>
                      <p className="text-xs text-architect-gray-600 mt-1">
                        결제 진행을 위해 약관 동의가 필요합니다
                      </p>
                    </div>
                  </div>
                  {validationErrors.agreement && (
                    <p className="text-xs text-architect-error flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.agreement}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 주문 요약 */}
          <div className="space-y-6">
            <Card className="border-architect-gray-200">
              <CardHeader>
                <CardTitle className="text-h5">주문 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${selectedPlanData.bgColor} rounded-lg flex items-center justify-center`}>
                    <selectedPlanData.icon className={`w-5 h-5 ${selectedPlanData.color}`} />
                  </div>
                  <div>
                    <h4 className="text-body font-semibold text-architect-gray-900">
                      {selectedPlanData.name} 플랜
                    </h4>
                    <p className="text-small text-architect-gray-600">
                      월간 구독
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-small text-architect-gray-600">플랜 요금</span>
                    <span className="text-small">₩{selectedPlanData.price.toLocaleString()}</span>
                  </div>
                  {selectedPlanData.originalPrice && (
                    <div className="flex justify-between">
                      <span className="text-small text-architect-success">할인</span>
                      <span className="text-small text-architect-success">
                        -₩{(selectedPlanData.originalPrice - selectedPlanData.price).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-small text-architect-gray-600">부가세</span>
                    <span className="text-small">₩{Math.round(selectedPlanData.price * 0.1).toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="text-body font-semibold text-architect-gray-900">총 결제 금액</span>
                  <span className="text-h5 font-bold text-architect-primary">
                    ₩{Math.round(selectedPlanData.price * 1.1).toLocaleString()}
                  </span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || !paymentForm.agreement}
                  className="w-full h-12 bg-architect-primary hover:bg-architect-primary/90"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      결제 처리 중...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      안전하게 결제하기
                    </div>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-xs text-architect-gray-600">
                    언제든지 구독을 취소할 수 있습니다
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 보안 안내 */}
            <Card className="bg-architect-success/5 border-architect-success/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-architect-success mt-0.5" />
                  <div>
                    <h4 className="text-small font-semibold text-architect-gray-900 mb-1">
                      안전한 결제
                    </h4>
                    <p className="text-xs text-architect-gray-600">
                      SSL 암호화로 보호되는 안전한 결제 시스템을 사용합니다
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 혜택 안내 */}
            <Card className="bg-architect-accent/5 border-architect-accent/20">
              <CardContent className="p-4">
                <h4 className="text-small font-semibold text-architect-gray-900 mb-3">
                  프리미엄 혜택 미리보기
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-architect-accent" />
                    <span className="text-xs text-architect-gray-600">개인 맞춤 학습 경로</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-3 h-3 text-architect-accent" />
                    <span className="text-xs text-architect-gray-600">AI 파트너와 심화 대화</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-architect-accent" />
                    <span className="text-xs text-architect-gray-600">1:1 멘토링 세션</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;