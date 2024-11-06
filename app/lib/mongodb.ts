// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Your MongoDB connection string
// Remove deprecated options
const options = {
  // No longer needed in the latest MongoDB driver versions
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>; // Explicitly set the type

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to maintain the MongoDB client connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client for every connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
