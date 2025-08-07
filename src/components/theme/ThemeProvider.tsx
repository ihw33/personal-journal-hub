'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { applyTheme, detectUserLevel, LEVEL_THEMES } from '@/lib/theme/theme-system';
import type { UserLevel } from '@/types/iwl4-integration';

interface ThemeContextType {
  currentLevel: UserLevel;
  setLevel: (level: UserLevel) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentLevel, setCurrentLevel] = useState<UserLevel>('adult');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize theme on mount
    const initializeTheme = async () => {
      try {
        const detectedLevel = detectUserLevel();
        setCurrentLevel(detectedLevel);
        
        // Apply theme to DOM
        if (typeof document !== 'undefined') {
          applyTheme(detectedLevel);
        }
        
        console.log(`IWL 4.0 Theme System: Applied ${detectedLevel} theme`);
      } catch (error) {
        console.error('Failed to initialize theme:', error);
        // Fallback to adult theme
        if (typeof document !== 'undefined') {
          applyTheme('adult');
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();

    // Listen for user authentication changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'test_user') {
        const newLevel = detectUserLevel();
        if (newLevel !== currentLevel) {
          setCurrentLevel(newLevel);
          applyTheme(newLevel);
          console.log(`IWL 4.0 Theme System: Switched to ${newLevel} theme`);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentLevel]);

  const setLevel = (level: UserLevel) => {
    if (level !== currentLevel && LEVEL_THEMES[level]) {
      setCurrentLevel(level);
      
      if (typeof document !== 'undefined') {
        applyTheme(level);
      }
      
      console.log(`IWL 4.0 Theme System: Manually switched to ${level} theme`);
    }
  };

  const contextValue: ThemeContextType = {
    currentLevel,
    setLevel,
    isLoading
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Theme-aware component helpers
export function useThemeStyles() {
  const { currentLevel } = useTheme();
  const theme = LEVEL_THEMES[currentLevel];
  
  return {
    theme,
    level: currentLevel,
    colors: theme.colors,
    fonts: theme.fonts,
    spacing: theme.spacing,
    animations: theme.animations
  };
}

// CSS class name helpers
export function useThemeClasses() {
  const { currentLevel } = useTheme();
  
  return {
    gradient: `iwl-gradient-${currentLevel}`,
    gradientAccent: `iwl-gradient-${currentLevel}-accent`,
    shadow: `iwl-shadow-${currentLevel}`,
    shadowHover: `iwl-shadow-${currentLevel}-hover`,
    levelClass: `iwl-level-${currentLevel}`
  };
}