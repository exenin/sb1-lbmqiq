import { IndustryProfile } from '../../types/industry';

export const financeProfile: IndustryProfile = {
  id: 'finance',
  name: 'Financial Services',
  type: 'finance',
  description: 'Configuration for financial institutions and services',
  features: {
    crm: true,
    sales: true,
    marketing: true,
    talent: true,
    stream: true,
    innovation: true,
    finance: true,
    inventory: false,
    shipping: false,
    compliance: true
  },
  modules: {
    crm: {
      enabled: true,
      config: {
        contactManagement: true,
        dealTracking: true,
        taskManagement: true,
        kycVerification: true,
        wealthManagement: true,
        portfolioTracking: true
      }
    },
    sales: {
      enabled: true,
      config: {
        pipeline: true,
        forecasting: true,
        quotations: true,
        investmentProducts: true,
        riskAssessment: true
      }
    },
    finance: {
      enabled: true,
      config: {
        invoicing: true,
        expenses: true,
        reporting: true,
        trading: true,
        portfolioManagement: true,
        riskAnalysis: true,
        compliance: {
          aml: true,
          kyc: true,
          regulatoryReporting: true
        },
        payments: {
          swift: true,
          sepa: true,
          wireTransfer: true,
          cryptoPayments: true
        }
      }
    },
    compliance: {
      enabled: true,
      config: {
        regulatoryReporting: true,
        auditTrails: true,
        documentManagement: true,
        riskAssessment: true
      }
    }
  },
  settings: {
    theme: {
      primary: 'blue',
      secondary: 'gray',
      accent: 'green'
    },
    branding: {},
    compliance: {
      dataRetention: 730, // 2 years
      auditTrail: true,
      gdprCompliant: true
    },
    payment: {
      providers: [
        'stripe',
        'paypal',
        'wise',
        'plaid',
        'coinbase',
        'circle'
      ],
      currencies: [
        'USD', 'EUR', 'GBP', 'JPY', 'CHF', 
        'BTC', 'ETH', 'USDC', 'USDT'
      ],
      cryptoEnabled: true
    }
  }
};