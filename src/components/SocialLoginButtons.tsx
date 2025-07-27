import { Button } from './ui/button';
import { toast } from 'sonner';

interface SocialLoginButtonsProps {
  language?: 'ko' | 'en';
  mode?: 'login' | 'signup';
}

export function SocialLoginButtons({ language = 'ko', mode = 'login' }: SocialLoginButtonsProps) {
  
  const content = {
    ko: {
      google: 'Google로 계속하기',
      kakao: 'Kakao로 계속하기', 
      naver: 'Naver로 계속하기',
      comingSoon: '소셜 로그인 기능은 곧 출시됩니다!'
    },
    en: {
      google: 'Continue with Google',
      kakao: 'Continue with Kakao',
      naver: 'Continue with Naver',
      comingSoon: 'Social login coming soon!'
    }
  };

  const t = content[language];

  const handleGoogleLogin = () => {
    // 실제 구현에서는 Supabase Auth Google Provider 사용
    /*
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    */
    toast.info(t.comingSoon);
    console.log('Google 로그인 시도');
  };

  const handleKakaoLogin = () => {
    // 실제 구현에서는 Kakao OAuth 사용
    /*
    // Kakao SDK 사용 예시
    window.Kakao.Auth.login({
      success: function(authObj) {
        // 성공 처리
      },
      fail: function(err) {
        // 실패 처리
      }
    });
    */
    toast.info(t.comingSoon);
    console.log('Kakao 로그인 시도');
  };

  const handleNaverLogin = () => {
    // 실제 구현에서는 Naver OAuth 사용
    /*
    // Naver Login SDK 사용 예시
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "YOUR_CLIENT_ID",
      callbackUrl: "YOUR_CALLBACK_URL",
      isPopup: false,
      loginButton: {color: "green", type: 3, height: 60}
    });
    */
    toast.info(t.comingSoon);
    console.log('Naver 로그인 시도');
  };

  return (
    <div className="space-y-3">
      {/* Google 로그인 */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
        onClick={handleGoogleLogin}
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="font-medium text-gray-700">{t.google}</span>
      </Button>

      {/* Kakao 로그인 */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 border-2 border-yellow-300 bg-yellow-400 hover:bg-yellow-500 text-gray-900 transition-all duration-200"
        onClick={handleKakaoLogin}
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C7.03 3 3 6.24 3 10.26c0 2.57 1.68 4.83 4.26 6.17L6.11 20.6c-.14.36.29.66.6.42l4.07-2.84c.4.03.81.05 1.22.05 4.97 0 9-3.24 9-7.26S16.97 3 12 3z"/>
        </svg>
        <span className="font-medium text-gray-900">{t.kakao}</span>
      </Button>

      {/* Naver 로그인 */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 border-2 border-green-400 bg-green-500 hover:bg-green-600 text-white transition-all duration-200"
        onClick={handleNaverLogin}
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
        </svg>
        <span className="font-medium text-white">{t.naver}</span>
      </Button>
    </div>
  );
}