import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/common/dtos/user.dto';
import { RegisterUserDto } from 'src/common/dtos/create-user.dto';
import { getHashedPassword, getHashedToken } from './utils/hash';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async findAll() {
    const users = await this.prisma.user.findMany({});

    return users.map((user) => plainToInstance(UserDto, user));
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return plainToInstance(UserDto, user);
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return plainToInstance(UserDto, user);
  }

  async createOrUpdate(dto: RegisterUserDto) {
    const { email, name, password } = dto;

    const hashedPassword = await getHashedPassword(
      password,
      +this.configService.get('SALT_ROUNDS', 8),
    );

    const data = { email, name, passwordHash: hashedPassword };

    const user = await this.prisma.user.upsert({
      where: {
        email: dto.email,
      },
      update: data,
      create: data,
    });

    return plainToInstance(UserDto, user);
  }

  async verifyEmail(email: string) {
    const updatedUser = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        isVerifiedEmail: true,
      },
    });

    return plainToInstance(UserDto, updatedUser);
  }

  async findForAuth(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async updateRefresh(userId: string, refreshToken: string) {
    const refreshTokenHash = await getHashedToken(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash,
      },
    });
  }
}
