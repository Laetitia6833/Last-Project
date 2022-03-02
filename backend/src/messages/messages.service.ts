import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/Users/interfaces/user.interface";
import { MessageCresdentialsDto } from "./dto/messages.credentials";
import { Message } from "./interface/message.interface";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message') private messageModel: Model<Message>,
    @InjectModel('User') private userModel: Model<User>,
  ) { }

  async sendMessage(from, messageDto: MessageCresdentialsDto) {
    const to = messageDto.to
    const content = messageDto.content
    const missionId = messageDto.missionId


    const message = new this.messageModel({ from: from, to: to, content: content, missionId: missionId })
    const user = await this.userModel.findOne({ _id: to })
    const notifications = {
      type: 'MESSAGE',
      seen: false
    }

    try {
      await message.save()
      user.notifications.push(notifications)
      await user.save()
      return message
    } catch (e) {
      console.log(e);
    }
  }

  async getMissionMessage(missionId) {
    const messages = await this.messageModel.find({ missionId: missionId })
    return messages
  }

  async seeMessage(missionId, from) {
    const messages = await this.messageModel.updateMany({ missionId: missionId, to: from, seen: false }, { $set: { seen: true } })
  }

  async unSeenMessages(userId) {
    const messages = await this.messageModel.find({ to: userId, seen: false })

    return messages.length
  }

  async getUnSeenMessages(missionId, userId) {
    const messages = await this.messageModel.find({ missionId: missionId, seen: false, to: userId })
    return messages.length;

  }
}
