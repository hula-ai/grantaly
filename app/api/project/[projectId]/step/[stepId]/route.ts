import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Project from "@/models/Project";
import { projectSchema } from "@/Validation/Server/validator";
import User from "@/models/user";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: any) {
  try {
    const currentUser = await getCurrentUser();

    const { projectTitle, abstract, fundingAgency, startDate, endDate, expectedTimeline, userId } = await req.json();

    const { error } = projectSchema.validate({
      projectTitle,
      abstract,
      fundingAgency,
      expectedTimeline,
    });

    if (error) {
      return NextResponse.json({ message: error.details[0].message }, { status: 400 });
    }

    await connectToDatabase();

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newProject = new Project({
      projectTitle,
      abstract,
      fundingAgency,
      startDate,
      endDate,
      expectedTimeline,
      userId,
    });

    const savedProject = await newProject.save();

    return NextResponse.json({ message: "Project created successfully", projectId: savedProject._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
  }
}


export async function PUT(req: any) {
    try {
      const currentUser = await getCurrentUser();
  
      const { projectId, projectTitle, abstract, fundingAgency, startDate, endDate, expectedTimeline, userId } = await req.json();

      const { error } = projectSchema.validate({
        projectTitle,
        abstract,
        fundingAgency,
        expectedTimeline,
      });
  
      if (error) {
        return NextResponse.json({ message: error.details[0].message }, { status: 400 });
      }

      await connectToDatabase();
  
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      const project = await Project.findById(projectId);
      if (!project) {
        return NextResponse.json({ message: "Project not found" }, { status: 404 });
      }
  
      if (project.userId.toString() !== userId) {
        return NextResponse.json({ message: "Unauthorized to edit this project" }, { status: 403 });
      }
  
      project.projectTitle = projectTitle || project.projectTitle;
      project.abstract = abstract || project.abstract;
      project.fundingAgency = fundingAgency || project.fundingAgency;
      project.startDate = startDate || project.startDate;
      project.endDate = endDate || project.endDate;
      project.expectedTimeline = expectedTimeline || project.expectedTimeline;
  
      await project.save();
  
      return NextResponse.json({ message: "Project updated successfully", projectId: project._id }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
    }
  }

  