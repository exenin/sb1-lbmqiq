import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function Card({ title, children, icon: Icon, action }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {Icon && <Icon className="h-5 w-5 text-gray-500" />}
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          {action && (
            <button
              onClick={action.onClick}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {action.label}
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}