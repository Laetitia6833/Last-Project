import { Document } from "mongoose";
import { Role } from "../role.enum";

export interface User extends Document {
    lastname: string
    firstname: string
    email: string
    password: string
    roles: Role
    created_at: Date
    updated_at: Date
    location: string
    favourites: Array<any>
    competences: Array<Object>
    verified: boolean
    // pending_missions: number
    requested_missions: number
    notifications: Array<any>
}

