import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { Campaign, CampaignDraft } from '../types/marketing';

interface MarketingState {
  campaigns: Campaign[];
  addCampaign: (draft: CampaignDraft) => Promise<Campaign>;
  updateCampaign: (id: string, updates: Partial<Campaign>) => Promise<Campaign>;
  deleteCampaign: (id: string) => Promise<void>;
}

export const useMarketingStore = create<MarketingState>()((set, get) => ({
  campaigns: [],

  addCampaign: async (draft: CampaignDraft) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newCampaign: Campaign = {
      ...draft,
      id: nanoid(),
      metrics: {
        reach: 0,
        engagement: 0,
        conversion: 0,
        roi: 0
      }
    };

    set(state => ({
      campaigns: [...state.campaigns, newCampaign]
    }));

    return newCampaign;
  },

  updateCampaign: async (id: string, updates: Partial<Campaign>) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    let updatedCampaign: Campaign | undefined;

    set(state => ({
      campaigns: state.campaigns.map(campaign => {
        if (campaign.id === id) {
          updatedCampaign = { ...campaign, ...updates };
          return updatedCampaign;
        }
        return campaign;
      })
    }));

    if (!updatedCampaign) {
      throw new Error('Campaign not found');
    }

    return updatedCampaign;
  },

  deleteCampaign: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    set(state => ({
      campaigns: state.campaigns.filter(campaign => campaign.id !== id)
    }));
  }
}));