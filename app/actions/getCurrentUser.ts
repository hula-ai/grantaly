import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import User from '@/models/User'; // Adjust the import path according to your structure

export const dynamic = "force-dynamic"


// Function to get session
export async function getSession() {
  return await getServerSession(authOptions);
}

// Define User interface
interface User {
  email: string;
  password?: string; // Assuming you may not need the password here
}

// Function to get current user
export default async function getCurrentUser(): Promise<User | null> {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    const session = await getSession();

    console.log('Called',session)
    if (!session?.user?.email) {
      return null;
    }
    console.log('Called 2')

    // // Connect to MongoDB if not connected yet
    if(!MONGODB_URI){
      return null;
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }

    // // Find the user by email
    const currentUser = await User.findOne({
      email: session.user.email as string,
    });

    if (!currentUser) {
      return null;
    }

    return {
      email: currentUser.email,
      // If you need more fields, add them here
    } as User; // Return the user object conforming to the User interface

  } catch (error: any) {
    console.error('Error fetching current user:', error); // Log the error for debugging
    return null;
  }
}


