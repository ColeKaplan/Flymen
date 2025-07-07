import React, { useEffect, useState } from 'react';
import { MessageCircle, Calendar } from 'lucide-react';
import { IThread } from '@/types/thread';
import { useRouter } from 'next/navigation';
import getTimeElapsed from '@/utils/timeElapsed';
import ReactMarkdown from 'react-markdown';

interface ThreadListProps {
  threadData: IThread
}

const ThreadList: React.FC<ThreadListProps> = ({
  threadData,
}) => {

  const [timeElapsed, setTimeElapsed] = useState('0');
  const router = useRouter();

  const onClick = () => {
    router.push(`/threads/${threadData.slug}`)
  }

  useEffect(() => {
    setTimeElapsed(getTimeElapsed(threadData.created_at))
  }, [threadData.last_activity]);

  return (
    <div
      onClick={onClick}
      className="bg-accent2 rounded p-4 mb-4 cursor-pointer hover:bg-accent1 text-background"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-pixel font-bold text-lg">
          {threadData.title}
        </h3>
        <div className="flex items-center text-xs font-pixel">
          <Calendar className="w-3 h-3 mr-1" />
          {timeElapsed}
        </div>
      </div>

      <div className="font-pixel text-sm mb-2">
        Between {threadData.username_1} & {threadData.username_2}
      </div>

      <div className="text-sm mb-3 leading-relaxed">
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => {
              const href = props.href || '';
              const correctedHref = href.startsWith('http') ? href : `https://${href}`;
              return <a {...props} href={correctedHref} target="_blank" rel="noopener noreferrer" />;
            },
          }}>{threadData.excerpt + "..." || "*Type something in markdown to see what your post will look like*"}
        </ReactMarkdown>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs font-pixel">
          <MessageCircle className="w-3 h-3 mr-1" />
          {threadData.count} letters
        </div>
        <button className="retro-button px-3 py-1 font-pixel text-xs rounded">
          Read Thread →
        </button>
      </div>
    </div>
  );
};

export default ThreadList;