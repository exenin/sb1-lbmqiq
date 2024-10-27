import React from 'react';
import Card from '../../components/common/Card';

const StreamsManagement = () => {
  return (
    <Card title="Active Streams">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="relative aspect-video bg-gray-200">
              <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                LIVE
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded">
                234 viewers
              </div>
            </div>
            <div className="p-4">
              <p className="font-medium">Stream Title {i}</p>
              <p className="text-sm text-gray-500">Performer {i}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StreamsManagement;