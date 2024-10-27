import { User } from './models';

export type BusinessStructure = 'llc' | 'corporation' | 'partnership' | 'sole_proprietorship';

export interface BusinessProfile {
  id: string;
  name: string;
  structure: BusinessStructure;
  vision: string;
  mission: string;
  values: string[];
  culture: {
    principles: string[];
    practices: string[];
    environment: string;
  };
  compliance: {
    status: 'compliant' | 'pending' | 'non_compliant';
    certificates: ComplianceCertificate[];
    lastAudit: string;
    nextAudit: string;
  };
  banking: {
    setup: boolean;
    accounts: BankAccount[];
    integrations: string[];
  };
}

export interface ComplianceCertificate {
  id: string;
  type: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
  document: string;
}

export interface BankAccount {
  id: string;
  type: 'checking' | 'savings' | 'business';
  provider: string;
  status: 'active' | 'pending' | 'inactive';
  integrated: boolean;
}

export interface MarketResearch {
  id: string;
  type: 'industry' | 'competitor' | 'customer' | 'swot';
  name: string;
  date: string;
  status: 'draft' | 'completed' | 'archived';
  data: any;
  insights: AIInsight[];
  lastUpdated: string;
}

export interface AIInsight {
  id: string;
  type: 'opportunity' | 'threat' | 'recommendation' | 'trend';
  title: string;
  description: string;
  confidence: number;
  source: string;
  date: string;
}

export interface CustomerPersona {
  id: string;
  name: string;
  demographics: {
    age: string;
    gender: string;
    location: string;
    income: string;
    education: string;
  };
  psychographics: {
    interests: string[];
    values: string[];
    painPoints: string[];
    goals: string[];
  };
  behaviors: {
    purchaseHabits: string[];
    channelPreferences: string[];
    decisionFactors: string[];
  };
  journey: {
    awareness: string;
    consideration: string;
    decision: string;
    retention: string;
  };
}

export interface ProductFeature {
  id: string;
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'planned' | 'in_progress' | 'completed';
  effort: number;
  impact: number;
  dependencies: string[];
  metrics: {
    userValue: number;
    businessValue: number;
    technicalComplexity: number;
  };
}

export interface TechStack {
  id: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  name: string;
  description: string;
  status: 'recommended' | 'alternative' | 'deprecated';
  pros: string[];
  cons: string[];
  useCases: string[];
  cost: {
    model: 'free' | 'paid' | 'hybrid';
    estimate: string;
  };
}

export interface Sprint {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  features: ProductFeature[];
  team: User[];
  metrics: {
    planned: number;
    completed: number;
    velocity: number;
  };
}

export interface Prototype {
  id: string;
  name: string;
  type: 'wireframe' | 'mockup' | 'interactive';
  status: 'draft' | 'review' | 'approved' | 'archived';
  created: string;
  modified: string;
  screens: PrototypeScreen[];
  feedback: PrototypeFeedback[];
}

export interface PrototypeScreen {
  id: string;
  name: string;
  description: string;
  image: string;
  interactions: {
    hotspots: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      action: string;
      target: string;
    }>;
  };
}

export interface PrototypeFeedback {
  id: string;
  user: User;
  screen: string;
  type: 'comment' | 'suggestion' | 'issue';
  content: string;
  status: 'open' | 'resolved' | 'declined';
  created: string;
}