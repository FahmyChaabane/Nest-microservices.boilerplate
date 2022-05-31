import { UserService } from './../user/user.service';
import { MovieService } from './movie.service';
import { CurrentUser } from './../auth/getUser.decorator';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './../auth/guards/gqlAuth.guard';
import { MovieInput } from './input/movie.input';
import {
  Resolver,
  Mutation,
  Query,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from './../user/user.type';
import { User as Userman } from './../user/user.entity';
import { Movie } from './movie.type';
import { Movie as Movieman } from './movie.entity';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(
    private readonly movieService: MovieService,
    private readonly userService: UserService,
  ) {}

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
  async getAllMoviesOfUser(@CurrentUser() user: Userman): Promise<Movieman[]> {
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

  @ResolveField(() => User)
  async adder(@Parent() movie: Movieman): Promise<Userman> {
    const { userId } = movie;
    return await this.userService.getUserById({ id: userId });
  }
}
