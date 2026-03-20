import { Exclude } from 'class-transformer';
import { UserModel } from 'src/generated/prisma/models';

export class UserDto implements Partial<UserModel> {
  id: string;
  email: string;
  name: string;
  isVerifiedEmail: boolean;

  @Exclude()
  passwordHash: string;

  @Exclude()
  refreshTokenHash?: string | null;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
