import { OmitType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinDate,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description: string;

  @IsDateString()
  @MinDate(new Date())
  date: Date;

  @IsBoolean()
  isPublic: boolean;

  @IsString()
  @MinLength(3)
  @MaxLength(200)
  location: string;

  @IsNumber()
  @Min(0)
  capacity?: number;

  @IsString()
  creatorId: string;
}

export class CreateEventByUserDto extends OmitType(CreateEventDto, [
  'creatorId',
] as const) {}
