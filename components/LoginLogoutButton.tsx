"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { signout } from "@/lib/auth-actions";
import Link from "next/link";
import { getUser } from "@/lib/auth-actions";
import { User } from "@supabase/supabase-js";

const LoginButton = ({ user }: { user: User | null }) => {
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
    
    // Refresh home page after logout
    router.refresh();
  };

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
