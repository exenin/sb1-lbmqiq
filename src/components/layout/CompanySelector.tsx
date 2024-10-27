import React, { useState } from 'react';
import { Building2, ChevronDown, Plus } from 'lucide-react';
import SlideOver from './SlideOver';
import CompanyForm from '../company/CompanyForm';

const companies = [
  { id: 1, name: 'Tech Innovators', type: 'Software Development' },
  { id: 2, name: 'Green Energy Co', type: 'Renewable Energy' },
  { id: 3, name: 'Future Finance', type: 'FinTech' },
];

export default function CompanySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNewCompany, setShowNewCompany] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  const handleCreateCompany = async (data: any) => {
    try {
      console.log('Creating company:', data);
      setShowNewCompany(false);
    } catch (error) {
      console.error('Failed to create company:', error);
    }
  };

  return (
    <>
      <div className="relative w-64 flex-shrink-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 w-full px-4 py-2 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Building2 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {selectedCompany.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {selectedCompany.type}
            </p>
          </div>
          <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-2 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => {
                  setSelectedCompany(company);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {company.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {company.type}
                </p>
              </button>
            ))}
            <div className="border-t dark:border-gray-700 mt-2 pt-2">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setShowNewCompany(true);
                }}
                className="w-full px-4 py-2 text-left text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Company
              </button>
            </div>
          </div>
        )}
      </div>

      <SlideOver
        isOpen={showNewCompany}
        onClose={() => setShowNewCompany(false)}
        title="Create New Company"
      >
        <CompanyForm
          onSubmit={handleCreateCompany}
          onCancel={() => setShowNewCompany(false)}
        />
      </SlideOver>
    </>
  );
}