// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb"; // Adjust the import based on your structure
import { ObjectId } from "mongodb"; // Import ObjectId if needed

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB); // Use environment variable for database name

        // Find user by email
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (user) {
          // Compare passwords (make sure to hash passwords when saving and use a proper comparison)
          if (credentials.password === user.password) {
            return { id: user._id, email: user.email };
          } else {
            throw new Error("Invalid password");
          }
        } else {
          throw new Error("No user found");
        }
      },
    }),
  ],
  // Callbacks and other configurations
  callbacks: {
    async session({ session, token }) {
      // Include user info in the session
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    error: '/auth/error' // Error page
  },
});

export { handler as GET, handler as POST };
