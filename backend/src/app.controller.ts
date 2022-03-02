import { Controller, Get, Request, UseGuards, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import path from 'path'
import { diskStorage } from 'multer'
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';



// const upload = multer({ storage: storage })

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService) { }

  // @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@Request() req): string {
    return 'hello'
    // return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor("file",
    {
      storage: diskStorage({
        // destination: process.env.UPLOADS_PATH,
        destination: '../frontend/src/assets/uploads',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1]
          cb(null, `${Date.now()}.${ext}`)
        }
      })
    }
  ))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

  }

  @Post('sendMail')
  async sendMail(user) {
    return this.appService.sendMail(user)

  }

}


