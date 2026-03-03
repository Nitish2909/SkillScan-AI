import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected Successfully");
  } catch (error) {
    console.error("Error connecting to Database");
    process.exit(1);
  }
};

export default connectDB;