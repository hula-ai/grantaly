import connectToDatabase from "@/lib/mongoose";
import bcrypt from "bcrypt";
import { signUpSchema } from "@/Validation/Server/validator";
import User from "@/models/User";

export async function POST(req: any) {
  try {
    const { firstName, lastName, email, contact, password, confirmPassword } = await req.json();

    // Validate input using Joi
    const { error } = signUpSchema.validate({ 
      firstName, lastName, email, contact, password, confirmPassword,
    });
    if (error) {
      return new Response(
        JSON.stringify({ message: error.details[0].message }),
        { status: 400 }
      );
    }


    // Connect to the database
    await connectToDatabase();



    // Check if user already exists
    const existingUser = await User.findOne({ email });
    // return new Response(JSON.stringify({ message: 'success1' }));

    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
      });
    }


    // Hash the password

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      contact,
      password,
    });
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}