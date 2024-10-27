export interface BusinessTask {
  id: number;
  stage: 'SETUP' | 'LAUNCH' | 'SCALE';
  subStage: string;
  task: string;
  owner: string;
  startWeek: number;
  endWeek: number;
  startDate?: string;
  plannedEndDate?: string;
  endDate?: string;
  delayDays: number;
  status: 'pending' | 'in-progress' | 'completed';
  dependencies: number[];
  notes?: string;
  progress: number;
  linkedDocuments?: string[];
  assignees?: string[];
  comments?: {
    id: string;
    user: string;
    content: string;
    timestamp: string;
  }[];
}

export interface TaskStage {
  id: 'SETUP' | 'LAUNCH' | 'SCALE';
  name: string;
  color: string;
  subStages: {
    id: string;
    name: string;
    tasks: number[];
  }[];
}

export interface TaskFilter {
  stage?: 'SETUP' | 'LAUNCH' | 'SCALE';
  subStage?: string;
  status?: ('pending' | 'in-progress' | 'completed')[];
  owner?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}