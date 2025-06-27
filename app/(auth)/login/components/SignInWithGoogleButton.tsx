"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-actions";
import React from "react";

const SignInWithGoogleButton = () => {
  return (
    <Button
      type="button"
      className="w-full bg-bg3 hover:bg-background"
      onClick={() => {
        signInWithGoogle();
      }}
    >
      Login with Google
    </Button>
  );
};

export default SignInWithGoogleButton;
