import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";
import uploadRoutes from "./routes/upload";
import dataRoutes from "./routes/data";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "https://roadsense-dashboard.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/data", dataRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 RoadSense backend is running!");
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
