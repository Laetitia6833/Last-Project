import { MissionController } from './mission.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionSchema } from './schemas/mission.schema';
import { MissionService } from './mission.service';
import { UsersService } from 'src/Users/users.service';
import { UserSchema } from 'src/Users/schemas/user.schema';
import { MessagesService } from 'src/messages/messages.service';
import { MessagesModule } from 'src/messages/messages.module';
import { MessagesController } from 'src/messages/messages.controller';
import { MessageSchema } from 'src/messages/schema/message.schema';

@Module({
  imports: [
    MessagesModule,
    MongooseModule.forFeature([
      { name: 'Mission', schema: MissionSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Message', schema: MessageSchema }
    ])
  ],
  controllers: [MissionController],
  providers: [MissionService, MessagesService],
  exports: [MissionService]
})
export class MissionModule { }
