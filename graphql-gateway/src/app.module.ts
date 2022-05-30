import {
  userMicroserviceConfig,
  appconfig,
  movieMicroserviceConfig,
  animeMicroserviceConfig,
  jwt_secret_config,
} from './config/app.config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AnimeModule } from './anime/anime.module';
import { MovieModule } from './movie/movie.module';
// import { WinstonModule } from 'nest-winston';
// import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // WinstonModule.forRoot({
    //   transports: [
    //     new winston.transports.File({
    //       level: 'verbose',
    //       filename: './logs/app.log',
    //       maxsize: 5242880, //5MB
    //       maxFiles: 5,
    //     }),
    //   ],
    // }),
    ConfigModule.forRoot({
      load: [
        appconfig,
        jwt_secret_config,
        userMicroserviceConfig,
        movieMicroserviceConfig,
        animeMicroserviceConfig,
      ],
      envFilePath: '.development.env',
      isGlobal: true,
      cache: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: {
        origin: 'https://studio.apollographql.com',
      },
      introspection: true,
    }),
    AuthModule,
    UserModule,
    AnimeModule,
    MovieModule,
  ],
})
export class AppModule {}
