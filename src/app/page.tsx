import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Login from "./login";

export default async function Home() {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });

  const { data: parks } = await supabase.from("parks").select();

  const isLoggedIn = await supabase.auth
    .getSession()
    .then(({ data: { session } }) => {
      return Boolean(session);
    });

  return (
    <main>
      <Login />
      <h1>National Park Tracker</h1>
      <p>
        Track your trips to national parks across the United States and keep a
        journal of what you did.
      </p>
      {isLoggedIn && <pre>{JSON.stringify(parks, null, 2)}</pre>}
    </main>
  );
}
