const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing
const User = require('../models/user'); // Ensure the User model is correctly imported
const { Role } = require('../types/enum'); // Destructure Role from the enum

// MongoDB connection URI from your .env file
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
      return;
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

    // Close MongoDB connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding users:', error);
    mongoose.connection.close();
  }
};

seedAdmin();
