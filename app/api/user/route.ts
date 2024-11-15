
export const dynamic = "force-dynamic"
import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/user";
import Project from "@/models/project";  // Assuming Project is a separate model
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthorized Access" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Step 1: Find project IDs that are associated with at least one user
    const projects = await Project.find({ userId: { $ne: null } }).distinct('userId');

    // Step 2: Retrieve the users who have at least one project
    const users = await User.find({ _id: { $in: projects } });

    return NextResponse.json(
      users,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
