/**
 * IdeaWorkLab v4.0 Diagnosis Test Page
 * 사고 유형 진단 테스트 실행 페이지 (/diagnosis/test)
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DiagnosisTestPage } from '@/components/diagnosis/DiagnosisTestPage';

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
    // Store results in sessionStorage for the results page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('diagnosisAnswers', JSON.stringify(answers));
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