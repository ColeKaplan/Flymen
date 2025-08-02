"use server";
import { createClient } from "@/utils/supabase/server";




export async function getReplies(thread_id: string) {
    const supabase = createClient();
    const { data, error } = await supabase.from("replies")
    .select("id, created_at, thread_id, content, user_id, user_profile:profiles!user_id (username)")
    .eq("thread_id", thread_id)
    .order("created_at", { ascending: true });


    return {
        data: data?.map(thread => ({
            ...thread,
            username: (thread.user_profile as unknown as { username: string }).username ?? "no name",
        })),
        error,
    };
}

export async function uploadReply(thread_id: string, content: string, oldCount: number) {
    const supabase = createClient();

     // Get current user id
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
        return { error: "User not authenticated" }
    }

    const currentUserId = user.id;

    // Upload
    const { error: insertReplyError } = await supabase.from("replies").insert({
        user_id: currentUserId,
        content: content,
        thread_id: thread_id,
    });

    if (insertReplyError) {
        return { error: insertReplyError.message }
    }

    // Update thread last activity
    const { error: updateThreadError } = await supabase.from("threads")
    .update({
        last_activity: new Date().toISOString(),
        count: oldCount + 1,
    })
    .eq("id", thread_id);
    if (updateThreadError) {
        return { error: updateThreadError.message }
    }

    return { error: null };
}