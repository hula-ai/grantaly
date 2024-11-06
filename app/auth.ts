import { ObjectId } from "mongodb"; // Make sure this is imported
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

interface User {
  id: string; // Change to string if that's what NextAuth expects
  email: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        // Find user by email
        const user = await db.collection("users").findOne({ email: credentials?.email });

        if (user) {
          // Compare passwords (make sure to hash passwords in production)
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordCorrect) {
            return { id: user._id.toString(), email: user.email }; // Convert ObjectId to string
          } else {
            return null
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Ensure user id is included in the session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user id to the token
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
  secret: process.env.NEXTAUTH_SECRET,
};
