'use client'
import React, { useEffect, useState } from 'react';
import ConversationThread from '@/components/ConversationThread';
import ConversationView from '@/components/ConversationView';
import Header from '@/components/Header';
import conversationFakeArray from '@/components/conversationFakeArray';

interface Message {
    id: string;
    user: string;
    content: string;
    timestamp: string;
    isLeft: boolean;
    avatar: string;
    comments: Comment[];
}

interface Comment {
    id: string;
    user: string;
    content: string;
    timestamp: string;
    avatar: string;
}

interface Conversation {
    id: string;
    title: string;
    participants: string[];
    lastActivity: string;
    messageCount: number;
    excerpt: string;
    messages: Message[];
}

const Index = () => {
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>(conversationFakeArray);

    const handleAddComment = (messageId: string, commentText: string) => {
        const newComment: Comment = {
            id: Date.now().toString(),
            user: 'anonymous_reader',
            content: commentText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=32&h=32&fit=crop&crop=face'
        };

        setConversations(prev =>
            prev.map(conv => ({
                ...conv,
                messages: conv.messages.map(msg =>
                    msg.id === messageId
                        ? { ...msg, comments: [...msg.comments, newComment] }
                        : msg
                )
            }))
        );
    };

    const selectedConv = conversations.find(conv => conv.id === selectedConversation);

    if (selectedConversation && selectedConv) {
        return (
            <div className="min-h-screen minimal-background">
                <div className="container mx-auto px-4 py-6">
                    <Header />
                    <p>test</p>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                        <div className="lg:col-span-3">
                            <ConversationView
                                title={selectedConv.title}
                                participants={selectedConv.participants}
                                messages={selectedConv.messages}
                                onBack={() => setSelectedConversation(null)}
                                onAddComment={handleAddComment}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen minimal-background">
            <div className="container mx-auto px-4 py-6">
                <Header />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                    <div className="lg:col-span-3">
                        <div className="mb-4">
                            <h2 className="font-pixel font-bold text-xl text-bg2 mb-2">
                                Cole Cole Cole
                            </h2>
                            <div className="font-pixel text-sm text-bg2">
                                Read ongoing letter exchanges between friends • Click any thread to join the conversation
                            </div>
                        </div>

                        <div className="space-y-4">
                            {conversations.map((conversation) => (
                                <ConversationThread
                                    key={conversation.id}
                                    {...conversation}
                                    onClick={() => setSelectedConversation(conversation.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;