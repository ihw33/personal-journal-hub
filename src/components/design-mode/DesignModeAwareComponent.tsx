'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useDesignMode } from './DesignModeProvider';

interface DesignModeAwareComponentProps {
  children: React.ReactNode;
  className?: string;
  helenaVariant?: string;
  rioVariant?: string;
  component?: keyof JSX.IntrinsicElements;
}

/**
 * 디자인 모드에 따라 자동으로 스타일이 변경되는 컴포넌트
 */
export function DesignModeAwareComponent({
  children,
  className,
  helenaVariant = '',
  rioVariant = '',
  component: Component = 'div'
}: DesignModeAwareComponentProps) {
  const { currentMode } = useDesignMode();
  
  const modeSpecificClass = currentMode === 'helena' ? helenaVariant : rioVariant;
  
  return (
    <Component className={cn(
      'design-mode-transition',
      className,
      modeSpecificClass
    )}>
      {children}
    </Component>
  );
}

interface DesignModeCardProps {
  children: React.ReactNode;
  className?: string;
}

export function DesignModeCard({ children, className }: DesignModeCardProps) {
  return (
    <DesignModeAwareComponent
      className={cn('iwl-card', className)}
      helenaVariant="helena-card-variant"
      rioVariant="rio-card-variant"
    >
      {children}
    </DesignModeAwareComponent>
  );
}

interface DesignModeButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

export function DesignModeButton({ 
  children, 
  className, 
  onClick, 
  variant = 'primary',
  disabled = false
}: DesignModeButtonProps) {
  const { currentMode } = useDesignMode();
  
  return (
    <button
      className={cn(
        'iwl-button',
        'design-mode-transition',
        `iwl-button-${variant}`,
        currentMode === 'helena' ? 'helena-button-variant' : 'rio-button-variant',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

interface DesignModeInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
}

export function DesignModeInput({ 
  placeholder, 
  value, 
  onChange, 
  className, 
  type = 'text' 
}: DesignModeInputProps) {
  const { currentMode } = useDesignMode();
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={cn(
        'iwl-input',
        'design-mode-transition',
        currentMode === 'helena' ? 'helena-input-variant' : 'rio-input-variant',
        className
      )}
    />
  );
}

interface DesignModeContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function DesignModeContainer({ children, className }: DesignModeContainerProps) {
  return (
    <DesignModeAwareComponent
      className={cn('iwl-container', className)}
    >
      {children}
    </DesignModeAwareComponent>
  );
}

interface DesignModeProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
}

export function DesignModeProgressBar({ 
  progress, 
  className, 
  showLabel = false 
}: DesignModeProgressBarProps) {
  const { currentMode } = useDesignMode();
  
  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium" style={{ color: 'var(--iwl-design-text)' }}>
            진도
          </span>
          <span className="text-sm" style={{ color: 'var(--iwl-design-text-muted)' }}>
            {progress}%
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={cn(
            'progress-indicator',
            'design-mode-transition',
            currentMode === 'helena' ? 'helena-progress-variant' : 'rio-progress-variant'
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}

interface DesignModeBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  className?: string;
}

export function DesignModeBadge({ 
  children, 
  variant = 'primary', 
  className 
}: DesignModeBadgeProps) {
  const { currentMode } = useDesignMode();
  
  const variantColors = {
    primary: currentMode === 'helena' 
      ? 'bg-orange-100 text-orange-800 border-orange-200' 
      : 'bg-blue-100 text-blue-800 border-blue-200',
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };
  
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 text-xs font-medium border',
      'design-mode-transition',
      variantColors[variant],
      currentMode === 'helena' ? 'rounded-full' : 'rounded-sm',
      className
    )}>
      {children}
    </span>
  );
}

interface DesignModeTooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export function DesignModeTooltip({ 
  content, 
  children, 
  className 
}: DesignModeTooltipProps) {
  const { currentMode } = useDesignMode();
  
  return (
    <div className={cn('relative group', className)}>
      {children}
      <div className={cn(
        'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2',
        'px-3 py-2 text-sm font-medium text-white',
        'opacity-0 group-hover:opacity-100',
        'transition-opacity duration-300',
        'pointer-events-none z-50',
        currentMode === 'helena' 
          ? 'bg-orange-500 rounded-lg' 
          : 'bg-blue-500 rounded-sm',
        'before:content-[""] before:absolute before:top-full before:left-1/2',
        'before:transform before:-translate-x-1/2',
        'before:border-4 before:border-transparent',
        currentMode === 'helena'
          ? 'before:border-t-orange-500'
          : 'before:border-t-blue-500'
      )}>
        {content}
      </div>
    </div>
  );
}