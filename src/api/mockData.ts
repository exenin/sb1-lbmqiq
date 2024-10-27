// Extending existing mockData.ts with more comprehensive data
import { Contact, Company, Deal, Opportunity, Campaign, EmailTemplate, Domain, User } from '../types/models';

export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    lastActive: '2024-03-20T10:30:00Z'
  },
  {
    id: 2,
    name: 'Sarah Thompson',
    email: 'sarah@example.com',
    role: 'manager',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    lastActive: '2024-03-20T09:45:00Z'
  }
];

export const emailTemplates: EmailTemplate[] = [
  {
    id: 1,
    name: 'Welcome Email',
    subject: 'Welcome to {{company}}!',
    content: {
      blocks: [
        {
          type: 'header',
          data: { text: 'Welcome aboard!', level: 1 }
        },
        {
          type: 'paragraph',
          data: { text: "We're excited to have you join us." }
        }
      ]
    },
    category: 'onboarding',
    lastModified: '2024-03-20T08:00:00Z'
  },
  {
    id: 2,
    name: 'Monthly Newsletter',
    subject: '{{company}} Newsletter - {{month}}',
    content: {
      blocks: [
        {
          type: 'header',
          data: { text: 'Monthly Updates', level: 1 }
        },
        {
          type: 'paragraph',
          data: { text: "Here's what's new this month." }
        }
      ]
    },
    category: 'newsletter',
    lastModified: '2024-03-19T15:30:00Z'
  }
];

export const domains: Domain[] = [
  {
    id: 1,
    domain: 'marketing.example.com',
    status: 'verified',
    type: 'marketing',
    addedDate: '2024-01-15T00:00:00Z',
    dnsRecords: [
      {
        type: 'TXT',
        name: '@',
        value: 'platform-verify=abc123',
        status: 'verified'
      },
      {
        type: 'MX',
        name: '@',
        value: 'mail.example.com',
        status: 'verified'
      }
    ]
  },
  {
    id: 2,
    domain: 'sales.example.com',
    status: 'pending',
    type: 'sales',
    addedDate: '2024-03-20T00:00:00Z',
    dnsRecords: [
      {
        type: 'TXT',
        name: '@',
        value: 'platform-verify=xyz789',
        status: 'pending'
      }
    ]
  }
];

// Extend existing mock data...
export const contacts: Contact[] = [
  // ... existing contacts ...
];

export const companies: Company[] = [
  // ... existing companies ...
];

export const deals: Deal[] = [
  // ... existing deals ...
];

export const opportunities: Opportunity[] = [
  // ... existing opportunities ...
];

export const campaigns: Campaign[] = [
  // ... existing campaigns ...
];