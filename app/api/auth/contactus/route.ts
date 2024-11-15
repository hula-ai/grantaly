import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import ContactUs from "@/models/contactus";
import { contactUsSchema } from "@/Validation/Server/validator";


export async function POST(req) {
  try {
    const { firstName, lastName, email, contact, message } = await req.json();

    // Validate input using Joi
    const { error } = contactUsSchema.validate({ firstName, lastName, email, contact, message });
    if (error) {
      return NextResponse.json({ message: error.details[0].message }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Create a new contact entry
    const newContact = new ContactUs({
      firstName,
      lastName,
      email,
      contact,
      message,
    });

    await newContact.save();

    return NextResponse.json({ message: "Message submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving information:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
