import { WEEK_1_DATA } from './week1Data';
import { WEEK_2_DATA } from './week2Data';
import { AI_COLLABORATION_METHODOLOGY } from './aiMethodology';

export const JEJU_COURSE_DATA = [
  WEEK_1_DATA,
  WEEK_2_DATA
  // Additional weeks can be added here as separate files
];

export { AI_COLLABORATION_METHODOLOGY };

// Re-export types for convenience
export type { WeekData, PhaseData, PracticeContent, AIPrompt, Resource, AICollaborationGuide } from '../types';