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

    if (!session?.user?.email) {
      return null;
    }

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

    const user = {
        firstName : currentUser.firstName,
        lastName : currentUser.lastName,
        contact : currentUser.contact,
        email : currentUser.email,
        password : currentUser.password,
    }

    return user

  } catch (error: any) {
    console.error('Error fetching current user:', error); // Log the error for debugging
    return null;
  }
}


