import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignUpForm from "./signUpForm";
import Link from "next/link";

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
      <h1>Create a New Account</h1>
      <p>
        Sign up or <Link href="/signin">sign in</Link>
      </p>
      <SignUpForm />
    </main>
  );
}
