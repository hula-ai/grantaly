export const dynamic = "force-dynamic"

import connectToDatabase from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/project";
import getCurrentUser from "@/actions/getCurrentUser";
import { LIMIT_COUNT } from "@/utils/constant";

interface Query {
  userId?: string;
  privacy?: string;
}

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

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const privacy = searchParams.get("privacy")?.toLowerCase();

    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || LIMIT_COUNT.toString(), 10);

    let query: Query = {};
    // if (userId) query.userId = userId;
    // if (privacy) query.privacy = privacy;

    // Connect to the database
    await connectToDatabase();

    // Fetch projects from the database
    const projects = await Project.find(query).sort({ createdAt: -1 })
    .skip((page) * limit) // Skip documents based on page
    .limit(limit); // Limit the number of documents;

    // Calculate the total count of projects (this is used for pagination)
    const totalCount = await Project.countDocuments(query);

    // Respond with both the projects data and the total count
    return NextResponse.json({ data: projects, totalCount: totalCount }, { status: 200 });


  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
