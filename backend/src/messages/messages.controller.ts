import { Body, Controller, Get, Post, UseGuards, Request, ValidationPipe, Param, Patch } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { MessageCresdentialsDto } from "./dto/messages.credentials";
import { MessagesService } from "./messages.service";

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @UseGuards(JwtAuthGuard)
  @Post('sendMessage')
  async sendMessage(@Request() req, @Body(ValidationPipe) messageDto: MessageCresdentialsDto) {
    const from = req.user.id

    return this.messagesService.sendMessage(from, messageDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('getMissionMessages/:missionId')
  async getMissionMessage(@Request() req, @Param('missionId') missionId) {
    // console.log(req.user);
    return this.messagesService.getMissionMessage(missionId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('seeMessage/:missionId')
  async seeMessage(@Param('missionId') missionId, @Request() req) {
    const from = req.user.id
    return this.messagesService.seeMessage(missionId, from)
  }

  @UseGuards(JwtAuthGuard)
  @Get('unseenMessages/:userId')
  async getUnseenMessages(@Param('userId') userId) {
    return this.messagesService.unSeenMessages(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUnSeenMessages/:missionId')
  async getUnSeenMessages(@Param('missionId') missionId, @Request() req) {
    const userId = req.user.id
    return this.messagesService.getUnSeenMessages(missionId, userId)
  }
}
