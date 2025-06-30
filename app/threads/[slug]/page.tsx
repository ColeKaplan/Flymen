// app/threads/[thread_topic]/page.tsx
import ThreadPage from "@/components/ThreadPage";
import generateStaticParams from "@/lib/threads/generateStaticParams";
import { getThread } from "@/lib/supabase-thread-calls";
import { notFound } from "next/navigation";

export { generateStaticParams };

export default async function Page({ params }: { params: { slug: string } }) {
    const thread = await getThread(params.slug);
    if (!thread) {
        return (notFound())
    }
    return <ThreadPage thread={thread} />;
}