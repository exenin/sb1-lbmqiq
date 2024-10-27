import React from 'react';
import { MessageSquare, Users, Building2, User } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { messagingService } from '../../api/services';

interface MessageDropdownProps {
  onSelect: (type: string, conversationId: string) => void;
}

export default function MessageDropdown({ onSelect }: MessageDropdownProps) {
  const { data: conversations } = useApi(messagingService.getRecentConversations);

  const getIcon = (type: string) => {
    switch (type) {
      case 'internal': return Users;
      case 'partner': return Building2;
      case 'customer': return User;
      default: return MessageSquare;
    }
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border py-2">
      {conversations?.map((convo) => {
        const Icon = getIcon(convo.type);
        
        return (
          <button
            key={convo.id}
            onClick={() => onSelect(convo.type, convo.id)}
            className="w-full px-4 py-3 hover:bg-gray-50 flex items-center space-x-3"
          >
            <div className="relative">
              <Icon className="h-10 w-10 text-gray-400 p-2 bg-gray-100 rounded-full" />
              {convo.unread > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {convo.unread}
                </span>
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">{convo.name}</p>
              <p className="text-sm text-gray-500 truncate">{convo.lastMessage}</p>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(convo.lastActivity).toLocaleTimeString()}
            </span>
          </button>
        );
      })}
    </div>
  );
}