import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { connectToMongoDB } from "@/lib/db";
import Case from "@/models/case";
import User from "@/models/user";
import { UserObject } from "@/types/type";
import { getServerSession } from "next-auth";
import { getCurrentUser } from "./getCurrentUser";

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getAllCasesOfCurrentUser() {
  try {
    const Session = await getSession();
    
    if (!Session) {
      return null;
    }

    const CurrentUser = await getCurrentUser();
    if(!CurrentUser) {
        return null;
    }
    const casesByUserId = await Case.find({ assigne: { $in: [CurrentUser._id] } }).lean().exec();

    return JSON.parse(JSON.stringify(casesByUserId));

  } catch (e) {
    console.error("Error fetching user:", e);
    throw new Error("Failed to fetch user data");
  }
}