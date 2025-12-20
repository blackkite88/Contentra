import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
let db;

const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db(); // database name is taken from the URI
    console.log("MongoDB connected");
  }
  return db;
};

export default connectDB;
