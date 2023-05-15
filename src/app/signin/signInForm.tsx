"use client";

import { FormEvent, useState } from "react";
import { useSupabase } from "../supabase-provider";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error?.message) {
      setError(error.message);
    } else {
      router.replace("/dashboard");
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
