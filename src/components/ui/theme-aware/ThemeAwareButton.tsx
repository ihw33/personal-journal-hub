'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTheme } from '@/components/theme/ThemeProvider';
import { levelComponentVariants, levelIconSizes } from '@/lib/theme/theme-system';
import { cn } from '@/lib/utils';

const baseButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        iwl: "text-white font-semibold hover:opacity-90 active:scale-95"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        xl: "h-12 px-10 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ThemeAwareButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof baseButtonVariants> {
  asChild?: boolean;
  children: React.ReactNode;
  useIWLTheme?: boolean;
}

const ThemeAwareButton = React.forwardRef<HTMLButtonElement, ThemeAwareButtonProps>(
  ({ className, variant, size, useIWLTheme = false, children, ...props }, ref) => {
    const { currentLevel } = useTheme();
    
    // Get level-specific styles
    const levelButtonStyles = levelComponentVariants.button[currentLevel];
    
    // If using IWL theme, apply level-based styling
    const iwlStyles = useIWLTheme ? {
      background: `var(--iwl-primary)`,
      boxShadow: `var(--iwl-shadow-${currentLevel}, 0 2px 8px rgba(0,0,0,0.1))`,
      transition: `all var(--iwl-duration-normal) var(--iwl-easing-ease)`
    } : {};
    
    return (
      <button
        className={cn(
          baseButtonVariants({ variant, size }),
          useIWLTheme && levelButtonStyles,
          useIWLTheme && variant === 'iwl' && 'iwl-shadow-' + currentLevel,
          className
        )}
        style={iwlStyles}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ThemeAwareButton.displayName = "ThemeAwareButton";

export { ThemeAwareButton, baseButtonVariants };