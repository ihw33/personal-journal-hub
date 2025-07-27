'use client';

import { Button } from './ui/button';
import { Github, Mail } from 'lucide-react';

interface SocialLoginButtonsProps {
  onGoogleLogin?: () => void;
  onGithubLogin?: () => void;
  disabled?: boolean;
}

export function SocialLoginButtons({ 
  onGoogleLogin = () => {},
  onGithubLogin = () => {},
  disabled = false
}: SocialLoginButtonsProps) {
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        onClick={onGoogleLogin}
        disabled={disabled}
        className="w-full"
      >
        <Mail className="w-4 h-4 mr-2" />
        Google로 계속하기
      </Button>
      <Button
        variant="outline"
        onClick={onGithubLogin}
        disabled={disabled}
        className="w-full"
      >
        <Github className="w-4 h-4 mr-2" />
        GitHub로 계속하기
      </Button>
    </div>
  );
}