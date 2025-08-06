'use client';

import React, { useState, useCallback } from 'react';
import HeroSection from './HeroSection';
import ProblemSection from './ProblemSection';
import SolutionSection from './SolutionSection';
import HowItWorksSection from './HowItWorksSection';
import VisionSection from './VisionSection';
import FinalCTASection from './FinalCTASection';
import Footer from './Footer';

interface ComingSoonPageProps {
  onEmailSubmit?: (email: string) => Promise<void>;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ onEmailSubmit }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      if (onEmailSubmit) {
        await onEmailSubmit(email);
      }
      setIsSubmitted(true);
    } catch (error) {
      setError('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  }, [email, onEmailSubmit]);

  const handleSetEmail = useCallback((newEmail: string) => {
    setEmail(newEmail);
  }, []);

  const handleSetError = useCallback((newError: string) => {
    setError(newError);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <VisionSection />
      <FinalCTASection
        email={email}
        setEmail={handleSetEmail}
        error={error}
        setError={handleSetError}
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        onSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
};

export default ComingSoonPage;