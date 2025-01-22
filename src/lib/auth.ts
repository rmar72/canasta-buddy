import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUser } from "@/db/users";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
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
    signOut: "/logout",
    error: "/login",
    // signUp: "/sign-up", // Add the sign-up page
  },
  session: {
    strategy: "jwt" as const, // Fix the type by explicitly declaring it as a constant
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your .env file
};

export default NextAuth(authOptions);
