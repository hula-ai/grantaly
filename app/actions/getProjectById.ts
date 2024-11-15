import connectToDatabase from "@/lib/mongoose";
import Project from "@/models/project";


interface IParams {
  projectId?: string;
}

export async function getProjectById(params: IParams) {
  try {
    await connectToDatabase();
    const { projectId } = params; 
    if (!projectId) {
      return null;
    }

    // Fetch a single case document by its ID
    const FetchedProject = await Project.findById(projectId).lean().exec();
    console.log("FetchedUser",FetchedProject);
    if (!FetchedProject) {
      return null; // Return null if the case is not found
    }

    return FetchedProject;

  } catch (e) {
    console.error("Error fetching user:", e);
    throw new Error("Failed to fetch user data");
  }
}
