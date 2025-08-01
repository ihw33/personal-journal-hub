import React from 'react';
import { cn } from '@/lib/utils';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  language?: 'ko' | 'en';
  onClick?: () => void;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  language = 'ko',
  onClick,
  className 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-h4',
    md: 'text-h3',
    lg: 'text-h2'
  };

  return (
    <div 
      className={cn(
        "flex items-center space-x-3 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className={cn(
        "bg-architect-gradient-main rounded-lg flex items-center justify-center shadow-sm",
        sizeClasses[size]
      )}>
        <span className="text-white font-bold text-lg">I</span>
      </div>
      <div className="flex flex-col">
        <span className={cn(
          "font-bold text-architect-gray-900 leading-tight",
          textSizes[size]
        )}>
          IdeaWorkLab
        </span>
        <span className="text-xs text-architect-gray-500 leading-tight">
          사고와 재능의 설계자
        </span>
      </div>
    </div>
  );
};

export { Logo };