"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { IThread } from "@/types/thread";
import slugify from "slugify";


export async function uploadThread(title: string, friend: string, markdownContent: string) {
    const supabase = createClient();

    // 1. Get current user id
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
        return { error: "User not authenticated" }
    }

    const currentUserId = user.id;

    // 2. Look up user2 id by username (friend)
    const { data: friendData, error: friendError } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("username", friend)
        .single();

    if (friendError || !friendData) {
        return { error: "Friend username not found" }
    }

    const friendUserId = friendData.user_id;

    // 3. Create unique slug

    let baseSlug = slugify(title, { lower: true, strict: true })
    let slug = baseSlug
    let uniqueSlug = false
    let count = 1

    while (!uniqueSlug) {
        const { data: existingSlug, error: checkError } = await supabase
            .from("threads")
            .select("slug")
            .eq("slug", slug)
            .maybeSingle();

        if (checkError) {
            return { error: "Failed to check username availability." };
        }

        if (existingSlug) {
            slug = `${baseSlug}-${count}`;
            count++;
        } else {
            uniqueSlug = true
        }
    }

    // 4. Insert new thread row
    const { data: thread_id, error: insertError } = await supabase.from("threads").insert({
        user_1: currentUserId,
        user_2: friendUserId,
        excerpt: markdownContent,
        title: title,
        count: 1,
        slug: slug
    })
    .select("id")
    .maybeSingle();

    if (insertError) {
        return { error: insertError.message }
    }

    // 5. Insert new Reply
    const { error: insertReplyError } = await supabase.from("replies").insert({
        user_id: currentUserId,
        content: markdownContent,
        thread_id: thread_id?.id,
    });

    if (insertReplyError) {
        return { error: insertReplyError.message }
    }

    // 6. Revalidate and redirect
    revalidatePath("/", "layout");
    redirect("/");
}

export async function getUsernames() {
    const supabase = createClient();
    return await supabase.from("profiles").select("username");
}

export async function getThreads() {
    const supabase = createClient();
    const { data, error } = await supabase.from("threads").select("title, user_1, user_2, excerpt, count, id, created_at, last_activity, slug, user_1_profile:profiles!user_1 (username), user_2_profile:profiles!threads_user_2_fkey (username)");


    return {
        data: data?.map(thread => ({
            ...thread,
            username_1: (thread.user_1_profile as unknown as { username: string }).username ?? "no name",
            username_2: (thread.user_2_profile as unknown as { username: string }).username ?? "no name",
        })),
        error,
    };
}

export async function getThread(slug: string): Promise<IThread | null> {
    const supabase = createClient();
    const { data, error } = await supabase.from("threads")
        .select("title, user_1, user_2, excerpt, count, id, created_at, last_activity, slug, user_1_profile:profiles!user_1 (username), user_2_profile:profiles!threads_user_2_fkey (username)")
        .eq("slug", slug)
        .maybeSingle();

    if (error || !data) return null;

    const user1Profile = data.user_1_profile as unknown as { username: string };
    const user2Profile = data.user_2_profile as unknown as { username: string };

    return {
        title: data.title,
        user_1: data.user_1,
        user_2: data.user_2,
        excerpt: data.excerpt,
        count: data.count,
        id: data.id,
        created_at: data.created_at,
        last_activity: data.last_activity,
        slug: data.slug,
        username_1: user1Profile.username,
        username_2: user2Profile.username,
    };
}

export async function getReplies(thread_id: string) {
    const supabase = createClient();
    const { data, error } = await supabase.from("replies")
    .select("id, created_at, thread_id, content, user_id, user_profile:profiles!user_id (username)")
    .eq("thread_id", thread_id);


    return {
        data: data?.map(thread => ({
            ...thread,
            username: (thread.user_profile as unknown as { username: string }).username ?? "no name",
        })),
        error,
    };
}