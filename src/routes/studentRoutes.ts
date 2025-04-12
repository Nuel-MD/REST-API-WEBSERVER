import { Router, RequestHandler } from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController";

const router = Router();

router.post("/students", createStudent as RequestHandler);
router.get("/students", getAllStudents as RequestHandler);
router.get("/students/:id", getStudentById as RequestHandler);
router.put("/students/:id", updateStudent as RequestHandler);
router.delete("/students/:id", deleteStudent as RequestHandler);

export default router;
