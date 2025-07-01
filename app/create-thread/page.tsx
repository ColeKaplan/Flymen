"use client"
import React, { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchInput from "./components/searchInput"
import { createClient } from "@/utils/supabase/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import ThreadTitle from "./components/threadTitle";
import PostMarkdown from "./components/postMarkdown";
import { uploadThread } from "@/lib/supabase-thread-calls";
import { getUsernames } from "@/lib/supabase-other-calls";
import Header from "@/components/Header";

const createThread = () => {
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [usernames, setUsernames] = useState<string[]>([]);

    const [titleInput, setTitleInput] = useState("");
    const [friendInput, setFriendInput] = useState("");
    const [markdownContent, setMarkdownContent] = useState("");

    const saveContentAs = "createThreadMarkdownContent"
    const saveFriendAs = "createThreadFriend"
    const saveTitleAs = "createThreadTitle"

    useEffect(() => {
        const fetchUsernames = async () => {
            const { data, error } = await getUsernames();

            if (error) {
                setError("Failed to fetch usernames.");
                return;
            }

            setUsernames(data.map((u) => u.username));
        };

        fetchUsernames();
    }, []);

    async function handleSubmit() {
        setError(null);

        if (titleInput.trim() === "") {
            setError("Topic cannot be empty");
            return;
        }
        if (friendInput.trim() === "") {
            setError("Recipient cannot be empty");
            return;
        }
        if (markdownContent.trim() === "") {
            setError("Post cannot be empty");
            return;
        }

        startTransition(async () => {
            const result = await uploadThread(titleInput, friendInput, markdownContent);

            if (!!result.error) {
                setError(result.error);
            } else {
                localStorage.removeItem(saveTitleAs);
                localStorage.removeItem(saveFriendAs);
                localStorage.removeItem(saveContentAs);
            }
        });
    }

    return (
        <div className="flex flex-col justify-center font-['Times_New_Roman']">
            <Header/>
            <div className="flex justify-center mt-4">
            <Card className="max-w-3xl w-[48rem] bg-accent2 mx-4 text-background border-none">
                <CardHeader className="text-center my-[-.5rem]">
                    <CardTitle className="text-2xl">Create Thread</CardTitle>
                    <CardDescription>
                        Write the first post in your new thread
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row justify-between mb-[-1rem]">
                    <ThreadTitle input={titleInput} setInput={setTitleInput} saveTitleAs={saveTitleAs}/>
                    <SearchInput suggestions={usernames} input={friendInput} setInput={setFriendInput} saveFriendAs={saveFriendAs}/>
                </CardContent>
                <CardContent>
                    <PostMarkdown content={markdownContent} setContent={setMarkdownContent} saveContentAs={saveContentAs} />
                </CardContent>
                <CardContent>
                    <Button
                        onClick={handleSubmit}
                        className="w-full bg-accent1 hover:bg-accent1.5 my-[-.5rem] text-background text-lg"
                        disabled={isPending}
                    >
                        {isPending ? "Creating..." : "Create"}
                    </Button>

                    {error && (
                        <div className="text-white text-lg text-center">
                            {error}
                        </div>
                    )}
                    
                </CardContent>
            </Card>
            </div>
        </div>
    );
}
export default createThread;