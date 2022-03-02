import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'final', // put in .env
            ignoreExpiration: false
        })
    }

    async validate(payload: any) {
        // const user = await this.userService.getById(payload.id)
        return {
            id: payload.id,
            roles: payload.role,
            // ...user
        }
    }
}
