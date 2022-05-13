import { movieMicroserviceClientName } from './../config/app.config';
import { firstValueFrom } from 'rxjs';
import { Movie } from './movie.entity';
import { MovieInput } from './input/movie.input';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {
  constructor(
    @Inject(movieMicroserviceClientName) private rabbit_client: ClientProxy,
  ) {}

  registerMovie(movieInput: MovieInput): void {
    this.rabbit_client.emit<void, MovieInput>('movie.register', movieInput);
  }

  async getAllMovies(): Promise<Movie[]> {
    return await firstValueFrom(
      this.rabbit_client.send<Movie[], unknown>('movie.list', {}),
    );
  }

  async getAllMoviesOfUser(userId: number): Promise<Movie[]> {
    return await firstValueFrom(
      this.rabbit_client.send<Movie[], number>('movie.list.id', userId),
    );
  }
}
