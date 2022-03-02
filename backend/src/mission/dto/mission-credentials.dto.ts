import { Date } from 'mongoose';
import { IsNotEmpty } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class MissionCredentialsDto {
  // @IsNotEmpty()
  // userId: string;
  // @IsNotEmpty()
  // userName: string;
  @IsNotEmpty()
  studentId: string;
  @IsNotEmpty({ message: "Veuillez renseignez une description" })
  description: string;
  @Prop()
  accepted: boolean;
  @Prop({ default: false })
  done: boolean;
  comment: string;

  missionDate: Date

  created_at: Date;
  updated_at: Date;
}
