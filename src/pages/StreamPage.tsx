import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Play, Video, LineChart, Settings, Calendar } from 'lucide-react';
import Card from '../components/common/Card';
import VideoConference from '../components/stream/VideoConference';
import OneToOneCall from '../components/stream/OneToOneCall';

const subNavItems = [
  { path: '', label: 'Overview', icon: LineChart },
  { path: 'live', label: 'Live', icon: Play },
  { path: 'recordings', label: 'Recordings', icon: Video },
  { path: 'settings', label: 'Settings', icon: Settings },
];

const StreamPage: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Stream Platform</h1>
          <button className="btn-primary">Go Live</button>
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
        <Route path="/" element={<StreamOverview />} />
        <Route path="live" element={<StreamLive />} />
        <Route path="recordings" element={<StreamRecordings />} />
        <Route path="settings" element={<StreamSettings />} />
      </Routes>
    </div>
  );
};

const StreamOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title="Stream Stats">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Live Viewers</p>
              <p className="text-2xl font-semibold">1,234</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-2xl font-semibold">45.2K</p>
            </div>
          </div>
        </div>
      </Card>
      
      <Card title="Recent Streams">
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-16 h-12 bg-gray-200 rounded"></div>
              <div>
                <p className="font-medium">Stream #{i}</p>
                <p className="text-sm text-gray-500">2.4K views</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <Card title="Upcoming Events">
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Event #{i}</p>
              <p className="text-sm text-gray-500">Tomorrow at 3PM</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const StreamLive: React.FC = () => {
  return (
    <div className="space-y-6">
      <VideoConference />
    </div>
  );
};

const StreamRecordings: React.FC = () => {
  return (
    <Card title="Recordings">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-200"></div>
            <div className="p-4">
              <p className="font-medium">Recording #{i}</p>
              <p className="text-sm text-gray-500">2 hours ago • 1.2K views</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const StreamSettings: React.FC = () => {
  return (
    <Card title="Stream Settings">
      <div className="p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Stream Quality</h3>
          <select className="input-primary">
            <option>1080p</option>
            <option>720p</option>
            <option>480p</option>
          </select>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Privacy</h3>
          <select className="input-primary">
            <option>Public</option>
            <option>Private</option>
            <option>Members Only</option>
          </select>
        </div>
      </div>
    </Card>
  );
};

export default StreamPage;