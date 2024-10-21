"use client";

import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Input from "../common/Input";
import Button from "../common/Button";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace("/dashboard");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="w-full max-w-sm relative">
      {error && (
        <div className="text-center text-red-600 absolute w-full -top-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSignUp}>
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
          Sign Up
        </Button>
      </form>
    </div>
  );
}
