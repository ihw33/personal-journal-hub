import React, { createContext, useContext, useState, useEffect } from 'react';

interface PersonalizationData {
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: 'ko' | 'en';
    notifications: boolean;
  };
  learningProgress: {
    enrolledCourses: string[];
    completionRate: number;
    currentPhase: number;
  };
  behaviorAnalytics: {
    engagementScore: number;
    learningVelocity: 'slow' | 'medium' | 'fast';
    strongTopics: string[];
  };
  aiInteractions: {
    totalConversations: number;
    strugglingAreas: string[];
  };
}

interface PersonalizationContextType {
  personalizationData: PersonalizationData | null;
  updatePersonalization: (data: Partial<PersonalizationData>) => void;
  resetPersonalization: () => void;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export function PersonalizationProvider({ children }: { children: React.ReactNode }) {
  const [personalizationData, setPersonalizationData] = useState<PersonalizationData | null>(null);

  useEffect(() => {
    // Load personalization data from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('personalization-data');
      if (saved) {
        try {
          setPersonalizationData(JSON.parse(saved));
        } catch (error) {
          console.error('Failed to parse personalization data:', error);
        }
      }
    }
  }, []);

  const updatePersonalization = (data: Partial<PersonalizationData>) => {
    const updated = personalizationData ? { ...personalizationData, ...data } : data as PersonalizationData;
    setPersonalizationData(updated);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('personalization-data', JSON.stringify(updated));
    }
  };

  const resetPersonalization = () => {
    setPersonalizationData(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('personalization-data');
    }
  };

  return (
    <PersonalizationContext.Provider value={{
      personalizationData,
      updatePersonalization,
      resetPersonalization
    }}>
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  const context = useContext(PersonalizationContext);
  if (context === undefined) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
}