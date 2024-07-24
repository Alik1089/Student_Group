import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendEmail({ to, subject, html }): void {
    this.mailerService
      .sendMail({
        to,
        from: process.env.EMAIL_USER,
        subject,
        html,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
