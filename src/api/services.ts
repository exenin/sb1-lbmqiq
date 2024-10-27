import { Contact, Company, Deal, Opportunity, Campaign, EmailTemplate, Domain, DomainVerification } from '../types/models';

// Generic API response wrapper
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// CRM Services
export const crmService = {
  getContacts: async (): Promise<ApiResponse<Contact[]>> => {
    await delay(500);
    return { data: [], status: 'success' };
  },

  getContact: async (id: number): Promise<ApiResponse<Contact | null>> => {
    await delay(300);
    return { data: null, status: 'success' };
  },

  getCompanies: async (): Promise<ApiResponse<Company[]>> => {
    await delay(500);
    return { data: [], status: 'success' };
  },

  getDeals: async (): Promise<ApiResponse<Deal[]>> => {
    await delay(500);
    return { data: [], status: 'success' };
  },

  createDeal: async (deal: Omit<Deal, 'id'>): Promise<ApiResponse<Deal>> => {
    await delay(500);
    const newDeal = { ...deal, id: Date.now() };
    return { data: newDeal, status: 'success' };
  }
};

// Sales Services
export const salesService = {
  getOpportunities: async (): Promise<ApiResponse<Opportunity[]>> => {
    await delay(500);
    return { data: [], status: 'success' };
  },

  getOpportunity: async (id: number): Promise<ApiResponse<Opportunity | null>> => {
    await delay(300);
    return { data: null, status: 'success' };
  },

  getPipeline: async () => {
    await delay(500);
    return {
      data: {
        stages: [
          { name: 'discovery', deals: 5, value: 250000 },
          { name: 'qualification', deals: 3, value: 150000 },
          { name: 'proposal', deals: 2, value: 100000 },
          { name: 'negotiation', deals: 1, value: 50000 }
        ]
      },
      status: 'success'
    };
  }
};

// Marketing Services
export const marketingService = {
  getCampaigns: async (): Promise<ApiResponse<Campaign[]>> => {
    await delay(500);
    return { data: [], status: 'success' };
  },

  getCampaign: async (id: number): Promise<ApiResponse<Campaign | null>> => {
    await delay(300);
    return { data: null, status: 'success' };
  }
};

// Messaging Services
export const messagingService = {
  getMessages: async (type: string, conversationId?: string) => {
    await delay(500);
    return {
      data: [
        {
          id: '1',
          content: 'Hello there!',
          sender: 'other',
          timestamp: new Date().toISOString()
        }
      ],
      status: 'success'
    };
  },

  sendMessage: async (type: string, conversationId: string | undefined, content: string) => {
    await delay(300);
    return {
      data: {
        id: Date.now().toString(),
        content,
        sender: 'me',
        timestamp: new Date().toISOString()
      },
      status: 'success'
    };
  },

  getRecentConversations: async () => {
    await delay(500);
    return {
      data: [
        {
          id: '1',
          type: 'internal',
          name: 'Marketing Team',
          lastMessage: 'When is the next meeting?',
          lastActivity: new Date().toISOString(),
          unread: 2
        }
      ],
      status: 'success'
    };
  }
};

// Domain Services
export const domainService = {
  getDomains: async (): Promise<ApiResponse<Domain[]>> => {
    await delay(500);
    return {
      data: [],
      status: 'success'
    };
  },

  addDomain: async (domain: string): Promise<ApiResponse<Domain>> => {
    await delay(1000);
    const newDomain: Domain = {
      id: Date.now(),
      name: domain,
      status: 'pending',
      verificationStatus: 'pending',
      dnsRecords: [
        {
          type: 'A',
          host: '@',
          value: '76.76.21.21',
          status: 'pending'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sslStatus: 'pending',
      customEmailEnabled: false
    };
    return { data: newDomain, status: 'success' };
  },

  verifyDomain: async (id: number): Promise<ApiResponse<DomainVerification>> => {
    await delay(2000);
    return {
      data: {
        success: true,
        records: [
          { type: 'A', status: 'verified' }
        ]
      },
      status: 'success'
    };
  }
};

// Email Services
export const emailService = {
  saveTemplate: async (content: any): Promise<ApiResponse<EmailTemplate>> => {
    await delay(500);
    return {
      data: {
        id: Date.now(),
        name: 'New Template',
        subject: content.subject || '',
        content: content.blocks || '',
        category: 'marketing',
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      status: 'success'
    };
  }
};