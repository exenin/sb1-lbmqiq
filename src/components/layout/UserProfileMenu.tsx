import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Settings, 
  CreditCard, 
  Shield, 
  Bell, 
  LogOut,
  ExternalLink
} from 'lucide-react';

const menuItems = [
  { icon: User, label: 'My Profile', path: '/profile' },
  { icon: Settings, label: 'Account Settings', path: '/settings/account' },
  { icon: CreditCard, label: 'Billing', path: '/settings/billing' },
  { icon: Shield, label: 'Security', path: '/settings/security' },
  { icon: Bell, label: 'Notifications', path: '/settings/notifications' }
];

interface UserProfileMenuProps {
  onClose: () => void;
}

export default function UserProfileMenu({ onClose }: UserProfileMenuProps) {
  return (
    <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border py-2">
      <div className="px-4 py-2 border-b">
        <p className="text-sm font-medium">Signed in as</p>
        <p className="text-sm text-gray-500">john@example.com</p>
      </div>

      <div className="py-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            <item.icon className="h-4 w-4 mr-3 text-gray-400" />
            {item.label}
          </Link>
        ))}
      </div>

      <div className="border-t">
        <a
          href="https://docs.example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <ExternalLink className="h-4 w-4 mr-3 text-gray-400" />
          Documentation
        </a>
        <button
          onClick={() => {
            // Handle logout
            onClose();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
}