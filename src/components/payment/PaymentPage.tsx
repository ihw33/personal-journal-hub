import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CoursePayment } from './CoursePayment';
import { getPricingInfo } from '../../lib/stripe';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface PaymentPageProps {
  user: any;
  onNavigate: (page: string) => void;
  language: 'ko' | 'en';
  courseId?: string;
}

export function PaymentPage({ user, onNavigate, language, courseId = 'course-jeju' }: PaymentPageProps) {
  const { getUserType } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  useEffect(() => {
    // Check authentication
    const userType = getUserType();
    if (userType === 'guest') {
      onNavigate('auth');
      return;
    }

    // Get course pricing information and create course object
    const pricingInfo = getPricingInfo(courseId);
    
    // Map courseId to detailed course information
    const courseData = {
      'course-jeju': {
        id: 'course-jeju',
        title: '제주도 2박 3일 여행 기획 8주 과정',
        description: 'AI와 함께 제주도 여행을 기획하며 배우는 창의적 사고법. 8주 만에 AI 협업 전문가가 되는 실습 중심 프로그램입니다.',
        price: 299000,
        duration_weeks: 8,
        rating: 4.9,
        total_students: 342,
        thumbnail_url: undefined
      },
      'course-creative-thinking': {
        id: 'course-creative-thinking',
        title: 'AI와 함께하는 창의적 사고법',
        description: 'AI 도구를 활용하여 창의적 사고를 확장하고 혁신적인 아이디어를 생성하는 방법을 배웁니다.',
        price: 199000,
        duration_weeks: 4,
        rating: 4.8,
        total_students: 1247,
        thumbnail_url: undefined
      },
      'course-personal-coaching': {
        id: 'course-personal-coaching',
        title: '개인 맞춤 사고력 코칭',
        description: '1:1 개인 코칭을 통해 개인의 사고 패턴을 분석하고 최적화된 사고법을 개발합니다.',
        price: 899000,
        duration_weeks: 12,
        rating: 5.0,
        total_students: 89,
        thumbnail_url: undefined
      },
      'course-digital-journaling': {
        id: 'course-digital-journaling',
        title: '디지털 저널링 워크샵',
        description: '디지털 도구를 활용한 효과적인 저널링 방법과 생각 정리 기술을 습득합니다.',
        price: 189000,
        duration_weeks: 3,
        rating: 4.7,
        total_students: 567,
        thumbnail_url: undefined
      }
    };

    const course = courseData[courseId as keyof typeof courseData] || courseData['course-jeju'];
    setSelectedCourse(course);
  }, [courseId, getUserType, onNavigate]);

  const handlePaymentSuccess = () => {
    // Navigate to course dashboard or specific course page after successful payment
    switch (courseId) {
      case 'course-jeju':
        onNavigate('jeju-course');
        break;
      case 'course-creative-thinking':
      case 'course-personal-coaching':
      case 'course-digital-journaling':
        onNavigate('dashboard');
        break;
      default:
        onNavigate('dashboard');
    }
  };

  const handlePaymentCancel = () => {
    // Go back to the course detail page
    switch (courseId) {
      case 'course-jeju':
        onNavigate('jeju-course');
        break;
      case 'course-creative-thinking':
        onNavigate('course-creative-thinking');
        break;
      case 'course-personal-coaching':
        onNavigate('course-personal-coaching');
        break;
      case 'course-digital-journaling':
        onNavigate('course-digital-journaling');
        break;
      default:
        onNavigate('courses');
    }
  };

  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-iwl-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">결제 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={handlePaymentCancel}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            강의로 돌아가기
          </Button>
        </div>
      </div>

      {/* Payment Content */}
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">강의 수강 신청</h1>
            <p className="text-gray-600">안전하고 간편한 결제로 지금 시작하세요</p>
          </div>

          <CoursePayment
            course={selectedCourse}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        </div>
      </div>
    </div>
  );
}