"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

type UserGreetTextProps = {
  className?: string;
};

const UserGreetText = ({ className = "" }: UserGreetTextProps) => {
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUser(user?.user_metadata?.display_name ?? "mysterious visitor");
        };
        fetchUser();
    }, []);

    if (user !== null) {
        return (
            <p className={`text-accent1 ${className}`}>
                Welcome, {user}
            </p>
        );
    }

    return (
        <p className="text-accent1">
            User not logged in
        </p>
    );
};

export default UserGreetText;
