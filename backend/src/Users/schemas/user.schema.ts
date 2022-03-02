import * as mongoose from 'mongoose'
import { Role } from '../role.enum'

export const UserSchema = new mongoose.Schema({
    lastname: {
        type: String,
        required: true,
    },

    firstname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    roles: {
        type: String,
        required: true
    },
    favourites: {
        type: Array,
        required: false
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
    },

    file: String,

    location: String,

    competences: Array,

    verified: Boolean,

    // pending_mission: {
    //     type: Number,
    //     default: 0
    // },

    requested_missions: {
        type: Number,
    },

    notifications: { type: Array, default: [] }


}, { strict: false })
