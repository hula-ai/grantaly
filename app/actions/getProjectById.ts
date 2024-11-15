import connectToDatabase from "@/lib/mongoose";
import Project from "@/models/project";

interface IParams {
  projectId: string;
}

export async function getProjectById(params: IParams) {
  try {
    await connectToDatabase();
    const { projectId } = params;

    if (!projectId) {
      return null;
    }

    // Fetch a single project document by its ID
    const fetchedProject = await Project.findById(projectId).lean().exec();
    if (!fetchedProject) {
      return null; // Return null if the project is not found
    }

    // Ensure the fetched project is JSON-serializable
    const serializedProject = {
      ...fetchedProject,
      _id: fetchedProject._id.toString(), // Convert ObjectId to string
      userId: fetchedProject.userId?.toString() || null, // Convert ObjectId to string (if exists)
      startDate: fetchedProject.startDate?.toISOString() || null, // Convert Date to ISO string
      endDate: fetchedProject.endDate?.toISOString() || null, // Convert Date to ISO string
    };

    return serializedProject;

  } catch (e) {
    console.error("Error fetching project:", e);
    throw new Error("Failed to fetch project data");
  }
}
