import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/models/user'; // Adjust the import according to your project structure
import { Role } from '@/types/enum'; // Adjust the import
import { NextResponse } from 'next/server';

const MONGODB_URI = process.env.MONGODB_URI;

const user = {
  firstname: 'Admin',
  lastname: '',
  contact: '+123456789',
  email: 'admin@grantaly.com',
  password: 'password', // Plain text password to be hashed
  role: Role.ADMIN, // Ensure Role.ADMIN exists in your Role enum
};

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI!, {});
    console.log('Connected to MongoDB');

    // Check if the admin already exists
    const isAdminExist = await User.findOne({ email: user.email });
    if (isAdminExist) {
      console.log('Admin already seeded successfully');
      return { success: true, message: 'Admin already exists' };
    }

    // Hash the password and create user objects
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const hashedAdmin = {
      firstname: user.firstname,
      lastname: user.lastname,
      contact: user.contact,
      email: user.email,
      password: hashedPassword,
      role: user.role, // Ensure the role is set as Role.ADMIN
    };

    // Insert hashed user (admin) into the database
    await User.create(hashedAdmin); // `create()` is used to insert a single document
    console.log('Admin user seeded successfully');

    return { success: true, message: 'Admin user seeded successfully' };
  } catch (error) {
    console.error('Error seeding users:', error);
    return { success: false, message: 'Error seeding users' };
  } finally {
    mongoose.connection.close();
  }
};

export const POST = async (req: Request, res: Response) => {
    try {
        const result = await seedAdmin();
        return NextResponse.json(result);
      } catch (error) {
        return NextResponse.json({message: 'Internal server error'},{status: 500});
      }
}