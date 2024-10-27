import React from 'react';
import { Bell, ShoppingBag, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { formatRelativeTime } from '../../utils/date';

const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'New Subscriber',
    message: 'Jane Smith just subscribed to your premium content',
    time: '2024-03-20T10:30:00Z',
    read: false
  },
  {
    id: 2,
    type: 'alert',
    title: 'Stream Alert',
    message: 'Your scheduled stream will start in 30 minutes',
    time: '2024-03-20T09:45:00Z',
    read: false
  },
  {
    id: 3,
    type: 'purchase',
    title: 'New Purchase',
    message: 'Someone purchased your exclusive content package',
    time: '2024-03-20T08:15:00Z',
    read: true
  },
  {
    id: 4,
    type: 'system',
    title: 'System Update',
    message: 'Platform maintenance scheduled for tomorrow',
    time: '2024-03-19T23:00:00Z',
    read: true
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return CheckCircle;
    case 'alert':
      return AlertCircle;
    case 'purchase':
      return ShoppingBag;
    case 'system':
      return Bell;
    default:
      return Bell;
  }
};

const getIconColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'text-green-500';
    case 'alert':
      return 'text-yellow-500';
    case 'purchase':
      return 'text-blue-500';
    case 'system':
      return 'text-purple-500';
    default:
      return 'text-gray-500';
  }
};

export default function NotificationDropdown() {
  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg border py-2 z-50">
      <div className="px-4 py-2 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Notifications</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Mark all as read
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type);
          
          return (
            <div
              key={notification.id}
              className={`px-4 py-3 hover:bg-gray-50 ${
                !notification.read ? 'bg-blue-50 hover:bg-blue-100' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full bg-gray-100 ${getIconColor(notification.type)}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatRelativeTime(notification.time)}
                  </p>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-2 border-t">
        <button className="text-sm text-gray-600 hover:text-gray-700 w-full text-center">
          View all notifications
        </button>
      </div>
    </div>
  );
}