import React from 'react';
import { Move, Copy, Trash2, Link as LinkIcon, Tag, MoreVertical } from 'lucide-react';
import { IdeaNodeType } from './types';

interface IdeaNodeProps {
  node: IdeaNodeType;
  isSelected: boolean;
  isLinking: boolean;
  onUpdate: (updates: Partial<IdeaNodeType>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onStartLinking: () => void;
  onSelect: () => void;
  onMetaDataClick: () => void;
}

export default function IdeaNode({
  node,
  isSelected,
  isLinking,
  onUpdate,
  onDelete,
  onDuplicate,
  onStartLinking,
  onSelect,
  onMetaDataClick
}: IdeaNodeProps) {
  return (
    <div
      className={`
        idea-node relative p-4 bg-white rounded-lg shadow-lg
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${isLinking ? 'cursor-pointer' : ''}
        transition-shadow hover:shadow-xl
      `}
      style={{
        width: node.size.width,
        height: node.size.height
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <div className="drag-handle absolute top-2 left-2 cursor-move p-1 hover:bg-gray-100 rounded">
        <Move className="h-4 w-4 text-gray-400" />
      </div>

      <div className="absolute top-2 right-2 flex space-x-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStartLinking();
          }}
          className="p-1 hover:bg-gray-100 rounded"
          title="Link to another idea"
        >
          <LinkIcon className="h-4 w-4 text-gray-500" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMetaDataClick();
          }}
          className="p-1 hover:bg-gray-100 rounded"
          title="Add metadata"
        >
          <Tag className="h-4 w-4 text-gray-500" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
          className="p-1 hover:bg-gray-100 rounded"
          title="Duplicate"
        >
          <Copy className="h-4 w-4 text-gray-500" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 hover:bg-gray-100 rounded"
          title="Delete"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>
      </div>

      <div className="mt-8">
        <input
          type="text"
          value={node.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="w-full mb-2 font-medium border-none focus:ring-0 bg-transparent"
          placeholder="Idea title..."
          onClick={(e) => e.stopPropagation()}
        />
        <textarea
          value={node.content}
          onChange={(e) => onUpdate({ content: e.target.value })}
          className="w-full h-[calc(100%-6rem)] resize-none border-none focus:ring-0 bg-transparent"
          placeholder="Describe your idea..."
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {node.metadata && Object.keys(node.metadata).length > 0 && (
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {Object.entries(node.metadata).map(([key, value]) => (
            <span
              key={key}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100"
            >
              {key}: {value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}