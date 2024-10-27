export interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'ads' | 'content';
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
  budget?: number;
  audience: {
    target: string;
    size: number;
    segments: string[];
  };
  metrics: {
    reach: number;
    engagement: number;
    conversion: number;
    roi: number;
  };
  content: {
    title: string;
    description: string;
    assets: Array<{
      type: string;
      url: string;
    }>;
  };
  schedule?: {
    frequency: 'once' | 'daily' | 'weekly' | 'monthly';
    times?: string[];
    timezone: string;
  };
}

export interface CampaignDraft extends Omit<Campaign, 'id' | 'metrics'> {
  metrics?: Partial<Campaign['metrics']>;
}