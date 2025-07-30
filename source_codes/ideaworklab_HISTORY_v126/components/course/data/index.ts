import { WEEK_1_DATA } from './week1Data';
import { WEEK_2_DATA } from './week2Data';
import { WEEK_3_DATA } from './week3Data';
import { WEEK_4_DATA } from './week4Data';
import { WEEK_5_DATA } from './week5Data';
import { WEEK_6_DATA } from './week6Data';
import { WEEK_7_DATA } from './week7Data';
import { WEEK_8_DATA } from './week8Data';
import { AI_COLLABORATION_METHODOLOGY } from './aiMethodology';

export const JEJU_COURSE_DATA = [
  WEEK_1_DATA,
  WEEK_2_DATA,
  WEEK_3_DATA,
  WEEK_4_DATA,
  WEEK_5_DATA,
  WEEK_6_DATA,
  WEEK_7_DATA,
  WEEK_8_DATA
];

export { AI_COLLABORATION_METHODOLOGY };

// Re-export types for convenience
export type { WeekData, PhaseData, PracticeContent, AIPrompt, Resource, AICollaborationGuide } from '../types';