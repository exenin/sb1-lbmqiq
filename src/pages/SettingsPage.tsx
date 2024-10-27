import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Settings, Globe, Lock, Bell, Users } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';
import DomainManager from '../components/settings/DomainManager';
import Card from '../components/common/Card';

const subNavItems = [
  { path: '', label: 'General', icon: Settings },
  { path: 'domains', label: 'Domains', icon: Globe },
  { path: 'security', label: 'Security', icon: Lock },
  { path: 'notifications', label: 'Notifications', icon: Bell },
  { path: 'team', label: 'Team', icon: Users },
];

export default function SettingsPage() {
  usePageTitle('Settings');

  return (
    <div>
      <PageHeader
        title="Settings"
        icon={Settings}
        description="Manage your platform settings and configurations"
      />
      
      <nav className="flex space-x-4 mb-8">
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

      <Routes>
        <Route path="/" element={<GeneralSettings />} />
        <Route path="domains" element={<DomainSettings />} />
        <Route path="security" element={<SecuritySettings />} />
        <Route path="notifications" element={<NotificationSettings />} />
        <Route path="team" element={<TeamSettings />} />
      </Routes>
    </div>
  );
}

function GeneralSettings() {
  return (
    <Card title="General Settings">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              className="mt-1 input-primary"
              defaultValue="Platform Builder"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Zone
            </label>
            <select className="mt-1 input-primary">
              <option>UTC</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
            </select>
          </div>
        </div>
      </div>
    </Card>
  );
}

function DomainSettings() {
  return <DomainManager />;
}

function SecuritySettings() {
  return (
    <Card title="Security Settings">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          <div className="mt-2">
            <button className="btn-primary">Enable 2FA</button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function NotificationSettings() {
  return (
    <Card title="Notification Preferences">
      <div className="space-y-4">
        {['Email', 'Push', 'In-app'].map((type) => (
          <div key={type} className="flex items-center justify-between">
            <span>{type} Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TeamSettings() {
  return (
    <Card title="Team Members">
      <div className="space-y-4">
        {['John Doe', 'Sarah Smith', 'Mike Johnson'].map((name) => (
          <div key={name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-300" />
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-500">Admin</p>
              </div>
            </div>
            <button className="text-sm text-red-600 hover:text-red-700">
              Remove
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}