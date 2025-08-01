'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { JournalDetailPage } from '@/components/journal/JournalDetailPage';
import { useAuth } from '@/contexts/AuthContext';

export default function JournalDetailPageRoute() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  
  const journalId = params.id as string;
  
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <JournalDetailPage
      journalId={journalId}
      user={user}
      onNavigate={handleNavigate}
      language="ko"
    />
  );
}