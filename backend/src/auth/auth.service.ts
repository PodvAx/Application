import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { isPasswordCorrect } from '../common/utils/hash';
import { PayloadEnum } from 'src/common/types/token-payload.type';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto, LoginUserDto } from 'src/common/dtos/create-user.dto';
import bcrypt from 'bcrypt';
import { UserDto } from 'src/common/dtos/user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  // TODO
  /* 
  - response the same for different variants
  - if user exist and email verified: response check your email
  - if user exist and email is not verified: response check your email
  - if user don't exist: create user and response with chek you email
  - check JWT expiration and do something when user forgot to activate his account.
  - 
  */
  async register(dto: RegisterUserDto) {
    const { email, name } = dto;

    const existedUser = await this.usersService.findByEmail(email);

    if (existedUser && existedUser.isVerifiedEmail) {
      throw new ConflictException('This email already taken.');
    }

    const newUser = await this.usersService.createOrUpdate(dto);

    const token = this.tokenService.createEmailVerificationToken(
      newUser.id,
      email,
    );

    this.mailService
      .sendActivationEmail(email, token, name)
      .catch((err) => console.error('Delayed Mail Error:', err));

    return {
      message: 'Check your mail for activation link',
    };
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
      const {
        id: userId,
        email,
        name,
      } = await this.usersService.verifyEmail(payload.email);

      const { accessToken, refreshToken } = this.getAuthTokens(userId, email);

      await this.usersService.updateRefresh(userId, refreshToken);

      this.mailService
        .sendSuccessVerificationEmail(email, name)
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
    const user = await this.usersService.findByEmail(email);

    const passwordHash = user?.passwordHash || '$2b$10$invalidhashplaceholder';

    const isValidPassword = await isPasswordCorrect(password, passwordHash);

    if (!user || !isValidPassword) {
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

    const { accessToken, refreshToken } = this.getAuthTokens(
      user.id,
      user.email,
    );

    await this.usersService.updateRefresh(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  getAuthTokens(userId: string, email: string) {
    const accessToken = this.tokenService.createAccessToken(userId, email);
    const refreshToken = this.tokenService.createRefreshToken(userId, email);

    return { accessToken, refreshToken };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { refreshTokenHash, email } = user;

    const isValidRefreshToken = await bcrypt.compare(
      refreshToken,
      refreshTokenHash || 'some encrypted value',
    );

    if (!isValidRefreshToken) {
      throw new UnauthorizedException();
    }

    const { accessToken, refreshToken: newRT } = this.getAuthTokens(
      userId,
      email,
    );

    await this.usersService.updateRefresh(userId, newRT);

    return { accessToken, refreshToken: newRT };
  }

  async logout(userId: string) {
    await this.usersService.deleteRefresh(userId);
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('There is no user with such email');
    }

    const resetToken = this.tokenService.createResetToken(user.id, email);

    await this.mailService.sendResetPasswordEmail(email, resetToken, user.name);

    return { message: 'Check your email for reset password link' };
  }

  async resetPassword(
    resetToken: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    const payload = this.tokenService.verifyResetToken(resetToken);

    if (
      !payload ||
      !payload.email ||
      !payload.sub ||
      !payload.type ||
      payload.type !== PayloadEnum.reset
    ) {
      throw new UnauthorizedException();
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException();
    }

    const updatedUser = await this.usersService.updatePassword(
      payload.email,
      newPassword,
    );

    return updatedUser;
  }

  async getMe(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(UserDto, user);
  }
}
