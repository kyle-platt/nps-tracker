"use client";

import SignOut from "./signOut";
import Link from "../common/Link";
import { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

export default function HeaderNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div />;
  }

  return isLoggedIn ? (
    <SignOut />
  ) : (
    <Link variant="secondary" href="/signin">
      Sign In
    </Link>
  );
}
