import { Injectable } from '@nestjs/common';
import { MailService } from './mail/mail.service';
@Injectable()
export class AppService {
  constructor(private mailService: MailService) { }
  getHello(): string {
    return 'Hello World!';
  }

  async sendMail(user) {

    const u = {
      email: 'email@email.com',
      name: 'name',
    }
    await this.mailService.sendUserConfirmation(u)
  }
}
