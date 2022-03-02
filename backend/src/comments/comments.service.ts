import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentMissionCredentialsDto } from './dto/comment-mission.dto';

@Injectable()
export class CommentsService {
    constructor(@InjectModel('Comment') private commentModel: Model<Comment>) { }
    async addComment(studentId, content) {
        let cred = content
        // cred.studentId = studentId
        const date = new Date()
        cred.date = date
        const comment = new this.commentModel(cred)

        try {
            await comment.save()
        } catch (err) {
            console.log(err)
        }
    }
    // async getAllComments(){
    //     return this.commentModel.find().sort('date')
    // }
    async get3Comments() {
        return this.commentModel.find().sort({ 'date': -1 }).limit(3)
    }
    // async get3Comments(){
    //     return this.commentModel.find().sort('date').limit(3)
    // }
    async getByStudentId(studentId) {
        const comments = await this.commentModel.find({ studentId: studentId }).sort({ date: 'desc' })
        return comments
    }
    // async getByUserId(userId){
    //     const comments = await this.commentModel.find({userId: userId}).sort({date: 'desc'})
    //     return comments
    // }

    async addMissionComment(userId, commentMissionDto: CommentMissionCredentialsDto) {
        const data = { userId, ...commentMissionDto }
        // const comment = new this.commentModel(data)
        const comment = await this.commentModel.findOne({ missionId: data.missionId })

        if (comment) {
            throw new UnauthorizedException("Un commentaire à déjà été posté pour cette mission")
        }

        const newComment = new this.commentModel(data)
        try {
            await newComment.save()
            return newComment
        } catch (e) {
            console.log(e);
        }
    }
}
