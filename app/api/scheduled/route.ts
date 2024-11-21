export const dynamic = "force-dynamic";

import connectToDatabase from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/project";
import getCurrentUser from "@/actions/getCurrentUser";
import { LIMIT_COUNT } from "@/utils/constant";
import { Role } from "@/types/enum";
import Meeting from "@/models/meeting";

export async function GET(req: NextRequest) {
  try {
    // Authenticate the user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthorized Access" },
        { status: 401 }
      );
    }

    const isAdmin = currentUser.role === Role.ADMIN;

    const { searchParams } = new URL(req.url);

    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || LIMIT_COUNT.toString(), 10);

    // Connect to the database
    await connectToDatabase();

    // Build query for projects
    const query = isAdmin ? {} : { };

    // Fetch projects with pagination
    const projects = await Meeting.find(query)
      .sort({ createdAt: -1 })
      .skip(page * limit) // Skip documents based on page
      .limit(limit); // Limit the number of documents

    // Calculate the total count of projects (for pagination)
    const totalCount = await Meeting.countDocuments(query);

    // Respond with both the projects data and the total count
    return NextResponse.json({ data: projects, totalCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
