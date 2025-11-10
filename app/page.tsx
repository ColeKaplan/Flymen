'use client'
import React, { useEffect, useState } from 'react';
import ThreadList from '@/components/ThreadList';
import { IThread } from '@/types/thread';
import { getThreads } from '@/lib/supabase-thread-calls';


const Index = () => {
    const [error, setError] = useState<string | null>(null);
    const [threads, setThreads] = useState<IThread[]>([]);

    useEffect(() => {
        const fetchThreads = async () => {

            // First get the threads
            const { data: threadData, error: threadError } = await getThreads();

            if (threadError || !threadData) {
                setError(threadError ? threadError.message : "Failed to fetch threads.");
                return;
            }

            setThreads(threadData)
        };

        fetchThreads();
    }, []);

    return (
        <div className="min-h-full minimal-background font-['Times_New_Roman']">
            <div className="">

                <div className="flex-col px-4">
                    <div className='flex flex-row justify-between'>
                        <div className="mb-4">
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <h2 className="font-bold text-xl text-accent1 mb-2">
                                Correspondence
                            </h2>
                            <div className="text-sm text-accent1 md:hidden">
                                Read ongoing letter exchanges between friends
                            </div>
                            <div className="text-sm text-accent1 md:block hidden">
                                Read ongoing letter exchanges between friends • Click any thread to join the conversation
                            </div>
                        </div>

                        <a className="text-accent1 underline hover:text-accent1/60"
                            href='create-thread'>
                            New Thread
                        </a>
                    </div>

                    <div className="space-y-4">
                        {threads.map((thread) => (
                            <ThreadList
                                key={thread.id}
                                threadData={thread}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;