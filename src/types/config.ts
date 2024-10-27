export interface AppConfig {
  company: {
    name: string;
    logo: string;
    features: {
      crm: boolean;
      sales: boolean;
      marketing: boolean;
      talent: boolean;
      stream: boolean;
    };
  };
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  modules: {
    [key: string]: {
      enabled: boolean;
      features: string[];
    };
  };
  navigation: {
    customMenuItems: MenuItem[];
  };
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  type: 'internal' | 'external' | 'iframe';
  path: string;
  target?: '_blank' | '_self';
  permissions?: string[];
  position?: 'top' | 'bottom';
  children?: MenuItem[];
}