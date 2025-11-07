"use client";
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
    } = await supabase.auth.getUser();

    const displayName = user?.user_metadata?.display_name ?? "mysterious visitor";

    setUser(displayName);
    if (typeof window !== "undefined") {
      localStorage.setItem(usernameCacheKey, displayName);
    }
  };

  useEffect(() => {
    fetchUser();

    // Listen to auth state changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const displayName = session?.user.user_metadata?.display_name ?? "mysterious visitor";
      setUser(displayName);
      if (typeof window !== "undefined") {
        localStorage.setItem(usernameCacheKey, displayName);
      }
    });

    // Listen for custom auth state change events (for login)
    const handleAuthStateChanged = (event: CustomEvent) => {
      // Re-fetch user to ensure we have the latest data
      fetchUser();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("auth-state-changed", handleAuthStateChanged as EventListener);
    }

    return () => {
      listener?.subscription.unsubscribe();
      if (typeof window !== "undefined") {
        window.removeEventListener("auth-state-changed", handleAuthStateChanged as EventListener);
      }
    };
  }, [supabase]);

  return (
    <p className={`text-accent1 text-md ${className}`}>
      Welcome, {user}
    </p>
  );
};

export default UserGreetText;
