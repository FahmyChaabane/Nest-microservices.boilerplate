import { firstValueFrom } from 'rxjs';
import { animeMicroserviceClientName } from './../config/app.config';
import { AnimeInput } from './input/anime.input';
import { ClientProxy } from '@nestjs/microservices';
import { Injectable, Inject } from '@nestjs/common';
import { Anime } from './anime.entity';

@Injectable()
export class AnimeService {
  constructor(
    @Inject(animeMicroserviceClientName) private rabbit_client: ClientProxy,
  ) {}

  registerAnime(animeInput: AnimeInput): void {
    this.rabbit_client.emit<void, AnimeInput>('anime.register', animeInput);
  }

  async getAllAnimes(): Promise<Anime[]> {
    return await firstValueFrom(
      this.rabbit_client.send<Anime[], unknown>('anime.list', {}),
    );
  }

  async getAllAnimesOfUser(userId: number): Promise<Anime[]> {
    return await firstValueFrom(
      this.rabbit_client.send<Anime[], number>('anime.list.id', userId),
    );
  }
}
