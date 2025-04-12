import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import studentRoutes from "./routes/studentRoutes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", studentRoutes);

// MongoDB connection
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
