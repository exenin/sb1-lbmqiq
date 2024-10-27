import React, { useState } from 'react';
import { Bell, Search, MessageSquare, Menu } from 'lucide-react';
import CompanySelector from './CompanySelector';
import DarkModeToggle from './DarkModeToggle';
import NotificationDropdown from '../notifications/NotificationDropdown';
import MessageDropdown from '../messaging/MessageDropdown';

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  return (
    <header className="fixed top-[3.75rem] left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30">
      <div className="h-full mx-auto">
        <div className="h-full flex items-center justify-between px-4 lg:px-6">
          {/* Left Section */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Center Section */}
          <div className="hidden lg:flex flex-1 items-center space-x-4 max-w-5xl">
            <CompanySelector />
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <DarkModeToggle />

            <div className="relative">
              <button 
                onClick={() => {
                  setShowMessages(!showMessages);
                  setShowNotifications(false);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              {showMessages && <MessageDropdown onSelect={() => setShowMessages(false)} />}
            </div>

            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowMessages(false);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && <NotificationDropdown />}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden px-4 pb-3 space-y-3">
            <CompanySelector />
            <div className="relative">
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}