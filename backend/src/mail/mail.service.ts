import { MailerService } from '@nestjs-modules/mailer';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendActivationEmail(email: string, token: string, name: string) {
    const CLIENT_ORIGIN =
      this.configService.getOrThrow<string>('CLIENT_ORIGIN');
    const link = `${CLIENT_ORIGIN}/activate/?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome! Activate your account in Application by PodvAx',
        template: './activation',
        context: { name, link },
      });
    } catch (err) {
      throw new BadGatewayException(
        `Something went wrong with sending email. Error: ${err}`,
      );
    }
  }

  async sendSuccessVerificationEmail(email: string, name: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Verified',
        template: './success-verification',
        context: { name },
      });
    } catch (err) {
      throw new BadGatewayException(
        `Something went wrong with sending email. Error: ${err}`,
      );
    }
  }
}
