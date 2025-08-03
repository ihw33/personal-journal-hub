'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { JournalListPage } from '@/components/journal/JournalListPage';
import { useAuth } from '@/lib/supabase/auth-context';

export default function JournalPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <JournalListPage
      user={user}
      onNavigate={handleNavigate}
      language="ko"
    />
  );
}