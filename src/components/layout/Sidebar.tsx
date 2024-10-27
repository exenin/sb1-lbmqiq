import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Mail,
  GraduationCap,
  Play,
  Settings,
  Lightbulb
} from 'lucide-react';
import { useIndustryProfile } from '../../hooks/useIndustryProfile';

const getMenuItems = (features: any) => [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/', enabled: true },
  { icon: Users, label: 'CRM', path: '/crm', enabled: features.crm },
  { icon: Briefcase, label: 'Sales', path: '/sales', enabled: features.sales },
  { icon: Mail, label: 'Marketing', path: '/marketing', enabled: features.marketing },
  { icon: GraduationCap, label: 'Talent', path: '/talent', enabled: features.talent },
  { icon: Play, label: 'Stream', path: '/stream', enabled: features.stream },
  { icon: Lightbulb, label: 'Innovation', path: '/innovation', enabled: features.innovation },
  { icon: Settings, label: 'Settings', path: '/settings', enabled: true }
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { currentProfile } = useIndustryProfile();
  const menuItems = getMenuItems(currentProfile?.features || {});

  return (
    <aside className="fixed top-[7.5rem] bottom-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="flex flex-col h-full">
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {menuItems.filter(item => item.enabled).map((item) => {
              const isActive = location.pathname === item.path || 
                             (item.path !== '/' && location.pathname.startsWith(item.path));
              const IconComponent = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium
                    transition-colors duration-150 ease-in-out
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}
                  `}
                >
                  <IconComponent className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-700 dark:text-blue-200' : 'text-gray-400 dark:text-gray-500'}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32"
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;