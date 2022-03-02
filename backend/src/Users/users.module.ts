import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { MailModule } from "src/mail/mail.module";
import { MessagesService } from "src/messages/messages.service";
import { MessageSchema } from "src/messages/schema/message.schema";
import { MissionModule } from "src/mission/mission.module";
import { MissionService } from "src/mission/mission.service";
import { MissionSchema } from "src/mission/schemas/mission.schema";
import { UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [
        MailModule,
        MissionModule,
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'Mission', schema: MissionSchema },
            { name: 'Message', schema: MessageSchema }
        ])
    ],
    controllers: [UsersController],
    providers: [UsersService, MissionService, MessagesService],
    exports: [UsersService]
})

export class UsersModule { }
