import React from 'react';
import Card from '../../components/common/Card';

const ComplianceManagement = () => {
  return (
    <Card title="Compliance Overview">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-4">Verification Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Age Verification</span>
                <span className="text-green-600">100%</span>
              </div>
              <div className="flex justify-between">
                <span>Identity Verification</span>
                <span className="text-green-600">98%</span>
              </div>
              <div className="flex justify-between">
                <span>Document Verification</span>
                <span className="text-yellow-600">95%</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-4">Content Guidelines</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Stream Content</span>
                <span className="text-green-600">99%</span>
              </div>
              <div className="flex justify-between">
                <span>Chat Moderation</span>
                <span className="text-green-600">97%</span>
              </div>
              <div className="flex justify-between">
                <span>Profile Content</span>
                <span className="text-green-600">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ComplianceManagement;