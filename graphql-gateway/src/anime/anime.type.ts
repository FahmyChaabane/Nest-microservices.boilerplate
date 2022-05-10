import { AllowedCategories } from '../common/category.enum';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('AnimeType')
export class Anime {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  synopsis: string;

  @Field(() => [AllowedCategories])
  genre: AllowedCategories[];

  @Field(() => Int)
  ranked: number;

  @Field(() => Float)
  score: number;

  @Field(() => Int, { nullable: true })
  episodes: number;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}
