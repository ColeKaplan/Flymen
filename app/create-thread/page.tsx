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

export async function uploadThread(formData: FormData) {
    const supabase = createClient();
    const {data, error} = await supabase.from("usernames").select("username");
    if (error) {
        return { error: "Failed to upload thread." };
    }

    revalidatePath("/", "layout");
    redirect("/");
}

async function getUsernames() {
    const supabase = createClient();
    return await supabase.from("usernames").select("username");
}

const createThread = () => {
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [usernames, setUsernames] = useState<string[]>([]);

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

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // prevent normal form submission
        setError(null);

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await uploadThread(formData);

            if (result?.error) {
                setError(result.error);
            }
            // If no error, login() will redirect internally
        });
    }

    return (
        <div className="flex h-svh justify-center">
            <Card className="max-w-3xl w-[48rem] bg-bg2 mx-4">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Create Thread</CardTitle>
                    <CardDescription>
                        Write the first post in your new thread
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SearchInput suggestions={usernames} />
                </CardContent>
            </Card>
        </div>
    );
}
export default createThread;