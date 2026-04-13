import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { TokenModule } from './token/token.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    MailModule,
    TokenModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventsModule,
  ],
})
export class AppModule {}
