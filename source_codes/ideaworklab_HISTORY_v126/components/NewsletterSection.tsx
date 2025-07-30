import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Mail, 
  Send, 
  Check, 
  Sparkles,
  Brain,
  MessageCircle,
  TrendingUp,
  Globe
} from 'lucide-react';

interface NewsletterSectionProps {
  language: 'ko' | 'en';
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ language }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    ko: {
      badge: 'AI 인사이트 레터',
      title: 'AI와 함께하는 생각정리\n최신 인사이트를 받아보세요',
      subtitle: '매주 AI 협업 학습법과 실용적인 사고 도구를 이메일로 전달해드립니다',
      features: [
        {
          icon: Brain,
          title: 'AI 사고법 가이드',
          description: 'AI와 효과적으로 협업하는 방법과 실전 기법'
        },
        {
          icon: MessageCircle,
          title: '실제 사례 연구',
          description: '사용자들의 성공 사례와 학습 경험 공유'
        },
        {
          icon: TrendingUp,
          title: '학습 성과 분석',
          description: '데이터로 보는 AI 학습 트렌드와 효과'
        },
        {
          icon: Sparkles,
          title: '새로운 기능 소개',
          description: 'Idea Work Lab의 최신 기능과 업데이트 정보'
        }
      ],
      form: {
        placeholder: '이메일 주소를 입력하세요',
        subscribe: '구독하기',
        subscribing: '구독 중...',
        success: '구독 완료!',
        successMessage: '환영합니다! 곧 첫 번째 인사이트 레터를 받아보실 수 있습니다.',
        privacy: '개인정보 보호 정책에 따라 안전하게 관리됩니다',
        unsubscribe: '언제든지 구독을 취소할 수 있습니다'
      },
      stats: {
        subscribers: '1,200+',
        subscribersLabel: '구독자',
        satisfaction: '95%',
        satisfactionLabel: '만족도',
        frequency: '매주',
        frequencyLabel: '발송'
      }
    },
    en: {
      badge: 'AI Insights Newsletter',
      title: 'Get the Latest Insights\non AI-Enhanced Thinking',
      subtitle: 'Weekly AI collaboration learning methods and practical thinking tools delivered to your inbox',
      features: [
        {
          icon: Brain,
          title: 'AI Thinking Guides',
          description: 'Methods and practical techniques for effective AI collaboration'
        },
        {
          icon: MessageCircle,
          title: 'Real Case Studies',
          description: 'Success stories and learning experiences from users'
        },
        {
          icon: TrendingUp,
          title: 'Learning Analytics',
          description: 'Data-driven AI learning trends and effectiveness'
        },
        {
          icon: Sparkles,
          title: 'New Features',
          description: 'Latest features and updates from Idea Work Lab'
        }
      ],
      form: {
        placeholder: 'Enter your email address',
        subscribe: 'Subscribe',
        subscribing: 'Subscribing...',
        success: 'Subscribed!',
        successMessage: 'Welcome! You will receive your first insights newsletter soon.',
        privacy: 'Securely managed according to privacy policy',
        unsubscribe: 'You can unsubscribe anytime'
      },
      stats: {
        subscribers: '1,200+',
        subscribersLabel: 'Subscribers',
        satisfaction: '95%',
        satisfactionLabel: 'Satisfaction',
        frequency: 'Weekly',
        frequencyLabel: 'Delivery'
      }
    }
  };

  const t = content[language];

  const handleSubscribe = async () => {
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubscribe();
  };

  return (
    <section className="py-20 bg-gradient-to-b from-iwl-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-iwl-gradient rounded-full px-4 py-2 mb-6">
              <Mail className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">{t.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.title.split('\n').map((line, index) => (
                <div key={index} className={index === 0 ? 'text-iwl-gradient' : ''}>
                  {line}
                </div>
              ))}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features */}
            <div className="space-y-6">
              {t.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-iwl-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Subscription Form */}
            <div className="space-y-8">
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-iwl-purple-200">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-iwl-gradient">
                    {isSubscribed ? t.form.success : t.form.subscribe}
                  </CardTitle>
                  <CardDescription>
                    {isSubscribed ? t.form.successMessage : t.form.privacy}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubscribed ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-gray-600 mb-4">
                        {t.form.successMessage}
                      </p>
                      <Badge className="bg-green-100 text-green-800">
                        {t.form.success}
                      </Badge>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Input
                          type="email"
                          placeholder={t.form.placeholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1 h-12 border-iwl-purple-200 focus:border-iwl-purple focus:ring-iwl-purple"
                          required
                        />
                        <Button
                          type="submit"
                          disabled={isLoading || !email}
                          className="bg-iwl-gradient hover:opacity-90 text-white px-8 h-12 disabled:opacity-50"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              {t.form.subscribing}
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              {t.form.subscribe}
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 text-center">
                        {t.form.unsubscribe}
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-iwl-gradient mb-1">
                    {t.stats.subscribers}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t.stats.subscribersLabel}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-iwl-gradient mb-1">
                    {t.stats.satisfaction}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t.stats.satisfactionLabel}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-iwl-gradient mb-1">
                    {t.stats.frequency}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t.stats.frequencyLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

