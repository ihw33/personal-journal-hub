'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { Select } from '@/components/ui/select';
import type { UserLevel } from '@/lib/theme/theme-system';

interface ThemeSelectorProps {
  className?: string;
}

export function ThemeSelector({ className }: ThemeSelectorProps) {
  const { currentLevel, setLevel } = useTheme();

  const levels: { value: UserLevel; label: string }[] = [
    { value: 'junior', label: '초급자' },
    { value: 'youth', label: '청소년' },
    { value: 'adult', label: '성인' },
    { value: 'instructor', label: '강사' },
    { value: 'admin', label: '관리자' }
  ];

  return (
    <div className={className}>
      <Select
        value={currentLevel}
        onValueChange={(value) => setLevel(value as UserLevel)}
      >
        <option value="">레벨 선택</option>
        {levels.map((level) => (
          <option key={level.value} value={level.value}>
            {level.label}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default ThemeSelector;