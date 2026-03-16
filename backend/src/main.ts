import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT', 8080);
  const CLIENT_ORIGIN = configService.getOrThrow<string>('CLIENT_ORIGIN');

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(cookieParser());

  app.enableCors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(PORT);
  return { PORT };
}
bootstrap()
  .then(({ PORT }) => {
    console.log(`app is running on ${PORT}`);
  })
  .catch(() => {
    console.log('something went wrong');
  });
