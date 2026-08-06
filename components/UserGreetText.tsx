"use client";
import { getUser } from "@/lib/auth-actions";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState, useMemo } from "react";

type UserGreetTextProps = {
  className?: string;
};

const usernameCacheKey = "displayName";

const UserGreetText = ({ className = "" }: UserGreetTextProps) => {
  const supabase = useMemo(() => createClient(), []);
  
  // Read cached value synchronously
  const [user, setUser] = useState<string | null>(null);

  // Fetch latest user info and update cache
  const fetchUser = async () => {
    const {
      data: { user },
    } = await getUser();

    const displayName = user?.user_metadata?.display_name ?? "mysterious visitor";

    setUser(displayName);
    if (typeof window !== "undefined") {
      localStorage.setItem(usernameCacheKey, displayName);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [supabase]);

  return (
    <p className={`text-accent1 text-md ${className}`}>
      Welcome, {user}
    </p>
  );
};

export default UserGreetText;
