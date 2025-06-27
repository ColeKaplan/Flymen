"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/auth-actions";

export function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent normal form submission
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await signup(formData);

      if (result?.error) {
        setError(result.error);
      }
      // If no error, login() will redirect internally
    });
  }

  return (
    <Card className="mx-4 w-[22rem] max-w-sm bg-secondary">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
       <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                id="username"
                type="username"
                placeholder="colewawa"
                required
              />
            </div>
            {/* I got rid of the below email class so it would be username based sign ups */}
            {/* <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="flymen@example.com"
                required
              />
            </div> */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password" />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full bg-bg3 hover:bg-background">
              Create an account
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
