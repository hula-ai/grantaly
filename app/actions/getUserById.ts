import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user";


interface IParams {
  userId?: string;
}

export async function getUserById(params: IParams) {
  try {
    await connectToDatabase();
    const { userId } = params; 
    if (!userId) {
      return null;
    }

    // Fetch a single case document by its ID
    const FetchedUser = await User.findById(userId).lean().exec();
    console.log("FetchedUser",FetchedUser);
    if (!FetchedUser) {
      return null; // Return null if the case is not found
    }

    return FetchedUser;

  } catch (e) {
    console.error("Error fetching user:", e);
    throw new Error("Failed to fetch user data");
  }
}
