import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGODB_URI}`);

    console.log(`\n☘️ MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed: (db.js): ", error);
  }
};

export default connectDB;
