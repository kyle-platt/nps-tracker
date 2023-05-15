"use client";

import { FormEvent, useState } from "react";
import { useSupabase } from "../supabase-provider";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error?.message) {
      setError(error.message);
    } else {
      router.replace("/signup-success");
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={handleSignUp}>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
