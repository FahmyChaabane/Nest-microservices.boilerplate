import { Anime } from './anime.entity';
import { AnimeRepository } from './anime.repository';
import { Injectable } from '@nestjs/common';
import { RegisterAnimeDto } from './dto/resgisterAnime.dto';

@Injectable()
export class AnimeService {
  constructor(private readonly animeRepository: AnimeRepository) {}

  async registerAnime(registerAnimeDto: RegisterAnimeDto): Promise<void> {
    await this.animeRepository.registerAnime(registerAnimeDto);
  }
  async getAllAnimes(): Promise<Anime[]> {
    return await this.animeRepository.find();
  }

  async getAllAnimesOfUser(userId: number): Promise<Anime[]> {
    return await this.animeRepository.find({ where: { userId } });
  }
}
