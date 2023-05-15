import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });

  await supabase.auth.getSession().then(({ data: { session } }) => {
    // If logged in, redirect to dashboard
    if (Boolean(session)) {
      redirect("/dashboard");
    }
  });

  return (
    <main>
      <h1>Your Account</h1>
      <p>Sign up or sign in</p>
    </main>
  );
}
