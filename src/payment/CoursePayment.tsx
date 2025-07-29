import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  CreditCard, 
  Check, 
  Clock, 
  Users, 
  Star,
  Shield,
  Zap,
  BookOpen,
  Award
} from 'lucide-react';
import { createCheckoutSession, redirectToCheckout } from '../../lib/stripe';
import { toast } from 'sonner';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration_weeks: number;
  rating: number;
  total_students: number;
  thumbnail_url?: string;
}

interface CoursePaymentProps {
  course: Course;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CoursePayment({ course, onSuccess, onCancel }: CoursePaymentProps) {
  const { user, userProfile } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!user || !userProfile) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    try {
      setIsProcessing(true);
      
      // 결제 세션 생성
      const sessionId = await createCheckoutSession(course.id, user.id);
      
      // Stripe 결제 페이지로 리다이렉트
      await redirectToCheckout(sessionId);
      
    } catch (error: any) {
      console.error('결제 처리 오류:', error);
      toast.error(error.message || '결제 처리 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const features = [
    { icon: <BookOpen className="w-5 h-5" />, text: `${course.duration_weeks}주 완주형 강의` },
    { icon: <Zap className="w-5 h-5" />, text: 'AI 도구 연동 실습' },
    { icon: <Users className="w-5 h-5" />, text: '전문가 코칭 및 피드백' },
    { icon: <Award className="w-5 h-5" />, text: '수료증 발급' },
    { icon: <Shield className="w-5 h-5" />, text: '평생 강의 액세스' },
    { icon: <Clock className="w-5 h-5" />, text: '24/7 학습 지원' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* 강의 정보 */}
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              {course.thumbnail_url && (
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                  <img 
                    src={course.thumbnail_url} 
                    alt={course.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.total_students.toLocaleString()}명 수강</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration_weeks}주 과정</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">{course.description}</p>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">🎯 이 강의에서 얻을 수 있는 것</h4>
              <div className="grid gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-iwl-purple">{feature.icon}</div>
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 결제 정보 */}
        <Card className="border-2 border-iwl-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-iwl-purple" />
              결제 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 가격 정보 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">강의료</span>
                <span className="text-lg">₩{course.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">할인</span>
                <span className="text-green-600">-₩0</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>총 결제금액</span>
                <span className="text-iwl-purple">₩{course.price.toLocaleString()}</span>
              </div>
            </div>

            {/* 결제 방법 */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">결제 방법</h4>
              <div className="grid gap-2">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-iwl-purple-50 border-iwl-purple">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-iwl-gradient rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">신용카드 / 체크카드</span>
                  </div>
                  <div className="w-4 h-4 bg-iwl-purple rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* 보장 및 혜택 */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">결제 보장</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>30일 무조건 환불 보장</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>평생 강의 액세스</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>모바일 앱 지원</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>수료증 발급</span>
                </div>
              </div>
            </div>

            {/* 결제 버튼 */}
            <div className="space-y-3">
              <Button
                onClick={handlePayment}
                disabled={isProcessing || !user}
                className="w-full h-12 bg-iwl-gradient hover:opacity-90 text-white text-base"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>결제 처리 중...</span>
                  </div>
                ) : (
                  `₩${course.price.toLocaleString()} 결제하기`
                )}
              </Button>
              
              {onCancel && (
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className="w-full"
                  disabled={isProcessing}
                >
                  취소
                </Button>
              )}
            </div>

            {/* 결제 안내 */}
            <div className="text-xs text-gray-500 text-center">
              결제 시 <span className="text-iwl-purple">이용약관</span> 및{' '}
              <span className="text-iwl-purple">개인정보처리방침</span>에 동의한 것으로 간주됩니다.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}