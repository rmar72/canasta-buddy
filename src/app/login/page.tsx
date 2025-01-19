// "use client";

// import AuthForm from "@/components/AuthForm";

// export default function LoginPage() {
//   const handleLogin = (data: { email: string; password: string }) => {
//     console.log("Login Data:", data);
//     // Handle login logic here (e.g., API call)
//   };

//   return (
//     <div className="p-8">
//       <AuthForm title="Login" submitLabel="Log In" onSubmit={handleLogin} />
//     </div>
//   );
// }
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect to dashboard or home after successful login
      window.location.href = "/";
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Sign In
        </button>
      </form>
    </div>
  );
}
