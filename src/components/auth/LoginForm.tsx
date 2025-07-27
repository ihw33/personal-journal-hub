import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { SocialLoginButtons } from '../SocialLoginButtons';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { signIn, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const result = await signIn(formData.email, formData.password);
      
      if (result.success) {
        toast.success('로그인 성공!', {
          description: '대시보드로 이동합니다.'
        });
        
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(result.error || '로그인에 실패했습니다.');
      }
    } catch (error: any) {
      console.error('로그인 오류:', error);
      toast.error('로그인 처리 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email">이메일 주소</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="pl-10 h-12 focus:ring-iwl-purple focus:border-iwl-purple"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">비밀번호</Label>
          <button
            type="button"
            className="text-sm text-iwl-purple hover:underline"
            onClick={() => toast.info('비밀번호 재설정 기능은 곧 추가될 예정입니다.')}
          >
            비밀번호를 잊으셨나요?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력하세요"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="pl-10 pr-10 h-12 focus:ring-iwl-purple focus:border-iwl-purple"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Login Button */}
      <Button
        type="submit"
        disabled={isSubmitting || loading || !formData.email || !formData.password}
        className="w-full h-12 bg-iwl-gradient hover:opacity-90 text-white text-base"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>로그인 중...</span>
          </div>
        ) : (
          '로그인'
        )}
      </Button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">또는</span>
        </div>
      </div>

      {/* Social Login */}
      <SocialLoginButtons />

      {/* Demo Account Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm">
          <p className="font-medium text-blue-900 mb-2">🎯 체험용 계정</p>
          <div className="space-y-1 text-blue-700">
            <p>이메일: demo@ideaworklab.com</p>
            <p>비밀번호: demo123456</p>
          </div>
          <p className="text-xs text-blue-600 mt-2">
            바로 체험해보고 싶으시면 위 계정으로 로그인해보세요!
          </p>
        </div>
      </div>
    </form>
  );
}