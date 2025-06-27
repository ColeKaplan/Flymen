import { IConversation } from "./conversation";

export interface IThread {
    id: string;
    title: string;
    user1: string;
    user2: string;
    createdAt: string;
    lastActivity: string;
    conversationCount: number;
    excerpt: string;
    // username1: string;
    // username2: string;
}