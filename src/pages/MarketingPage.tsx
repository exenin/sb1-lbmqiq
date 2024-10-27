import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Mail, Megaphone, LineChart, Zap } from 'lucide-react';
import { useMarketingStore } from '../store/marketingStore';
import type { CampaignDraft } from '../types/marketing';
import PageHeader from '../components/layout/PageHeader';
import CampaignForm from '../components/marketing/CampaignForm';
import SlideOver from '../components/common/SlideOver';
import Card from '../components/common/Card';

const subNavItems = [
  { path: '', label: 'Overview', icon: LineChart },
  { path: 'campaigns', label: 'Campaigns', icon: Megaphone },
  { path: 'automation', label: 'Automation', icon: Zap },
  { path: 'email', label: 'Email', icon: Mail },
];

const MarketingPage: React.FC = () => {
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const { addCampaign, campaigns } = useMarketingStore();
  const navigate = useNavigate();

  const handleCreateCampaign = async (draft: CampaignDraft) => {
    try {
      await addCampaign(draft);
      setShowNewCampaign(false);
      navigate('/marketing/campaigns');
    } catch (error) {
      console.error('Failed to create campaign:', error);
    }
  };

  return (
    <div>
      <PageHeader
        title="Marketing Hub"
        icon={Megaphone}
        action={{
          label: 'Create Campaign',
          onClick: () => setShowNewCampaign(true)
        }}
      />
      
      <nav className="flex space-x-4 mb-8">
        {subNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <item.icon className="h-4 w-4 mr-2" />
            {item.label}
          </Link>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<MarketingOverview campaigns={campaigns} />} />
        <Route path="campaigns/*" element={<MarketingCampaigns campaigns={campaigns} />} />
        <Route path="automation" element={<MarketingAutomation />} />
        <Route path="email/*" element={<MarketingEmail />} />
      </Routes>

      <SlideOver
        isOpen={showNewCampaign}
        onClose={() => setShowNewCampaign(false)}
        title="Create New Campaign"
      >
        <CampaignForm
          onSubmit={handleCreateCampaign}
          onCancel={() => setShowNewCampaign(false)}
        />
      </SlideOver>
    </div>
  );
};

// Placeholder components
const MarketingOverview: React.FC<{ campaigns: Campaign[] }> = () => (
  <div>Marketing Overview</div>
);

const MarketingCampaigns: React.FC<{ campaigns: Campaign[] }> = () => (
  <div>Campaigns List</div>
);

const MarketingAutomation: React.FC = () => (
  <div>Automation Tools</div>
);

const MarketingEmail: React.FC = () => (
  <div>Email Marketing</div>
);

export default MarketingPage;