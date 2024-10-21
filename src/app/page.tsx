"use client";

import Header from "./header/header";
import Link from "./common/Link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function Home() {
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
    <main className="flex items-center flex-col h-screen bg-tan px-4">
      <Header />
      <h1 className="text-4xl mt-8 mb-2 text-gray-800 text-center">
        National Park Tracker
      </h1>
      <p className="mb-8 text-gray-700 text-center">
        Track your trips to national parks across the United States.
      </p>
      {isLoggedIn ? (
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
