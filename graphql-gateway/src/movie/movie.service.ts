import { movieMicroserviceClientName } from './../config/app.config';
import { Observable } from 'rxjs';
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

  getAllMovies(): Observable<Movie[]> {
    return this.rabbit_client.send<Movie[], unknown>('movie.list', {});
  }

  getAllMoviesOfUser(userId: number): Observable<Movie[]> {
    return this.rabbit_client.send<Movie[], number>('movie.list.id', userId);
  }
}
