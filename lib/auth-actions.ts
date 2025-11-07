"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
    const supabase = createClient();

    const username = formData.get("username") as string;
    const password = formData.get("password") as string

    const response = await supabase.functions.invoke("get-fake-email", {
        body: { username },
    });

    if (response.error) {
        return { error: "Incorrect username or password" };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: response.data.email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    return { data: data.user?.user_metadata?.display_name };
}

export async function signup(formData: FormData) {
    const supabase = createClient();

    // Ideally should validate these inputs instead of type-casting
    const username = formData.get("username") as string;
    const email = `${randomString(10)}@example.com`;
    const password = formData.get("password") as string

    // Check if username is already taken
    const { data: existing, error: checkError } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("username", username)
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
        console.log(error);
        redirect("/error");
    }
    redirect("/logout");
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
