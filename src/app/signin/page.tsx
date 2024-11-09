import SignInForm from "./signInForm";
import Link from "next/link";
import Header from "../header/header";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clientConfig, serverConfig } from "../firebase.config";

export default async function SignIn() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey!,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (tokens) {
    redirect("/dashboard");
  }

  return (
    <main className="flex items-center flex-col h-screen bg-tan px-4">
      <Header />
      <h1 className="text-4xl mt-8 mb-2 text-gray-800 text-center">
        Your Account
      </h1>
      <p className="mb-8 text-gray-700 text-center">
        Sign in or{" "}
        <Link className="text-light_green hover:underline" href="/signup">
          create an account
        </Link>
      </p>
      <SignInForm />
    </main>
  );
}
