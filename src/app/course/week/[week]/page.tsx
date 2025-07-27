'use client';

import { use } from 'react';
import { WeeklyLearningPage } from '@/components/course/WeeklyLearningPage';

interface Props {
  params: Promise<{
    week: string;
  }>;
}

export default function WeekPage({ params }: Props) {
  const { week } = use(params);
  const weekNumber = parseInt(week);
  return <WeeklyLearningPage 
    week={weekNumber} 
    language="ko" 
    onNavigate={() => {}} 
  />;
}