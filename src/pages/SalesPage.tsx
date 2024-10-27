import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { DollarSign, LineChart, Target, ShoppingCart } from 'lucide-react';

const subNavItems = [
  { path: '', label: 'Overview', icon: LineChart },
  { path: 'opportunities', label: 'Opportunities', icon: Target },
  { path: 'pipeline', label: 'Pipeline', icon: ShoppingCart },
  { path: 'forecasts', label: 'Forecasts', icon: DollarSign },
];

const SalesPage: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
          <button className="btn-primary">New Opportunity</button>
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
        <Route path="/" element={<SalesOverview />} />
        <Route path="opportunities" element={<SalesOpportunities />} />
        <Route path="pipeline" element={<SalesPipeline />} />
        <Route path="forecasts" element={<SalesForecasts />} />
      </Routes>
    </div>
  );
};

// Placeholder components until they're properly implemented
const SalesOverview: React.FC = () => <div>Overview Content</div>;
const SalesOpportunities: React.FC = () => <div>Opportunities Content</div>;
const SalesPipeline: React.FC = () => <div>Pipeline Content</div>;
const SalesForecasts: React.FC = () => <div>Forecasts Content</div>;

export default SalesPage;