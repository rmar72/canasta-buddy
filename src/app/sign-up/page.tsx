"use client";

import AuthForm from "@/components/AuthForm";

export default function SignUpPage() {
  const handleSignUp = (data: { email: string; password: string }) => {
    console.log("Sign Up Data:", data);
    // Handle sign-up logic here (e.g., API call)
  };

  return (
    <div className="p-8">
      <AuthForm title="Sign Up" submitLabel="Sign Up" onSubmit={handleSignUp} />
    </div>
  );
}
