import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  AccessPayload,
  EmailVerificationPayload,
  PayloadEnum,
  RefreshPayload,
} from 'src/token/utils/types';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  createEmailVerificationToken(userId: string, email: string) {
    return this.jwt.sign(
      {
        sub: userId,
        email: email,
        type: PayloadEnum.email,
      },
      {
        secret: this.configService.getOrThrow('JWT_EMAIL_VERIFICATION_SECRET'),
        expiresIn: '30m',
      },
    );
  }

  verifyEmailVerificationToken(token: string): EmailVerificationPayload | null {
    try {
      return this.jwt.verify<EmailVerificationPayload>(token, {
        secret: this.configService.getOrThrow('JWT_EMAIL_VERIFICATION_SECRET'),
      });
    } catch {
      return null;
    }
  }

  createAccessToken(userId: string, email: string) {
    return this.jwt.sign(
      {
        sub: userId,
        email: email,
        type: PayloadEnum.access,
      },
      {
        secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      },
    );
  }

  verifyAccessToken(token: string): AccessPayload | null {
    try {
      return this.jwt.verify<AccessPayload>(token, {
        secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
      });
    } catch {
      return null;
    }
  }

  createRefreshToken(userId: string, email: string) {
    return this.jwt.sign(
      {
        sub: userId,
        email: email,
        type: PayloadEnum.refresh,
      },
      {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );
  }

  verifyRefreshToken(token: string): RefreshPayload | null {
    try {
      return this.jwt.verify<RefreshPayload>(token, {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      });
    } catch {
      return null;
    }
  }
}
