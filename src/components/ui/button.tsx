import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-architect-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      default: 'bg-architect-gradient-main text-white hover:shadow-lg hover:scale-105',
      outline: 'border-2 border-architect-primary text-architect-primary bg-transparent hover:bg-architect-primary hover:text-white',
      ghost: 'text-architect-gray-700 hover:bg-architect-gray-100 hover:text-architect-primary',
      destructive: 'bg-architect-error text-white hover:bg-architect-error/90'
    };

    const sizes = {
      default: 'px-6 py-2 text-body',
      sm: 'px-4 py-1.5 text-small',
      lg: 'px-8 py-3 text-body-lg'
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };