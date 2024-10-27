import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  Mail,
  Briefcase,
  Play,
  BarChart2
} from 'lucide-react';

const modules = [
  { id: 'crm', icon: Users, label: 'CRM', color: 'blue', path: '/crm' },
  { id: 'sales', icon: Briefcase, label: 'Sales', color: 'green', path: '/sales' },
  { id: 'marketing', icon: Mail, label: 'Marketing', color: 'purple', path: '/marketing' },
  { id: 'talent', icon: Building2, label: 'Talent', color: 'orange', path: '/talent' },
  { id: 'stream', icon: Play, label: 'Stream', color: 'red', path: '/stream' }
];

export default function ModuleNav() {
  const location = useLocation();

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex space-x-1">
          {modules.map((module) => {
            const isActive = location.pathname.startsWith(module.path);
            const Icon = module.icon;
            
            return (
              <Link
                key={module.id}
                to={module.path}
                className={`
                  flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors
                  ${isActive 
                    ? `border-${module.color}-600 text-${module.color}-600` 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                <Icon className={`h-5 w-5 mr-2 ${isActive ? `text-${module.color}-600` : ''}`} />
                {module.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}