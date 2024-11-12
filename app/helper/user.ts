import { connectToMongoDB } from "@/lib/db";
import User from "@/models/user";

interface IParams {
  id: string | undefined | null;
}

export async function getCurrentUser(params: IParams) {
  try {
    const { id } = params;

    if (!id) {
      return null;
    }
    
    // await connectToMongoDB();
    
    // // Fetch a single user document by its ID
    const currentUser = await User.findById(id).exec();
    return JSON.parse(JSON.stringify(id));

    // if (!currentUser) {
    //   return null; // Return null if the user is not found
    // }

    // // Convert the document to a plain JavaScript object
    // const currentUserObject = currentUser.toObject();

    // // Optionally, you might want to convert specific fields like ObjectId to strings
    // if (currentUserObject._id) {
    //   currentUserObject._id = currentUserObject._id.toString();
    // }

    // return JSON.parse(JSON.stringify(currentUserObject));
  } catch (e) {
    console.error("Error fetching user:", e);
    throw new Error("Failed to fetch user data");
  }
}
