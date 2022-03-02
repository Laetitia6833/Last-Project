import { BadRequestException, ConflictException, Injectable, Post, UnauthorizedException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserAuthCredentialsDto } from "src/Users/dto/user-auth-credentials.dto";
import * as bcrypt from 'bcrypt'
import { StudentAuthCredentialsDto } from "src/Users/dto/student-auth.credentials";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/Users/interfaces/user.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Role } from "src/Users/role.enum";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async userRegister(userAuthCredentialsDto: UserAuthCredentialsDto): Promise<any> {
        const firstname = userAuthCredentialsDto.firstname
        const lastname = userAuthCredentialsDto.lastname
        const email = userAuthCredentialsDto.email
        const password = userAuthCredentialsDto.password
        const password_confirmation = userAuthCredentialsDto.password_confirmation

        if (password !== password_confirmation) {
            throw new BadRequestException("Les mot de passe ne correspondent pas")
        }

        const hashedPassword = await bcrypt.hash(password, 8)
        const user = new this.userModel({
            lastname,
            firstname,
            email,
            password: hashedPassword,
            roles: Role.USER
        })

        try {
            await user.save()
        } catch (e) {
            if (e.code === 11000) {
                throw new ConflictException("Compte déjà existant avec cette adresse mail")
            }


        }
    }

    async studentRegister(studentAuthCredentialsDto: StudentAuthCredentialsDto): Promise<any> {
        const firstname = studentAuthCredentialsDto.firstname
        const lastname = studentAuthCredentialsDto.lastname
        const email = studentAuthCredentialsDto.email
        const password = studentAuthCredentialsDto.password
        const password_confirmation = studentAuthCredentialsDto.password_confirmation

        if (password !== password_confirmation) {
            throw new BadRequestException("Les mot de passe ne correspondent pas")
        }

        const hashedPassword = await bcrypt.hash(password, 8)
        const user = new this.userModel({
            lastname,
            firstname,
            email,
            password: hashedPassword,
            verified: false,
            roles: Role.STUDENT,
            verified_at: null,
            file: null
        })

        try {
            await user.save()
            return user
        } catch (e) {
            if (e.code === 11000) {
                throw new ConflictException("Compte déjà existant avec cette adresse mail")
            }
            console.log(e);

        }
    }

    async uploadFile(data) {
        const user = await this.userModel.findOneAndUpdate({ _id: data.id }, { file: data.fileName })
        if (!user) {
            throw new UnauthorizedException("Vous n'êtes pas autorisé à envoyé un fichier")
        }

    }



    async login(user: User) {

        const payload = { id: user._id, role: user.roles }

        return {
            accessToken: this.jwtService.sign(payload),
            user
        }
    }

    async validateUser(email: string, pass) {
        const user = await this.userModel.findOne({ email })

        if (!user) {
            return null
        }

        const validPassword = await bcrypt.compare(pass, user.password)

        if (!validPassword) {
            return null
        }

        // return null
        return user

    }
}
