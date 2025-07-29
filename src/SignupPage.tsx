import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  CheckCircle,
  Sparkles,
  Brain,
  MessageCircle,
  BookOpen
} from 'lucide-react';

interface SignupPageProps {
  onNavigate: (page: string) => void;
  onSignup: (user: any) => void;
  language: 'ko' | 'en';
}

const SignupPage: React.FC<SignupPageProps> = ({ onNavigate, onSignup, language }) => {
  const [activeTab, setActiveTab] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    ko: {
      hero: {
        badge: '회원가입',
        title: 'AI와 함께하는\n새로운 학습 시작',
        subtitle: '무료로 가입하고 AI 파트너와 함께 깊이 있는 사고력을 발전시켜보세요.'
      },
      tabs: {
        email: '이메일로 가입',
        social: '소셜 로그인'
      },
      form: {
        name: '이름',
        namePlaceholder: '이름을 입력해주세요',
        email: '이메일',
        emailPlaceholder: '이메일 주소를 입력해주세요',
        password: '비밀번호',
        passwordPlaceholder: '8자 이상 입력해주세요',
        confirmPassword: '비밀번호 확인',
        confirmPasswordPlaceholder: '비밀번호를 다시 입력해주세요',
        agreeTerms: '이용약관에 동의합니다',
        agreePrivacy: '개인정보 처리방침에 동의합니다',
        agreeMarketing: '마케팅 정보 수신에 동의합니다 (선택)',
        signup: '회원가입',
        signingUp: '가입 중...',
        hasAccount: '이미 계정이 있으신가요?',
        login: '로그인하기'
      },
      social: {
        title: '소셜 계정으로 간편 가입',
        google: 'Google로 계속하기',
        kakao: 'Kakao로 계속하기',
        naver: 'Naver로 계속하기',
        divider: '또는'
      },
      benefits: {
        title: '가입하면 이런 혜택이!',
        items: [
          {
            icon: Brain,
            title: '개인 맞춤 AI 멘토',
            description: '당신만의 AI 학습 파트너가 배정됩니다'
          },
          {
            icon: MessageCircle,
            title: '무제한 AI 대화',
            description: '24/7 언제든지 AI와 대화할 수 있습니다'
          },
          {
            icon: BookOpen,
            title: '체계적 학습 프로그램',
            description: '단계별 커리큘럼으로 체계적 성장'
          }
        ]
      },
      validation: {
        nameRequired: '이름을 입력해주세요',
        emailRequired: '이메일을 입력해주세요',
        emailInvalid: '올바른 이메일 형식이 아닙니다',
        passwordRequired: '비밀번호를 입력해주세요',
        passwordShort: '비밀번호는 8자 이상이어야 합니다',
        passwordMismatch: '비밀번호가 일치하지 않습니다',
        termsRequired: '이용약관에 동의해주세요',
        privacyRequired: '개인정보 처리방침에 동의해주세요'
      }
    },
    en: {
      hero: {
        badge: 'Sign Up',
        title: 'Start Your New\nLearning Journey with AI',
        subtitle: 'Join for free and develop deep thinking skills with your AI partner.'
      },
      tabs: {
        email: 'Sign up with Email',
        social: 'Social Login'
      },
      form: {
        name: 'Name',
        namePlaceholder: 'Enter your name',
        email: 'Email',
        emailPlaceholder: 'Enter your email address',
        password: 'Password',
        passwordPlaceholder: 'Enter 8+ characters',
        confirmPassword: 'Confirm Password',
        confirmPasswordPlaceholder: 'Re-enter your password',
        agreeTerms: 'I agree to the Terms of Service',
        agreePrivacy: 'I agree to the Privacy Policy',
        agreeMarketing: 'I agree to receive marketing information (Optional)',
        signup: 'Sign Up',
        signingUp: 'Signing up...',
        hasAccount: 'Already have an account?',
        login: 'Sign In'
      },
      social: {
        title: 'Easy Sign Up with Social Account',
        google: 'Continue with Google',
        kakao: 'Continue with Kakao',
        naver: 'Continue with Naver',
        divider: 'Or'
      },
      benefits: {
        title: 'Benefits of Joining!',
        items: [
          {
            icon: Brain,
            title: 'Personal AI Mentor',
            description: 'Get your own AI learning partner assigned'
          },
          {
            icon: MessageCircle,
            title: 'Unlimited AI Conversations',
            description: 'Chat with AI 24/7 anytime'
          },
          {
            icon: BookOpen,
            title: 'Systematic Learning Program',
            description: 'Systematic growth through step-by-step curriculum'
          }
        ]
      },
      validation: {
        nameRequired: 'Please enter your name',
        emailRequired: 'Please enter your email',
        emailInvalid: 'Please enter a valid email format',
        passwordRequired: 'Please enter your password',
        passwordShort: 'Password must be at least 8 characters',
        passwordMismatch: 'Passwords do not match',
        termsRequired: 'Please agree to the Terms of Service',
        privacyRequired: 'Please agree to the Privacy Policy'
      }
    }
  };

  const t = content[language];

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert(t.validation.nameRequired);
      return false;
    }
    if (!formData.email.trim()) {
      alert(t.validation.emailRequired);
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert(t.validation.emailInvalid);
      return false;
    }
    if (!formData.password) {
      alert(t.validation.passwordRequired);
      return false;
    }
    if (formData.password.length < 8) {
      alert(t.validation.passwordShort);
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert(t.validation.passwordMismatch);
      return false;
    }
    if (!formData.agreeTerms) {
      alert(t.validation.termsRequired);
      return false;
    }
    if (!formData.agreePrivacy) {
      alert(t.validation.privacyRequired);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: 'user-' + Date.now(),
        name: formData.name,
        email: formData.email,
        user_type: 'member',
        subscription_status: 'active',
        personalizationData: {
          learningProgress: {
            enrolledCourses: [],
            completionRate: 0,
            currentPhase: 0
          },
          behaviorAnalytics: {
            engagementScore: 0,
            learningVelocity: 'normal',
            strongTopics: []
          },
          aiInteractions: {
            totalConversations: 0,
            strugglingAreas: []
          },
          achievements: [],
          recommendations: {
            nextActions: [
              '제주도 AI 협업 여행 코스 시작하기',
              'AI 실습 모드 체험해보기'
            ]
          }
        }
      };
      
      onSignup(newUser);
      setIsLoading(false);
    }, 2000);
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login
    console.log(`Login with ${provider}`);
    // For demo, create a social user
    const socialUser = {
      id: 'social-' + Date.now(),
      name: `${provider} 사용자`,
      email: `user@${provider}.com`,
      user_type: 'member',
      subscription_status: 'active'
    };
    onSignup(socialUser);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50">
        <div className="container mx-auto px-4">
          <Button
            variant="outline"
            onClick={() => onNavigate('home')}
            className="mb-8 border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Button>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-iwl-gradient rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">{t.hero.badge}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t.hero.title.split('\n').map((line, index) => (
                <div key={index} className={index === 0 ? 'text-iwl-gradient' : ''}>
                  {line}
                </div>
              ))}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Signup Form */}
            <div>
              <Card className="shadow-xl border-iwl-purple-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-iwl-gradient text-center">
                    회원가입
                  </CardTitle>
                  <CardDescription className="text-center">
                    몇 초만에 가입하고 AI 학습을 시작하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="email">{t.tabs.email}</TabsTrigger>
                      <TabsTrigger value="social">{t.tabs.social}</TabsTrigger>
                    </TabsList>

                    {/* Email Signup */}
                    <TabsContent value="email">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t.form.name}
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              placeholder={t.form.namePlaceholder}
                              className="pl-10 h-12 border-iwl-purple-200 focus:border-iwl-purple"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t.form.email}
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder={t.form.emailPlaceholder}
                              className="pl-10 h-12 border-iwl-purple-200 focus:border-iwl-purple"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t.form.password}
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              onChange={(e) => setFormData({...formData, password: e.target.value})}
                              placeholder={t.form.passwordPlaceholder}
                              className="pl-10 pr-10 h-12 border-iwl-purple-200 focus:border-iwl-purple"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t.form.confirmPassword}
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              value={formData.confirmPassword}
                              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                              placeholder={t.form.confirmPasswordPlaceholder}
                              className="pl-10 pr-10 h-12 border-iwl-purple-200 focus:border-iwl-purple"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Agreements */}
                        <div className="space-y-3 pt-4">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="terms"
                              checked={formData.agreeTerms}
                              onCheckedChange={(checked) => setFormData({...formData, agreeTerms: !!checked})}
                              className="mt-1"
                            />
                            <label htmlFor="terms" className="text-sm leading-5">
                              {t.form.agreeTerms}
                              <button 
                                type="button"
                                onClick={() => onNavigate('terms')}
                                className="text-iwl-purple hover:underline ml-1"
                              >
                                [보기]
                              </button>
                            </label>
                          </div>

                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="privacy"
                              checked={formData.agreePrivacy}
                              onCheckedChange={(checked) => setFormData({...formData, agreePrivacy: !!checked})}
                              className="mt-1"
                            />
                            <label htmlFor="privacy" className="text-sm leading-5">
                              {t.form.agreePrivacy}
                              <button 
                                type="button"
                                onClick={() => onNavigate('privacy')}
                                className="text-iwl-purple hover:underline ml-1"
                              >
                                [보기]
                              </button>
                            </label>
                          </div>

                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="marketing"
                              checked={formData.agreeMarketing}
                              onCheckedChange={(checked) => setFormData({...formData, agreeMarketing: !!checked})}
                              className="mt-1"
                            />
                            <label htmlFor="marketing" className="text-sm leading-5 text-gray-600">
                              {t.form.agreeMarketing}
                            </label>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full h-12 bg-iwl-gradient hover:opacity-90 text-white mt-6"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              {t.form.signingUp}
                            </>
                          ) : (
                            t.form.signup
                          )}
                        </Button>
                      </form>
                    </TabsContent>

                    {/* Social Signup */}
                    <TabsContent value="social">
                      <div className="space-y-4">
                        <div className="text-center mb-6">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {t.social.title}
                          </h3>
                        </div>

                        <Button
                          onClick={() => handleSocialLogin('google')}
                          variant="outline"
                          className="w-full h-12 border-gray-300 hover:bg-gray-50"
                        >
                          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          {t.social.google}
                        </Button>

                        <Button
                          onClick={() => handleSocialLogin('kakao')}
                          className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                        >
                          <span className="mr-3 font-bold">K</span>
                          {t.social.kakao}
                        </Button>

                        <Button
                          onClick={() => handleSocialLogin('naver')}
                          className="w-full h-12 bg-green-500 hover:bg-green-600 text-white"
                        >
                          <span className="mr-3 font-bold">N</span>
                          {t.social.naver}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Login Link */}
                  <div className="text-center mt-6 pt-6 border-t">
                    <p className="text-gray-600">
                      {t.form.hasAccount}{' '}
                      <button
                        onClick={() => onNavigate('auth')}
                        className="text-iwl-purple hover:underline font-medium"
                      >
                        {t.form.login}
                      </button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-iwl-gradient mb-8">
                  {t.benefits.title}
                </h2>
                
                <div className="space-y-6">
                  {t.benefits.items.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <Card key={index} className="border-iwl-purple-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-iwl-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">
                                {benefit.title}
                              </h3>
                              <p className="text-gray-600">
                                {benefit.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Success Stats */}
              <Card className="bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 border-iwl-purple-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-iwl-gradient mb-4">
                      이미 1,000명이 AI와 함께 성장하고 있어요!
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-iwl-purple">95%</div>
                        <div className="text-sm text-gray-600">만족도</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-iwl-blue">10k+</div>
                        <div className="text-sm text-gray-600">AI 대화</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-iwl-purple">4.8</div>
                        <div className="text-sm text-gray-600">평점</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { SignupPage };