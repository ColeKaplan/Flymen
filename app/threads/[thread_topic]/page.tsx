// app/users/[username]/page.tsx
import { createClient } from "@/utils/supabase/server"; // or wherever you create your Supabase client
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const supabase = createClient();
    const { data: threads } = await supabase.from("threads").select("title");

    return threads?.map(thread => ({
        title: thread.title
    })) ?? [];
}

export default async function UserPage({ params }: { params: { title: string } }) {
    const supabase = createClient();
    const { data: thread } = await supabase
        .from("threads")
        .select("*")
        .eq("topic", params.title)
        .single();

    if (!thread) return notFound();

    return (
        <div>
            <h1>{thread.title}</h1>
            {/* render more user data here */}
        </div>
    );
}
