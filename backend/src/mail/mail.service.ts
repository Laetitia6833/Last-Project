import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer'
import { User } from 'src/Users/interfaces/user.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendUserConfirmation(user) {
    const url = `http://localhost:8080/signIn`

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'welcome, this is a test',
      template: 'confirmation',
      context: {
        name: user.firstname,
        url
      }
    })
  }

  async sendVerifyUser(user) {
    const url = `http://localhost:8080/signIn`

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Confirmation de vos document',
      template: 'verifyUser',
      context: {
        name: user.firstname,
        url
      }
    })
  }
}
