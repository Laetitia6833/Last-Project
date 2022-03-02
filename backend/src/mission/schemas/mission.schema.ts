import * as mongoose from "mongoose";

export const MissionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  studentId: { type: String, required: true },
  userName: { type: String },
  studentList: { type: String },
  descritpion: String,
  accepted: { type: Boolean },
  done: { type: Boolean },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date },
  seen: {
    type: Boolean,
    default: false
  },
  status: String
}, { strict: false })
