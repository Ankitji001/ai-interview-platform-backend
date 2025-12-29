import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

connectDB();

const app = express();
// console.log("ENV CHECK:", process.env.OPENAI_API_KEY);


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-interview-frontend.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  })
);


app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
