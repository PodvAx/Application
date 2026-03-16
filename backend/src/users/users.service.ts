import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/common/dtos/user.dto';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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

  async createOrUpdate(dto: CreateUserDto) {
    const user = await this.prisma.user.upsert({
      where: {
        email: dto.email,
      },
      update: {
        ...dto,
      },
      create: {
        ...dto,
      },
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
}
