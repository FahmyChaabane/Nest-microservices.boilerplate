import { Anime } from './anime.entity';
import { Repository, EntityRepository } from 'typeorm';
import { RegisterAnimeDto } from './dto/resgisterAnime.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Anime)
export class AnimeRepository extends Repository<Anime> {
  async registerAnime(registerAnimeDto: RegisterAnimeDto): Promise<void> {
    const { title, synopsis, genre, ranked, score, userId } = registerAnimeDto;
    const anime = this.create();
    anime.title = title;
    anime.synopsis = synopsis;
    anime.genre = genre;
    anime.ranked = ranked;
    anime.score = score;
    anime.userId = userId;

    try {
      await anime.save();
    } catch (error) {
      if (error.code === '23505') {
        // throw new RpcException('Title already exists'); // the gateway does not wait a response
        throw new ConflictException('Title already exists'); //C-01
      } else {
        throw new InternalServerErrorException(); // 500
      }
    }
  }
}
