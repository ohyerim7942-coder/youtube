export interface Suggestion {
  title: string;
  description: string;
  reasoning: string;
}

export interface AnalysisResult {
  tone: string;
  targetAudience: string;
  suggestions: Suggestion[];
}

export interface ScriptResult {
  title: string;
  content: string;
}

export interface SavedScript {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  tone?: string;
  targetAudience?: string;
}

export enum AppState {
  DASHBOARD = 'DASHBOARD',
  INPUT = 'INPUT',
  ANALYZING = 'ANALYZING',
  SELECTION = 'SELECTION',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
