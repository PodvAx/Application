import { IsJWT, IsNotEmpty } from 'class-validator';

export class ResetQueryDto {
  @IsNotEmpty({ message: 'Token is required' })
  @IsJWT()
  token: string;
}
