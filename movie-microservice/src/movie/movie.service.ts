import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';
import { Injectable } from '@nestjs/common';
import { RegisterMovieDto } from './dto/resgisterMovie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async registerMovie(registerMovieDto: RegisterMovieDto): Promise<void> {
    await this.movieRepository.registerMovie(registerMovieDto);
  }
  async getAllMovies(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async getAllMoviesOfUser(userId: number): Promise<Movie[]> {
    return await this.movieRepository.find({ where: { userId } });
  }
}
