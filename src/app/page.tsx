import Header from "./header/header";
import Link from "./common/Link";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "./firebase.config";

export default async function Home() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey!,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  return (
    <main className="flex items-center flex-col h-screen bg-tan px-4">
      <Header />
      <h1 className="text-4xl mt-8 mb-2 text-gray-800 text-center">
        National Park Tracker
      </h1>
      <p className="mb-8 text-gray-700 text-center">
        Track your trips to national parks across the United States.
      </p>
      {tokens ? (
        <Link href="/dashboard">Go to dashboard</Link>
      ) : (
        <div>
          <Link variant="secondary" href="/signin" className="mr-2">
            Sign In
          </Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      )}
    </main>
  );
}
