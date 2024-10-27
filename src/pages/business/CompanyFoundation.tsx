import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Building2, FileText, Shield, Briefcase, Users } from 'lucide-react';
import VisionMissionBuilder from '../../components/business/VisionMissionBuilder';
import BusinessStructureWizard from '../../components/business/BusinessStructureWizard';
import ComplianceChecker from '../../components/business/ComplianceChecker';
import BankingSetup from '../../components/business/BankingSetup';
import CultureFramework from '../../components/business/CultureFramework';

const subNavItems = [
  { path: '', label: 'Vision & Mission', icon: Building2 },
  { path: 'structure', label: 'Business Structure', icon: FileText },
  { path: 'compliance', label: 'Compliance', icon: Shield },
  { path: 'banking', label: 'Banking Setup', icon: Briefcase },
  { path: 'culture', label: 'Culture', icon: Users },
];

export default function CompanyFoundation() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Company Foundation</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Build the core foundation of your business
            </p>
          </div>
        </div>

        <nav className="flex space-x-4 mt-4">
          {subNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<VisionMissionBuilder />} />
        <Route path="structure" element={<BusinessStructureWizard />} />
        <Route path="compliance" element={<ComplianceChecker />} />
        <Route path="banking" element={<BankingSetup />} />
        <Route path="culture" element={<CultureFramework />} />
      </Routes>
    </div>
  );
}