import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './tag.schema';
import { TagsController } from './tags.controller';
import {TagsService } from './tags.service';

@Module ({
    imports : [
        MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema}])
    ],
    controllers: [TagsController],
    providers: [TagsService,],
    exports: [TagsModule, TagsService]
})

export class TagsModule {}