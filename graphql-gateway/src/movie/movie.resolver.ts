import { MovieService } from './movie.service';
import { User } from './../user/user.entity';
import { CurrentUser } from './../auth/getUser.decorator';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './../auth/guards/gqlAuth.guard';
import { MovieInput } from './input/movie.input';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Movie } from './movie.type';
import { Movie as Movieman } from './movie.entity';

@Resolver()
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Query(() => [Movie])
  async getAllMovies(): Promise<Movieman[]> {
    try {
      const movieList = await this.movieService.getAllMovies();
      return movieList;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Query(() => [Movie])
  @UseGuards(GqlAuthGuard)
  async getAllMoviesOfUser(@CurrentUser() user: User): Promise<Movieman[]> {
    try {
      const movieList = await this.movieService.getAllMoviesOfUser(user.id);
      return movieList;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  registerMovie(@Args('movieInput') movieInput: MovieInput): boolean {
    try {
      this.movieService.registerMovie(movieInput);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
