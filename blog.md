# Building a Student Management REST API with Node.js, TypeScript, and MongoDB

This blog documents the process of creating a fully functional REST API for managing student records. The project uses Node.js, TypeScript, Express.js, and MongoDB, with Prisma for database schema management and Jest for testing.

---

## Project Overview

The Student Management API provides CRUD (Create, Read, Update, Delete) operations for managing student records. It includes features like:

- API versioning
- Health check endpoint
- Logging with Winston
- Unit testing with Jest
- Database schema management with Prisma
- Postman collection for API testing

---

## Project Structure

The project is organized as follows:

```
SRE BOOTCAMP/
├── jest.config.js          # Jest configuration for testing
├── Makefile                # Automation commands for building and running the project
├── package.json            # Project dependencies and scripts
├── postman_collection.json # Postman collection for API testing
├── README.md               # Project documentation
├── tsconfig.json           # TypeScript configuration
├── dump/                   # MongoDB dump for data migration
├── logs/                   # Log files for application
├── prisma/                 # Prisma schema for database management
├── src/                    # Source code
│   ├── app.ts              # Application entry point
│   ├── __tests__/          # Unit tests
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── utils/              # Utility functions (e.g., logger)
```

---

## Step-by-Step Guide to Building the Codebase

### 1. Initialize the Project

We started by creating a new Node.js project:

```bash
npm init -y
```

Installed the necessary dependencies:

```bash
npm install express mongoose typescript @types/express @types/node ts-node-dev dotenv winston jest @types/jest supertest @types/supertest ts-jest prisma @prisma/client
```

### 2. Set Up TypeScript

Initialized TypeScript configuration:

```bash
npx tsc --init
```

Updated `tsconfig.json` to include:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  }
}
```

### 3. Create the Application Entry Point

Created `src/app.ts` to set up the Express server and connect to MongoDB:

```typescript
import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import studentRoutes from "./routes/studentRoutes";
import healthRoutes from "./routes/healthRoutes";

const app = express();

app.use(express.json());
app.use("/api/v1", studentRoutes);
app.use("/api/v1", healthRoutes);

mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

export default app;
```

### 4. Configure Environment Variables

Created `src/config/config.ts` to manage environment variables:

```typescript
import dotenv from "dotenv";

dotenv.config();

export const config = {
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/student-api",
  port: process.env.PORT || 3000,
};
```

### 5. Define the Database Schema

Used Prisma to define the `Student` model in `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Student {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String   @unique
  course    String
  grade     Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 6. Implement CRUD Operations

Created `src/controllers/studentController.ts` to handle CRUD operations:

```typescript
import { Request, Response } from "express";
import Student from "../models/student";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Other CRUD operations...
```

### 7. Set Up Routes

Defined API routes in `src/routes/studentRoutes.ts`:

```typescript
import { Router } from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController";

const router = Router();

router.post("/students", createStudent);
router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

export default router;
```

### 8. Add Logging

Implemented logging with Winston in `src/utils/logger.ts`:

```typescript
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

export default logger;
```

### 9. Add a Health Check Endpoint

Created `src/routes/healthRoutes.ts`:

```typescript
import { Router } from "express";

const router = Router();

router.get("/healthcheck", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

export default router;
```

### 10. Write Unit Tests

Added unit tests for the health check endpoint in `src/__tests__/healthRoutes.test.ts`:

```typescript
import request from "supertest";
import app from "../app";

describe("Health Check Endpoint", () => {
  it("should return a healthy status", async () => {
    const response = await request(app).get("/api/v1/healthcheck");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "healthy");
  });
});
```

### 11. Create a Postman Collection

Documented the API endpoints in `postman_collection.json` for easy testing.

---

## Conclusion

This project demonstrates how to build a robust REST API with Node.js, TypeScript, and MongoDB. It includes best practices like API versioning, logging, testing, and database schema management. The codebase is modular and easy to extend for future features.
