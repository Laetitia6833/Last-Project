import { Date } from "mongoose";
import { IsNotEmpty } from 'class-validator';

export class CommentMissionCredentialsDto {
  @IsNotEmpty()
  studentId: string;
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  missionId: string

  date: Date;
}
