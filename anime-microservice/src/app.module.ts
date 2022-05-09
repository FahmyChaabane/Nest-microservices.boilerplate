import {
  appconfig,
  databaseConfig,
  RmqOptionsConfig,
} from './config/app.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeModule } from './anime/anime.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appconfig, RmqOptionsConfig, databaseConfig],
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
    AnimeModule,
  ],
})
export class AppModule {}
