'use client';

import { MemberDashboard } from './MemberDashboard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Card } from '../ui/card';

export function DashboardRouter() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>
          <MemberDashboard />
        </Card>
      </div>
    </div>
  );
}