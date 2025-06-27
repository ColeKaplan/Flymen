import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Heart, MessageCircle } from 'lucide-react';

interface Comment {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface ChatMessageProps {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  isLeft: boolean;
  mood?: string;
  listeningTo?: string;
  avatar: string;
  comments: Comment[];
  onAddComment: (messageId: string, comment: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  id,
  user,
  content,
  timestamp,
  isLeft,
  mood,
  listeningTo,
  avatar,
  comments,
  onAddComment
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(Math.floor(Math.random() * 15) + 1);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(id, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className={`flex flex-col mb-6 ${isLeft ? 'items-start' : 'items-end'}`}>
      {/* User info bar */}
      <div className={`flex items-center mb-2 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        <img 
          src={avatar} 
          alt={user}
          className="w-7 h-7 rounded border border-gray-400"
        />
        <div className={`mx-2 ${isLeft ? 'text-left' : 'text-right'}`}>
          <div className="font-pixel text-xs font-bold text-gray-800">
            {user}
          </div>
          <div className="font-pixel text-xs text-gray-500">
            {timestamp}
          </div>
        </div>
      </div>

      {/* Chat bubble */}
      <div className={`max-w-md p-3 retro-shadow ${isLeft ? 'chat-bubble-left ml-2' : 'chat-bubble-right mr-2'}`}>
        <div className="text-sm leading-relaxed text-gray-800">
          {content}
        </div>
      </div>

      {/* Status info */}
      {(mood || listeningTo) && (
        <div className={`mt-2 p-2 bg-gray-50 rounded border border-gray-200 ${isLeft ? 'ml-4' : 'mr-4'}`}>
          {mood && (
            <div className="font-pixel text-xs text-gray-600">
              <span className="font-bold">Mood:</span> {mood}
            </div>
          )}
          {listeningTo && (
            <div className="font-pixel text-xs text-gray-600">
              <span className="font-bold">♪ Listening to:</span> {listeningTo}
            </div>
          )}
        </div>
      )}

      {/* Interaction bar */}
      <div className={`flex items-center mt-2 space-x-3 ${isLeft ? 'ml-4' : 'mr-4'}`}>
        <button 
          onClick={() => setLikes(likes + 1)}
          className="flex items-center space-x-1 text-xs font-pixel text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Heart className="w-3 h-3" />
          <span>{likes}</span>
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 text-xs font-pixel text-gray-500 hover:text-gray-700 transition-colors"
        >
          <MessageCircle className="w-3 h-3" />
          <span>{comments.length}</span>
          {showComments ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className={`mt-3 w-full max-w-lg ${isLeft ? 'ml-8' : 'mr-8'}`}>
          <div className="bg-white/95 rounded border border-gray-200 p-3">
            {/* Existing comments */}
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2 mb-3 last:mb-0">
                <img 
                  src={comment.avatar} 
                  alt={comment.user}
                  className="w-5 h-5 rounded border border-gray-300"
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
            <form onSubmit={handleSubmitComment} className="mt-3 border-t border-gray-100 pt-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded bg-white"
                />
                <button
                  type="submit"
                  className="px-3 py-1 text-xs font-pixel retro-button rounded"
                  disabled={!newComment.trim()}
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;