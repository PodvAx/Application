import { OmitType } from '@nestjs/mapped-types';
import { IsAlphanumeric, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsAlphanumeric()
  name: string;
}

export class LoginUserDto extends OmitType(CreateUserDto, ['name'] as const) {}
