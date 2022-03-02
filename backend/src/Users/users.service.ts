import { BadRequestException, Get, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
// import { NavigationContainerRefContext } from "@react-navigation/native";
import { Model } from "mongoose";
import { MailService } from "src/mail/mail.service";
import { Message } from "src/messages/interface/message.interface";
import { Mission } from "src/mission/interfaces/mission.interface";
import { MissionService } from "src/mission/mission.service";
import { UserUpdateDto, UserUpdateSelfDto } from "./dto/user-auth-credentials.dto";
import { User } from "./interfaces/user.interface";
import { Role } from "./role.enum";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        @InjectModel('Mission') private missionModel: Model<Mission>,
        @InjectModel('Message') private messageModel: Model<Message>,
        private missionService: MissionService,
        private mailservice: MailService
    ) { }

    async getAll() {
        return this.userModel.find()
    }

    async deleteUser(userId) {
        try {
            await this.userModel.findOneAndDelete({ _id: userId })
        } catch (e) {
            console.log(e);
        }

    }

    async getUserById(id) {
        try {
            const user = await this.userModel.findOne({ _id: id })
            return user
        } catch (e) {
            console.log(e);
            throw new BadRequestException("Aucun utilisateur correspondant à cette ID n'a été trouvé")
        }
    }

    async getThree() {
        const users = await this.userModel.find({ roles: Role.STUDENT }).limit(3).sort({ created_at: -1 })

        return users
    }

    async adminUpdateUser(id, userUpdateDto: UserUpdateDto) {
        const role = userUpdateDto.roles
        const lastname = userUpdateDto.lastname
        const firstname = userUpdateDto.firstname
        const email = userUpdateDto.email

        const user = await this.userModel.findOneAndUpdate({ _id: id },
            {
                roles: role,
                firstname: firstname,
                lastname: lastname,
                email: email,
                updated_at: new Date()
            })
    }

    async verifyUser(userId, fileOK) {
        if (fileOK) {
            const user = await this.userModel.findOneAndUpdate({ _id: userId },
                {
                    verified: true,
                    verified_at: new Date()
                })
            await this.mailservice.sendVerifyUser(user)
        }
    }

    async updateSelf(id, req, userUpdateDto: UserUpdateSelfDto) {

        const userRequestId = req.user.id

        if (id !== userRequestId) {
            throw new UnauthorizedException("vous n'etes pas autoriser à modifier cette utilisateur")
        }

        let user = await this.userModel.findOneAndUpdate({ _id: id }, { $set: userUpdateDto, updated_at: new Date })
    }

    async uploadProfilPicture(req) {
        const filename = req.body.fileName

        const user = await this.userModel.findOneAndUpdate({ _id: req.user.id }, { $set: { profil_picture: filename } })
    }
    async addToFavourites(userId, studentId) {
        const user = await this.userModel.findOne({ _id: userId })
        if (!user.favourites.includes(studentId)) {
            user.favourites.push(studentId)
        } else {
            throw 'L\'étudiant est déjà dans vos favoris'
        } user.save()
        return user
    }
    async removeFromFavourite(userId, studentId) {
        let user = await this.userModel.findOne({ _id: userId })
        let studentList = user.favourites

        if (studentList.includes(studentId)) {
            studentList = studentList.filter((val) => {
                return val !== studentId
            })
        }
        user.favourites = studentList
        try {
            user.save()
        } catch (err) {
            console.log(err)
        }
        return user
    }
    async addCompetences(userId, req, tags) {
        if (userId !== req.user.id) {
            throw new UnauthorizedException("Vous n'êtes pas autorisé")
        }
        const user = await this.userModel.findOne({ _id: userId })
        user.set({ competences: tags })

        try {
            await user.save()
        } catch (e) {
            console.log(e);
        }
    }

    async searchUser(search) {

        if (search.location && !search.tag) {
            const users = await this.userModel.find({ location: search.location, roles: Role.STUDENT, verified: true })
            return users
        }

        if (search.tag && !search.location) {
            const users = await this.userModel.find({ 'competences.name': search.tag, roles: Role.STUDENT, verified: true })
            return users
        }

        if (search.location && search.tag) {
            const users = await this.userModel.find({ 'competences.name': search.tag, location: search.location, roles: Role.STUDENT, verified: true })
            return users
        }

    }

    // async addMission(body) {

    // }

    async getNotifications(user) {
        // let notifications
        // let arr = []

        if (user.roles === 'USER') {
            const missions = await this.missionModel.find({ userId: user.id, status: 'ACCEPTED' })
            const messages = await this.messageModel.find({ to: user.id, seen: false })
            let notifications = []
            missions.forEach(mission => {
                let notif = {
                    type: 'MISSION',
                    seen: false,
                    status: mission.status
                }
                notifications.push(notif)
            });
            messages.forEach(message => {
                let notif = {
                    type: 'MESSAGES',
                    from: message.from,
                    seen: false
                }
                notifications.push(notif)
            });
            // console.log(arr.length);
            // notifications = messages.length + missions.length


            return notifications

        } else if (user.roles === 'STUDENT') {
            // const missions = await this.missionModel.find({ studentId: user.id, seen: false })
            // const messages = await this.messageModel.find({ to: user.id, seen: false })

            // notifications = missions.length + messages.length
            // return notifications
        }

    }

    async notificationToSeen(userId) {
        let user = await this.userModel.findOne({ _id: userId })
        let notifications = user.notifications
        notifications.forEach(notif => {
            notif.seen = true
        })

        user.notifications = notifications

        await this.userModel.findOneAndUpdate({ _id: userId }, { notifications: notifications })
        // try {
        //     await user.save()
        //     return user
        // } catch (e) {
        //     console.log(e);

        // }
    }
}
