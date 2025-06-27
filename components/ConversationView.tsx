import React, { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  isLeft: boolean;
  avatar: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface ConversationViewProps {
  title: string;
  participants: string[];
  onBack: () => void;
  onAddComment: (messageId: string, comment: string) => void;
}

const ConversationView: React.FC<ConversationViewProps> = ({
  title,
  participants,
  onBack,
  onAddComment
}) => {
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [newComments, setNewComments] = useState<Record<string, string>>({});

  const toggleComments = (messageId: string) => {
    setExpandedComments(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const handleSubmitComment = (messageId: string, e: React.FormEvent) => {
    e.preventDefault();
    const comment = newComments[messageId];
    if (comment?.trim()) {
      onAddComment(messageId, comment.trim());
      setNewComments(prev => ({ ...prev, [messageId]: '' }));
    }
  };

  return (
    <div className="bg-white/95 rounded border border-gray-300 retro-shadow p-4">
      <div className="mb-4 pb-3 border-b border-gray-200">
        <button 
          onClick={onBack}
          className="flex items-center text-xs font-pixel text-gray-600 hover:text-gray-800 mb-2"
        >
          <ArrowLeft className="w-3 h-3 mr-1" />
          Back to all conversations
        </button>
        <h2 className="font-pixel font-bold text-xl text-gray-800 mb-1">
          {title}
        </h2>
        <div className="font-pixel text-sm text-gray-600">
          A correspondence between {participants.join(' & ')}
        </div>
      </div>

      <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
        {/* TODO: Display the conversations here */}
      </div>
    </div>
  );
};

export default ConversationView;
