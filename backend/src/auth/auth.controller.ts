import { Body, Controller, Patch, Post, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto, LoginUserDto } from 'src/common/dtos/create-user.dto';
import { ActivateQueryDto } from './dto/activate-query.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Patch('activate')
  async activate(
    @Query() query: ActivateQueryDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.activate(
      query.token,
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

    return { accessToken, refreshToken };
  }
}
