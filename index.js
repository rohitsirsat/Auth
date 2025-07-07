import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js";

// routes
import userRoutes from "./routes/user.routes.js";

/**
 * by default dotenv loads the all env variables if the .evn is in the root of the project.
 *
 * else use config() to add further path and other configurations
 * */
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

db();

//user routes
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
