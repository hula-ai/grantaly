import connectToDatabase from '@/lib/mongoose';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { forgotPasswordSchema } from '@/Validation/Server/validator';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
  try {
    const { email } = await req.json();

    // Validate email using Joi
    const { error } = forgotPasswordSchema.validate({ email });
    if (error) {
      return NextResponse.json({ message: error.details[0].message }), { status: 400 };
    }

    // return new Response(JSON.stringify({ message: 'success1' }));
    // Connect to the database
    await connectToDatabase();
    // return new Response(JSON.stringify({ message: 'success1' }));



    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }), { status: 404 };
    }

    // Generate a unique token
    const token = crypto.randomBytes(32).toString("hex");
    const expirationTime = Date.now() + 3600000; // Token valid for 1 hour

    // Store the token and expiration in the user document
    user.resetToken = token;
    user.resetTokenExpiration = expirationTime;
    var hello = await user.save();
    console.log("HELLO",hello);

    // Configure nodemailer to send the email
    // const transporter = nodemailer.createTransport({
    //   service: 'Gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // Compose the email
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: 'Password Reset Request',
    //   text: `Click the link to reset your password: ${resetLink}`,
    // };

 

    // Send the email
    // await transporter.sendMail(mailOptions);

    // return new Response(JSON.stringify({ message: 'Reset link sent to email',url: resetLink }), { status: 200 });
    return NextResponse.json(resetLink), { status: 200 };
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }), { status: 500 };
  }
}
