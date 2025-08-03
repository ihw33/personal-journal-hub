/**
 * IdeaWorkLab v4.0 Diagnosis Test Page
 * 사고 유형 진단 테스트 실행 페이지 (/diagnosis/test)
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DiagnosisTestPage } from '@/components/diagnosis/DiagnosisTestPage';
import { secureSessionStorage } from '@/lib/security';

interface TestAnswer {
  questionId: string;
  optionId: string;
  category: string;
  value: number;
  style: string;
}

export default function DiagnosisTestPageRoute() {
  const router = useRouter();

  const handleComplete = (answers: TestAnswer[]) => {
    // Store encrypted results in sessionStorage for the results page
    if (typeof window !== 'undefined') {
      try {
        secureSessionStorage.setItem('diagnosisAnswers', answers);
      } catch (error) {
        console.error('Failed to save diagnosis answers:', error);
        // Continue to results page even if storage fails
      }
    }
    router.push('/diagnosis/results');
  };

  const handleBack = () => {
    router.push('/diagnosis');
  };

  return (
    <DiagnosisTestPage
      onComplete={handleComplete}
      onBack={handleBack}
    />
  );
}