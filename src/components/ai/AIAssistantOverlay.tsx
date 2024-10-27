import React, { useState } from 'react';
import { Bot, X, Minimize2, Maximize2, Pin, PinOff } from 'lucide-react';
import AIChat from './AIChat';

export default function AIAssistantOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });

  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  return (
    <>
      {/* AI Assistant Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {/* AI Assistant Window */}
      {isOpen && (
        <div
          className={`fixed ${isMinimized ? 'h-12' : 'h-[600px]'} w-[400px] bg-white rounded-lg shadow-xl transition-all duration-200 ease-in-out`}
          style={{ 
            right: position.x,
            bottom: position.y,
            zIndex: 1000 
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b bg-gray-50 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={togglePin}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {isPinned ? (
                  <PinOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Pin className="h-4 w-4 text-gray-500" />
                )}
              </button>
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4 text-gray-500" />
                ) : (
                  <Minimize2 className="h-4 w-4 text-gray-500" />
                )}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <div className="h-[calc(100%-48px)]">
              <AIChat />
            </div>
          )}
        </div>
      )}
    </>
  );
}