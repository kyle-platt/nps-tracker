"use client";

import { signOut } from "firebase/auth";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import { auth } from "../firebase.config";

export default function SignOut() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    await fetch("/api/logout");
    router.push("/");
  }

  return (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
}
