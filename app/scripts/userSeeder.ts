// scripts/userSeeder.js
import mongoose from 'mongoose';
import User from '../models/User';


// MongoDB connection URI from your .env file
const MONGODB_URI = process.env.MONGODB_URI;


const users = [
  {
    email: 'user1@example.com',
    password: 'password1', // You should hash this in the database
  },
  {
    email: 'user2@example.com',
    password: 'password2', // You should hash this in the database
  },
  {
    email: 'user3@example.com',
    password: 'password3', // You should hash this in the database
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(MONGODB_URI); // Just use the MONGODB_URI
    console.log('Connected to MongoDB');

    // Clear the existing users collection
    await User.deleteMany();

    // Create new users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = user.password
        return {
          email: user.email,
          password: hashedPassword,
        };
      })
    );

    await User.insertMany(hashedUsers);
    console.log('Users seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

seedUsers();
