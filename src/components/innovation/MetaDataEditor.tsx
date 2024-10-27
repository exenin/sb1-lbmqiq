import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { MetaData } from './types';

interface MetaDataEditorProps {
  metadata: MetaData;
  onUpdate: (metadata: MetaData) => void;
  onClose: () => void;
}

export default function MetaDataEditor({
  metadata,
  onUpdate,
  onClose
}: MetaDataEditorProps) {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const addMetaData = () => {
    if (!newKey.trim()) return;
    onUpdate({
      ...metadata,
      [newKey]: newValue
    });
    setNewKey('');
    setNewValue('');
  };

  const removeMetaData = (key: string) => {
    const { [key]: _, ...rest } = metadata;
    onUpdate(rest);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Metadata</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Key"
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Value"
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addMetaData}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-2">
          {Object.entries(metadata).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
              <div>
                <span className="font-medium">{key}:</span> {value}
              </div>
              <button
                onClick={() => removeMetaData(key)}
                className="text-red-500 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}