"use client"

import { IThread } from "@/types/thread";
import Header from "./Header";
import { useEffect, useState } from "react";
import { getReplies } from "@/lib/supabase-calls";
import { IReply } from "@/types/reply";
import ReplyList from "./ReplyList";




export default function ThreadPage({ thread }: { thread: IThread }) {
    const [error, setError] = useState<string | null>(null);
    const [replies, setReplies] = useState<IReply[]>([]);

    useEffect(() => {
        const fetchReplies = async () => {

            // First get the replies
            const { data: replyData, error: replyError } = await getReplies(thread.id);

            if (replyError || !replyData) {
                setError(replyError ? replyError.message : "Failed to fetch threads.");
                return;
            }

            setReplies(replyData)
        };

        fetchReplies();
    }, []);

    return (
        <div className="text-accent1 font-['Times_New_Roman']">
            <Header />
            <div className="px-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <h2 className="font-bold text-xl mb-1">
                    {thread.title}
                </h2>
                <div className="text-sm">
                    A correspondence between {thread.username_1} & {thread.username_2}
                </div>
            </div>

            <div className="space-y-4 px-4">
                {replies.map((reply) => (
                    <ReplyList
                        key={reply.id}
                        replyData={reply}
                    />
                ))}
            </div>
        </div>
    );
}
