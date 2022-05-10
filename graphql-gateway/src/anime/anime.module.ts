import { MovieModule } from './../movie/movie.module';
import { animeMicroserviceClientName } from './../config/app.config';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeResolver } from './anime.resolver';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        useFactory: (configService: ConfigService) => {
          return configService.get('animemicroservice');
        },
        inject: [ConfigService],
        name: animeMicroserviceClientName,
      },
    ]),
    MovieModule,
  ],
  providers: [AnimeService, AnimeResolver],
})
export class AnimeModule {}
