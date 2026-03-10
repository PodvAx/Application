import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  providers: [PrismaService],
  imports: [UsersModule, PrismaModule],
})
export class AppModule {}
