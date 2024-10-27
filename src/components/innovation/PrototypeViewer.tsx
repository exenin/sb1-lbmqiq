import React, { useState } from 'react';
import { Eye, Code, Layout, Smartphone, Monitor } from 'lucide-react';
import Card from '../common/Card';

interface ViewMode {
  id: string;
  icon: typeof Eye;
  label: string;
}

const viewModes: ViewMode[] = [
  { id: 'desktop', icon: Monitor, label: 'Desktop' },
  { id: 'mobile', icon: Smartphone, label: 'Mobile' },
  { id: 'code', icon: Code, label: 'Code' }
];

export default function PrototypeViewer() {
  const [activeMode, setActiveMode] = useState('desktop');

  return (
    <Card 
      title="Prototype Preview" 
      icon={Layout}
      action={{ label: 'Share', onClick: () => {} }}
    >
      <div className="space-y-4">
        <div className="flex space-x-2 mb-4">
          {viewModes.map(mode => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`
                flex items-center px-3 py-2 rounded-lg text-sm font-medium
                ${activeMode === mode.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              `}
            >
              <mode.icon className="h-4 w-4 mr-2" />
              {mode.label}
            </button>
          ))}
        </div>

        <div className={`
          aspect-[16/9] bg-white rounded-lg border-2 border-gray-200
          ${activeMode === 'mobile' ? 'max-w-[375px] mx-auto' : 'w-full'}
        `}>
          <div className="h-full flex items-center justify-center text-gray-400">
            Prototype Content
          </div>
        </div>
      </div>
    </Card>
  );
}