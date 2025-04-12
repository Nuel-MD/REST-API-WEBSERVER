import { Request, Response } from "express";
import Student from "../models/student";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error?.message || "Error creating student" });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error?.message || "Error fetching students" });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error?.message || "Error fetching student" });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error?.message || "Error updating student" });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error?.message || "Error deleting student" });
  }
};
