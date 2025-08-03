'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { 
  CheckCircle, 
  Calendar, 
  CreditCard, 
  Download, 
  Star,
  Crown,
  Gift,
  ArrowRight,
  Mail,
  Share2,
  BookOpen,
  Trophy,
  Users,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PaymentConfirmationPageProps {
  user: User;
  onNavigate?: (page: string, params?: any) => void;
}

interface PaymentDetails {
  plan: 'basic' | 'premium' | 'pro';
  amount: number;
  paymentMethod: string;
  transactionId: string;
  paymentDate: Date;
  nextBillingDate: Date;
}

const planDetails = {
  basic: {
    name: '베이직',
    icon: BookOpen,
    color: 'text-architect-primary',
    bgColor: 'bg-architect-primary/5'
  },
  premium: {
    name: '프리미엄',
    icon: Crown,
    color: 'text-architect-accent',
    bgColor: 'bg-architect-accent/5'
  },
  pro: {
    name: '프로',
    icon: Sparkles,
    color: 'text-architect-secondary',
    bgColor: 'bg-architect-secondary/5'
  }
};

export const PaymentConfirmationPage: React.FC<PaymentConfirmationPageProps> = ({
  user,
  onNavigate
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    plan: 'premium',
    amount: 49000,
    paymentMethod: 'card',
    transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    paymentDate: new Date(),
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  });
  
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // URL 파라미터에서 결제 정보 가져오기
    const plan = searchParams.get('plan') as 'basic' | 'premium' | 'pro' || 'premium';
    const amount = parseInt(searchParams.get('amount') || '49000');
    const paymentMethod = searchParams.get('paymentMethod') || 'card';
    
    setPaymentDetails(prev => ({
      ...prev,
      plan,
      amount,
      paymentMethod
    }));

    // 축하 효과 제거
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleNavigation = (page: string, params?: any) => {
    if (onNavigate) {
      onNavigate(page, params);
    } else {
      switch (page) {
        case 'dashboard':
          router.push('/dashboard');
          break;
        case 'courses':
          router.push('/courses');
          break;
        case 'download-receipt':
          // 영수증 다운로드 로직
          downloadReceipt();
          break;
        default:
          router.push('/');
      }
    }
  };

  const downloadReceipt = () => {
    // 영수증 다운로드 시뮬레이션
    const receiptData = {
      transactionId: paymentDetails.transactionId,
      plan: planDetails[paymentDetails.plan].name,
      amount: paymentDetails.amount,
      date: paymentDetails.paymentDate.toLocaleDateString('ko-KR'),
      userEmail: user.email
    };
    
    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iwl-receipt-${paymentDetails.transactionId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareSuccess = () => {
    if (navigator.share) {
      navigator.share({
        title: 'IdeaWorkLab 프리미엄 구독 시작!',
        text: '체계적인 사고력 개발 여정을 시작했습니다! 🎉',
        url: window.location.origin
      });
    } else {
      // 클립보드에 복사
      navigator.clipboard.writeText('IdeaWorkLab에서 사고력 개발 여정을 시작했습니다! 🎉 ' + window.location.origin);
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  const currentPlan = planDetails[paymentDetails.plan];

  return (
    <div className="min-h-screen bg-gradient-to-br from-architect-gray-50 to-white relative overflow-hidden">
      {/* 축하 배경 효과 */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-4 h-4 bg-architect-accent rounded-full animate-bounce"></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-architect-primary rounded-full animate-bounce delay-150"></div>
          <div className="absolute top-32 left-1/3 w-2 h-2 bg-architect-success rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-16 right-1/3 w-3 h-3 bg-architect-warning rounded-full animate-bounce delay-500"></div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* 성공 헤더 */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-architect-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-architect-success" />
          </div>
          <h1 className="text-h1 font-black text-architect-gray-900 mb-4">
            🎉 결제가 완료되었습니다!
          </h1>
          <p className="text-body-lg text-architect-gray-600 max-w-2xl mx-auto">
            <span className="font-semibold text-architect-primary">{currentPlan.name} 플랜</span>에 오신 것을 환영합니다!<br />
            이제 더욱 깊이 있는 사고력 개발 여정을 시작할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 결제 정보 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 구독 정보 */}
            <Card className="border-architect-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <currentPlan.icon className={`w-5 h-5 ${currentPlan.color}`} />
                  구독 정보
                </CardTitle>
                <CardDescription>
                  선택하신 플랜과 구독 상세 정보입니다
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-architect-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${currentPlan.bgColor} rounded-lg flex items-center justify-center`}>
                      <currentPlan.icon className={`w-5 h-5 ${currentPlan.color}`} />
                    </div>
                    <div>
                      <h4 className="text-body font-semibold text-architect-gray-900">
                        {currentPlan.name} 플랜
                      </h4>
                      <p className="text-small text-architect-gray-600">
                        월간 구독 • 자동 갱신
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-architect-success text-white">
                    활성화됨
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-small text-architect-gray-600">구독 시작일</span>
                    <p className="text-body font-medium text-architect-gray-900">
                      {paymentDetails.paymentDate.toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-small text-architect-gray-600">다음 결제일</span>
                    <p className="text-body font-medium text-architect-gray-900">
                      {paymentDetails.nextBillingDate.toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 결제 상세 정보 */}
            <Card className="border-architect-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-architect-primary" />
                  결제 상세 정보
                </CardTitle>
                <CardDescription>
                  결제 내역 및 영수증 정보입니다
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-small text-architect-gray-600">거래 ID</span>
                    <span className="text-small font-mono text-architect-gray-900">
                      {paymentDetails.transactionId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-small text-architect-gray-600">결제 수단</span>
                    <span className="text-small text-architect-gray-900">
                      {paymentDetails.paymentMethod === 'card' ? '신용카드' : '계좌이체'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-small text-architect-gray-600">플랜 요금</span>
                    <span className="text-small text-architect-gray-900">
                      ₩{paymentDetails.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-small text-architect-gray-600">부가세 (10%)</span>
                    <span className="text-small text-architect-gray-900">
                      ₩{Math.round(paymentDetails.amount * 0.1).toLocaleString()}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="text-body font-semibold text-architect-gray-900">총 결제 금액</span>
                    <span className="text-h5 font-bold text-architect-primary">
                      ₩{Math.round(paymentDetails.amount * 1.1).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleNavigation('download-receipt')}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    영수증 다운로드
                  </Button>
                  <Button
                    variant="outline"
                    onClick={shareSuccess}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    성공 공유하기
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 이메일 확인 안내 */}
            <Card className="bg-architect-primary/5 border-architect-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-architect-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-architect-primary" />
                  </div>
                  <div>
                    <h4 className="text-body font-semibold text-architect-gray-900 mb-2">
                      확인 이메일을 발송했습니다
                    </h4>
                    <p className="text-small text-architect-gray-600 mb-3">
                      <span className="font-medium">{user.email}</span>으로 구독 확인 및 시작 가이드를 보내드렸습니다.
                    </p>
                    <p className="text-xs text-architect-gray-500">
                      이메일이 보이지 않으면 스팸 폴더를 확인해주세요.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 다음 단계 */}
          <div className="space-y-6">
            {/* 시작하기 */}
            <Card className="bg-gradient-to-br from-architect-primary to-architect-secondary text-white border-0">
              <CardContent className="p-6 text-center">
                <Gift className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-h5 font-bold mb-2">
                  학습 여정을 시작하세요!
                </h3>
                <p className="text-small opacity-90 mb-6">
                  새로운 기능들을 바로 체험해보세요
                </p>
                <Button
                  onClick={() => handleNavigation('courses')}
                  className="w-full bg-white text-architect-primary hover:bg-white/90"
                >
                  학습 시작하기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* 새로운 기능들 */}
            <Card className="border-architect-gray-200">
              <CardHeader>
                <CardTitle className="text-h5">이제 사용할 수 있는 기능들</CardTitle>
                <CardDescription>
                  프리미엄 플랜에서 제공하는 새로운 기능들을 확인하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-architect-accent/10 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-architect-accent" />
                  </div>
                  <div>
                    <h4 className="text-small font-semibold text-architect-gray-900">
                      개인 맞춤 학습 경로
                    </h4>
                    <p className="text-xs text-architect-gray-600">
                      AI가 분석한 당신만의 학습 로드맵
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-architect-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-architect-primary" />
                  </div>
                  <div>
                    <h4 className="text-small font-semibold text-architect-gray-900">
                      1:1 멘토링 세션
                    </h4>
                    <p className="text-xs text-architect-gray-600">
                      월 2회 전문가와의 개인 상담
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-architect-success/10 rounded-lg flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-architect-success" />
                  </div>
                  <div>
                    <h4 className="text-small font-semibold text-architect-gray-900">
                      상세 학습 분석
                    </h4>
                    <p className="text-xs text-architect-gray-600">
                      진도와 성취도의 깊이 있는 분석
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 고객 지원 */}
            <Card className="border-architect-gray-200">
              <CardHeader>
                <CardTitle className="text-h5">도움이 필요하신가요?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-small text-architect-gray-600">
                  프리미엄 고객을 위한 우선 지원을 받으실 수 있습니다.
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('mailto:support@ideaworklab.com')}
                  >
                    이메일 지원
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleNavigation('dashboard')}
                  >
                    대시보드로 이동
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 하단 액션 버튼들 */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              onClick={() => handleNavigation('courses')}
              className="flex-1 h-12 bg-architect-primary hover:bg-architect-primary/90"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              학습 시작하기
            </Button>
            <Button
              variant="outline"
              onClick={() => handleNavigation('dashboard')}
              className="flex-1 h-12"
            >
              대시보드로 이동
            </Button>
          </div>
          
          <p className="text-small text-architect-gray-500 mt-4">
            구독 관리는 대시보드에서 하실 수 있습니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;