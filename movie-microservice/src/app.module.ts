import {
  databaseConfig,
  appconfig,
  RmqOptionsConfig,
} from './config/app.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';

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
    MovieModule,
  ],
})
export class AppModule {}
