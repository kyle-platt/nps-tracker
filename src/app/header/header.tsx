import Image from "next/image";
import SignOut from "./signOut";
import Link from "../common/Link";
import NextLink from "next/link";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../firebase.config";
import { use } from "react";

async function getIsLoggedIn() {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey!,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  return !!tokens;
}

export default function Header() {
  const isLoggedIn = use(getIsLoggedIn());

  return (
    <header className="flex justify-between py-4 w-full">
      <NextLink href="/" className="flex items-center text-gray-800 font-bold">
        <Image
          src="/nps.svg"
          width={36}
          height={36}
          alt="NPS Logo"
          className="mr-2"
          priority
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
    </header>
  );
}
