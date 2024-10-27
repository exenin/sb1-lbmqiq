import React, { useState } from 'react';
import { Grid, Columns, Rows, Plus, Minus } from 'lucide-react';

export default function GridEditor() {
  const [gridSettings, setGridSettings] = useState({
    columns: 12,
    gap: 16,
    responsive: true
  });

  const [breakpoints, setBreakpoints] = useState({
    sm: 2,
    md: 3,
    lg: 4
  });

  const handleGridChange = (key: string, value: number | boolean) => {
    setGridSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleBreakpointChange = (breakpoint: string, value: number) => {
    setBreakpoints(prev => ({
      ...prev,
      [breakpoint]: Math.max(1, Math.min(12, value))
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grid Columns
        </label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleGridChange('columns', Math.max(1, gridSettings.columns - 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            value={gridSettings.columns}
            onChange={(e) => handleGridChange('columns', parseInt(e.target.value))}
            className="w-20 px-2 py-1 border rounded text-center"
          />
          <button
            onClick={() => handleGridChange('columns', Math.min(12, gridSettings.columns + 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grid Gap
        </label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleGridChange('gap', Math.max(0, gridSettings.gap - 4))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            value={gridSettings.gap}
            onChange={(e) => handleGridChange('gap', parseInt(e.target.value))}
            className="w-20 px-2 py-1 border rounded text-center"
          />
          <button
            onClick={() => handleGridChange('gap', gridSettings.gap + 4)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={gridSettings.responsive}
          onChange={(e) => handleGridChange('responsive', e.target.checked)}
          className="rounded border-gray-300"
        />
        <label className="text-sm text-gray-700">
          Responsive Grid
        </label>
      </div>

      {gridSettings.responsive && (
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700">Breakpoint Columns</h4>
          {Object.entries(breakpoints).map(([breakpoint, value]) => (
            <div key={breakpoint} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {breakpoint.toUpperCase()}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBreakpointChange(breakpoint, value - 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleBreakpointChange(breakpoint, parseInt(e.target.value))}
                  className="w-16 px-2 py-1 border rounded text-center"
                />
                <button
                  onClick={() => handleBreakpointChange(breakpoint, value + 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t pt-4">
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Apply Grid
        </button>
      </div>
    </div>
  );
}