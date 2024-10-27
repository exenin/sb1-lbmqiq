import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Users, Building2, Phone, FileText, BarChart2 } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { crmService } from '../api/services';
import DealList from '../components/crm/DealList';
import DealForm from '../components/crm/DealForm';
import SlideOver from '../components/common/SlideOver';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import Card from '../components/common/Card';

const subNavItems = [
  { path: '', label: 'Overview', icon: BarChart2 },
  { path: 'contacts', label: 'Contacts', icon: Phone },
  { path: 'companies', label: 'Companies', icon: Building2 },
  { path: 'deals', label: 'Deals', icon: FileText },
];

const CRMPage: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Customer Relationship Management</h1>
          <button className="btn-primary">Add Contact</button>
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
        <Route path="/" element={<CRMOverview />} />
        <Route path="contacts" element={<CRMContacts />} />
        <Route path="companies" element={<CRMCompanies />} />
        <Route path="deals" element={<CRMDeals />} />
      </Routes>
    </div>
  );
};

const CRMOverview: React.FC = () => {
  const { data: deals, loading: dealsLoading } = useApi(crmService.getDeals);
  const { data: contacts, loading: contactsLoading } = useApi(crmService.getContacts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title="Recent Contacts">
        {contactsLoading ? (
          <LoadingState message="Loading contacts..." />
        ) : (
          <div className="space-y-4">
            {contacts?.slice(0, 5).map((contact) => (
              <div key={contact.id} className="flex items-center space-x-3">
                <img src={contact.avatar} alt="" className="h-10 w-10 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.company}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card title="Active Deals">
        {dealsLoading ? (
          <LoadingState message="Loading deals..." />
        ) : (
          <div className="space-y-4">
            {deals?.slice(0, 5).map((deal) => (
              <div key={deal.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{deal.title}</p>
                  <p className="text-sm text-gray-500">{deal.company}</p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ${deal.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card title="Tasks">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Follow up with client</p>
              <p className="text-sm text-gray-500">Due today</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
              Pending
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Send proposal</p>
              <p className="text-sm text-gray-500">Due tomorrow</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              In Progress
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

const CRMContacts: React.FC = () => {
  const { data: contacts, loading, error } = useApi(crmService.getContacts);

  if (loading) return <LoadingState message="Loading contacts..." />;
  if (error) return <ErrorState message="Failed to load contacts" />;

  return (
    <Card title="Contacts" action={{ label: 'Add Contact', onClick: () => {} }}>
      <div className="space-y-4">
        {contacts?.map((contact) => (
          <div key={contact.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <img src={contact.avatar} alt="" className="h-12 w-12 rounded-full" />
              <div>
                <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.email}</p>
                <p className="text-sm text-gray-500">{contact.company}</p>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              contact.status === 'active' ? 'bg-green-100 text-green-800' :
              contact.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

const CRMCompanies: React.FC = () => {
  const { data: companies, loading, error } = useApi(crmService.getCompanies);

  if (loading) return <LoadingState message="Loading companies..." />;
  if (error) return <ErrorState message="Failed to load companies" />;

  return (
    <Card title="Companies" action={{ label: 'Add Company', onClick: () => {} }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies?.map((company) => (
          <div key={company.id} className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <img src={company.logo} alt="" className="h-12 w-12 rounded-lg" />
              <div>
                <p className="text-sm font-medium text-gray-900">{company.name}</p>
                <p className="text-sm text-gray-500">{company.industry}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">Size: {company.size}</p>
              <p className="text-sm text-gray-600">Revenue: {company.revenue}</p>
              <a href={company.website} className="text-sm text-blue-600 hover:text-blue-800">
                Visit website
              </a>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const CRMDeals: React.FC = () => {
  const [showNewDeal, setShowNewDeal] = useState(false);
  const [sortColumn, setSortColumn] = useState('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { data: deals, loading, error, refetch } = useApi(crmService.getDeals);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleCreateDeal = async (data: any) => {
    try {
      await crmService.createDeal(data);
      setShowNewDeal(false);
      refetch();
    } catch (error) {
      console.error('Failed to create deal:', error);
    }
  };

  if (loading) return <LoadingState message="Loading deals..." />;
  if (error) return <ErrorState message="Failed to load deals" />;

  return (
    <>
      <Card 
        title="Deals"
        action={{
          label: 'New Deal',
          onClick: () => setShowNewDeal(true)
        }}
      >
        <DealList
          deals={deals || []}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </Card>

      <SlideOver
        isOpen={showNewDeal}
        onClose={() => setShowNewDeal(false)}
        title="Create New Deal"
      >
        <DealForm
          onSubmit={handleCreateDeal}
          onCancel={() => setShowNewDeal(false)}
        />
      </SlideOver>
    </>
  );
};

export default CRMPage;