import React, { useEffect, useState } from 'react';
import { MessageCircle, Calendar } from 'lucide-react';
import { IReply } from '@/types/reply';
import { useRouter } from 'next/navigation';
import getTimeElapsed from '@/utils/timeElapsed';
import ReactMarkdown from 'react-markdown';

interface ReplyListProps {
  replyData: IReply
}

const ReplyList: React.FC<ReplyListProps> = ({
  replyData,
}) => {

  const [timeElapsed, setTimeElapsed] = useState('0');


  useEffect(() => {
    setTimeElapsed(getTimeElapsed(replyData.created_at))
  }, [replyData.created_at]);

  return (
    <div
      className="bg-accent2 rounded p-4 mb-4 text-background"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center text-xs font-pixel">
          <Calendar className="w-3 h-3 mr-1" />
          {timeElapsed}
        </div>
      </div>

      <div className="font-pixel text-sm mb-2">
        {replyData.username}
      </div>

      <div className="text-sm mb-3 leading-relaxed">
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => {
              const href = props.href || '';
              const correctedHref = href.startsWith('http') ? href : `https://${href}`;
              return <a {...props} href={correctedHref} target="_blank" rel="noopener noreferrer" />;
            },
          }}>{replyData.content}
        </ReactMarkdown>
        {/* {replyData.content} */}
      </div>
      {/* <div id="thinking-reaction">
        <button> */}
          {/* Implement a sliding bar at bottom of thread where people can rate 0 - 100 how much they like/agree with it
          Or they can click see results, which shows the result BUT they then cannot vote
          Figure out UI so after voting u can see the overall graph, but still know what u rated it */}
        {/* </button>
      </div> */}
    </div>
  );
};

export default ReplyList;