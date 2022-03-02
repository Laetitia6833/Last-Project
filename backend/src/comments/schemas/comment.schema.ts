import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    studentId: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    missionId: String

}, { strict: false })
