import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  UserPlus,
  LogIn,
  Sparkles,
  MapPin,
  Brain,
  Star,
  Play,
  Gift
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SocialLoginButtons } from '../SocialLoginButtons';
import { toast } from 'sonner';
import { validateEmail, validatePassword, validateName } from '../../lib/validation';

interface AuthPageProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

export function AuthPage({ language, onNavigate }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'welcome'>('welcome');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const { signIn, signUp, user } = useAuth();

  const content = {
    ko: {
      title: '로그인',
      subtitle: 'AI와 함께하는 생각정리 여정을 시작하세요',
      signupTitle: '회원가입',
      signupSubtitle: '새로운 계정을 만들어 시작하세요',
      welcomeTitle: '환영합니다!',
      welcomeSubtitle: 'AI와 함께하는 새로운 학습 경험을 시작하세요',
      email: '이메일',
      password: '비밀번호',
      confirmPassword: '비밀번호 확인',
      name: '이름',
      rememberMe: '로그인 상태 유지',
      loginButton: '로그인',
      signupButton: '회원가입',
      switchToSignup: '계정이 없으신가요? 회원가입',
      switchToLogin: '이미 계정이 있으신가요? 로그인',
      backToHome: '홈으로 돌아가기',
      or: '또는',
      socialLogin: '소셜 계정으로 간편 가입',
      socialLoginTitle: '간편하게 시작하기',
      continueAsGuest: '비회원으로 계속',
      trialTitle: '🎁 무료 체험강의',
      trialSubtitle: 'AI 협업의 매력을 30분만에 경험해보세요',
      trialFeatures: [
        'AI와의 첫 만남',
        '제주도 여행 계획 맛보기', 
        '개인 맞춤 일정 만들기',
        '완전 무료 체험'
      ],
      startTrialFree: '무료 체험 시작하기',
      signupForTrial: '회원가입하고 체험하기',
      loginForTrial: '로그인하고 체험하기',
      whySignup: '왜 회원가입이 필요한가요?',
      signupBenefits: [
        '학습 진도 자동 저장',
        '개인 맞춤 AI 피드백',
        '언제든 이어서 학습',
        '커뮤니티 참여 가능'
      ]
    },
    en: {
      title: 'Sign In',
      subtitle: 'Start your AI-enhanced thinking journey',
      signupTitle: 'Sign Up', 
      signupSubtitle: 'Create a new account to get started',
      welcomeTitle: 'Welcome!',
      welcomeSubtitle: 'Start your new AI-powered learning experience',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Name',
      rememberMe: 'Remember me',
      loginButton: 'Sign In',
      signupButton: 'Sign Up',
      switchToSignup: 'Don\'t have an account? Sign Up',
      switchToLogin: 'Already have an account? Sign In',
      backToHome: 'Back to Home',
      or: 'or',
      socialLogin: 'Sign up with social accounts',
      socialLoginTitle: 'Quick Start',
      continueAsGuest: 'Continue as Guest',
      trialTitle: '🎁 Free Trial Course',
      trialSubtitle: 'Experience AI collaboration in 30 minutes'
    }
  };

  const t = content[language];

  // 사용자가 이미 로그인되어 있으면 대시보드로 리다이렉트
  useEffect(() => {
    if (user) {
      onNavigate('dashboard');
    }
  }, [user, onNavigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 실제 로그인 처리
  const handleLogin = async () => {
    if (!validateEmail(formData.email)) {
      toast.error('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    if (!formData.password) {
      toast.error('비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn(formData.email, formData.password);
      if (result.error) {
        toast.error('로그인에 실패했습니다. 계정 정보를 확인해주세요.');
      } else {
        toast.success('로그인되었습니다!');
        onNavigate('course-trial');
      }
    } catch (error) {
      toast.error('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 실제 회원가입 처리
  const handleSignup = async () => {
    if (!validateName(formData.name)) {
      toast.error('이름은 2자 이상 50자 미만이어야 하며, 특수문자를 포함할 수 없습니다.');
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.success) {
      toast.error(passwordValidation.message);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signUp(formData.email, formData.password, {
        name: formData.name
      });
      
      if (result.error) {
        toast.error(`회원가입에 실패했습니다: ${result.error.message}`);
      } else {
        toast.success('회원가입이 완료되었습니다! 이제 체험강의를 시작하세요.');
        onNavigate('course-trial');
      }
    } catch (error) {
      toast.error('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 비회원으로 계속하기
  const handleContinueAsGuest = () => {
    toast.info('비회원은 제한된 기능만 이용 가능합니다. 회원가입을 추천드려요!');
    onNavigate('home');
  };

  // 웰컴 페이지
  if (mode === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              onClick={() => onNavigate('home')}
              className="mb-4 text-gray-600 hover:text-iwl-purple"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToHome}
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.welcomeTitle}</h1>
            <p className="text-gray-600">{t.welcomeSubtitle}</p>
          </div>

          {/* 체험강의 카드 */}
          <Card className="mb-6 border-2 border-iwl-purple/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-iwl-purple-50">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-iwl-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-900 mb-2">
                {t.trialTitle}
              </CardTitle>
              <p className="text-gray-600">{t.trialSubtitle}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* 체험 혜택 */}
              <div className="grid grid-cols-2 gap-3">
                {t.trialFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg p-4 border border-iwl-purple/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-iwl-purple mb-1">30분</div>
                  <div className="text-sm text-gray-600">완전 무료 체험</div>
                </div>
              </div>

              {/* 회원가입 혜택 안내 */}
              <div className="bg-iwl-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2 text-center">
                  {t.whySignup}
                </h4>
                <div className="space-y-1">
                  {t.signupBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-iwl-blue rounded-full"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="space-y-3">
                <Button
                  onClick={() => setMode('signup')}
                  className="w-full bg-iwl-gradient hover:opacity-90 text-white font-semibold py-3"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {t.signupForTrial}
                </Button>
                
                <Button
                  onClick={() => setMode('login')}
                  variant="outline"
                  className="w-full border-2 border-iwl-purple text-iwl-purple hover:bg-iwl-purple hover:text-white font-semibold py-3"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {t.loginForTrial}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 비회원 옵션 */}
          <div className="text-center">
            <Button
              onClick={handleContinueAsGuest}
              variant="ghost"
              className="text-gray-600 hover:text-iwl-purple"
            >
              {t.continueAsGuest}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-iwl-purple-50 via-white to-iwl-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => setMode('welcome')}
            className="mb-4 text-gray-600 hover:text-iwl-purple"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            돌아가기
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {mode === 'signup' ? t.signupTitle : t.title}
          </h1>
          <p className="text-gray-600">
            {mode === 'signup' ? t.signupSubtitle : t.subtitle}
          </p>
        </div>

        <Card className="border-2 border-gray-100 shadow-xl">
          <CardContent className="p-8">
            {/* 소셜 로그인 섹션 */}
            <div className="mb-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {t.socialLoginTitle}
                </h3>
                <p className="text-sm text-gray-600">{t.socialLogin}</p>
              </div>
              <SocialLoginButtons language={language} mode={mode} />
            </div>

            {/* 구분선 */}
            <div className="flex items-center my-6">
              <Separator className="flex-1" />
              <span className="px-3 text-sm text-gray-500">{t.or}</span>
              <Separator className="flex-1" />
            </div>

            {/* 이메일 회원가입/로그인 폼 */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {/* 이름 (회원가입만) */}
              {mode === 'signup' && (
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">{t.name}</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10"
                      placeholder="홍길동"
                      required
                    />
                  </div>
                </div>
              )}

              {/* 이메일 */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium">{t.email}</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              {/* 비밀번호 */}
              <div>
                <Label htmlFor="password" className="text-sm font-medium">{t.password}</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* 비밀번호 확인 (회원가입만) */}
              {mode === 'signup' && (
                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">{t.confirmPassword}</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              )}

              {/* 체험강의 안내 */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Play className="w-4 h-4" />
                  <span className="font-medium">
                    {mode === 'signup' ? '가입 후 바로 체험강의로 이동합니다!' : '로그인 후 체험강의를 계속하세요!'}
                  </span>
                </div>
              </div>

              {/* 로그인 버튼 */}
              <Button
                onClick={mode === 'signup' ? handleSignup : handleLogin}
                disabled={isLoading}
                className="w-full bg-iwl-gradient hover:opacity-90 text-white py-3"
              >
                {isLoading ? '처리 중...' : (mode === 'signup' ? t.signupButton : t.loginButton)}
              </Button>

              {/* 모드 전환 */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                  className="text-sm text-iwl-purple hover:underline"
                >
                  {mode === 'signup' ? t.switchToLogin : t.switchToSignup}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}