import connectToDatabase from '@/lib/mongoose';
import bcrypt from 'bcrypt';
import { resetPasswordSchema } from '@/Validation/Server/validator';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
  try {
    // Parse JSON from the request
    let data;
    try {
      data = await req.json();
    } catch (error) {
      return NextResponse.json({ message: 'Invalid JSON input' }, { status: 400 });
    }

    const { token, password } = data;

    // Validate input using Joi
    const { error } = resetPasswordSchema.validate({ token, password });
    if (error) {
      return NextResponse.json({ message: error.details[0].message }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user with the matching token and check if the token is still valid
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    // Hash the new password and update the user document
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
