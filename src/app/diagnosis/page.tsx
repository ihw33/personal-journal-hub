/**
 * IdeaWorkLab v4.0 Diagnosis Landing Page
 * 사고 유형 진단 시작 페이지 (/diagnosis)
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DiagnosisIntroPage } from '@/components/diagnosis/DiagnosisIntroPage';

export default function DiagnosisPage() {
  const router = useRouter();

  const handleStartDiagnosis = () => {
    router.push('/diagnosis/test');
  };

  const handleNavigate = (page: string, params?: any) => {
    switch (page) {
      case 'about':
        router.push('/about');
        break;
      case 'courses':
        router.push('/courses');
        break;
      case 'journal':
        router.push('/journal');
        break;
      default:
        router.push('/');
    }
  };

  return (
    <DiagnosisIntroPage
      onStartDiagnosis={handleStartDiagnosis}
      onNavigate={handleNavigate}
    />
  );
}