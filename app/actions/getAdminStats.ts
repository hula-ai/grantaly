import connectToDatabase from "@/lib/mongoose";
import getCurrentUser from "./getCurrentUser";
import Project from "@/models/project";


export async function getAdminStats() {
  try {
    await connectToDatabase();

    const fetchedProjects = await Project.find();
    if (!fetchedProjects || fetchedProjects.length === 0) {
      return null; // Return null if no projects are found
    }
    
    const totalProjects = fetchedProjects.length ?? 0;
    const pendingProjects = fetchedProjects.filter((project) => !project.isCompleted).length ?? 0;
    const completedProjects = fetchedProjects.filter((project) => project.isCompleted).length ?? 0;
    const requiresAttention = fetchedProjects.filter((project) => project.formStep === 2 || project.formStep === 4).length ?? 0;
    
    return {
        totalProjects,
        pendingProjects,
        completedProjects,
        requiresAttention
    };

  } catch (e) {
    console.error("Error fetching project:", e);
    throw new Error("Failed to fetch project data");
  }
}
