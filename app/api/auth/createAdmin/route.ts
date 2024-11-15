import connectToDatabase from "@/lib/mongoose";
import bcrypt from "bcrypt";
import { signUpSchema } from "@/Validation/Server/validator";
import User from "@/models/newuser";
import { NextResponse } from "next/server";
import { Role } from "@/types/enum";

export async function POST(req: any) {

    
  try {
    const { firstName, lastName, email, contact, password, confirmPassword } = await req.json();


    

    

    // Connect to the database
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, {status: 409});
    }

    // Hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await new User({
      firstName,
      lastName,
      email,
      contact,
      password : hashedPassword,
      role : Role.ADMIN
    });
    console.log(firstName, lastName, email, contact, password);
    await newUser.save();

    return NextResponse.json({ message: "User created successfully" },{ status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500});
  }
}