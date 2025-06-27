"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";


export async function uploadThread(title: string, friend: string, markdownContent: string) {
    const supabase = createClient();

    // 1. Get current user id
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return new Error("User not authenticated");
    }

    const currentUserId = user.id;

    // 2. Look up user2 id by username (friend)
    const { data: friendData, error: friendError } = await supabase
        .from("usernames")
        .select("userID")
        .eq("username", friend)
        .single();

    if (friendError || !friendData) {
        return new Error("Friend username not found");
    }

    const friendUserId = friendData.userID;

    // 3. Insert new thread row
    const { error: insertError } = await supabase.from("threads").insert({
        user1: currentUserId,
        user2: friendUserId,
        first_post_text: markdownContent,
        title: title,
        conversation_count: 1,
    });

    if (insertError) {
        return new Error("Failed to insert thread: " + insertError.message);
    }

    // 4. Revalidate and redirect
    revalidatePath("/", "layout");
    redirect("/");
}

export async function getUsernames() {
    const supabase = createClient();
    return await supabase.from("usernames").select("username");
}

export async function getThreads() {
    const supabase = createClient();
    return await supabase.from("threads").select("title, user1, user2, excerpt, conversationCount, id, createdAt, lastActivity");
}