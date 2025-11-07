"use client"

import { IThread } from "@/types/thread";
import { useEffect, useState, useTransition } from "react";
import { getReplies, uploadReply } from "@/lib/supabase-reply-calls";
import { IReply } from "@/types/reply";
import ReplyList from "./ReplyList";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import PostMarkdown from "@/app/create-thread/components/postMarkdown";
import React from "react";
import { setConfig } from "next/config";
import { createTheme, Slider, ThemeProvider } from "@mui/material";
import resolveConfig from "tailwindcss/resolveConfig";
import config from '@/tailwind.config';
import theme from '../lib/theme';




export default function ThreadPage({ thread }: { thread: IThread }) {
    const [error, setError] = useState<string | null>(null);
    const [replies, setReplies] = useState<IReply[]>([]);
    const supabase = createClient();
    const [replying, setReplying] = useState<Boolean>(false);
    const [replyContent, setReplyContent] = useState<string>("");
    const [isPending, startTransition] = useTransition();
    const [sliderValue, setSliderValue] = useState(50);

    const fullConfig = resolveConfig(config);
    const sliderColor = fullConfig.theme.colors.accent1;
    const saveMarkdownAs = "createReplyMarkdown"

    const startReplying = () => {
        setReplying(true)
    }

    const handleSliderChange = (event: any, newValue: number | number[], someVariable: number) => {
        if (typeof newValue === 'number') {
            setSliderValue(newValue);
        };
    }

    useEffect(() => {
        if (isPending) return
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
    }, [isPending]);

    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (user && (user.id === thread.user_1 || user.id === thread.user_2)) {
                setIsAuthorized(true);
            }
        };

        fetchUser();
    }, []);

    async function handleSubmit() {
        setError(null);

        if (replyContent.trim() === "") {
            setError("Reply cannot be empty");
            return;
        }

        startTransition(async () => {
            const result = await uploadReply(thread.id, replyContent, thread.count);


            if (result.error) {
                setError(result.error);
            } else {
                localStorage.removeItem(saveMarkdownAs);
                setReplyContent("")
            }
        });
    }


    return (
        <div className="text-accent1 font-['Times_New_Roman']">
            <div className="px-4">
                <div className="">
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <h2 className="font-bold text-xl mb-1">
                        {thread.title}
                    </h2>
                    <div className="text-sm">
                        A correspondence between {thread.username_1} & {thread.username_2}
                    </div>
                </div>

                <div className="space-y-4 mb-4 mt-4">
                    {replies.map((reply) => (
                        <ReplyList
                            key={reply.id}
                            replyData={reply}
                        />
                    ))}
                </div>
                {
                    isAuthorized &&
                    ((!replying && <div>
                        <Button
                            onClick={() => { startReplying() }}
                            className="w-full bg-accent1 hover:bg-accent1.5 text-background text-md mb-2">
                            Reply
                        </Button>
                    </div>)

                        ||

                        (<React.Fragment><div className="bg-accent2 rounded-md px-4 py-2 mb-4">
                            <PostMarkdown content={replyContent} setContent={setReplyContent} saveContentAs={saveMarkdownAs} ></PostMarkdown>
                            <Button
                                onClick={handleSubmit}
                                className="w-full bg-accent1 hover:bg-accent1.5 mb-2 text-background text-lg mt-4"
                                disabled={isPending}
                            >
                                {isPending ? "Creating..." : "Create"}
                            </Button>

                            {error && (
                                <div className="text-white text-lg text-center">
                                    {error}
                                </div>
                            )}
                        </div></React.Fragment>)
                    )}
            </div>
            
            {/* This is the rating bar slider at the bottom */}
            {/* <div className=" flex flex-row items-center justify-center">
                <div className="w-1/3">
                    <ThemeProvider theme={theme}>
                        <Slider
                            defaultValue={50}
                            value={sliderValue}
                            onChange={handleSliderChange}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            color={'info'}
                        //'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
                        />
                    </ThemeProvider>
                </div>
            </div> */}
        </div >
    );
}
