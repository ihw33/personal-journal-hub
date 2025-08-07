'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTheme } from '@/components/theme/ThemeProvider';
import { levelComponentVariants } from '@/lib/theme/theme-system';
import { cn } from '@/lib/utils';

const baseInputVariants = cva(
  "flex w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-input rounded-md",
        outline: "border-2 border-input rounded-md",
        filled: "bg-muted border border-transparent rounded-md focus-visible:border-ring",
        iwl: "border transition-all duration-300"
      },
      inputSize: {
        sm: "h-8 px-2 text-xs",
        default: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
        xl: "h-14 px-5 text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default"
    },
  }
);

export interface ThemeAwareInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof baseInputVariants> {
  useIWLTheme?: boolean;
}

const ThemeAwareInput = React.forwardRef<HTMLInputElement, ThemeAwareInputProps>(
  ({ className, variant, inputSize, useIWLTheme = false, ...props }, ref) => {
    const { currentLevel } = useTheme();
    
    // Get level-specific styles
    const levelInputStyles = levelComponentVariants.input[currentLevel];
    
    // If using IWL theme, apply level-based styling
    const iwlStyles = useIWLTheme ? {
      borderColor: `var(--iwl-border)`,
      backgroundColor: `var(--iwl-surface)`,
      color: `var(--iwl-text)`,
      transition: `all var(--iwl-duration-normal) var(--iwl-easing-ease)`,
      fontFamily: `var(--iwl-font-body)`
    } : {};
    
    const iwlFocusStyles = useIWLTheme ? {
      '--tw-ring-color': `var(--iwl-primary)`,
      '--tw-border-opacity': '1',
      borderColor: `var(--iwl-primary)`
    } : {};
    
    return (
      <input
        className={cn(
          baseInputVariants({ variant, inputSize }),
          useIWLTheme && levelInputStyles,
          useIWLTheme && variant === 'iwl' && `iwl-level-${currentLevel}`,
          useIWLTheme && 'focus:border-[var(--iwl-primary)] focus:ring-[var(--iwl-primary)]',
          className
        )}
        style={{
          ...iwlStyles,
          ...iwlFocusStyles
        }}
        ref={ref}
        {...props}
      />
    );
  }
);

ThemeAwareInput.displayName = "ThemeAwareInput";

// Textarea component
export interface ThemeAwareTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof baseInputVariants> {
  useIWLTheme?: boolean;
}

const ThemeAwareTextarea = React.forwardRef<HTMLTextAreaElement, ThemeAwareTextareaProps>(
  ({ className, variant, inputSize, useIWLTheme = false, ...props }, ref) => {
    const { currentLevel } = useTheme();
    
    // Get level-specific styles
    const levelInputStyles = levelComponentVariants.input[currentLevel];
    
    // If using IWL theme, apply level-based styling
    const iwlStyles = useIWLTheme ? {
      borderColor: `var(--iwl-border)`,
      backgroundColor: `var(--iwl-surface)`,
      color: `var(--iwl-text)`,
      transition: `all var(--iwl-duration-normal) var(--iwl-easing-ease)`,
      fontFamily: `var(--iwl-font-body)`,
      resize: 'vertical' as const
    } : {};
    
    return (
      <textarea
        className={cn(
          baseInputVariants({ variant, inputSize }),
          "min-h-[60px]",
          useIWLTheme && levelInputStyles,
          useIWLTheme && variant === 'iwl' && `iwl-level-${currentLevel}`,
          useIWLTheme && 'focus:border-[var(--iwl-primary)] focus:ring-[var(--iwl-primary)]',
          className
        )}
        style={iwlStyles}
        ref={ref}
        {...props}
      />
    );
  }
);

ThemeAwareTextarea.displayName = "ThemeAwareTextarea";

// Label component
export interface ThemeAwareLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  useIWLTheme?: boolean;
  required?: boolean;
}

const ThemeAwareLabel = React.forwardRef<HTMLLabelElement, ThemeAwareLabelProps>(
  ({ className, useIWLTheme = false, required = false, children, ...props }, ref) => {
    const iwlStyles = useIWLTheme ? {
      color: `var(--iwl-text)`,
      fontFamily: `var(--iwl-font-body)`,
      fontWeight: '500'
    } : {};
    
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        style={iwlStyles}
        {...props}
      >
        {children}
        {required && (
          <span 
            className="ml-1 text-red-500"
            style={useIWLTheme ? { color: 'var(--iwl-error)' } : {}}
          >
            *
          </span>
        )}
      </label>
    );
  }
);

ThemeAwareLabel.displayName = "ThemeAwareLabel";

// Form field wrapper
export interface ThemeAwareFormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  useIWLTheme?: boolean;
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

const ThemeAwareFormField = React.forwardRef<HTMLDivElement, ThemeAwareFormFieldProps>(
  ({ className, useIWLTheme = false, label, required = false, error, hint, children, ...props }, ref) => {
    const iwlStyles = useIWLTheme ? {
      fontFamily: `var(--iwl-font-body)`
    } : {};
    
    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        style={iwlStyles}
        {...props}
      >
        {label && (
          <ThemeAwareLabel useIWLTheme={useIWLTheme} required={required}>
            {label}
          </ThemeAwareLabel>
        )}
        {children}
        {hint && !error && (
          <p 
            className="text-xs text-muted-foreground"
            style={useIWLTheme ? { 
              color: 'var(--iwl-text-muted)',
              fontFamily: 'var(--iwl-font-body)'
            } : {}}
          >
            {hint}
          </p>
        )}
        {error && (
          <p 
            className="text-xs text-red-500"
            style={useIWLTheme ? { 
              color: 'var(--iwl-error)',
              fontFamily: 'var(--iwl-font-body)'
            } : {}}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

ThemeAwareFormField.displayName = "ThemeAwareFormField";

export { 
  ThemeAwareInput,
  ThemeAwareTextarea,
  ThemeAwareLabel,
  ThemeAwareFormField,
  baseInputVariants 
};