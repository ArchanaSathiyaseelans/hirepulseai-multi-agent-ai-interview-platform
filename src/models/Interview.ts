import mongoose, { Schema, Document } from 'mongoose';

export interface IInterview extends Document {
  userEmail?: string;
  jobRole: string;
  jobDescription?: string;
  experienceYears?: string;
  techStack?: string[];
  status?: string;
  score?: number;
  questions?: any[];
  feedback?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

const InterviewSchema = new Schema<IInterview>(
  {
    userEmail: { type: String, index: true },
    jobRole: { type: String, required: true },
    jobDescription: { type: String },
    experienceYears: { type: String },
    techStack: [{ type: String }],
    status: { type: String, default: 'completed' },
    score: { type: Number, default: 85 },
    questions: { type: Array, default: [] },
    feedback: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.models.Interview || mongoose.model<IInterview>('Interview', InterviewSchema);
