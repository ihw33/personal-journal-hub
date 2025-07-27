'use client';

import { use } from 'react';
import { PhaseLearningPage } from '@/components/course/PhaseLearningPage';

interface Props {
  params: Promise<{
    phase: string;
  }>;
}

export default function PhasePage({ params }: Props) {
  const { phase } = use(params);
  const phaseNumber = parseInt(phase);
  return <PhaseLearningPage 
    phase={phaseNumber} 
    language="ko" 
    week={1} 
    mode="self-directed" 
    onNavigate={() => {}} 
  />;
}