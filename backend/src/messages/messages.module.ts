import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/Users/schemas/user.schema";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { MessageSchema } from "./schema/message.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Message', schema: MessageSchema },
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService]
})

export class MessagesModule { }
