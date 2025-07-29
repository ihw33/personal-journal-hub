// Newsletter service for client-side operations
// Works with demo mode and real backend integration

interface NewsletterSubscription {
  email: string;
  name?: string;
  source?: string;
  tags?: string[];
}

interface NewsletterResponse {
  success: boolean;
  message: string;
  id?: string;
}

// Demo mode checker
const isDemoMode = () => {
  // Check if we have proper environment variables
  const hasResendKey = import.meta.env?.VITE_RESEND_API_KEY && 
                      import.meta.env.VITE_RESEND_API_KEY !== 'demo_key';
  return !hasResendKey;
};

// Subscribe to newsletter
export async function subscribeToNewsletter(subscription: NewsletterSubscription): Promise<NewsletterResponse> {
  // Demo mode - simulate subscription
  if (isDemoMode()) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    // Simulate different scenarios for demo
    const isValidEmail = subscription.email.includes('@') && subscription.email.includes('.');
    
    if (!isValidEmail) {
      return {
        success: false,
        message: '유효한 이메일 주소를 입력해주세요.'
      };
    }
    
    // Simulate duplicate email check
    const existingEmails = JSON.parse(localStorage.getItem('demo-newsletter-subscribers') || '[]');
    if (existingEmails.includes(subscription.email)) {
      return {
        success: false,
        message: '이미 구독 중인 이메일 주소입니다.'
      };
    }
    
    // Store in localStorage for demo
    existingEmails.push(subscription.email);
    localStorage.setItem('demo-newsletter-subscribers', JSON.stringify(existingEmails));
    
    // Simulate occasional failure for testing
    if (Math.random() < 0.05) {
      return {
        success: false,
        message: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      };
    }
    
    return {
      success: true,
      message: '🎉 뉴스레터 구독이 완료되었습니다!\n매주 화요일에 AI 사고법 인사이트를 받아보세요.',
      id: `demo_contact_${Date.now()}`
    };
  }

  try {
    // Real API call
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: subscription.email,
        name: subscription.name,
        source: subscription.source || 'website',
        tags: subscription.tags || ['newsletter']
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '구독 처리 중 오류가 발생했습니다.');
    }

    const data = await response.json();
    return {
      success: true,
      message: '🎉 뉴스레터 구독이 완료되었습니다!\n환영 이메일을 확인해주세요.',
      id: data.id
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '구독 처리 중 오류가 발생했습니다.'
    };
  }
}

// Unsubscribe from newsletter
export async function unsubscribeFromNewsletter(email: string): Promise<NewsletterResponse> {
  if (isDemoMode()) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Remove from localStorage for demo
    const existingEmails = JSON.parse(localStorage.getItem('demo-newsletter-subscribers') || '[]');
    const updatedEmails = existingEmails.filter((e: string) => e !== email);
    localStorage.setItem('demo-newsletter-subscribers', JSON.stringify(updatedEmails));
    
    return {
      success: true,
      message: '뉴스레터 구독이 취소되었습니다.'
    };
  }

  try {
    const response = await fetch('/api/newsletter/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('구독 취소 처리 중 오류가 발생했습니다.');
    }

    return {
      success: true,
      message: '뉴스레터 구독이 취소되었습니다.'
    };
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return {
      success: false,
      message: '구독 취소 처리 중 오류가 발생했습니다.'
    };
  }
}

// Get newsletter statistics (for admin dashboard)
export async function getNewsletterStats() {
  if (isDemoMode()) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const subscribers = JSON.parse(localStorage.getItem('demo-newsletter-subscribers') || '[]');
    
    return {
      success: true,
      data: {
        totalSubscribers: Math.max(subscribers.length, 1247),
        activeSubscribers: Math.max(subscribers.length - 5, 1184),
        thisWeekSignups: Math.min(subscribers.length, 23),
        thisMonthSignups: Math.min(subscribers.length + 50, 89),
        averageOpenRate: 64.2,
        averageClickRate: 12.8,
        lastNewsletterSent: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        nextScheduledSend: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days from now
      }
    };
  }

  try {
    const response = await fetch('/api/newsletter/stats');
    
    if (!response.ok) {
      throw new Error('통계 조회 중 오류가 발생했습니다.');
    }

    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Newsletter stats error:', error);
    return {
      success: false,
      message: '통계 조회 중 오류가 발생했습니다.'
    };
  }
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Check if email is already subscribed (demo mode only)
export function isEmailSubscribed(email: string): boolean {
  if (!isDemoMode()) return false;
  
  const subscribers = JSON.parse(localStorage.getItem('demo-newsletter-subscribers') || '[]');
  return subscribers.includes(email);
}

// Newsletter content previews
export const newsletterPreviews = {
  latest: {
    subject: '💡 AI와 창의성의 만남: 새로운 사고의 지평',
    preview: '이번 주에는 AI와 인간의 창의성이 어떻게 조화를 이룰 수 있는지에 대해 살펴봅니다.',
    date: '2024년 1월 23일',
    topics: ['AI 협력 사고법', '창의적 문제해결', '실전 적용 사례']
  },
  welcome: {
    subject: '🎉 IdeaWorkLab 뉴스레터에 오신 것을 환영합니다!',
    preview: 'AI와 함께하는 창의적 사고법의 여정을 시작하세요',
    content: `
안녕하세요! IdeaWorkLab에 오신 것을 환영합니다.

매주 화요일, 여러분의 메일함으로 다음과 같은 콘텐츠를 보내드립니다:

✨ AI 협력 사고법 인사이트
🧠 깊이 있는 생각정리 방법론
🎯 실전 적용 가능한 팁과 도구
📚 엄선된 학습 자료와 케이스 스터디

앞으로의 여정이 기대됩니다!

이상혁 드림
IdeaWorkLab 창립자
    `
  }
};

// Newsletter signup sources for tracking
export const signupSources = {
  homepage: 'homepage',
  blog: 'blog',
  course: 'course',
  footer: 'footer',
  popup: 'popup'
} as const;