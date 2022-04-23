import {
  jwtConfig,
  tcpOptionsConfig,
  databaseConfig,
  appconfig,
} from './config/app.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appconfig, jwtConfig, tcpOptionsConfig, databaseConfig],
      envFilePath: '.development.env',
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get('database');
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class AppModule {}
// https://stackoverflow.com/questions/54535867/is-there-a-way-to-use-configservice-in-app-module-ts
