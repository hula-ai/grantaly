export const dynamic = "force-dynamic"

import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Project from "@/models/project";
import getCurrentUser from "@/actions/getCurrentUser";



export async function GET(req: Request) {
  try {
    // Authenticate the user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthorized Access" },
        { status: 401 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Fetch projects from the database
    const projects = await Project.find();

    // Calculate the total count of projects (this is used for pagination)
    const totalCount = await Project.countDocuments();

    // Respond with both the projects data and the total count
    return NextResponse.json({ data: projects, totalCount: totalCount }, { status: 200 });


  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
