import { cn } from "./utils"

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ className, size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300 border-t-iwl-purple",
          sizeClasses[size],
          className
        )}
      />
      {text && (
        <p className="text-sm text-gray-600">{text}</p>
      )}
    </div>
  );
}