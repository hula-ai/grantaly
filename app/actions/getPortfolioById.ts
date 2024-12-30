import connectToDatabase from "@/lib/mongoose";
import Portfolio from "@/models/portfolio";
import { Document, Types } from "mongoose";

interface IPortfolio {
  _id: Types.ObjectId;       // Ensure ObjectId is typed correctly
  __v: number;               // The version field
  projectTitle: string;      // Title of the project
  projectTagLine: string;    // Tagline of the project
  content: string[];         // Array of content strings
  image: string;             // Image URL or file path
  createdAt?: Date;          // Optional: Timestamp for creation
  updatedAt?: Date;          // Optional: Timestamp for update
}

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
    const fetchedPortfolio = await Portfolio.findById(portfolioId)
      .lean<IPortfolio>()
      .exec();

    if (!fetchedPortfolio) {
      return null; // Return null if the project is not found
    }


    // Ensure the fetched project is JSON-serializable
    const serializedProject = {
      ...fetchedPortfolio,
      _id: fetchedPortfolio._id.toString(), // Convert ObjectId to string
    };

    return serializedProject;
  } catch (e) {
    console.error("Error fetching project:", e);
    throw new Error("Failed to fetch project data");
  }
}
