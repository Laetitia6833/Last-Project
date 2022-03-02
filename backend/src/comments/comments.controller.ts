import { Body, Controller, Post, Param, UseGuards, ValidationPipe, Get } from '@nestjs/common';

import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from 'src/Users/guards/roles.guard';
import { Role } from 'src/Users/role.enum';
import { Roles } from 'src/Users/roles.decorator';
import { CommentsService } from "./comments.service";
import { CommentCredentialsDto } from './dto/comment-credentials.dto';
import { CommentMissionCredentialsDto } from './dto/comment-mission.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    // @UseGuards(JwtAuthGuard)
    @Post(':studentId')
    async addComment(@Param('studentId') studentId, @Body(ValidationPipe) commentCredentialsDto: CommentCredentialsDto) {
        return this.commentsService.addComment(studentId, commentCredentialsDto)
    }
    // @Get()
    // async getAllCommments(){
    //     return this.commentsService.getAllComments()
    // }
    @Get()
    async get3Commments(){
        return this.commentsService.get3Comments()
    }
    @Get(':studentId')
    async getByStudentId(@Param('studentId') studentId) {
        return this.commentsService.getByStudentId(studentId)
    }
    // @Get('userId')
    //     async getByUserId(@Param('userId') userId) {
    //         return this.commentsService.getByUserId(userId)

    // }

    @UseGuards(RolesGuard)
    @Roles(Role.USER)
    @Post('addMissionComment/:userId')
    async addMissionComment(@Param('userId') userId, @Body(ValidationPipe) commentMissionDto: CommentMissionCredentialsDto) {
        return this.commentsService.addMissionComment(userId, commentMissionDto)
    }
}
