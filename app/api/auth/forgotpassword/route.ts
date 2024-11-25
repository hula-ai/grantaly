import connectToDatabase from '@/lib/mongoose';
import crypto from 'crypto';
import { forgotPasswordSchema } from '@/Validation/Server/validator';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import sendEmail from '@/lib/mailer';

export async function POST(req: any) {
  try {
    const { email } = await req.json();

    // Validate email using Joi
    const { error } = forgotPasswordSchema.validate({ email });
    if (error) {
      return NextResponse.json({ message: error.details[0].message }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Generate a unique token
    const token = crypto.randomBytes(32).toString("hex");
    const expirationTime = Date.now() + 3600000; // Token valid for 1 hour

    // Store the token and expiration in the user document
    user.resetToken = token;
    user.resetTokenExpiration = expirationTime;
    await user.save();

    // Compose the email
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
    const mailContent = {
      to: email,
      subject: 'Password Reset Request',
      text: `Click the link to reset your password: ${resetLink}`,
      html: `Click the link to reset your password: ${resetLink}`,
    };

    await sendEmail(mailContent.to, mailContent.subject, mailContent.text, mailContent.html);

    // Return the response with the status code
    return NextResponse.json({ message: 'Password reset email sent', resetLink }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
