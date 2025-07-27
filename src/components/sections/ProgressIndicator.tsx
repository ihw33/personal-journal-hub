import { cn } from '../ui/utils';

interface ProgressIndicatorProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressIndicator({ value, className, showLabel = false }: ProgressIndicatorProps) {
  // Ensure value is between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));
  
  return (
    <div className={cn("w-full bg-iwl-purple-100 rounded-full overflow-hidden", className)}>
      <div 
        className="h-full bg-iwl-gradient transition-all duration-1000 ease-out rounded-full"
        style={{ width: `${clampedValue}%` }}
      >
        {showLabel && (
          <div className="flex items-center justify-end h-full pr-2">
            <span className="text-xs text-white font-medium">
              {Math.round(clampedValue)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}