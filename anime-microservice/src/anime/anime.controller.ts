import { Anime } from './anime.entity';
import { RegisterAnimeDto } from './dto/resgisterAnime.dto';
import { AnimeService } from './anime.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('anime')
@UsePipes(new ValidationPipe())
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @EventPattern('anime.register')
  async registerAnime(registerAnimeDto: RegisterAnimeDto): Promise<void> {
    await this.animeService.registerAnime(registerAnimeDto);
  }

  @MessagePattern('anime.list')
  async getAllAnimes(): Promise<Anime[]> {
    return await this.animeService.getAllAnimes();
  }

  @MessagePattern('anime.list.id')
  async getAllAnimesOfUser(userId: number): Promise<Anime[]> {
    return await this.animeService.getAllAnimesOfUser(userId);
  }
}
