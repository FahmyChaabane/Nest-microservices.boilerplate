import { AnimeService } from './../anime/anime.service';
import { MovieService } from './../movie/movie.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './../auth/guards/gqlAuth.guard';
import { CurrentUser } from './../auth/getUser.decorator';
import { UserService } from './user.service';
import { Anime } from './../anime/anime.type';
import { Anime as Animeman } from './../anime/anime.entity';
import { Movie } from './../movie/movie.type';
import { Movie as Movieman } from './../movie/movie.entity';
import { User as Userman } from './../user/user.entity';
import { User } from './user.type';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private animeService: AnimeService,
    private movieService: MovieService,
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async getUserById(@CurrentUser() user: Userman): Promise<Userman> {
    const { id } = user;
    return await this.userService.getUserById({ id });
  }

  @ResolveField(() => [Movie])
  async movies(@Parent() user: Userman): Promise<Movieman[]> {
    const { id } = user;
    return await this.movieService.getAllMoviesOfUser(id);
  }

  @ResolveField(() => [Anime])
  async animes(@Parent() user: Userman): Promise<Animeman[]> {
    const { id } = user;
    return await this.animeService.getAllAnimesOfUser(id);
  }
}
