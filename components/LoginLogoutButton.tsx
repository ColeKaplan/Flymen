"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { signout } from "@/lib/auth-actions";

const LoginButton = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);
  if (user) {
    return (
      <a
        className="text-accent1 underline hover:text-accent1/60"
        onClick={() => {
          signout();
          localStorage.clear();
          setUser(null);
        }}
      >
        Log out
      </a>
    );
  }
  return (
    <a
      className="text-accent1 underline hover:text-accent1/60"
      onClick={() => {
        router.push("/login");
      }}
    >
      Login
    </a>
  );
};

export default LoginButton;
