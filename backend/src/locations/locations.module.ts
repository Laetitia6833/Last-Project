import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/Users/schemas/user.schema';
import { UsersModule } from 'src/Users/users.module';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { LocationSchema } from './schemas/locations.schemas';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: 'Location', schema: LocationSchema },
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule { }
