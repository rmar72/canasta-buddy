import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUser } from "@/db/users";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("authorize called");
        console.log("credentials:", credentials);

        if (!credentials?.email || !credentials.password) {
          console.log("Missing credentials");
          throw new Error("Email and password are required");
        }

        const user = await verifyUser(credentials.email, credentials.password);
        console.log("user found:", user);

        if (user) {
          return user; // Return user object if valid
        }

        console.log("Invalid credentials");
        throw new Error("Invalid email or password");
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Redirect to login page on errors
  },
  session: {
    strategy: "jwt" as const, // Fix the type by explicitly declaring it as a constant
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your .env file
};

export default NextAuth(authOptions);
