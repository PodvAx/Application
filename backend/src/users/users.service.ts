import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from 'src/common/dtos/create-user.dto';
import { getHashedPassword, getHashedToken } from '../common/utils/hash';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async findAll() {
    const users = await this.prisma.user.findMany({});

    return users;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
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

    return user;
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

    return updatedUser;
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

  async deleteRefresh(userId: string) {
    await this.prisma.user.update({
      where: {
        id: userId,
        refreshTokenHash: { not: null },
      },
      data: {
        refreshTokenHash: null,
      },
    });
  }

  async updatePassword(email: string, newPassword: string) {
    const hashedPassword = await getHashedPassword(
      newPassword,
      this.configService.get('SALT_ROUNDS', 10),
    );

    await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        passwordHash: hashedPassword,
      },
    });
  }
}
