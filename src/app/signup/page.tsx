"use client";

import { useRouter } from "next/navigation";
import SignUpForm from "./signUpForm";
import Link from "next/link";
import Header from "../header/header";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard");
      }
    });
  }, []);

  return (
    <main className="flex items-center flex-col h-screen bg-tan px-4">
      <Header />
      <h1 className="text-4xl mt-8 mb-2 text-gray-800 text-center">
        Create a New Account
      </h1>
      <p className="mb-8 text-gray-700 text-center">
        Sign up or{" "}
        <Link className="text-light_green hover:underline" href="/signin">
          sign in
        </Link>
      </p>
      <SignUpForm />
    </main>
  );
}
