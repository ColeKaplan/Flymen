import React, { useState } from 'react';
import { MessageCircle, Calendar } from 'lucide-react';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  isLeft: boolean;
  avatar: string;
}

interface ConversationThreadProps {
  id: string;
  title: string;
  participants: string[];
  lastActivity: string;
  messageCount: number;
  excerpt: string;
  messages: Message[];
  onClick: () => void;
}

const ConversationThread: React.FC<ConversationThreadProps> = ({
  title,
  participants,
  lastActivity,
  messageCount,
  excerpt,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white/95 rounded border border-gray-300 retro-shadow p-4 mb-4 cursor-pointer hover:bg-gray-50/95 transition-colors"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-pixel font-bold text-lg text-gray-800">
          {title}
        </h3>
        <div className="flex items-center text-xs font-pixel text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          {lastActivity}
        </div>
      </div>
      
      <div className="font-pixel text-sm text-gray-600 mb-2">
        Between {participants.join(' & ')}
      </div>
      
      <div className="text-sm text-gray-700 mb-3 leading-relaxed">
        {excerpt}...
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs font-pixel text-gray-500">
          <MessageCircle className="w-3 h-3 mr-1" />
          {messageCount} letters
        </div>
        <button className="retro-button px-3 py-1 font-pixel text-xs rounded">
          Read Thread →
        </button>
      </div>
    </div>
  );
};

export default ConversationThread;