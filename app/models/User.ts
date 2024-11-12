import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { roles, status } from "@/utils/constant";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,  // Make this optional since Google might not provide it
  },
  lastName: {
    type: String,
    required: false,  // Same here
  },
  contact: {
    type: String,
    required: false,  // Optional for Google OAuth, but can be added later
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure uniqueness for email
  },
  password: {
    type: String,
    required: false,  // Optional for Google OAuth
  },
  googleId: {
    type: String,
    required: false,  // Only needed if the user logs in via Google
    unique: true,  // Ensure Google ID is unique
  },
  role: {
    type: String,
    enum: roles,
    default: Role.USER,
  },
  image: {
    type: String,
    required: false,  // Optional field for Google profile image
  },
  resetToken: {
    type: String,
    default: null,
  },
  resetTokenExpiration: {
    type: Date,
    default: null,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
