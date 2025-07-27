import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { ArrowLeft, Lock, Shield } from 'lucide-react';

interface AdminLoginProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
  onLoginSuccess: (success: boolean) => void;
}

export function AdminLogin({ language, onNavigate, onLoginSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const contentText = {
    ko: {
      title: "관리자 로그인",
      passwordPlaceholder: "비밀번호",
      loginButton: "로그인",
      backToHome: "홈으로 돌아가기",
      errorMessage: "비밀번호가 올바르지 않습니다.",
      description: "저널 관리 및 콘텐츠 작성을 위한 관리자 인증이 필요합니다.",
      loggingIn: "로그인 중..."
    },
    en: {
      title: "Admin Login",
      passwordPlaceholder: "Password",
      loginButton: "Login",
      backToHome: "Back to Home",
      errorMessage: "Incorrect password.",
      description: "Admin authentication required for journal management and content creation.",
      loggingIn: "Logging in..."
    }
  };

  const t = contentText[language];

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    // 간단한 비밀번호 체크 (실제 환경에서는 서버 인증 사용)
    if (password === 'ideaworklab2024') {
      // 로그인 성공 - 관리자 대시보드로 이동
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(true);
      }, 1000);
    } else {
      setTimeout(() => {
        setError(t.errorMessage);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container max-w-md">
        {/* 뒤로가기 버튼 */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('home')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToHome}
          </Button>
        </div>

        {/* 로그인 카드 */}
        <Card className="shadow-lg border-0 bg-white">
          <CardContent className="p-8">
            {/* 헤더 */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-iwl-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl mb-2 text-foreground">
                {t.title}
              </h1>
              <p className="text-muted-foreground text-sm">
                {t.description}
              </p>
            </div>

            {/* 로그인 폼 */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10 h-12 bg-input-background border-border"
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <p className="text-destructive text-sm mt-1">
                    {error}
                  </p>
                )}
              </div>

              <Button
                onClick={handleLogin}
                disabled={!password || isLoading}
                className="w-full h-12 bg-iwl-gradient hover:opacity-90 text-white text-base"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t.loggingIn}</span>
                  </div>
                ) : (
                  t.loginButton
                )}
              </Button>
            </div>

            {/* 추가 정보 */}
            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                {language === 'ko' 
                  ? "인증된 관리자만 접근할 수 있습니다." 
                  : "Access restricted to authorized administrators only."
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 보안 정보 */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 {language === 'ko' 
              ? "모든 로그인 시도는 보안을 위해 기록됩니다." 
              : "All login attempts are logged for security purposes."
            }
          </p>
        </div>
      </div>
    </div>
  );
}