// import clientPromise from '@/lib/mongodb';
// import bcrypt from 'bcrypt';
// import next from 'next';
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//     return NextResponse.json({message:"success1"});
//   const { firstname, lastname, email, contact, password, confirmpassword } = await req.json();

//   // Check if all fields are provided
//   if (!firstname || !lastname || !email || !contact || !password || !confirmpassword) {
//     return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
//   }

//   // Check if password and confirm password match
//   if (password !== confirmpassword) {
//     return new Response(JSON.stringify({ message: 'Passwords do not match' }), { status: 400 });
//   }

//   const client = await clientPromise;
// //   const db = client.db(process.env.MONGODB_DB);

// //   // Check if user already exists
// //   const existingUser = await db.collection("users").findOne({ email });
// //   if (existingUser) {
// //     return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
// //   }

// //   // Hash the password
// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   // Create a new user
// //   const newUser = await db.collection("users").insertOne({
// //     firstname,
// //     lastname,
// //     email,
// //     contact,
// //     password: hashedPassword,
// //     // Add other fields as necessary
// //   });

// //   return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
// }
