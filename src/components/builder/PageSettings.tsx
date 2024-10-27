import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ContentPage } from '../../types/models';

interface PageSettingsProps {
  page: ContentPage;
  onClose: () => void;
  onUpdate: (updates: Partial<ContentPage>) => void;
}

export default function PageSettings({ page, onClose, onUpdate }: PageSettingsProps) {
  const [settings, setSettings] = useState(page.settings);
  const [visibility, setVisibility] = useState(page.visibility);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      settings,
      visibility
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">Page Settings</h2>
            <button onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Visibility
              </label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as ContentPage['visibility'])}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="members">Members Only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Custom CSS
              </label>
              <textarea
                value={settings.customCss || ''}
                onChange={(e) => setSettings({ ...settings, customCss: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Custom JavaScript
              </label>
              <textarea
                value={settings.customJs || ''}
                onChange={(e) => setSettings({ ...settings, customJs: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}