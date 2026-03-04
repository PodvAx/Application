import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

const { PORT } = process.env;

const CLIENT_ORIGIN = 'https://localhost:5173';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(PORT ?? 3000);
}
bootstrap()
  .then(() => {
    console.log(`app is running on ${PORT}`);
  })
  .catch(() => {
    console.log('something went wrong');
  });
