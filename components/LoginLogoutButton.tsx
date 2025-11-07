"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { signout } from "@/lib/auth-actions";
import Link from "next/link";

const LoginButton = () => {
  const [user, setUser] = useState<any>(null);
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent immediate navigation

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }

    // Clear cached user
    localStorage.removeItem("displayName");
    
    // Navigate to home page after logout
    router.push("/");
  };
  

  // This makes sure the button says login or logout based on the user's auth state
  useEffect(() => {
    // Get initial user
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Listen for custom auth state change events (for login)
    const handleAuthStateChanged = () => {
      // Re-fetch user to ensure we have the latest data
      fetchUser();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("auth-state-changed", handleAuthStateChanged as EventListener);
    }

    return () => {
      subscription.unsubscribe();
      if (typeof window !== "undefined") {
        window.removeEventListener("auth-state-changed", handleAuthStateChanged as EventListener);
      }
    };
  }, [supabase]);

  if (user) {
    return (
      <button onClick={handleLogout} className="text-accent1 underline hover:text-accent1/60">
      Logout
    </button>
    );
  }
  return (
    <Link href="/login" className="text-accent1 underline hover:text-accent1/60">
      Login
    </Link>
  );
};

export default LoginButton;
