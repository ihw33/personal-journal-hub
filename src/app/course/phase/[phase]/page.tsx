'use client';

import { PhaseLearningPage } from '@/components/course/PhaseLearningPage';

interface Props {
  params: {
    phase: string;
  };
}

export default function PhasePage({ params }: Props) {
  const phaseNumber = parseInt(params.phase);
  return <PhaseLearningPage phase={phaseNumber} />;
}