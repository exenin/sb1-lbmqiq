import React from 'react';
import { Trash2 } from 'lucide-react';

interface EmailBlockProps {
  block: {
    type: string;
    data: any;
  };
  index: number;
  onChange: (index: number, data: any) => void;
  onDelete: (index: number) => void;
}

export default function EmailBlock({ block, index, onChange, onDelete }: EmailBlockProps) {
  const handleChange = (value: string) => {
    onChange(index, { ...block.data, text: value });
  };

  return (
    <div className="group relative">
      <button
        onClick={() => onDelete(index)}
        className="absolute right-0 top-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
      </button>

      {block.type === 'header' && (
        <input
          type="text"
          value={block.data.text}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full text-2xl font-bold border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2"
          placeholder="Enter header text..."
        />
      )}

      {block.type === 'paragraph' && (
        <textarea
          value={block.data.text}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full min-h-[100px] border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2 resize-y"
          placeholder="Enter paragraph text..."
        />
      )}

      {block.type === 'image' && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input
            type="text"
            value={block.data.url || ''}
            onChange={(e) => onChange(index, { ...block.data, url: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Enter image URL..."
          />
          {block.data.url && (
            <img
              src={block.data.url}
              alt="Preview"
              className="mt-2 max-w-full h-auto rounded"
            />
          )}
        </div>
      )}
    </div>
  );
}