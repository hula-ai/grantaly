import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import User from '@/models/User'; // Adjust the import path according to your structure
import { user } from '@/interface/interface';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

// Function to get session
async function getSession() {
  return await getServerSession(authOptions);
}

// GET handler to fetch current user
export async function GET() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    if (!MONGODB_URI) {
      return NextResponse.json({ message: "MongoDB URI is missing" }, { status: 500 });
    }

    // Connect to MongoDB if not connected yet
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }

    // Find the user by email
    const currentUser = await User.findOne({
      email: session.user.email as string,
    });

    if (!currentUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = {
      firstName: currentUser.firstName as string,
      lastName: currentUser.lastName as string,
      contact: currentUser.contact as string,
      email: currentUser.email as string,
      password: currentUser.password as string,
    };

    return NextResponse.json(user);

  } catch (error: any) {
    console.error('Error fetching current user:', error); // Log the error for debugging
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
