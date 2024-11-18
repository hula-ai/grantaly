import connectToDatabase from "@/lib/mongoose";
import getCurrentUser from "./getCurrentUser";
import Project from "@/models/project";

import { Project as ProjectInterface } from "@/interface/interface";

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
      (project:ProjectInterface) => {
        if(project.formStep === 3 && project.adminDocs.length > 0 && project.clientDocs.length === 0)
          return true
        if(project.formStep === 4 && project.dataUploadContent.length === 0 )
          return true
        if(project.formStep === 5 && project.resultContent && !project.isCompeleted )
          return true
      }
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
