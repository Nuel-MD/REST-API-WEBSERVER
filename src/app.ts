import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import studentRoutes from "./routes/studentRoutes";
import healthRoutes from "./routes/healthRoutes";

const app = express();

// Middleware
app.use(express.json());

// API versioning and routes
app.use("/api/v1", studentRoutes);
app.use("/api/v1", healthRoutes);

// MongoDB connection
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

export default app;
