"use client";

import Image from "next/image";
import SignOut from "./signOut";
import Link from "../common/Link";
import NextLink from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <div className="flex justify-between py-4 w-full">
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
    </div>
  );
}
