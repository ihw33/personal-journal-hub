'use client';

import { WeeklyLearningPage } from '@/components/course/WeeklyLearningPage';

interface Props {
  params: {
    week: string;
  };
}

export default function WeekPage({ params }: Props) {
  const weekNumber = parseInt(params.week);
  return <WeeklyLearningPage week={weekNumber} />;
}