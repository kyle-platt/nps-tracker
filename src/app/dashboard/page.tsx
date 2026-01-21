import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../firebase.config";
import { redirect } from "next/navigation";
import ParkContent from "./parkContent";

export default async function Dashboard() {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey!,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens) {
    redirect("/signin");
  }

  return (
    <>
      <h1 className="text-4xl mt-8 mb-2 text-gray-800 text-center">
        Dashboard
      </h1>
      <p className="text-gray-700 text-center mb-4">
        Click the parks you have visited to track your progress.
      </p>
      <ParkContent />
    </>
  );
}
