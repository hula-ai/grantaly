// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/auth";

// Exporting handler and options correctly
const handler = NextAuth(authOptions);


export { handler as GET, handler as POST }; // Exports GET and POST handlers
