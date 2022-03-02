import { Date } from "mongoose";
import { IsNotEmpty } from 'class-validator';

export class CommentCredentialsDto {
    @IsNotEmpty()
    userId: string;
    @IsNotEmpty()
    studentId: string;
    @IsNotEmpty()
    content: string;

    missionId: string

    date: Date;
}
