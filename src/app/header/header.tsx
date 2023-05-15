import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import SignOut from "./signOut";

export default async function Header() {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });

  const isLoggedIn = await supabase.auth
    .getSession()
    .then(({ data: { session } }) => {
      return Boolean(session);
    });

  return (
    <div>
      <Link href="/">
        <Image src="/nps.svg" width={36} height={36} alt="NPS Logo" />
        Tracker
      </Link>
      {isLoggedIn ? <SignOut /> : <Link href="/signin">Sign In</Link>}
    </div>
  );
}