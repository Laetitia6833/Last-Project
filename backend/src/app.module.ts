import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './Users/guards/roles.guard';
import { UsersModule } from './Users/users.module';

import { TagsModule } from './Tag/tags.module';
import { CommentsModule } from './Comments/comments.module'
import { MailModule } from './mail/mail.module';
import { LocationsController } from './locations/locations.controller';
import { LocationsModule } from './locations/locations.module';
import { MissionModule } from './mission/mission.module';
import { MessagesModule } from './messages/messages.module';


@Module({
  imports: [
    MailModule,
    UsersModule,
    TagsModule,
    CommentsModule,
    MissionModule,
    AuthModule,
    MessagesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://final:final@cluster0.q3pdd.mongodb.net/final?retryWrites=true&w=majority',
      {
        useNewUrlParser: true
      }
    ),
    MailModule,
    LocationsModule
  ],
  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
  ],
})
export class AppModule { }
