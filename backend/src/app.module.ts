import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [PrismaService],
  imports: [UsersModule, PrismaModule, AuthModule],
})
export class AppModule {}
