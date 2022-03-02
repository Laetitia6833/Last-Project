import { Document } from "mongoose";

export interface Message extends Document {
  from: string
  to: string
  missionId: string
  seen: boolean
  content: string
  created_at: Date
}
