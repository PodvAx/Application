import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { TokenPayload } from 'src/common/types/token-payload.type';

type UserRequestPayload = TokenPayload & { refreshToken?: string };

interface RequestWithUser extends Request {
  user: TokenPayload & { refreshToken?: string };
}

export const CurrentUser = createParamDecorator(
  (data: keyof UserRequestPayload | undefined, ctx: ExecutionContext) => {
    const request: RequestWithUser = ctx.switchToHttp().getRequest();

    const user: UserRequestPayload | undefined = request.user;

    if (!user) {
      return null;
    }

    if (!data) {
      return user;
    }

    return user[data];
  },
);
