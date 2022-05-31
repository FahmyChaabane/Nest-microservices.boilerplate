import { UserModule } from './../user/user.module';
import { MovieModule } from './../movie/movie.module';
import { animeMicroserviceClientName } from './../config/app.config';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { Module, forwardRef } from '@nestjs/common';
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
    forwardRef(() => UserModule),
    MovieModule,
  ],
  providers: [AnimeService, AnimeResolver],
  exports: [AnimeService],
})
export class AnimeModule {}
