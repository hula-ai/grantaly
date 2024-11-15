import connectToDatabase from "@/lib/mongoose";
import getCurrentUser from "./getCurrentUser";
import Project from "@/models/project";

export async function getUserStats() {
  try {
    // Authenticate the current user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized access. User not authenticated.");
    }

    // Connect to the database
    await connectToDatabase();

    // Fetch all projects
    const projects = await Project.find();

    // Filter projects belonging to the current user
    const fetchedProjects = projects.filter((p) => p.userId.toString() === currentUser.id);

    // Calculate statistics
    const totalProjects = fetchedProjects.length ?? 0;
    const pendingProjects = fetchedProjects.filter((project) => !project.isCompeleted).length ?? 0;
    const completedProjects = fetchedProjects.filter((project) => project.isCompeleted).length ?? 0;
    const requiresAttention = fetchedProjects.filter(
      (project) => project.formStep === 2 || project.formStep === 4
    ).length ?? 0;

    // Return the statistics
    return {
      totalProjects,
      pendingProjects,
      completedProjects,
      requiresAttention,
    };
  } catch (error) {
    console.error("Error fetching project stats:", error);
    throw new Error("Failed to fetch project data");
  }
}
