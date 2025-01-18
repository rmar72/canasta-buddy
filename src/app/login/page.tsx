"use client";

import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Login Data:", data);
    // Handle login logic here (e.g., API call)
  };

  return (
    <div className="p-8">
      <AuthForm title="Login" submitLabel="Log In" onSubmit={handleLogin} />
    </div>
  );
}
