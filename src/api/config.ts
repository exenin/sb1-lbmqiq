import { AppConfig } from '../types/config';

export const getAppConfig = async (): Promise<AppConfig> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    company: {
      name: 'Platform Builder',
      logo: '/logo.svg',
      features: {
        crm: true,
        sales: true,
        marketing: true,
        talent: true,
        stream: true
      }
    },
    theme: {
      primary: 'blue',
      secondary: 'gray',
      accent: 'indigo'
    },
    modules: {
      crm: {
        enabled: true,
        features: ['contacts', 'companies', 'deals', 'tasks']
      },
      sales: {
        enabled: true,
        features: ['opportunities', 'pipeline', 'forecasts']
      },
      marketing: {
        enabled: true,
        features: ['campaigns', 'automation', 'analytics']
      },
      talent: {
        enabled: true,
        features: ['recruitment', 'onboarding', 'training']
      },
      stream: {
        enabled: true,
        features: ['live', 'recorded', 'analytics']
      }
    }
  };
};