import { Prop } from "@nestjs/mongoose";
import { IsDate, IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "../role.enum";

export class UserAuthCredentialsDto {
    @IsNotEmpty({ message: "Veuillez renseignez votre Nom" })
    firstname: string

    @IsNotEmpty({ message: "Veuillez renseignez votre Prénom" })
    lastname: string

    @IsEmail({}, { message: "Email invalide" })
    email: string

    @IsNotEmpty({ message: "Veuillez entrez un mot de passe" })
    password: string

    password_confirmation: string

    roles: Role

    favourites: Array<any>
}


export class UserUpdateDto {
    @IsNotEmpty({ message: "Veuillez remplir le champ Nom" })
    lastname: string

    @IsNotEmpty({ message: "Veuillez remplir le champ Prénom" })
    firstname: string

    @IsEmail({}, { message: "Email invalide" })
    email: string

    @IsNotEmpty({ message: "Vous devez selectionner un rôle" })
    roles: Role

    @Prop({ default: new Date() })
    updated_at: Date = new Date()
}

export class UserUpdateSelfDto {
    @IsNotEmpty({ message: "Veuillez remplir le champ Nom" })
    lastname: string

    @IsNotEmpty({ message: "Veuillez remplir le champ Prénom" })
    firstname: string

    @IsEmail({}, { message: "Email invalide" })
    email: string
}
