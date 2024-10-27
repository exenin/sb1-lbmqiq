import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Users, Star, Camera, LineChart, Wallet, Shield, Calendar } from 'lucide-react';
import TalentOverview from './TalentOverview';
import PerformersList from './PerformersList';
import StreamsManagement from './StreamsManagement';
import EarningsManagement from './EarningsManagement';
import ComplianceManagement from './ComplianceManagement';

const subNavItems = [
  { path: '', label: 'Overview', icon: LineChart },
  { path: 'performers', label: 'Performers', icon: Star },
  { path: 'streams', label: 'Streams', icon: Camera },
  { path: 'earnings', label: 'Earnings', icon: Wallet },
  { path: 'compliance', label: 'Compliance', icon: Shield },
];

const TalentPage: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Performer Management</h1>
            <p className="text-gray-500 mt-1">Manage your performers, streams, and earnings</p>
          </div>
          <button className="btn-primary">Add Performer</button>
        </div>
        
        <nav className="flex space-x-4 mt-4">
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
      </div>

      <Routes>
        <Route path="/" element={<TalentOverview />} />
        <Route path="performers" element={<PerformersList />} />
        <Route path="streams" element={<StreamsManagement />} />
        <Route path="earnings" element={<EarningsManagement />} />
        <Route path="compliance" element={<ComplianceManagement />} />
      </Routes>
    </div>
  );
};

export default TalentPage;