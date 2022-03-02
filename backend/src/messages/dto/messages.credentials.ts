import { IsNotEmpty } from "class-validator"

export class MessageCresdentialsDto {
  from: string

  @IsNotEmpty()
  to: string
  // seen: boolean

  @IsNotEmpty({ message: "Veuillez entrer un message" })
  content: string

  missionId: string

  created_at: Date
}
