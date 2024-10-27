export type IndustryType = 
  | 'default'
  | 'finance'
  | 'ecommerce'
  | 'healthcare'
  | 'manufacturing'
  | 'logistics'
  | 'technology'
  | 'education'
  | 'entertainment'
  | 'professional_services'
  | 'real_estate'
  | 'hospitality'
  | 'adult'
  | 'non_profit';

export interface IndustryProfile {
  id: string;
  name: string;
  type: IndustryType;
  description: string;
  features: {
    crm: boolean;
    sales: boolean;
    marketing: boolean;
    talent: boolean;
    stream: boolean;
    innovation: boolean;
    finance: boolean;
    inventory: boolean;
    shipping: boolean;
    compliance: boolean;
  };
  modules: {
    [key: string]: {
      enabled: boolean;
      config: Record<string, any>;
    };
  };
  settings: {
    theme: {
      primary: string;
      secondary: string;
      accent: string;
    };
    branding: {
      logo?: string;
      favicon?: string;
    };
    compliance: {
      dataRetention: number;
      auditTrail: boolean;
      gdprCompliant: boolean;
    };
    payment: {
      providers: string[];
      currencies: string[];
      cryptoEnabled: boolean;
    };
  };
}

export interface DesignerConfig {
  enabled: boolean;
  tools: {
    themeEditor: boolean;
    layoutBuilder: boolean;
    componentLibrary: boolean;
    assetManager: boolean;
  };
  permissions: string[];
}