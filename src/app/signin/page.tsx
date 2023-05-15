import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignInForm from "./signInForm";
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
      <h1>Your Account</h1>
      <p>
        Sign in or <Link href="/signup">create an account</Link>
      </p>
      <SignInForm />
    </main>
  );
}
