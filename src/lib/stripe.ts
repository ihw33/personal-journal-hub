import { loadStripe } from '@stripe/stripe-js';

// Browser-compatible Stripe configuration
const stripePublishableKey = import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_key';

// Only load Stripe if we have a real key
const stripePromise = stripePublishableKey !== 'pk_test_demo_key' 
  ? loadStripe(stripePublishableKey)
  : null;

export { stripePromise };

// Demo mode checker
const isDemoMode = () => {
  return stripePublishableKey === 'pk_test_demo_key';
};

// Mock payment session creation
export async function createCheckoutSession(courseId: string, userId: string) {
  if (isDemoMode()) {
    // Demo mode - simulate session creation
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    return `demo_session_${courseId}_${userId}_${Date.now()}`;
  }

  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseId,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error('결제 세션 생성 실패');
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('결제 세션 생성 오류:', error);
    throw error;
  }
}

// Mock payment processing
export async function redirectToCheckout(sessionId: string) {
  if (isDemoMode()) {
    // Demo mode - simulate successful payment
    const confirmPayment = window.confirm(
      '데모 모드입니다.\n\n실제 결제는 진행되지 않습니다.\n"확인"을 클릭하면 결제 성공으로 시뮬레이션됩니다.'
    );
    
    if (confirmPayment) {
      // Simulate successful payment
      setTimeout(() => {
        alert('데모 결제가 완료되었습니다! 강의 수강이 시작됩니다.');
        // Redirect to course or dashboard
        window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }));
      }, 1500);
    }
    return;
  }

  const stripe = await stripePromise;
  
  if (!stripe) {
    throw new Error('Stripe 로드 실패');
  }

  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });

  if (error) {
    console.error('결제 리다이렉트 오류:', error);
    throw error;
  }
}

// Mock payment verification
export async function verifyPayment(sessionId: string) {
  if (isDemoMode()) {
    // Demo mode - always return success
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      paymentStatus: 'completed',
      courseId: sessionId.split('_')[1] || 'course-jeju'
    };
  }

  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      throw new Error('결제 검증 실패');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('결제 검증 오류:', error);
    throw error;
  }
}

// Get pricing information
export const getPricingInfo = (courseId: string) => {
  const pricingData = {
    'course-jeju': {
      price: 299000,
      currency: 'KRW',
      title: '제주도 여행 계획 AI 협업 마스터 과정',
      features: [
        '8주 완주형 커리큘럼',
        'AI 도구 실습',
        '전문가 피드백',
        '수료증 발급',
        '평생 강의 액세스'
      ]
    },
    'course-thinking': {
      price: 199000,
      currency: 'KRW',
      title: 'AI와 함께하는 창의적 사고법',
      features: [
        '6주 집중 과정',
        '창의성 향상 기법',
        '실전 프로젝트',
        '개인 코칭',
        '평생 강의 액세스'
      ]
    },
    'course-writing': {
      price: 149000,
      currency: 'KRW',
      title: 'AI 협업 글쓰기 워크샵',
      features: [
        '4주 실무 과정',
        'AI 글쓰기 도구',
        '피드백 시스템',
        '포트폴리오 구성',
        '평생 강의 액세스'
      ]
    }
  };

  return pricingData[courseId as keyof typeof pricingData] || pricingData['course-jeju'];
};