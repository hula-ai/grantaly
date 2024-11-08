import { ObjectId } from "mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // Import Google provider
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

interface User {
  id: string; 
  email: string;
}

export const authOptions = {
  providers: [
    // Credentials provider for email/password login
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
            return null;
          }
        } else {
          return null;
        }
      },
    }),

    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile) {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        console.log(profile,'my profile ')

        // Check if user with the same email exists
        const existingUser = await db.collection("users").findOne({ email: profile.email });
        const [firstName, lastName] = profile.name.split(" ");

        if (existingUser) {
          // If user exists, update their information (if necessary)
          await db.collection("users").updateOne(
            { email: profile.email },
            { $set: { googleId: profile.sub } }
          );
          return {
            id: existingUser._id.toString(),
            email: profile.email,
          };
        } else {
          // If user does not exist, create a new one
          const newUser = await db.collection("users").insertOne({
            email: profile.email,
            firstName: firstName,
            lastName: lastName,
            contact: '1234567890',
            googleId: profile.sub,
            resetToken: null,
            resetTokenExpiration: null,
            // You can add more fields as per your application (e.g. phone, address, etc.)
          });
          return {
            id: newUser.insertedId.toString(),
            email: profile.email,
          };
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
    signIn: '/auth/signin', // Custom sign-in page
    error: '/auth/error', // Error page
    
  },
  secret: process.env.NEXTAUTH_SECRET,
};
