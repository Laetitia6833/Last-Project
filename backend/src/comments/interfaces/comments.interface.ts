import { Document } from 'mongoose';

export interface Comment extends Document {
    readonly userId: string;
    readonly studentId: string;
    readonly content: string;
    missionId: string
    date: Date
}
