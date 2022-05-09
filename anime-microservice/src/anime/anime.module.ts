import { AnimeRepository } from './anime.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnimeRepository])],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
