import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Image from "next/image";
import SignOut from "./signOut";
import Link from "../common/Link";
import NextLink from "next/link";

export default async function Header() {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });

  const isLoggedIn = await supabase.auth
    .getSession()
    .then(({ data: { session } }) => {
      return Boolean(session);
    });

  return (
    <div className="flex justify-between p-4 w-full">
      <NextLink href="/" className="flex items-center text-gray-800 font-bold">
        <Image
          src="/nps.svg"
          width={36}
          height={36}
          alt="NPS Logo"
          className="mr-2"
        />
        Tracker
      </NextLink>
      {isLoggedIn ? (
        <SignOut />
      ) : (
        <Link variant="secondary" href="/signin">
          Sign In
        </Link>
      )}
    </div>
  );
}
