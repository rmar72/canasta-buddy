"use client";

import AuthForm from "@/components/AuthForm";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const handleSignUp = async (data: { email: string; password: string }) => {
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Auto-sign in after sign-up
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!result?.error) {
        window.location.href = "/"; // Redirect to home or dashboard
      } else {
        alert("Sign-up successful! Please log in.");
        window.location.href = "/login";
      }
    } else {
      const errorData = await response.json();
      alert(`Sign-up failed: ${errorData.message}`);
    }
  };

  return (
    <div className="p-8">
      <AuthForm title="Sign Up" submitLabel="Sign Up" onSubmit={handleSignUp} />
    </div>
  );
}
