import React from 'react';
import { Star, Camera, Calendar, Users, Shield } from 'lucide-react';
import Card from '../../components/common/Card';

const performerStats = [
  { label: 'Active Performers', value: '234', change: '+12%', color: 'blue' },
  { label: 'Live Now', value: '45', change: '+5%', color: 'green' },
  { label: 'Total Earnings', value: '$143,234', change: '+18%', color: 'purple' },
  { label: 'Avg. Stream Duration', value: '2.4h', change: '+8%', color: 'orange' }
];

const TalentOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performerStats.map((stat) => (
          <Card key={stat.label}>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className={`ml-2 text-sm font-medium text-${stat.color}-600`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Top Performers" icon={Star}>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop`}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Performer {i}</p>
                    <p className="text-sm text-gray-500">2.4k followers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$3,245</p>
                  <p className="text-sm text-green-600">+12%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Live Streams" icon={Camera}>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={`https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=40&h=40&fit=crop`}
                      alt=""
                      className="w-10 h-10 rounded-lg"
                    />
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-medium">Stream Title {i}</p>
                    <p className="text-sm text-gray-500">234 viewers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">1:45:23</p>
                  <p className="text-sm text-gray-500">Duration</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Upcoming Streams" icon={Calendar}>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Special Stream {i}</p>
                    <p className="text-sm text-gray-500">By Performer {i}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    In 2 hours
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Applications" icon={Users}>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop`}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">Applicant {i}</p>
                      <p className="text-sm text-gray-500">Applied 2h ago</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Compliance Status" icon={Shield}>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-green-700">Age Verification</p>
                  <p className="text-sm text-green-600">All performers verified</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-blue-700">Content Guidelines</p>
                  <p className="text-sm text-blue-600">98% compliance rate</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-yellow-700">Documentation</p>
                  <p className="text-sm text-yellow-600">3 pending reviews</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TalentOverview;