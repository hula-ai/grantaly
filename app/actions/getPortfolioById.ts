import connectToDatabase from "@/lib/mongoose";
import Portfolio from "@/models/portfolio";
import Project from "@/models/project";

interface IParams {
  portfolioId: string;
}

export async function getPortfolioById(params: IParams) {
  try {
    await connectToDatabase();
    const { portfolioId } = params;

    if (!portfolioId) {
      return null;
    }

    // Fetch a single project document by its ID
    const fetchedPortfolio = await Portfolio.findById(portfolioId).lean().exec();
    if (!fetchedPortfolio) {
      return null; // Return null if the project is not found
    }

    console.log(fetchedPortfolio,'asdkjds')

    // Ensure the fetched project is JSON-serializable
    const serializedProject = {
      ...fetchedPortfolio,
      _id: fetchedPortfolio._id.toString(), // Convert ObjectId to string\
    };

    return serializedProject;

  } catch (e) {
    console.error("Error fetching project:", e);
    throw new Error("Failed to fetch project data");
  }
}
