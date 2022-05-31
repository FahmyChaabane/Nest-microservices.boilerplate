import { UserService } from './../user/user.service';
import { MovieService } from './../movie/movie.service';
import { AnimeService } from './anime.service';
import { CurrentUser } from './../auth/getUser.decorator';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './../auth/guards/gqlAuth.guard';
import { AnimeInput } from './input/anime.input';
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
import { Anime } from './anime.type';
import { Anime as Animeman } from './anime.entity';

@Resolver(() => Anime)
export class AnimeResolver {
  constructor(
    private readonly animeService: AnimeService,
    private readonly movieService: MovieService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Anime])
  async getAllAnimes(): Promise<Animeman[]> {
    try {
      const animeList = await this.animeService.getAllAnimes();
      return animeList;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Query(() => [Anime])
  @UseGuards(GqlAuthGuard)
  async getAllAnimesOfUser(@CurrentUser() user: Userman): Promise<Animeman[]> {
    try {
      const animeList = await this.animeService.getAllAnimesOfUser(user.id);
      return animeList;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  registerAnime(@Args('animeInput') animeInput: AnimeInput): boolean {
    const { IsMovie } = animeInput;
    try {
      this.animeService.registerAnime(animeInput);
      if (IsMovie === true) {
        this.movieService.registerMovie(animeInput);
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ResolveField(() => User)
  async adder(@Parent() anime: Animeman): Promise<Userman> {
    const { userId } = anime;
    return await this.userService.getUserById({ id: userId });
  }
}
