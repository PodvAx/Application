import { OmitType, PickType } from '@nestjs/mapped-types';
import { IsAlphanumeric, IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsAlphanumeric()
  name: string;
}

export class LoginUserDto extends OmitType(RegisterUserDto, [
  'name',
] as const) {}

export class ForgotPasswordDto extends PickType(RegisterUserDto, [
  'email',
] as const) {}
