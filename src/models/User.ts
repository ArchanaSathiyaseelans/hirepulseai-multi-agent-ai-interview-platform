import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  coins: number;
  interviewCoin: number;
  avatar?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    coins: { type: Number, default: 150 },
    interviewCoin: { type: Number, default: 150 },
    avatar: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
