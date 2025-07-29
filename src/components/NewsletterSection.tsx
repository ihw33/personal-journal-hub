import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { subscribeToNewsletter, validateEmail } from '../lib/newsletterService';
import { toast } from 'sonner';

interface NewsletterSectionProps {
  language: 'ko' | 'en';
}

export function NewsletterSection({ language }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const content = {
    ko: {
      title: 'AI 사고법 인사이트를 받아보세요!',
      subtitle: '매주 엄선된 AI 협력 사고법과 깊이 있는 생각정리 콘텐츠를 이메일로 받아보세요.',
      placeholder: '이메일 주소를 입력하세요',
      subscribe: '구독하기',
      subscribing: '구독 중...',
      subscribed: '구독 완료!',
      privacy: '개인정보는 안전하게 보호됩니다. 언제든 구독을 취소할 수 있습니다.',
      successMessage: '매주 화요일에 인사이트를 받아보세요!'
    },
    en: {
      title: 'Get AI Thinking Insights!',
      subtitle: 'Receive weekly curated AI collaboration thinking methods and deep thought organizing content delivered to your inbox.',
      placeholder: 'Enter your email address',
      subscribe: 'Subscribe',
      subscribing: 'Subscribing...',
      subscribed: 'Subscribed!',
      privacy: 'Your privacy is protected. You can unsubscribe at any time.',
      successMessage: 'Get insights every Tuesday!'
    }
  };

  const t = content[language];

  const handleSubscribe = async () => {
    if (!email) {
      toast.error('이메일 주소를 입력해주세요.');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await subscribeToNewsletter({
        email,
        source: 'homepage',
        tags: ['newsletter', 'ai-insights']
      });

      if (result.success) {
        setIsSubscribed(true);
        setEmail('');
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('구독 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubscribe();
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
            {isSubscribed ? (
              // Success state
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">
                  {t.subscribed}
                </h3>
                <p className="text-white/80">
                  {t.successMessage}
                </p>
              </div>
            ) : (
              // Subscription form
              <>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder={t.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 disabled:opacity-50"
                  />
                  <Button 
                    onClick={handleSubscribe}
                    disabled={isLoading || !email}
                    className="bg-white text-iwl-purple hover:bg-white/90 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-iwl-purple border-t-transparent rounded-full animate-spin mr-2" />
                        {t.subscribing}
                      </>
                    ) : (
                      <>
                        {t.subscribe}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-white/60 text-sm mt-4">
                  {t.privacy}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}