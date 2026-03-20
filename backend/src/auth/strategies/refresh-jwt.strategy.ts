import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { RefreshPayload } from 'src/common/types/token-payload.type';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req || !req.cookies) {
          return null;
        }

        const refreshToken: string = req.cookies['refreshToken'] as string;

        return refreshToken;
      },
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(req: Request, payload: RefreshPayload) {
    const refreshToken = req.cookies.refreshToken as string;
    return { ...payload, refreshToken };
  }
}
