import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Minimize2, Maximize2, Pin, PinOff } from 'lucide-react';
import InnovationChat from './InnovationChat';
import InnovationTools from './InnovationTools';
import BusinessCanvas from './BusinessCanvas';
import ProjectPlanner from './ProjectPlanner';
import { useAI } from '../../hooks/useAI';

type TabType = 'chat' | 'tools' | 'canvas' | 'planner';

export default function BusinessInnovationAssistant() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0 });

  useEffect(() => {
    const savedState = localStorage.getItem('innovationAssistant');
    if (savedState) {
      const { isOpen: savedIsOpen, position: savedPosition, isPinned: savedIsPinned } = JSON.parse(savedState);
      setIsOpen(savedIsOpen);
      setPosition(savedPosition);
      setIsPinned(savedIsPinned);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('innovationAssistant', JSON.stringify({
      isOpen,
      position,
      isPinned
    }));
  }, [isOpen, position, isPinned]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isPinned && e.target === e.currentTarget) {
      dragRef.current = {
        isDragging: true,
        startX: e.clientX - position.x,
        startY: e.clientY - position.y
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragRef.current.isDragging) {
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - 400, e.clientX - dragRef.current.startX)),
          y: Math.max(0, Math.min(window.innerHeight - 600, e.clientY - dragRef.current.startY))
        });
      }
    };

    const handleMouseUp = () => {
      dragRef.current.isDragging = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'chat', label: 'Chat' },
    { id: 'tools', label: 'Tools' },
    { id: 'canvas', label: 'Canvas' },
    { id: 'planner', label: 'Planner' }
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Bot className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`
        fixed bg-white rounded-lg shadow-xl transition-all duration-200 ease-in-out
        ${isMinimized ? 'h-12' : 'h-[600px]'} w-[400px]
      `}
      style={{ 
        right: position.x,
        bottom: position.y,
        zIndex: 1000 
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-3 border-b bg-gray-50 rounded-t-lg cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium">Innovation Assistant</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsPinned(!isPinned)}
            className="p-1 hover:bg-gray-100 rounded"
            title={isPinned ? 'Unpin' : 'Pin'}
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
            title={isMinimized ? 'Maximize' : 'Minimize'}
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
            title="Close"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="h-[calc(100%-48px)] flex flex-col">
          {/* Navigation */}
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 py-2 text-sm font-medium
                  ${activeTab === tab.id 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'chat' && <InnovationChat />}
            {activeTab === 'tools' && <InnovationTools />}
            {activeTab === 'canvas' && <BusinessCanvas />}
            {activeTab === 'planner' && <ProjectPlanner />}
          </div>
        </div>
      )}
    </div>
  );
}