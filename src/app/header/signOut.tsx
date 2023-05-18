"use client";

import Button from "../common/Button";
import { useSupabase } from "../supabase-provider";

export default function SignOut() {
  const { supabase } = useSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
}
