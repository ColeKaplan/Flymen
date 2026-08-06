"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { signout } from "@/lib/auth-actions";
import Link from "next/link";
import { getUser } from "@/lib/auth-actions";

const LoginButton = () => {
  const [user, setUser] = useState<any>(null);
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent immediate navigation

    const { error } = await signout();
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
      } = await getUser();
      setUser(user);
    };
    fetchUser();

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
