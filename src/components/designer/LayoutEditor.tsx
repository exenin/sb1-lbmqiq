import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Plus, Minus } from 'lucide-react';

export default function LayoutEditor() {
  const [spacing, setSpacing] = useState({
    padding: 16,
    margin: 16,
    gap: 16
  });

  const [containerWidth, setContainerWidth] = useState('max-w-7xl');

  const handleSpacingChange = (type: string, value: number) => {
    setSpacing(prev => ({
      ...prev,
      [type]: Math.max(0, Math.min(64, value))
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Container Width
        </label>
        <select
          value={containerWidth}
          onChange={(e) => setContainerWidth(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="max-w-5xl">Small (1024px)</option>
          <option value="max-w-6xl">Medium (1152px)</option>
          <option value="max-w-7xl">Large (1280px)</option>
          <option value="max-w-full">Full Width</option>
        </select>
      </div>

      {Object.entries(spacing).map(([type, value]) => (
        <div key={type}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleSpacingChange(type, value - 4)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              type="number"
              value={value}
              onChange={(e) => handleSpacingChange(type, parseInt(e.target.value))}
              className="w-20 px-2 py-1 border rounded text-center"
            />
            <button
              onClick={() => handleSpacingChange(type, value + 4)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      <div className="border-t pt-4">
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Apply Layout
        </button>
      </div>
    </div>
  );
}