import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignInForm from "./signInForm";
import Link from "next/link";
import Header from "../header/header";

export default async function Home() {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });

  await supabase.auth.getSession().then(({ data: { session } }) => {
    // If logged in, redirect to dashboard
    if (Boolean(session)) {
      redirect("/dashboard");
    }
  });

  return (
    <main className="flex items-center flex-col h-screen bg-tan px-4">
      {/* @ts-expect-error Server Component */}
      <Header />
      <h1 className="text-4xl mt-8 mb-2 text-gray-800 text-center">
        Your Account
      </h1>
      <p className="mb-8 text-gray-700">
        Sign in or{" "}
        <Link className="text-light_green hover:underline" href="/signup">
          create an account
        </Link>
      </p>
      <SignInForm />
    </main>
  );
}
