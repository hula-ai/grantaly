import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Project from "@/models/Project";
import { projectSchema } from "@/Validation/Server/validator";
import User from "@/models/user";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  projectId: string;
  stepId: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { message: "UnAuthorized Access" },
        { status: 401 }
      );
    }

    const { projectId, stepId } = params;
    const NumStepId = parseInt(stepId);
    if (isNaN(NumStepId)) {
      return NextResponse.json({ message: "Invalid Step Id" }, { status: 401 });
    }

    const {
      projectTitle,
      abstract,
      fundingAgency,
      startDate,
      endDate,
      expectedTimeline,
      userId,
    } = await req.json();
    const id = userId ? userId : currentUser.id;

    const { error } = projectSchema.validate({
      projectTitle,
      abstract,
      fundingAgency,
      expectedTimeline,
    });

    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if the user exists
    const user = await User.findById(id);
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
      userId: id,
      isCompeleted: false,
      formStep: NumStepId,
    });

    // console.log(id, "I am id 2");

    const savedProject = await newProject.save();

    return NextResponse.json(
      { message: "Project created successfully", projectId: savedProject._id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const {
      projectTitle,
      abstract,
      fundingAgency,
      startDate,
      endDate,
      expectedTimeline,
      userId,
    } = await req.json();

    const { projectId, stepId } = params;
    const id = userId ? userId : currentUser.id;

    const NumStepId = parseInt(stepId);
    if (isNaN(NumStepId)) {
      return NextResponse.json({ message: "Invalid Step Id" }, { status: 401 });
    }

    //   const { error } = projectSchema.validate({
    //     projectTitle,
    //     abstract,
    //     fundingAgency,
    //     expectedTimeline,
    //   });

    //   if (error) {
    //     return NextResponse.json({ message: error.details[0].message }, { status: 400 });
    //   }

    await connectToDatabase();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    if (project.userId.toString() !== id) {
      return NextResponse.json(
        { message: "Unauthorized to edit this project" },
        { status: 403 }
      );
    }

    if (NumStepId === 1) {
      project.projectTitle = projectTitle || project.projectTitle;
      project.abstract = abstract || project.abstract;
      project.fundingAgency = fundingAgency || project.fundingAgency;
      project.startDate = startDate || project.startDate;
      project.endDate = endDate || project.endDate;
      project.expectedTimeline = expectedTimeline || project.expectedTimeline;
      project.formStep =
        NumStepId > project.formStep ? NumStepId : project.formStep;
      project.isCompeleted = project.formStep === 5 ? true : false;
    } else if (NumStepId === 2) {
      project.isBooked = true;
    }
    await project.save();

    return NextResponse.json(
      { message: "Project updated successfully", projectId: project._id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
