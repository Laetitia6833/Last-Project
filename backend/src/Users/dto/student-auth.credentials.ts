import { Prop } from "@nestjs/mongoose";
import { IsDate, IsEmail, IsNotEmpty } from "class-validator";

export class StudentAuthCredentialsDto {
    @IsNotEmpty({ message: "Veuillez renseigner votre nom" })
    lastname: string

    @IsNotEmpty({ message: "Veuillez renseigner votre prénom" })
    firstname: string

    @IsEmail({}, { message: "Email invalide" })
    email: string

    @IsNotEmpty({ message: "Veuillez renseigner votre mot de passe" })
    password: string

    password_confirmation: string

    @Prop({ default: 'STUDENT' })
    role: string

    @Prop({ default: false })
    verified: boolean

    file: FormData
}
