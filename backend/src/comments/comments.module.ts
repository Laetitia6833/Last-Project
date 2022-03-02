import { CommentsController } from './comments.controller';
import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {CommentSchema} from './schemas/comment.schema';
import {CommentsService} from './comments.service';


@Module({ 
    imports: [
        MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema}])
    ],
    controllers: [CommentsController],
    providers: [CommentsService],
    exports: []
})

export class CommentsModule {}