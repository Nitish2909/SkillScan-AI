import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js"
import cookieParser from "cookie-parser";

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:5173",
     origin: "https://skillscan-ai-website.onrender.com",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is runing on ${PORT} port `);
});
