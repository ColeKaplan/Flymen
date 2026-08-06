"use client";
import { getUser } from "@/lib/auth-actions";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState, useMemo } from "react";

type UserGreetTextProps = {
  user?: User | null;
  className?: string;
};

const usernameCacheKey = "displayName";

const UserGreetText = ({ user, className = "" }: UserGreetTextProps) => {
  
 
  const displayName = user?.user_metadata?.display_name ?? "mysterious visitor";

  if (typeof window !== "undefined") {
    localStorage.setItem(usernameCacheKey, displayName);
  }

  return (
    <p className={`text-accent1 text-md ${className}`}>
      Welcome, {displayName}
    </p>
  );
};

export default UserGreetText;
