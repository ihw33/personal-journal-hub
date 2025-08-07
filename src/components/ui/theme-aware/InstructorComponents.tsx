'use client';

import React from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { ThemeAwareButton } from './ThemeAwareButton';
import { ThemeAwareCard, ThemeAwareCardContent, ThemeAwareCardHeader, ThemeAwareCardTitle } from './ThemeAwareCard';
import { cn } from '@/lib/utils';

// 드미트리 의견 반영 - Instructor 전용 컴포넌트
export interface InstructorDashboardProps {
  children: React.ReactNode;
  className?: string;
}

export const InstructorDashboard = React.forwardRef<HTMLDivElement, InstructorDashboardProps>(
  ({ children, className, ...props }, ref) => {
    const { currentLevel } = useTheme();
    
    const instructorStyles = currentLevel === 'instructor' ? {
      background: 'linear-gradient(135deg, var(--iwl-surface) 0%, var(--iwl-background) 100%)',
      borderTop: '3px solid var(--iwl-accent)',
      borderRadius: 'var(--iwl-radius-lg)',
      boxShadow: 'var(--iwl-shadow-lg)'
    } : {};

    return (
      <div
        ref={ref}
        className={cn(
          "p-6 space-y-6 min-h-screen",
          currentLevel === 'instructor' && "border-t-4",
          className
        )}
        style={instructorStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InstructorDashboard.displayName = "InstructorDashboard";

// Instructor 전용 액션 버튼
export interface InstructorActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  action: 'grade' | 'feedback' | 'analyze' | 'assign';
  children: React.ReactNode;
  size?: 'sm' | 'default' | 'lg';
}

export const InstructorActionButton = React.forwardRef<HTMLButtonElement, InstructorActionButtonProps>(
  ({ action, children, size = 'default', className, ...props }, ref) => {
    const { currentLevel } = useTheme();
    
    const actionStyles = {
      grade: {
        background: 'linear-gradient(135deg, var(--iwl-success) 0%, #10B981 100%)',
        icon: '✓'
      },
      feedback: {
        background: 'linear-gradient(135deg, var(--iwl-accent) 0%, #F59E0B 100%)',
        icon: '💬'
      },
      analyze: {
        background: 'linear-gradient(135deg, var(--iwl-primary) 0%, #8B5CF6 100%)',
        icon: '📊'
      },
      assign: {
        background: 'linear-gradient(135deg, var(--iwl-secondary) 0%, #1E40AF 100%)',
        icon: '📋'
      }
    };

    const currentStyle = actionStyles[action];
    
    return (
      <ThemeAwareButton
        ref={ref}
        useIWLTheme={currentLevel === 'instructor'}
        size={size}
        className={cn(
          "flex items-center gap-2 font-medium transition-all duration-300",
          currentLevel === 'instructor' && "hover:scale-105 hover:shadow-xl",
          className
        )}
        style={currentLevel === 'instructor' ? {
          background: currentStyle.background,
          color: 'white',
          border: 'none'
        } : {}}
        {...props}
      >
        {currentLevel === 'instructor' && (
          <span className="text-lg" aria-hidden="true">{currentStyle.icon}</span>
        )}
        {children}
      </ThemeAwareButton>
    );
  }
);

InstructorActionButton.displayName = "InstructorActionButton";

// Admin 전용 컴포넌트 - 드미트리 의견 반영
export interface AdminControlPanelProps {
  children: React.ReactNode;
  className?: string;
}

export const AdminControlPanel = React.forwardRef<HTMLDivElement, AdminControlPanelProps>(
  ({ children, className, ...props }, ref) => {
    const { currentLevel } = useTheme();
    
    const adminStyles = currentLevel === 'admin' ? {
      background: 'var(--iwl-surface)',
      border: '2px solid var(--iwl-border)',
      borderLeft: '4px solid var(--iwl-accent)',
      borderRadius: 'var(--iwl-radius-base)',
      boxShadow: 'var(--iwl-shadow-sm)'
    } : {};

    return (
      <div
        ref={ref}
        className={cn(
          "p-4 space-y-4",
          currentLevel === 'admin' && "border-l-4 bg-opacity-95",
          className
        )}
        style={adminStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AdminControlPanel.displayName = "AdminControlPanel";

// Admin 전용 위험 액션 버튼
export interface AdminDangerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  confirmText?: string;
}

export const AdminDangerButton = React.forwardRef<HTMLButtonElement, AdminDangerButtonProps>(
  ({ children, confirmText, className, onClick, ...props }, ref) => {
    const { currentLevel } = useTheme();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (confirmText && !window.confirm(confirmText)) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    const adminStyles = currentLevel === 'admin' ? {
      background: 'var(--iwl-error)',
      color: 'white',
      border: '2px solid transparent',
      borderRadius: 'var(--iwl-radius-base)',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      transition: 'all var(--iwl-duration-fast) var(--iwl-easing-ease)'
    } : {};

    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 text-sm font-medium",
          currentLevel === 'admin' && "hover:bg-opacity-90 hover:shadow-md active:scale-95",
          className
        )}
        style={adminStyles}
        onClick={handleClick}
        {...props}
      >
        {currentLevel === 'admin' && (
          <span className="mr-2" aria-hidden="true">⚠️</span>
        )}
        {children}
      </button>
    );
  }
);

AdminDangerButton.displayName = "AdminDangerButton";

// 실습용 컴포넌트 데모
export function RoleSpecificDemo() {
  const { currentLevel } = useTheme();
  
  if (currentLevel === 'instructor') {
    return (
      <InstructorDashboard>
        <ThemeAwareCard useIWLTheme variant="iwl">
          <ThemeAwareCardHeader useIWLTheme>
            <ThemeAwareCardTitle useIWLTheme>교육자 전용 기능</ThemeAwareCardTitle>
          </ThemeAwareCardHeader>
          <ThemeAwareCardContent useIWLTheme>
            <div className="grid grid-cols-2 gap-4">
              <InstructorActionButton action="grade">
                학습자 평가하기
              </InstructorActionButton>
              <InstructorActionButton action="feedback">
                피드백 작성하기
              </InstructorActionButton>
              <InstructorActionButton action="analyze">
                진도 분석하기
              </InstructorActionButton>
              <InstructorActionButton action="assign">
                과제 배정하기
              </InstructorActionButton>
            </div>
          </ThemeAwareCardContent>
        </ThemeAwareCard>
      </InstructorDashboard>
    );
  }
  
  if (currentLevel === 'admin') {
    return (
      <AdminControlPanel>
        <ThemeAwareCard useIWLTheme variant="iwl">
          <ThemeAwareCardHeader useIWLTheme>
            <ThemeAwareCardTitle useIWLTheme>관리자 제어판</ThemeAwareCardTitle>
          </ThemeAwareCardHeader>
          <ThemeAwareCardContent useIWLTheme>
            <div className="space-y-3">
              <ThemeAwareButton useIWLTheme variant="iwl" className="w-full">
                시스템 상태 확인
              </ThemeAwareButton>
              <ThemeAwareButton useIWLTheme variant="iwl" className="w-full">
                사용자 관리
              </ThemeAwareButton>
              <AdminDangerButton 
                confirmText="정말로 모든 캐시를 삭제하시겠습니까?"
                className="w-full"
              >
                캐시 전체 삭제
              </AdminDangerButton>
            </div>
          </ThemeAwareCardContent>
        </ThemeAwareCard>
      </AdminControlPanel>
    );
  }
  
  return null;
}