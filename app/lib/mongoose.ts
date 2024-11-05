import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return; // Check if already connected

  // Remove deprecated options
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    // Options are no longer needed
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  console.log("MongoDB Connected:", db.connection.name);
};

export default connectToDatabase;
