import React, { useEffect, useState } from 'react';
import { MessageCircle, Calendar } from 'lucide-react';
import { IThread } from '@/types/thread';

interface ThreadListProps {
  threadData: IThread
  onClick: () => void;
}

const ThreadList: React.FC<ThreadListProps> = ({
  threadData,
  onClick
}) => {

  const [timeElapsed, setTimeElapsed] = useState('0');

  useEffect(() => {
    const currentTime = new Date();
    const msElapsed = currentTime.getTime() - new Date(threadData.last_activity).getTime();

    if (msElapsed < 60000) {
      setTimeElapsed("now");
    } else if (msElapsed < 3.6e6) {
      setTimeElapsed(
        Math.floor(msElapsed / 60000).toString() + " minutes ago"
      );
    } else if (msElapsed < 8.64e7) {
      setTimeElapsed(
        Math.floor(msElapsed / 3600000).toString() + " hours ago"
      );
    } else {
      setTimeElapsed(
        Math.floor(msElapsed / 86400000).toString() + " days ago"
      );
    }
  }, [threadData.last_activity]);

  return (
    <div 
      onClick={onClick}
      className="bg-accent2 rounded p-4 mb-4 cursor-pointer hover:bg-accent1"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-pixel font-bold text-lg text-white">
          {threadData.title}
        </h3>
        <div className="flex items-center text-xs font-pixel text-gray-100">
          <Calendar className="w-3 h-3 mr-1" />
          {timeElapsed}
        </div>
      </div>
      
      <div className="font-pixel text-sm text-gray-200 mb-2">
        Between {threadData.username_1} & {threadData.username_2}
      </div>
      
      <div className="text-sm text-gray-300 mb-3 leading-relaxed">
        {threadData.excerpt}...
      </div>
      
      <div className="flex items-center justify-between text-gray-300">
        <div className="flex items-center text-xs font-pixel">
          <MessageCircle className="w-3 h-3 mr-1" />
          {threadData.conversation_count} letters
        </div>
        <button className="retro-button px-3 py-1 font-pixel text-xs rounded">
          Read Thread →
        </button>
      </div>
    </div>
  );
};

export default ThreadList;