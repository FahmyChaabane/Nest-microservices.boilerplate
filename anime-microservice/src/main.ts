import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>(configService.get('rmqOptions'));
  await app.startAllMicroservices();
  await app.listen(configService.get('app.port'));
}
bootstrap();
