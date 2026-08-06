"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import slugify from "slugify";

export async function login(formData: FormData) {
    const supabase = createClient();

    const username = formData.get("username") as string;
    const password = formData.get("password") as string

    const { data, error } = await supabase.auth.signInWithPassword({
        email: `${username}@example.com`,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/", "layout");
    return { data: data.user?.user_metadata?.display_name };
}

export async function signup(formData: FormData) {
    const supabase = createClient();

    // Ideally should validate these inputs instead of type-casting
    const username = formData.get("username") as string;
    const email = `${username}@example.com`;
    const password = formData.get("password") as string
    const userSlug = slugify(username, { lower: true, strict: true })

    // Check if username is already taken
    const { data: existing, error: checkError } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("slug", userSlug)
        .maybeSingle();

    if (checkError) {
        return { error: "Failed to check username availability." };
    }

    if (existing) {
        return { error: "Username is already taken." };
    }

    // Create the user
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: username,
            },
        },
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/", "layout");
    redirect("/");
}

// Not used anymore, was for random email generation
function randomString(length: number) {
    const chars =
        "0123456789abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

export async function signout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        return { error: error.message };
    }
    
    revalidatePath("/", "layout");
    return { data: "Successfully signed out." };
}

export async function getUser() {
    const supabase = createClient();
    return await supabase.auth.getUser();
}

export async function getSession() {
    const supabase = createClient();
    return await supabase.auth.getSession();
}

export async function signInWithGoogle() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (error) {
        console.log(error);
        redirect("/error");
    }

    redirect(data.url);
}
