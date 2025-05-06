import mongoose, { Error } from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
export const connectDb = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch(error) {
    console.log("Error connection to MongoDB: ");
    console.log(error);
    process.exit(1);
  }
}