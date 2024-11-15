export const dynamic = "force-dynamic";

import connectToDatabase from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/project";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  projectId: string;
}

export async function DELETE(req: NextRequest, { params }: { params: IParams }) {
  try {
    // Authenticate the user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthorized Access" },
        { status: 401 }
      );
    }

    const { projectId } = params;

    if (!projectId) {
      return NextResponse.json(
        { message: "Project ID is missing" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Delete the project
    const deletionResult = await Project.deleteOne({ _id: projectId });

    if (deletionResult.deletedCount === 0) {
      return NextResponse.json(
        { message: "No project found with the provided ID" },
        { status: 404 }
      );
    }

    // Respond with success message
    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
