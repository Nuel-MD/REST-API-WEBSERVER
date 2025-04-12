import mongoose, { Document, Schema } from "mongoose";

interface IStudent extends Document {
  name: string;
  email: string;
  course: string;
  grade: number;
}

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    grade: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStudent>("Student", studentSchema);
