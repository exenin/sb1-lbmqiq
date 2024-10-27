import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Domain } from '../../types/models';
import { domainService } from '../../api/services';
import { useApi } from '../../hooks/useApi';
import DomainVerification from './DomainVerification';

export default function DomainManager() {
  const { data: domains, loading, refetch } = useApi(domainService.getDomains);
  const [newDomain, setNewDomain] = useState('');
  const [adding, setAdding] = useState(false);

  const addDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain) return;

    setAdding(true);
    try {
      await domainService.addDomain(newDomain);
      setNewDomain('');
      refetch();
    } catch (error) {
      console.error('Failed to add domain:', error);
    } finally {
      setAdding(false);
    }
  };

  const verifyDomain = async (id: number) => {
    try {
      await domainService.verifyDomain(id);
      refetch();
    } catch (error) {
      console.error('Failed to verify domain:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Custom Domains</h2>
        
        <form onSubmit={addDomain} className="mb-6">
          <div className="flex space-x-3">
            <input
              type="text"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="Enter domain (e.g., marketing.example.com)"
              className="flex-1 input-primary"
            />
            <button 
              type="submit" 
              disabled={adding}
              className="btn-primary flex items-center"
            >
              {adding ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Add Domain
            </button>
          </div>
        </form>

        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="space-y-4">
            {domains?.map((domain: Domain) => (
              <DomainVerification
                key={domain.id}
                domain={domain}
                onVerify={verifyDomain}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}