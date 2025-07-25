import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Mail, ArrowRight } from 'lucide-react';

interface NewsletterSectionProps {
  language: 'ko' | 'en';
}

export function NewsletterSection({ language }: NewsletterSectionProps) {
  const content = {
    ko: {
      title: 'AI 사고법 인사이트를 받아보세요!',
      subtitle: '매주 엄선된 AI 협력 사고법과 깊이 있는 생각정리 콘텐츠를 이메일로 받아보세요.',
      placeholder: '이메일 주소를 입력하세요',
      subscribe: '구독하기',
      privacy: '개인정보는 안전하게 보호됩니다. 언제든 구독을 취소할 수 있습니다.'
    },
    en: {
      title: 'Get AI Thinking Insights!',
      subtitle: 'Receive weekly curated AI collaboration thinking methods and deep thought organizing content delivered to your inbox.',
      placeholder: 'Enter your email address',
      subscribe: 'Subscribe',
      privacy: 'Your privacy is protected. You can unsubscribe at any time.'
    }
  };

  const t = content[language];

  return (
    <section className="py-20 bg-iwl-gradient">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Mail className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {t.title}
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder={t.placeholder}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40"
              />
              <Button 
                className="bg-white text-iwl-purple hover:bg-white/90 px-6"
              >
                {t.subscribe}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <p className="text-white/60 text-sm mt-4">
              {t.privacy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}