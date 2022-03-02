import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UnsupportedMediaTypeException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { blockParams } from "handlebars";
import { diskStorage } from "multer";
import { identity } from "rxjs";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Tag } from "src/Tag/tag.interface";
import { UserAuthCredentialsDto, UserUpdateDto, UserUpdateSelfDto } from "./dto/user-auth-credentials.dto";
import { RolesGuard } from "./guards/roles.guard";
import { Role } from "./role.enum";
import { Roles } from "./roles.decorator";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // @UseGuards(RolesGuard)
    // @Roles(Role.STUDENT)
    // @Post('/onlyStudent')
    // async testEnum(@Request() req) {
    //     return 'test enum only student'
    // }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    async allUsers(@Request() req) {
        return this.usersService.getAll()
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':userId')
    async deleteUser(@Request() req, @Param('userId') userId) {
        return this.usersService.deleteUser(userId)
    }

    @Get('/getUser/:id')
    async getUserById(@Param('id') id) {
        return this.usersService.getUserById(id)
    }

    @Get('/getThree')
    async getThree() {
        return this.usersService.getThree()
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @UsePipes(new ValidationPipe({ transform: true }))
    @Patch(':userId')
    async adminUpdateUser(@Request() req, @Param('userId') userId, @Body() userUpdateDto: UserUpdateDto) {
        return this.usersService.adminUpdateUser(userId, userUpdateDto)
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Patch('verifyUser/:userId')
    async verifyUser(@Request() req, @Param('userId') userId) {
        const fileOK = req.body
        return this.usersService.verifyUser(userId, fileOK)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('updateSelf/:id')
    async updateSelf(@Param('id') id, @Request() req, @Body(ValidationPipe) userUpdateDto: UserUpdateSelfDto) {
        return this.usersService.updateSelf(id, req, userUpdateDto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/uploadProfilPicture')
    @UseInterceptors(FileInterceptor("file",
        {
            storage: diskStorage({
                destination: '../frontend/src/assets/uploads/profilPictures',
                filename: (req, file, cb) => {
                    cb(null, file.originalname)
                }
            }),
            fileFilter: (req, file, cb) => {
                const fileExt = file.mimetype.split('/')[1]
                if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg') {
                    cb(null, true)
                } else {
                    return cb(new UnsupportedMediaTypeException('Format non pris en charge'), false)
                }
            },
            limits: { fileSize: 1048576 }
        }))
    async uploadProfilPicture(@UploadedFile() file: Express.Multer.File, @Request() req) {
        return this.usersService.uploadProfilPicture(req)
    }

    @UseGuards(JwtAuthGuard)
    @Post('addToFavourite/:id')
    async addToFavourite(@Param('id') userId, @Body() studentId) {
        return this.usersService.addToFavourites(userId, studentId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('addCompetences/:userId')
    async addCompetences(@Param('userId') userId, @Request() req, @Body() tags: Array<Tag>) {
        return this.usersService.addCompetences(userId, req, tags)
    }

    @Post('/searchUsers')
    async searchUsers(@Body() search) {
        return this.usersService.searchUser(search)
    }


    @Patch('removeFromFavourite/:id')
    async removeFromFavourite(@Param('id') userId, @Body() studentId) {
        return this.usersService.removeFromFavourite(userId, studentId)
    }

    // @Patch('addMission')
    // async addMission(@Body() body) {
    //     console.log(body);

    // }

    @UseGuards(JwtAuthGuard)
    @Get('getNotifications')
    async getNotifications(@Request() req) {
        const user = req.user
        return this.usersService.getNotifications(user)
    }

    @Patch('notificationsToSeen/:userId')
    async notificationToSeen(@Param('userId') userId) {
        return this.usersService.notificationToSeen(userId)
    }
}
