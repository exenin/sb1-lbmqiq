import { IndustryProfile } from '../../types/industry';

export const defaultProfile: IndustryProfile = {
  id: 'default',
  name: 'Standard Business',
  type: 'default',
  description: 'Default configuration with all features enabled',
  features: {
    crm: true,
    sales: true,
    marketing: true,
    talent: true,
    stream: true,
    innovation: true,
    finance: true,
    inventory: true,
    shipping: true,
    compliance: true
  },
  modules: {
    crm: {
      enabled: true,
      config: {
        contactManagement: true,
        dealTracking: true,
        taskManagement: true
      }
    },
    sales: {
      enabled: true,
      config: {
        pipeline: true,
        forecasting: true,
        quotations: true
      }
    },
    marketing: {
      enabled: true,
      config: {
        campaigns: true,
        automation: true,
        analytics: true
      }
    },
    finance: {
      enabled: true,
      config: {
        invoicing: true,
        expenses: true,
        reporting: true
      }
    }
  },
  settings: {
    theme: {
      primary: 'blue',
      secondary: 'gray',
      accent: 'indigo'
    },
    branding: {},
    compliance: {
      dataRetention: 365,
      auditTrail: true,
      gdprCompliant: true
    },
    payment: {
      providers: ['stripe', 'paypal'],
      currencies: ['USD', 'EUR', 'GBP'],
      cryptoEnabled: false
    }
  }
};