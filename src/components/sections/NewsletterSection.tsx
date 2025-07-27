import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterSectionProps {
  language: 'ko' | 'en';
}

export function NewsletterSection({ language }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const content = {
    ko: {
      title: 'AI 사고법 인사이트를 받아보세요!',
      subtitle: '매주 엄선된 AI 협력 사고법과 깊이 있는 생각정리 콘텐츠를 이메일로 받아보세요.',
      placeholder: '이메일 주소를 입력하세요',
      subscribe: '구독하기',
      subscribing: '구독 중...',
      privacy: '개인정보는 안전하게 보호됩니다. 언제든 구독을 취소할 수 있습니다.',
      successMessage: '구독 신청이 완료되었습니다. 이메일을 확인해주세요.',
      errorMessage: '구독 처리 중 오류가 발생했습니다. 다시 시도해주세요.'
    },
    en: {
      title: 'Get AI Thinking Insights!',
      subtitle: 'Receive weekly curated AI collaboration thinking methods and deep thought organizing content delivered to your inbox.',
      placeholder: 'Enter your email address',
      subscribe: 'Subscribe',
      subscribing: 'Subscribing...',
      privacy: 'Your privacy is protected. You can unsubscribe at any time.',
      successMessage: 'Subscription completed! Please check your email.',
      errorMessage: 'An error occurred during subscription. Please try again.'
    }
  };

  const t = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage(t.errorMessage);
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(t.successMessage);
        setIsSuccess(true);
        setEmail('');
      } else {
        setMessage(data.error || t.errorMessage);
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage(t.errorMessage);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-iwl-gradient">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Mail className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-white mb-4">
              {t.title}
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder={t.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 disabled:opacity-50"
                />
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-iwl-purple hover:bg-white/90 px-6 disabled:opacity-50"
                >
                  {isLoading ? t.subscribing : t.subscribe}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              {/* Status Message */}
              {message && (
                <div className={`flex items-center gap-2 text-sm ${isSuccess ? 'text-green-100' : 'text-red-100'}`}>
                  {isSuccess ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {message}
                </div>
              )}
            </form>
            
            <p className="text-white/60 text-sm mt-4">
              {t.privacy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}