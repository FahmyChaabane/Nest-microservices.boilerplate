import { Movie } from './movie.entity';
import { Repository, EntityRepository } from 'typeorm';
import { RegisterMovieDto } from './dto/resgisterMovie.dto';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async registerMovie(registerMovieDto: RegisterMovieDto): Promise<void> {
    const { title, synopsis, genre, ranked, score, userId } = registerMovieDto;
    const movie = this.create();
    movie.title = title;
    movie.synopsis = synopsis;
    movie.genre = genre;
    movie.ranked = ranked;
    movie.score = score;
    movie.userId = userId;

    try {
      await movie.save();
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
