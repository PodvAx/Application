import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/common/dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => plainToInstance(UserDto, user));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findByEmail(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    return plainToInstance(UserDto, user);
  }
}
