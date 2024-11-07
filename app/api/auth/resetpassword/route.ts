import connectToDatabase from '@/lib/mongoose';
import bcrypt from 'bcrypt';
import { resetPasswordSchema } from '@/Validation/Server/validator';
import User from '@/models/User';

export async function POST(req: any) {
  try {
    // Ensure the request has a body
    if (!req.body) {
      return new Response(JSON.stringify({ message: 'Request body is missing' }), { status: 400 });
    }

    // Parse JSON from the request
    let data;
    try {
      data = await req.json();
    } catch {
      return new Response(JSON.stringify({ message: 'Invalid JSON input' }), { status: 400 });
    }

    const { token, password } = data;

    // Validate input using Joi
    const { error } = resetPasswordSchema.validate({ token, password });
    if (error) {
      return new Response(JSON.stringify({ message: error.details[0].message }), { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user with the matching token and check if the token is still valid
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 400 });
    }

    // Hash the new password and update the user document
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    return new Response(JSON.stringify({ message: 'Password reset successfully' }), { status: 200 });
  } catch (error) {
    console.error("Error resetting password:", error);
    return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
  }
}
