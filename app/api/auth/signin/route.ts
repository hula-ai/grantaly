// // app/api/auth/signup/route.js
// import clientPromise from '@/lib/mongodb';
// import bcrypt from 'bcrypt';

// export async function POST(req) {
//   const { email, password } = await req.json();

//   if (!email || !password) {
//     return new Response(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
//   }

//   const client = await clientPromise;
//   const db = client.db(process.env.MONGODB_DB);

//   // Check if user already exists
//   const existingUser = await db.collection("users").findOne({ email });
//   if (existingUser) {
//     return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
//   }

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create a new user
//   const newUser = await db.collection("users").insertOne({
//     email,
//     password: hashedPassword,
//     // Add other fields as necessary
//   });

//   return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
// }


export async function POST() {

}