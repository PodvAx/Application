import { Exclude } from 'class-transformer';
import { UserModel } from 'src/generated/prisma/models';

export class UserDto implements Partial<UserModel> {
  id: string;
  email: string;
  name: string;
  isVerifiedEmail: boolean;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
