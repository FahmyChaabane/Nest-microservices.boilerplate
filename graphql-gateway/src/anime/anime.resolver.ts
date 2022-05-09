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
  constructor(private animeService: AnimeService) {}

  @Query(() => [Anime])
  async getAllAnimes(): Promise<Animeman[]> {
    try {
      const animeList = await firstValueFrom(this.animeService.getAllMovies());
      return animeList;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Query(() => [Anime])
  @UseGuards(GqlAuthGuard)
  async getAllAnimesOfUser(@CurrentUser() user: User): Promise<Animeman[]> {
    try {
      const movieList = await firstValueFrom(
        this.animeService.getAllMoviesOfUser(user.id),
      );
      return movieList;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  registerAnime(@Args('animeInput') animeInput: AnimeInput): boolean {
    try {
      this.animeService.registerMovie(animeInput);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
