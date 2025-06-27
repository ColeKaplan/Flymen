"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { IThread } from "@/types/thread";
import { profile } from "console";


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
        .select("user_id")
        .eq("username", friend)
        .single();

    if (friendError || !friendData) {
        return new Error("Friend username not found");
    }

    const friendUserId = friendData.user_id;

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
    const { data, error } = await supabase.from("threads").select("title, user_1, user_2, excerpt, conversation_count, id, created_at, last_activity, user_1_profile:profiles!user_1 (username), user_2_profile:profiles!threads_user_2_fkey (username)");


    return {
        data: data?.map(thread => ({
            ...thread,
            username_1: (thread.user_1_profile as unknown as { username: string }).username ?? "no name",
            username_2: (thread.user_2_profile as unknown as { username: string }).username ?? "no name",
        })),
        error,
    };

    // const toReturn: IThread[] = [];
    // var profileError: any = null;

    // if (!error && data) {
    //     for (const thread of data ?? []) {
    //         const userIds: string[] = [thread.user_1, thread.user_2]

    //         const { data: profiles, error: profilesError } = await supabase
    //             .from("profiles")
    //             .select("user_id, username");

    //         console.log(profiles)
    //         profileError = profilesError;

    //         toReturn.push({
    //             ...thread,
    //             username_1: profiles?.find(profile => profile.user_id === thread.user_1) || { user_id: "1", username: "fake" },
    //             username_2: profiles?.find(profile => profile.user_id === thread.user_2),
    //         })
    //     };
    // }

    // if (!profileError) {
    //     return {
    //         data: toReturn,
    //         error
    //     };
    // }

    // return {
    //     data: toReturn,
    //     error
    // };
}