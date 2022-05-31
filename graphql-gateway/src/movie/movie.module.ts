import { UserModule } from './../user/user.module';
import { ConfigService } from '@nestjs/config';
import { movieMicroserviceClientName } from './../config/app.config';
import { ClientsModule } from '@nestjs/microservices';
import { Module, forwardRef } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        useFactory: (configService: ConfigService) => {
          return configService.get('moviemicroservice');
        },
        inject: [ConfigService],
        name: movieMicroserviceClientName,
      },
    ]),
    forwardRef(() => UserModule),
  ],
  providers: [MovieService, MovieResolver],
  exports: [MovieService],
})
export class MovieModule {}
