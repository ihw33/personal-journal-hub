import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="sr-only"
          {...props}
        />
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          onClick={() => onCheckedChange?.(!checked)}
          className={cn(
            "peer h-5 w-5 shrink-0 rounded border-2 border-architect-gray-300",
            "focus:outline-none focus:ring-2 focus:ring-architect-primary focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-200",
            checked
              ? "bg-architect-primary border-architect-primary text-white"
              : "bg-white hover:border-architect-gray-400",
            className
          )}
          disabled={props.disabled}
        >
          {checked && (
            <Check className="h-3 w-3 text-white mx-auto" />
          )}
        </button>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };