import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected:", db.connection.name);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error); 
    throw new Error("Failed to connect to the database");
  }
};

export default connectToDatabase;
