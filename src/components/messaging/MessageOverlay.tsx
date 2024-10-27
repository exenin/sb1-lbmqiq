import React, { useState } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import ChatWindow from './ChatWindow';

interface MessageOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'ai' | 'internal' | 'partner' | 'customer';
  conversationId?: string;
}

export default function MessageOverlay({ 
  isOpen, 
  onClose, 
  type,
  conversationId 
}: MessageOverlayProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  return (
    <div 
      className={`
        fixed bottom-0 right-4 w-96 bg-white rounded-t-lg shadow-xl 
        transition-all duration-200 ease-in-out
        ${isMinimized ? 'h-12' : 'h-[500px]'}
      `}
    >
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="font-medium">
          {type === 'ai' ? 'AI Assistant' :
           type === 'internal' ? 'Team Chat' :
           type === 'partner' ? 'Partner Communication' :
           'Customer Chat'}
        </h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isMinimized ? 
              <Maximize2 className="h-4 w-4" /> : 
              <Minimize2 className="h-4 w-4" />
            }
          </button>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <ChatWindow type={type} conversationId={conversationId} />
      )}
    </div>
  );
}