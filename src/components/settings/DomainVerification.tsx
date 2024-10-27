import React from 'react';
import { CheckCircle, XCircle, Loader2, Copy } from 'lucide-react';
import { Domain } from '../../types/models';

interface DomainVerificationProps {
  domain: Domain;
  onVerify: (id: number) => Promise<void>;
}

export default function DomainVerification({ domain, onVerify }: DomainVerificationProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{domain.domain}</span>
          {domain.status === 'verified' ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : domain.status === 'failed' ? (
            <XCircle className="h-5 w-5 text-red-500" />
          ) : (
            <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />
          )}
        </div>
        <span className="text-sm text-gray-500">
          Added {new Date(domain.addedDate).toLocaleDateString()}
        </span>
      </div>

      <div className="space-y-2">
        {domain.dnsRecords.map((record, index) => (
          <div 
            key={index}
            className="bg-gray-50 p-3 rounded text-sm font-mono"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-600">{record.type}</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-800">{record.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <code className="bg-gray-100 px-2 py-1 rounded">
                  {record.value}
                </code>
                <button
                  onClick={() => copyToClipboard(record.value)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Copy className="h-4 w-4 text-gray-500" />
                </button>
                {record.status === 'verified' ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {domain.status !== 'verified' && (
        <button
          onClick={() => onVerify(domain.id)}
          className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Verify Domain
        </button>
      )}
    </div>
  );
}