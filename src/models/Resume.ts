import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  userEmail?: string;
  filename?: string;
  extractedText?: string;
  parsedData?: any;
  analysis?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    userEmail: { type: String, index: true },
    filename: { type: String },
    extractedText: { type: String },
    parsedData: { type: Schema.Types.Mixed, default: {} },
    analysis: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);
