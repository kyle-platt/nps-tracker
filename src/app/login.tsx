"use client";

import { useSupabase } from "./supabase-provider";

export default function Login() {
  const { supabase } = useSupabase();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: "kyleplatt2014+test@gmail.com",
      password: "Password123",
    });
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({
      email: "kyleplatt2014+test@gmail.com",
      password: "Password123",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
