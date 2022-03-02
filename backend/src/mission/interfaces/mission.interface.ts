import { Document } from 'mongoose';

export interface Mission extends Document {
  userId: string;
  userName: string;
  studentId: string;
  mission: string;
  comment: string;
  accepted: boolean;
  done: boolean;
  created_at: Date;
  updated_at: Date;
  seen: boolean
  status: string

}
