import { Movie } from './movie.entity';
import { RegisterMovieDto } from './dto/resgisterMovie.dto';
import { MovieService } from './movie.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @EventPattern('movie.register')
  async registerMovie(registerMovieDto: RegisterMovieDto): Promise<void> {
    await this.movieService.registerMovie(registerMovieDto);
  }

  @MessagePattern('movie.list')
  async getAllMovies(): Promise<Movie[]> {
    return await this.movieService.getAllMovies();
  }

  @MessagePattern('movie.list.id')
  async getAllMoviesOfUser(userId: number): Promise<Movie[]> {
    return await this.movieService.getAllMoviesOfUser(userId);
  }
}
