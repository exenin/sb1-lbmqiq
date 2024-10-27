import React from 'react';
import { LayoutGrid, Image, Type, ShoppingBag, Video, Users, Calendar } from 'lucide-react';

const components = [
  { type: 'grid', icon: LayoutGrid, label: 'Grid Layout' },
  { type: 'image', icon: Image, label: 'Image Gallery' },
  { type: 'text', icon: Type, label: 'Rich Text' },
  { type: 'shop', icon: ShoppingBag, label: 'Shop Items' },
  { type: 'video', icon: Video, label: 'Video Player' },
  { type: 'profile', icon: Users, label: 'Profile Card' },
  { type: 'schedule', icon: Calendar, label: 'Schedule' }
];

interface ComponentPaletteProps {
  onAdd: (type: string) => void;
}

export default function ComponentPalette({ onAdd }: ComponentPaletteProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">Components</h3>
      <div className="grid grid-cols-2 gap-2">
        {components.map((component) => (
          <button
            key={component.type}
            onClick={() => onAdd(component.type)}
            className="p-3 border rounded-lg hover:bg-gray-50 text-center"
          >
            <component.icon className="h-5 w-5 mx-auto mb-1" />
            <span className="text-sm">{component.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}