import React from 'react';
import Card from '../../components/common/Card';

const EarningsManagement = () => {
  return (
    <Card title="Earnings Overview">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Earnings</p>
            <p className="text-2xl font-semibold mt-1">$143,234</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Platform Fee</p>
            <p className="text-2xl font-semibold mt-1">$14,323</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Net Payout</p>
            <p className="text-2xl font-semibold mt-1">$128,911</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EarningsManagement;