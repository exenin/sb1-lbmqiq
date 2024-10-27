import React from 'react';
import { formatRelativeTime } from '../../utils/date';
import Card from '../common/Card';
import { Activity } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'Sarah Thompson',
    action: 'Created a new deal',
    target: 'Tech Solutions Inc.',
    time: '2024-03-20T10:30:00Z',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    id: 2,
    user: 'Michael Chen',
    action: 'Updated contact',
    target: 'John Williams',
    time: '2024-03-20T09:45:00Z',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  },
  {
    id: 3,
    user: 'Emily Rodriguez',
    action: 'Closed deal with',
    target: 'Global Systems Ltd',
    time: '2024-03-20T08:15:00Z',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  },
];

const RecentActivity: React.FC = () => {
  return (
    <Card 
      title="Recent Activity" 
      icon={Activity}
      action={{ label: 'View All', onClick: () => {} }}
    >
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <img
              src={activity.avatar}
              alt={activity.user}
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span>
                {' '}
                <span>{activity.action}</span>
                {' '}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-sm text-gray-500">
                {formatRelativeTime(activity.time)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivity;