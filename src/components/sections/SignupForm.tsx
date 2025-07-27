import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { ProgressIndicator } from "./ProgressIndicator";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { toast } from "sonner";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  industry: string;
  teamSize: string;
  agreeTerms: boolean;
  agreeMarketing: boolean;
}

interface SignupFormProps {
  onSuccess?: () => void;
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const { signUp, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    company: "",
    jobTitle: "",
    industry: "",
    teamSize: "",
    agreeTerms: false,
    agreeMarketing: false,
  });

  const steps = ["기본 정보", "프로필 설정", "환영합니다"];

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < steps.length - 1) {
      handleNext();
      return;
    }

    // 최종 회원가입 처리
    try {
      setIsSubmitting(true);

      const result = await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        jobTitle: formData.jobTitle,
        industry: formData.industry,
        teamSize: formData.teamSize,
        agreeMarketing: formData.agreeMarketing
      });

      if (result.success) {
        toast.success('회원가입이 완료되었습니다! 🎉', {
          description: '이메일을 확인하여 계정을 활성화해주세요.'
        });
        
        // 성공 콜백 실행
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(result.error || '회원가입에 실패했습니다.');
      }
    } catch (error: unknown) {
      console.error('회원가입 오류:', error);
      toast.error('회원가입 처리 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword &&
          formData.password.length >= 8
        );
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.company
        );
      case 2:
        return formData.agreeTerms;
      default:
        return false;
    }
  };

  const getPasswordValidation = () => {
    const password = formData.password;
    const validations = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    };
    return validations;
  };

  const passwordValidation = getPasswordValidation();

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        {/* IWL Short Logo */}
        <div className="mb-6">
          <div className="w-12 h-12 bg-iwl-gradient rounded-xl flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-lg">iWL</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          시작하기
        </h2>
        <p className="text-gray-600">
          AI와 함께하는 새로운 생각정리 여정에 함께하세요
        </p>
      </div>

      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={steps.length}
        steps={steps}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: 기본 정보 */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">이메일 주소</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  handleInputChange("email", e.target.value)
                }
                className="mt-1 focus:ring-iwl-purple focus:border-iwl-purple"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="8자 이상의 안전한 비밀번호"
                value={formData.password}
                onChange={(e) =>
                  handleInputChange("password", e.target.value)
                }
                className="mt-1 focus:ring-iwl-purple focus:border-iwl-purple"
                required
              />
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className={`px-2 py-1 rounded ${passwordValidation.length ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      8자 이상
                    </span>
                    <span className={`px-2 py-1 rounded ${passwordValidation.uppercase ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      대문자
                    </span>
                    <span className={`px-2 py-1 rounded ${passwordValidation.lowercase ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      소문자
                    </span>
                    <span className={`px-2 py-1 rounded ${passwordValidation.number ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      숫자
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">
                비밀번호 확인
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange(
                    "confirmPassword",
                    e.target.value,
                  )
                }
                className="mt-1 focus:ring-iwl-purple focus:border-iwl-purple"
                required
              />
              {formData.confirmPassword &&
                formData.password !==
                  formData.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    비밀번호가 일치하지 않습니다
                  </p>
                )}
              {formData.confirmPassword &&
                formData.password ===
                  formData.confirmPassword && (
                  <p className="text-sm text-green-600 mt-1">
                    비밀번호가 일치합니다
                  </p>
                )}
            </div>
          </div>
        )}

        {/* Step 2: 프로필 설정 */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">이름</Label>
                <Input
                  id="firstName"
                  placeholder="길동"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange(
                      "firstName",
                      e.target.value,
                    )
                  }
                  className="mt-1 focus:ring-iwl-purple focus:border-iwl-purple"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">성</Label>
                <Input
                  id="lastName"
                  placeholder="홍"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange(
                      "lastName",
                      e.target.value,
                    )
                  }
                  className="mt-1 focus:ring-iwl-purple focus:border-iwl-purple"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company">소속 조직</Label>
              <Input
                id="company"
                placeholder="회사, 학교 또는 개인 프로젝트명"
                value={formData.company}
                onChange={(e) =>
                  handleInputChange("company", e.target.value)
                }
                className="mt-1 focus:ring-iwl-purple focus:border-iwl-purple"
                required
              />
            </div>

            <div>
              <Label htmlFor="jobTitle">역할 (선택)</Label>
              <Input
                id="jobTitle"
                placeholder="예: 프로덕트 매니저, 개발자, 디자이너, 학생"
                value={formData.jobTitle}
                onChange={(e) =>
                  handleInputChange("jobTitle", e.target.value)
                }
                className="mt-1 focus:ring-iwl-purple focus:border-iwl-purple"
              />
            </div>

            <div>
              <Label htmlFor="industry">관심 분야 (선택)</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) =>
                  handleInputChange("industry", value)
                }
              >
                <SelectTrigger className="mt-1 focus:ring-iwl-purple focus:border-iwl-purple">
                  <SelectValue placeholder="주요 관심 분야를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">
                    기술/IT
                  </SelectItem>
                  <SelectItem value="business">
                    비즈니스/창업
                  </SelectItem>
                  <SelectItem value="design">
                    디자인/크리에이티브
                  </SelectItem>
                  <SelectItem value="marketing">
                    마케팅/브랜딩
                  </SelectItem>
                  <SelectItem value="education">
                    교육/연구
                  </SelectItem>
                  <SelectItem value="consulting">
                    컨설팅
                  </SelectItem>
                  <SelectItem value="writing">
                    글쓰기/콘텐츠
                  </SelectItem>
                  <SelectItem value="other">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="teamSize">조직 규모 (선택)</Label>
              <Select
                value={formData.teamSize}
                onValueChange={(value) =>
                  handleInputChange("teamSize", value)
                }
              >
                <SelectTrigger className="mt-1 focus:ring-iwl-purple focus:border-iwl-purple">
                  <SelectValue placeholder="현재 조직 규모를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">
                    개인
                  </SelectItem>
                  <SelectItem value="1-5">1-5명</SelectItem>
                  <SelectItem value="6-20">6-20명</SelectItem>
                  <SelectItem value="21-50">21-50명</SelectItem>
                  <SelectItem value="51-200">
                    51-200명
                  </SelectItem>
                  <SelectItem value="200+">
                    200명 이상
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 3: 환영합니다 */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center p-6 bg-gradient-to-r from-iwl-purple-50 to-iwl-blue-50 rounded-xl border border-iwl-purple/20">
              <div className="w-16 h-16 bg-iwl-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-iwl-gradient mb-2">
                환영합니다!
              </h3>
              <p className="text-gray-600">
                이제 AI와 함께하는 새로운 생각정리 여정을 시작할 준비가 되었습니다.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("agreeTerms", !!checked)
                  }
                  className="mt-1 data-[state=checked]:bg-iwl-gradient data-[state=checked]:border-iwl-purple"
                />
                <Label
                  htmlFor="agreeTerms"
                  className="text-sm leading-5"
                >
                  <span className="text-red-500">*</span>
                  <a
                    href="/terms"
                    target="_blank"
                    className="text-iwl-purple hover:underline"
                  >
                    이용약관
                  </a>{" "}
                  및{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    className="text-iwl-purple hover:underline"
                  >
                    개인정보 처리방침
                  </a>
                  에 동의합니다
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onCheckedChange={(checked) =>
                    handleInputChange(
                      "agreeMarketing",
                      !!checked,
                    )
                  }
                  className="mt-1 data-[state=checked]:bg-iwl-gradient data-[state=checked]:border-iwl-purple"
                />
                <Label
                  htmlFor="agreeMarketing"
                  className="text-sm leading-5"
                >
                  새로운 기능과 AI 사고법 인사이트를 이메일로 받아보겠습니다 (선택)
                </Label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          {currentStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              disabled={isSubmitting}
              className="flex-1 border-iwl-purple text-iwl-purple hover:bg-iwl-purple-50"
            >
              이전
            </Button>
          )}
          <Button
            type="submit"
            disabled={!isStepValid() || isSubmitting || loading}
            className="flex-1 bg-iwl-gradient hover:opacity-90 text-white border-0"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>처리 중...</span>
              </div>
            ) : currentStep === steps.length - 1 ? (
              "Idea Work Lab 시작하기"
            ) : (
              "다음"
            )}
          </Button>
        </div>

        {/* Social Login - Only show on first step */}
        {currentStep === 0 && (
          <div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  또는
                </span>
              </div>
            </div>

            <SocialLoginButtons />
          </div>
        )}
      </form>

      {/* Login Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          이미 계정이 있으신가요?{" "}
          <a
            href="#"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'auth' }))}
            className="text-iwl-purple hover:underline font-medium"
          >
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}