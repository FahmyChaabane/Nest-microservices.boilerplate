import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>(
    configService.get('microservice'),
  );

  await app.startAllMicroservices();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('app.port'));
}
bootstrap();
