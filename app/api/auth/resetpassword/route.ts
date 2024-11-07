import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { token, password } = await req.json();
  
  if (!token || !password) {
    return new Response(JSON.stringify({ message: 'Token and password are required' }), { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  // Find user with the matching token
  const user = await db.collection("users").findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  });

  if (!user) {
    return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 400 });
  }

  // Hash the new password and update the user document
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.collection("users").updateOne(
    { resetToken: token },
    {
      $set: { password: hashedPassword },
      $unset: { resetToken: "", resetTokenExpiration: "" },
    }
  );

  return new Response(JSON.stringify({ message: 'Password reset successfully' }), { status: 200 });
}
