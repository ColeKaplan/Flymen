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
  messages: Message[];
  onBack: () => void;
  onAddComment: (messageId: string, comment: string) => void;
}

const ConversationView: React.FC<ConversationViewProps> = ({
  title,
  participants,
  messages,
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
        {messages.map((message) => (
          <div key={message.id} className={`flex flex-col ${message.isLeft ? 'items-start' : 'items-end'}`}>
            {/* Letter header */}
            <div className={`flex items-center mb-2 ${message.isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
              <img 
                src={message.avatar} 
                alt={message.user}
                className="w-6 h-6 rounded border border-gray-400"
              />
              <div className={`mx-2 ${message.isLeft ? 'text-left' : 'text-right'}`}>
                <div className="font-pixel text-xs font-bold text-gray-800">
                  {message.user}
                </div>
                <div className="font-pixel text-xs text-gray-500">
                  {message.timestamp}
                </div>
              </div>
            </div>

            {/* Letter content */}
            <div className={`max-w-lg p-4 retro-shadow border border-gray-300 bg-white ${message.isLeft ? 'ml-2' : 'mr-2'}`}>
              <div className="text-sm leading-relaxed text-gray-800 whitespace-pre-line">
                {message.content}
              </div>
            </div>

            {/* Interaction bar */}
            <div className={`flex items-center mt-2 space-x-3 ${message.isLeft ? 'ml-4' : 'mr-4'}`}>
              <button className="flex items-center space-x-1 text-xs font-pixel text-gray-500 hover:text-gray-700">
                <Heart className="w-3 h-3" />
                <span>{Math.floor(Math.random() * 15) + 1}</span>
              </button>
              
              <button 
                onClick={() => toggleComments(message.id)}
                className="flex items-center space-x-1 text-xs font-pixel text-gray-500 hover:text-gray-700"
              >
                <MessageCircle className="w-3 h-3" />
                <span>{message.comments.length} responses</span>
              </button>
            </div>

            {/* Comments section */}
            {expandedComments.includes(message.id) && (
              <div className={`mt-3 w-full max-w-md ${message.isLeft ? 'ml-8' : 'mr-8'}`}>
                <div className="bg-gray-50/95 rounded border border-gray-200 p-3">
                  {/* Existing comments */}
                  {message.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-2 mb-3 last:mb-0">
                      <img 
                        src={comment.avatar} 
                        alt={comment.user}
                        className="w-4 h-4 rounded border border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="font-pixel text-xs font-bold text-gray-700">
                          {comment.user}
                        </div>
                        <div className="text-xs text-gray-600 leading-relaxed">
                          {comment.content}
                        </div>
                        <div className="font-pixel text-xs text-gray-400 mt-1">
                          {comment.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add comment form */}
                  <form onSubmit={(e) => handleSubmitComment(message.id, e)} className="mt-3 border-t border-gray-100 pt-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newComments[message.id] || ''}
                        onChange={(e) => setNewComments(prev => ({ ...prev, [message.id]: e.target.value }))}
                        placeholder="Add a response..."
                        className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded bg-white"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1 text-xs font-pixel retro-button rounded"
                        disabled={!newComments[message.id]?.trim()}
                      >
                        Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationView;
