import mongoose from "mongoose";

export interface AdminInput {
  email: string;
  name: string;
  password: string;
  salt: string;
  sessionToken: string;
}

export interface AdminDocument extends AdminInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    salt: { type: String, required: false },
    sessionToken: { type: String, select: false },
  },
  {
    timestamps: true,
  }
);
const AdminModel = mongoose.model<AdminDocument>("Admin", adminSchema);
export default AdminModel;
