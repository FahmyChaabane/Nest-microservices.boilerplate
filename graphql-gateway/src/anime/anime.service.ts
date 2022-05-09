import { animeMicroserviceClientName } from './../config/app.config';
import { Observable } from 'rxjs';
import { AnimeInput } from './input/anime.input';
import { ClientProxy } from '@nestjs/microservices';
import { Injectable, Inject } from '@nestjs/common';
import { Anime } from './anime.entity';

@Injectable()
export class AnimeService {
  constructor(
    @Inject(animeMicroserviceClientName) private rabbit_client: ClientProxy,
  ) {}

  registerMovie(animeInput: AnimeInput): void {
    this.rabbit_client.emit<void, AnimeInput>('anime.register', animeInput);
  }

  getAllMovies(): Observable<Anime[]> {
    return this.rabbit_client.send<Anime[], unknown>('anime.list', {});
  }

  getAllMoviesOfUser(userId: number): Observable<Anime[]> {
    return this.rabbit_client.send<Anime[], number>('anime.list.id', userId);
  }
}
