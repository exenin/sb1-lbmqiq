import React from 'react';
import { ChartBar } from 'lucide-react';
import Card from '../../components/common/Card';

const PerformersList = () => {
  return (
    <Card title="Active Performers">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop`}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">Performer {i}</p>
                <p className="text-sm text-gray-500">2.4k followers • 120 streams</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">$3,245</p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <ChartBar className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PerformersList;