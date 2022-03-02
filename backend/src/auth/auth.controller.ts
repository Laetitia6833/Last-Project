import { Body, Controller, Get, Post, Req, Request, UnsupportedMediaTypeException, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import multer, { diskStorage } from "multer";
import { StudentAuthCredentialsDto } from "src/Users/dto/student-auth.credentials";
import { UserAuthCredentialsDto } from "src/Users/dto/user-auth-credentials.dto";
import { fileURLToPath } from "url";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) { }

    @Post('/userRegister')
    async userRegister(@Body(ValidationPipe) userAuthCredentialsDto: UserAuthCredentialsDto) {
        return this.authservice.userRegister(userAuthCredentialsDto)

    }

    @Post('/studentRegister')
    async studentRegister(
        @Body(ValidationPipe) studentAuthCredentialsDto: StudentAuthCredentialsDto,
    ) {
        return this.authservice.studentRegister(studentAuthCredentialsDto)
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authservice.login(req.user)
    }

    @Post('/uploadFile')
    @UseInterceptors(FileInterceptor("file",
        {
            storage: diskStorage({
                // destination: process.env.UPLOADS_PATH,
                destination: '../frontend/src/assets/uploads/justificatif',
                filename: (req, file, cb) => {
                    // const ext = file.mimetype.split('/')[1]
                    cb(null, file.originalname)
                },
            }),
            fileFilter: (req, file, cb) => {
                const fileExt = file.mimetype.split('/')[1]
                if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'pdf') {
                    cb(null, true)
                } else {
                    return cb(new UnsupportedMediaTypeException('Format non pris en charge'), false)
                }
            },
            limits: { fileSize: 1048576 }
        },

    ))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
        return this.authservice.uploadFile(body)
    }
}
