import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import {
  RegisterUserDto,
  LoginUserDto,
  ForgotPasswordDto,
} from 'src/common/dtos/create-user.dto';
import { ActivateQueryDto } from './dto/activate-query.dto';
import { RtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ResetQueryDto } from './dto/reset-query.dto';
import { ResetPasswordDto } from 'src/common/dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post('activate')
  async activate(
    @Body() activationDto: ActivateQueryDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.activate(
      activationDto.token,
    );

    response.cookie('refreshToken', refreshToken, { httpOnly: true });

    return { accessToken };
  }

  @Post('login')
  async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    response.cookie('refreshToken', refreshToken, { httpOnly: true });

    return { accessToken };
  }

  @UseGuards(RtAuthGuard)
  @Get('refresh')
  async refresh(
    @CurrentUser('sub') userId: string,
    @CurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken: newRT } =
      await this.authService.refreshTokens(userId, refreshToken);

    res.cookie('refreshToken', newRT, { httpOnly: true });

    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @CurrentUser('sub') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(userId);
    res.clearCookie('refreshToken');
    return { message: 'Logged out successfully' };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  async resetPassword(
    @Query() query: ResetQueryDto,
    @Body() dto: ResetPasswordDto,
  ) {
    await this.authService.resetPassword(
      query.token,
      dto.newPassword,
      dto.confirmPassword,
    );

    return { message: 'Your password successfully reset' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser('sub') userId: string) {
    const user = await this.authService.getMe(userId);
    return user;
  }
}
