import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Project from "@/models/Project";
import { projectSchema } from "@/Validation/Server/validator";
import User from "@/models/user";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: any) {
  try {

    const currentUser = await getCurrentUser();
    console.log(currentUser);
    const { projectTitle, abstract, fundingAgency, startDate, endDate, expectedTimeline } = await req.json();

    // Validate input using Joi
    const { error } = projectSchema.validate({
      projectTitle,
      abstract,
      fundingAgency,
    //   startDate,
    //   endDate,
      expectedTimeline,
    });

    if (error) {
      return NextResponse.json({ message: error.details[0].message }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Check if the user exists
    const user = await User.findById(currentUser.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Create a new project
    const newProject = new Project({
      projectTitle,
      abstract,
      fundingAgency,
      startDate,
      endDate,
      expectedTimeline,
      currentUser.userId,
    });

    await newProject.save();

    return NextResponse.json({ message: "Project created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
