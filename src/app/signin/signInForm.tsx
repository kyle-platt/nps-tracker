"use client";

import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import Input from "../common/Input";
import { auth } from "../firebase";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div className="w-full max-w-sm relative">
      {error && (
        <div className="text-center text-red-600 absolute w-full -top-4">
          {error}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <label className="flex flex-col text-gray-800 mb-3">
          Email
          <Input
            className="mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </label>
        <label className="flex flex-col text-gray-800 mb-6">
          Password
          <Input
            className="mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
}
