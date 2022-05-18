import { LoggingInterceptor } from './shared/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(configService.get('app.port'));
}
bootstrap();
