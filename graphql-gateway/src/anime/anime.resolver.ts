import { MovieService } from './../movie/movie.service';
import { firstValueFrom } from 'rxjs';
import { AnimeService } from './anime.service';
import { User } from './../user/user.entity';
import { CurrentUser } from './../auth/getUser.decorator';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './../auth/guards/gqlAuth.guard';
import { AnimeInput } from './input/anime.input';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Anime } from './anime.type';
import { Anime as Animeman } from './anime.entity';

@Resolver()
export class AnimeResolver {
  constructor(
    private readonly animeService: AnimeService,
    private readonly movieService: MovieService,
  ) {}

  @Query(() => [Anime])
  async getAllAnimes(): Promise<Animeman[]> {
    try {
      const animeList = await firstValueFrom(this.animeService.getAllAnimes());
      return animeList;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Query(() => [Anime])
  @UseGuards(GqlAuthGuard)
  async getAllAnimesOfUser(@CurrentUser() user: User): Promise<Animeman[]> {
    try {
      const animeList = await firstValueFrom(
        this.animeService.getAllAnimesOfUser(user.id),
      );
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
}
