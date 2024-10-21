"use client";

import { signOut } from "firebase/auth";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

export default function SignOut() {
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.replace("/");
    });
  };

  return (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
}
