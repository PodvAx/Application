import { IsJWT, IsNotEmpty } from 'class-validator';

export class ActivateQueryDto {
  @IsNotEmpty({ message: 'Token is required' })
  @IsJWT()
  token: string;
}
