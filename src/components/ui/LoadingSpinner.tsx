import React from "react";
import { cn } from "./utils"

interface LoadingSpinnerProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  variant?: 'default' | 'dots' | 'pulse' | 'wave';
  fullscreen?: boolean;
  overlay?: boolean;
}

export const LoadingSpinner = React.memo(({ 
  className, 
  size = 'md', 
  text, 
  variant = 'default',
  fullscreen = false,
  overlay = false
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full bg-iwl-purple animate-pulse",
                  sizeClasses[size]
                )}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.4s'
                }}
              />
            ))}
          </div>
        );
      
      case 'pulse':
        return (
          <div
            className={cn(
              "rounded-full bg-iwl-purple animate-pulse",
              sizeClasses[size]
            )}
          />
        );
      
      case 'wave':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 bg-iwl-purple rounded-full animate-pulse"
                style={{
                  height: size === 'xs' ? '8px' : size === 'sm' ? '12px' : size === 'md' ? '16px' : size === 'lg' ? '20px' : '24px',
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        );
      
      default:
        return (
          <div
            className={cn(
              "animate-spin rounded-full border-2 border-gray-300 border-t-iwl-purple",
              sizeClasses[size]
            )}
          />
        );
    }
  };

  const content = (
    <div className={cn(
      "flex flex-col items-center justify-center gap-3",
      fullscreen && "min-h-screen",
      className
    )}>
      {renderSpinner()}
      {text && (
        <p className={cn(
          "text-gray-600 animate-pulse",
          textSizeClasses[size]
        )}>
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
});