import { MovieRepository } from './movie.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
