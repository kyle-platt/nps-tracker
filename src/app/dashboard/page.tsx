import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });

  await supabase.auth.getSession().then(({ data: { session } }) => {
    // If not logged in, redirect to sign in
    if (!Boolean(session)) {
      redirect("/signin");
    }
  });

  const { data: parks } = await supabase.from("parks").select();

  return (
    <main>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(parks, null, 2)}</pre>
    </main>
  );
}
