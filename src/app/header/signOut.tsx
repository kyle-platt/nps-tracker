"use client";

import { useSupabase } from "../supabase-provider";

export default function SignOut() {
  const { supabase } = useSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return <button onClick={handleLogout}>Logout</button>;
}
