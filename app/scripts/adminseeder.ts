import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Add bcrypt for password hashing
import User from '@/models/user';
import { Role } from '@/types/enum';

// MongoDB connection URI from your .env file
const MONGODB_URI = process.env.MONGODB_URI;

const users = [
  {
    firstname: 'Admin',
    lastname: '',
    contact: '+123456789',
    email: 'admin@grantaly.com',
    password: 'password', // Plain text password to be hashed
    role: Role.ADMIN, // Ensure Role.ADMIN exists in your Role enum
  },
];

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {});
    console.log('Connected to MongoDB');

    // Hash the password and create user objects
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hash password
        return {
          firstname: user.firstname,
          lastname: user.lastname,
          contact: user.contact,
          email: user.email,
          password: hashedPassword,
          role: user.role, // Ensure the role is set as Role.ADMIN
        };
      })
    );

    // Insert hashed users (e.g., admin) into the database
    await User.insertMany(hashedUsers);
    console.log('Admin user seeded successfully');

    // Close MongoDB connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding users:', error);
    mongoose.connection.close();
  }
};

seedAdmin();
