import { AnimeModule } from './../anime/anime.module';
import { MovieModule } from './../movie/movie.module';
import { userMicroserviceClientName } from './../config/app.config';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        useFactory: (configService: ConfigService) => {
          return configService.get('usermicroservice');
        },
        inject: [ConfigService],
        name: userMicroserviceClientName,
      },
    ]),
    forwardRef(() => MovieModule),
    forwardRef(() => AnimeModule),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
