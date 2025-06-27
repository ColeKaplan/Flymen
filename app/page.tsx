'use client'
import React, { useEffect, useState } from 'react';
import ConversationThread from '@/components/ConversationThread';
import ConversationView from '@/components/ConversationView';
import Header from '@/components/Header';
import UserGreetText from '@/components/UserGreetText';
import LoginLogoutButton from '@/components/LoginLogoutButton';
import { IThread } from '@/types/thread';
import { IComment } from '@/types/comment';
import { IConversation } from '@/types/conversation';
import { getThreads } from '@/lib/supabase-calls';


const Index = () => {
    const [error, setError] = useState<string | null>(null);
    const [selectedThread, setSelectedThread] = useState<string | null>(null);
    const [conversations, setConversations] = useState<IConversation[]>();
    const [threads, setThreads] = useState<IThread[]>([]);

    useEffect(() => {
        const fetchThreads = async () => {

            // First get the threads
            const { data: threadData, error: threadError } = await getThreads();

            if (threadError || !threadData) {
                setError(threadError? threadError.message : "Failed to fetch threads.");
                return;
            }

            setThreads(threadData)
        };

        fetchThreads();
    }, []);


    const handleAddComment = (conversationId: string, commentText: string) => {
        // Ignore this whole method for now, just a placeholder
        const newComment: IComment = {
            id: Date.now().toString(),
            username: 'anonymous_reader',
            content: commentText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        // TODO: Upload to conversations database
    };

    const selectedThrd : IThread | undefined = threads.find(thrd => thrd.id === selectedThread);

    if (selectedThread && selectedThrd) {
        return (
            <div className="min-h-screen minimal-background">
                <div className="container mx-auto px-4 py-6">
                    <Header />
                    <p>test</p>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                        <div className="lg:col-span-3">
                            <ConversationView
                                title={selectedThrd.title}
                                participants={[selectedThrd.user1, selectedThrd.user2]}
                                onBack={() => setSelectedThread(null)}
                                onAddComment={handleAddComment}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen minimal-background">
            <div className="container mx-auto px-4 py-6">
                <Header />

                <div className="flex-col">
                    <div className="mb-4">
                        <div className='flex justify-between items-center w-full'>
                            <UserGreetText />
                            <LoginLogoutButton />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <h2 className="font-pixel font-bold text-xl text-bg2 mb-2">
                            Correspondence
                        </h2>
                        <div className="font-pixel text-sm text-bg2">
                            Read ongoing letter exchanges between friends • Click any thread to join the conversation
                        </div>
                    </div>

                    <div className="space-y-4">
                        {threads.map((thread) => (
                            <ConversationThread
                                key={thread.id}
                                threadData={thread}
                                onClick={() => setSelectedThread(thread.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;