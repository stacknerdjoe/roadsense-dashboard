import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import mongoose from "mongoose";
import uploadRoutes from "./routes/upload";
import dataRoutes from "./routes/data";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/data", dataRoutes);

app.get("/", (req, res) => {
  res.send("🚀 RoadSense backend is running!");
});

const MONGO_URI = process.env.MONGO_URI || "";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
