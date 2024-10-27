import React from 'react';
import { Check } from 'lucide-react';

interface ColorPickerProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onChange: (type: string, color: string) => void;
}

const presetColors = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#6366F1', // Indigo
  '#EC4899', // Pink
  '#F59E0B', // Yellow
  '#6B7280', // Gray
];

export default function ColorPicker({ colors, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-6">
      {Object.entries(colors).map(([type, value]) => (
        <div key={type}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {type.charAt(0).toUpperCase() + type.slice(1)} Color
          </label>
          
          <div className="flex items-center mb-2">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(type, e.target.value)}
              className="w-8 h-8 rounded overflow-hidden"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(type, e.target.value)}
              className="ml-2 px-2 py-1 border rounded text-sm w-24"
            />
          </div>

          <div className="grid grid-cols-6 gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => onChange(type, color)}
                className="w-8 h-8 rounded-full relative"
                style={{ backgroundColor: color }}
              >
                {color === value && (
                  <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}