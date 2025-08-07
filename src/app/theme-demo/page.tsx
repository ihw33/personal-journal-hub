'use client';

import { ThemeShowcase } from '@/components/demo/ThemeShowcase';

export default function ThemeDemoPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">IWL 4.0 테마 시스템 데모</h1>
        <p className="text-xl text-muted-foreground">
          레벨별 테마 시스템과 테마 적응형 컴포넌트를 체험해보세요
        </p>
      </div>
      
      <ThemeShowcase />
    </div>
  );
}