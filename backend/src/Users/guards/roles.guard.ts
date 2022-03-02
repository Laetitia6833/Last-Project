import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { User } from "../interfaces/user.interface";
import { Role } from "../role.enum";

@Injectable()
export class RolesGuard extends AuthGuard('jwt') /* implements CanActivate*/ {
    constructor(private reflector: Reflector) {
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const baseGuardResult = await super.canActivate(context)
        if (!baseGuardResult) {
            return false
        }

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ])

        if (!requiredRoles) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user
        return requiredRoles.some(role => user.roles?.includes(role))
    }
    // canActivate(context: ExecutionContext): boolean {

    //     const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
    //         context.getHandler(),
    //         context.getClass()
    //     ])

    //     if (!requiredRoles) {
    //         return true
    //     }

    //     const request = context.switchToHttp().getRequest()
    //     console.log(request);
    //     const user = request.user
    //     console.log(user);

    //     // console.log(context.switchToHttp().getRequest())
    //     // console.log(user);
    //     // console.log();



    //     // console.log('user: ', user);

    //     // const user = {
    //     //     name: 'damien',
    //     //     roles: [Role.USER]
    //     // }

    //     return requiredRoles.some(role => user.roles?.includes(role))
    // }
}
