import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = () => {
  mongoose
    .connect(process.env.MONOGODB_URL)
    .then(() => {
      console.log("Connected to monogDB");
    })
    .catch((err) => {
      console.log("Error connecting to db: " + err);
    });
};

export default db;

