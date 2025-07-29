import { ReactNode } from 'react';

export interface PhaseData {
  id: string;
  title: string;
  description: string;
  versions: string;
  period: string;
  status: 'completed' | 'current' | 'future';
  icon: ReactNode;
  color: string;
  features: string[];
}

export interface MetricData {
  label: string;
  value: string;
  description: string;
  icon: ReactNode;
  progress: number;
}

export interface VersionHistoryPageProps {
  language: 'ko' | 'en';
  onNavigate: (page: string) => void;
}

// 상세 변경 로그를 위한 새로운 타입들
export type VersionType = 'MAJOR' | 'MINOR' | 'PATCH';

export interface FileChange {
  file: string;
  type: 'added' | 'modified' | 'removed';
  description: string;
}

export interface VersionChangeLog {
  version: string;
  type: VersionType;
  title: string;
  date: string;
  description: string;
  changes: string[];
  files: FileChange[];
  author: string;
  impact: 'high' | 'medium' | 'low';
  breaking?: boolean;
}

export interface VersionGroup {
  majorVersion: string;
  title: string;
  period: string;
  status: 'completed' | 'current' | 'planned';
  versions: VersionChangeLog[];
}