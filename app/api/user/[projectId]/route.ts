export const dynamic = "force-dynamic"

import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Project from "@/models/newproject";
import getCurrentUser from "@/actions/getCurrentUser";




interface IParams {
  userId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
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


    const { userId } = params;

    // Fetch all projects or only the projects of a specific user
    let projects;
    if (userId) {
      // Load projects associated with the specified userId
      projects = await Project.find({ userId: userId });
    } else {
      // Load all projects
      projects = await Project.find();
    }

    return NextResponse.json({ projects }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
