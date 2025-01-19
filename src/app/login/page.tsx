"use client";

import AuthForm from "@/components/AuthForm";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");

  const handleLogin = async (data: { email: string; password: string }) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect to home or dashboard after successful login
      window.location.href = "/";
    }
  };

  return (
    <div className="p-8">
      <AuthForm title="Sign In" submitLabel="Sign In" onSubmit={handleLogin} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
