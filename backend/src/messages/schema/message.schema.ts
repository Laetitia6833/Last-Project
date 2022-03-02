import * as mongoose from 'mongoose'

export const MessageSchema = new mongoose.Schema({
  from: String,

  to: String,

  missionId: String,

  seen: {
    type: Boolean,
    default: false
  },

  content: String,

  created_at: {
    type: Date,
    default: Date.now
  }
})
