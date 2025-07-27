import { SignupForm } from './SignupForm';
import { SignupCarousel } from './SignupCarousel';

interface SignupPageProps {
  language: 'ko' | 'en';
}

export function SignupPage({ language }: SignupPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Panel - Carousel */}
        <div className="hidden lg:block">
          <SignupCarousel />
        </div>

        {/* Right Panel - Form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}