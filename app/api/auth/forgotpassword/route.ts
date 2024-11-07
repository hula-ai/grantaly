import clientPromise from '@/lib/mongodb';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(req) {

  const { email } = await req.json();
  if (!email) {
    return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
  }


  
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  // Check if the user exists
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
  }

  // Generate a unique token
  const token = crypto.randomBytes(32).toString("hex");
  const expirationTime = Date.now() + 3600000; // Token valid for 1 hour

  // Store the token and expiration in the database
  await db.collection("users").updateOne(
    { email },
    { $set: { resetToken: token, resetTokenExpiration: expirationTime } }
  );


  // Configure nodemailer to send email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  // Compose the email
  const resetLink = `${process.env.NEXTAUTH_URL}/resetpassword?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `Click the link to reset your password: ${resetLink}`,
  };


  // Send the email
  await transporter.sendMail(mailOptions);
//   return new Response(JSON.stringify({ message: 'success1' }));
  

  return new Response(JSON.stringify({ message: 'Reset link sent to email' }), { status: 200 });
}
