"use client"

import { IThread } from "@/types/thread";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./Header";




export default async function ThreadPage({ thread }: { thread: IThread }) {
    const router = useRouter();

    const onBack = () => {
        router.push(`/`)
    }

    return (
        <div className="">
            <Header />
            <div className="">
                <button
                    onClick={onBack}
                    className="flex items-center text-xs font-pixel text-gray-600 hover:text-gray-800 mb-2"
                >
                    <ArrowLeft className="w-3 h-3 mr-1" />
                    Back to all conversations
                </button>
                <h2 className="font-pixel font-bold text-xl text-gray-800 mb-1">
                    {thread.title}
                </h2>
                <div className="font-pixel text-sm text-gray-600">
                    A correspondence between {thread.username_1} & {thread.username_2}
                </div>
            </div>

            <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
                {/* TODO: Display the conversations here */}
            </div>
        </div>
    );
}
