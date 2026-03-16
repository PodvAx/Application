import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { getHashedPassword, isPasswordCorrect } from './utils/hash';
import { PayloadEnum } from 'src/token/utils/types';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, LoginUserDto } from 'src/common/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: CreateUserDto) {
    const { email, password, name } = dto;

    const existedUser = await this.usersService.findByEmail(email);

    if (existedUser && existedUser.isVerifiedEmail) {
      throw new ConflictException('This email already taken.');
    }

    const hashedPassword = await getHashedPassword(
      password,
      +this.configService.get('SALT_ROUNDS', 8),
    );

    const newUser = await this.usersService.createOrUpdate({
      ...dto,
      password: hashedPassword,
    });

    const token = this.tokenService.createEmailVerificationToken(
      newUser.id,
      email,
    );

    this.mailService
      .sendActivationEmail(email, token, name)
      .catch((err) => console.error('Delayed Mail Error:', err));

    return { newUser, message: 'Check your mail for activation link' };
  }

  async activate(activationToken: string) {
    const payload =
      this.tokenService.verifyEmailVerificationToken(activationToken);

    if (
      !payload ||
      !payload.sub ||
      !payload.type ||
      payload.type !== PayloadEnum.email
    ) {
      throw new UnauthorizedException();
    }

    try {
      const updatedUser = await this.usersService.verifyEmail(payload.email);

      const { accessToken, refreshToken } = this.getAuthTokens(
        updatedUser.id,
        updatedUser.email,
      );

      this.mailService
        .sendSuccessVerificationEmail(updatedUser.email, updatedUser.name)
        .catch((err) => console.error('Delayed Mail Error:', err));

      return { accessToken, refreshToken };
    } catch (err) {
      throw new BadRequestException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Something went wrong',
        },
        { cause: err },
      );
    }
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.usersService.findForAuth(email);

    if (!user || !(await isPasswordCorrect(password, user.password))) {
      throw new UnauthorizedException({
        message: 'Email or password is incorrect',
      });
    }

    if (!user.isVerifiedEmail) {
      throw new UnauthorizedException({
        message:
          'Email is not verified. Check your email to verify or try to register again',
      });
    }

    return this.getAuthTokens(user.id, user.email);
  }

  getAuthTokens(userId: string, email: string) {
    const accessToken = this.tokenService.createAccessToken(userId, email);
    const refreshToken = this.tokenService.createRefreshToken(userId, email);

    return { accessToken, refreshToken };
  }
}
