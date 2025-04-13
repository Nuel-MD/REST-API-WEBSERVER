import { Router } from "express";
import logger from "../utils/logger";

const router = Router();

router.get("/healthcheck", (req, res) => {
  logger.info("Health check endpoint called");
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
