"use server";
import { createClient } from "@/utils/supabase/server";


export async function getUsernames() {
    const supabase = createClient();
    return await supabase.from("profiles").select("username");
}