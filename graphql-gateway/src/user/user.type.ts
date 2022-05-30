import { Anime } from './../anime/anime.type';
import { Movie } from './../movie/movie.type';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('UserType')
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  birth: string;

  @Field()
  email?: string;

  @Field()
  created_at?: string;

  @Field()
  updated_at?: string;

  @Field(() => [Movie])
  movies: Movie[];

  @Field(() => [Anime])
  animes: Anime[];
}
