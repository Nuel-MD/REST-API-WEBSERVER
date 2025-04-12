import dotenv from "dotenv";

dotenv.config();

export const config = {
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/student-api",
  port: process.env.PORT || 3000,
};
