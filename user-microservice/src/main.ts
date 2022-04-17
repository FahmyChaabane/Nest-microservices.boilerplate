import { TCP_OPTIONS } from './config/tcpOptions.config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    TCP_OPTIONS,
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
