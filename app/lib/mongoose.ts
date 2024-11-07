import mongoose from 'mongoose';

const connectToDatabase = async () => {

  try{  
    if (mongoose.connection.readyState >= 1) return; // Check if already connected

    // Remove deprecated options
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      // Options are no longer needed
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
 
    console.log("MongoDB Connected:", db.connection.name);
  }
  catch(error){
    return new Response(JSON.stringify({ message: 'error ' }));
  }
}



export default connectToDatabase;
