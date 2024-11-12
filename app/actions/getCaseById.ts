import { connectToMongoDB } from "@/lib/db";
import Case from "@/models/case";

interface IParams {
  caseId?: string;
}

export async function getCaseById(params: IParams) {
  try {
    await connectToMongoDB();
    const { caseId } = params;
    if (!caseId) {
      throw new Error("Case ID is required");
    }

    // Fetch a single case document by its ID
    const fetchedCase = await Case.findById(caseId).populate({
      path: "userId",
      select: "name",
    });
console.log("fetchedCase",fetchedCase);

    if (!fetchedCase) {
      return null; // Return null if the case is not found
    }

    return fetchedCase;
  } catch (e) {
    console.error("Error fetching case:", e);
    throw new Error("Failed to fetch case data");
  }
}
