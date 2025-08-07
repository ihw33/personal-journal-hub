'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTheme } from '@/components/theme/ThemeProvider';
import { levelComponentVariants } from '@/lib/theme/theme-system';
import { cn } from '@/lib/utils';

const baseCardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200",
        elevated: "bg-white border-gray-200 shadow-md",
        outline: "bg-transparent border-2",
        iwl: "border shadow-sm"
      },
      padding: {
        none: "",
        sm: "p-3",
        default: "p-6",
        lg: "p-8",
        xl: "p-10"
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "default"
    },
  }
);

export interface ThemeAwareCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof baseCardVariants> {
  useIWLTheme?: boolean;
  children: React.ReactNode;
}

const ThemeAwareCard = React.forwardRef<HTMLDivElement, ThemeAwareCardProps>(
  ({ className, variant, padding, useIWLTheme = false, children, ...props }, ref) => {
    const { currentLevel } = useTheme();
    
    // Get level-specific styles
    const levelCardStyles = levelComponentVariants.card[currentLevel];
    
    // If using IWL theme, apply level-based styling
    const iwlStyles = useIWLTheme ? {
      borderColor: `var(--iwl-border)`,
      backgroundColor: `var(--iwl-surface)`,
      color: `var(--iwl-text)`,
      transition: `all var(--iwl-duration-normal) var(--iwl-easing-ease)`
    } : {};
    
    return (
      <div
        className={cn(
          baseCardVariants({ variant, padding }),
          useIWLTheme && levelCardStyles,
          useIWLTheme && variant === 'iwl' && `iwl-level-${currentLevel}`,
          className
        )}
        style={iwlStyles}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ThemeAwareCard.displayName = "ThemeAwareCard";

// Card header component
interface ThemeAwareCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  useIWLTheme?: boolean;
}

const ThemeAwareCardHeader = React.forwardRef<HTMLDivElement, ThemeAwareCardHeaderProps>(
  ({ className, useIWLTheme = false, ...props }, ref) => {
    const iwlStyles = useIWLTheme ? {
      borderBottomColor: `var(--iwl-border)`,
      color: `var(--iwl-text)`
    } : {};
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5 p-6",
          useIWLTheme && "border-b border-opacity-20",
          className
        )}
        style={iwlStyles}
        {...props}
      />
    );
  }
);

ThemeAwareCardHeader.displayName = "ThemeAwareCardHeader";

// Card title component
interface ThemeAwareCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  useIWLTheme?: boolean;
}

const ThemeAwareCardTitle = React.forwardRef<HTMLParagraphElement, ThemeAwareCardTitleProps>(
  ({ className, useIWLTheme = false, ...props }, ref) => {
    const { currentLevel } = useTheme();
    
    const iwlStyles = useIWLTheme ? {
      color: `var(--iwl-text)`,
      fontFamily: `var(--iwl-font-heading)`
    } : {};
    
    return (
      <h3
        ref={ref}
        className={cn(
          "text-2xl font-semibold leading-none tracking-tight",
          useIWLTheme && `iwl-level-${currentLevel}`,
          className
        )}
        style={iwlStyles}
        {...props}
      />
    );
  }
);

ThemeAwareCardTitle.displayName = "ThemeAwareCardTitle";

// Card description component
interface ThemeAwareCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  useIWLTheme?: boolean;
}

const ThemeAwareCardDescription = React.forwardRef<HTMLParagraphElement, ThemeAwareCardDescriptionProps>(
  ({ className, useIWLTheme = false, ...props }, ref) => {
    const iwlStyles = useIWLTheme ? {
      color: `var(--iwl-text-muted)`,
      fontFamily: `var(--iwl-font-body)`
    } : {};
    
    return (
      <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        style={iwlStyles}
        {...props}
      />
    );
  }
);

ThemeAwareCardDescription.displayName = "ThemeAwareCardDescription";

// Card content component
interface ThemeAwareCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  useIWLTheme?: boolean;
}

const ThemeAwareCardContent = React.forwardRef<HTMLDivElement, ThemeAwareCardContentProps>(
  ({ className, useIWLTheme = false, ...props }, ref) => {
    const iwlStyles = useIWLTheme ? {
      color: `var(--iwl-text)`,
      fontFamily: `var(--iwl-font-body)`
    } : {};
    
    return (
      <div 
        ref={ref} 
        className={cn("p-6 pt-0", className)}
        style={iwlStyles}
        {...props} 
      />
    );
  }
);

ThemeAwareCardContent.displayName = "ThemeAwareCardContent";

// Card footer component
interface ThemeAwareCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  useIWLTheme?: boolean;
}

const ThemeAwareCardFooter = React.forwardRef<HTMLDivElement, ThemeAwareCardFooterProps>(
  ({ className, useIWLTheme = false, ...props }, ref) => {
    const iwlStyles = useIWLTheme ? {
      borderTopColor: `var(--iwl-border)`,
      color: `var(--iwl-text-muted)`
    } : {};
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center p-6 pt-0",
          useIWLTheme && "border-t border-opacity-20",
          className
        )}
        style={iwlStyles}
        {...props}
      />
    );
  }
);

ThemeAwareCardFooter.displayName = "ThemeAwareCardFooter";

export { 
  ThemeAwareCard, 
  ThemeAwareCardHeader, 
  ThemeAwareCardTitle, 
  ThemeAwareCardDescription, 
  ThemeAwareCardContent, 
  ThemeAwareCardFooter,
  baseCardVariants 
};