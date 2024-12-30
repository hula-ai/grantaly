// pages/api/sendDeadlineReminder.js

export const dynamic = "force-dynamic";
import { sendDeadlineReminder } from "@/lib/notification";
import Project from "@/models/project";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { formatDate } from "@/helper/formateDate";
import connectToDatabase from "@/lib/mongoose";

export async function POST(req: Request) {
  const adminEmail = process.env.CLIENT_EMAIL;
  const today = new Date();
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  try {

    await connectToDatabase();

    const projects = await Project.find({
      endDate: {
        $gte: today,
        $lte: threeDaysLater,
      },
      isCompeleted: false,
    });

    console.log(projects.length,'aldkwamd 1')

    if (projects.length === 0) {
      return NextResponse.json(
        { message: "No projects with upcoming deadlines found." },
        { status: 200 }
      );
    }

    console.log(projects.length,'aldkwamd 2')

    const results = [];

    for (let i = 0; i < projects.length; i++) {
      const deadlineDetails = {
        project: projects[i].projectTitle,
        date: formatDate(projects[i].endDate),
      };

      const user = await User.findOne({ _id: projects[i].userId });

      if (!user || !user.email) {
        results.push({
          project: projects[i].projectTitle,
          status: "failed",
          error: "User or email not found.",
        });
        continue;
      }

      try {
        await sendDeadlineReminder(user.email, adminEmail, deadlineDetails);
        results.push({
          project: projects[i].projectTitle,
          status: "success",
        });
      } catch (error) {
        results.push({
          project: projects[i].projectTitle,
          status: "failed",
          error: error.message,
        });
      }
    }

    console.log(results)
    return NextResponse.json(
      { message: "Notifications processed.", results },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing reminders.", error: error.message },
      { status: 500 }
    );
  }
}
