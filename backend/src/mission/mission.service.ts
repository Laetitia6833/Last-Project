import { Model } from 'mongoose';
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mission } from './interfaces/mission.interface';
import { MissionCredentialsDto } from './dto/mission-credentials.dto';
import { User } from 'src/Users/interfaces/user.interface';
import { MessagesService } from 'src/messages/messages.service';
import { MessageCresdentialsDto } from 'src/messages/dto/messages.credentials';

@Injectable()
export class MissionService {
  constructor(
    @InjectModel('Mission') private missionModel: Model<Mission>,
    @InjectModel('User') private userModel: Model<User>,
    private readonly messagesService: MessagesService
    // @InjectModel('Message') private messa 
  ) { }

  async addMission(req, dto: MissionCredentialsDto) {
    const userId = req.user.id
    const missionDto = { userId, ...dto }

    const mission = new this.missionModel(missionDto)

    if (missionDto.studentId === userId) {
      throw new UnauthorizedException('Vous ne pouvez pas vous envoyé un mission à vous même')
    }

    const notification = {
      type: 'MISSION',
      seen: false,
      status: 'NEW'
    }

    try {
      const student = await this.userModel.findOne({ _id: missionDto.studentId })
      student.notifications.push(notification)
      await student.save()
      await mission.save()
      // const user = await this.userModel.findOneAndUpdate({ _id: userId }, { $inc: { requested_missions: 1 } })

      return mission

    } catch (e) {
      console.log(e);
    }

  }
  async getAll() {
    return this.missionModel.find()
  }
  async getByMissionId(missionId) {
    try {
      const mission = await this.missionModel.find({ _id: missionId })
      return mission
    } catch (err) {
      console.log(err)
      throw new BadRequestException("Aucune mission correspondante")
    }

  }
  async getByStudentOrUserId(req, id) {

    if (req.user.id !== id) {
      throw new UnauthorizedException("Vous n'êtes pas autorisé à voir les missions d'un autre étudiant")
    }
    try {
      if (req.user.roles === 'STUDENT') {
        const missions = await this.missionModel.find({ studentId: id }).sort({ date: 'desc' })
        return missions
      }
      const missions = await this.missionModel.find({ userId: id }).sort({ date: 'desc' })
      return missions

    } catch (err) {
      console.log(err)
      throw new BadRequestException("Aucune mission trouvée")
    }
  }

  async doneMissions(studentId) {
    const missions = await this.missionModel.find({ studentId: studentId, done: true, status: 'DONE' })
    return missions
  }

  async deleteMission(missionId) {
    try {
      await this.missionModel.findOneAndDelete({ _id: missionId })
    } catch (err) {
      console.log(err);
    }
  }

  async missionSeen(req) {
    const missionId = req.body.missionId
    await this.missionModel.findOneAndUpdate({ _id: missionId }, { $set: { seen: true } })
  }

  async giveAnswer(missionId, response) {
    console.log(response);

    try {
      if (response.accepted == true) {
        const mission = await this.missionModel.findOneAndUpdate({ _id: missionId }, { $set: { accepted: response.accepted, status: 'ACCEPTED' } })
        // console.log(mission);
        const user = await this.userModel.findOne({ _id: mission.userId })
        const notifications = {
          type: 'MISSION',
          status: 'ACCEPTED',
          seen: false
        }
        user.notifications.push(notifications)

        await user.save()

        return "Mission Acceptée"
      }
      const mission = await this.missionModel.findOneAndUpdate({ _id: missionId }, { $set: { accepted: response.accepted, status: 'REFUSED', done: true } })
      const user = await this.userModel.findOne({ _id: mission.userId })
      const notifications = {
        type: 'MISSION',
        status: 'REFUSED',
        seen: false
      }
      user.notifications.push(notifications)

      await user.save()
      return "Mission Refusée"
    } catch (e) {
      console.log(e);
    }
  }

  async missionDone(missionId, done) {
    if (done.done) {
      const missionDone = await this.missionModel.findOneAndUpdate({ _id: missionId }, { done: true, status: 'DONE' })
      return
    } else {
      const missionDone = await this.missionModel.findOneAndUpdate({ _id: missionId }, { done: true, status: 'NOT DONE' })

    }
  }

  async acceptedMissions(userId) {
    const missions = await this.missionModel.find({ userId: userId, accepted: true, status: 'ACCEPTED' })
    return missions
  }

  async changeMissionStatus(missionId, status) {
    const mission = this.missionModel.findOneAndUpdate({ _id: missionId }, { $set: { status: status.status } })
    return mission
  }

}
