import mongoose, { Schema, Document } from 'mongoose';

export interface IRoadmap extends Document {
  userEmail?: string;
  role: string;
  targetPackage?: string;
  title?: string;
  level?: string;
  duration?: string;
  modules?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

const RoadmapSchema = new Schema<IRoadmap>(
  {
    userEmail: { type: String, index: true },
    role: { type: String, required: true },
    targetPackage: { type: String },
    title: { type: String },
    level: { type: String },
    duration: { type: String },
    modules: { type: Array, default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Roadmap || mongoose.model<IRoadmap>('Roadmap', RoadmapSchema);
