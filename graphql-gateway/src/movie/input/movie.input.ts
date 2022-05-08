import { AllowedCategories } from './../category.enum';
import { IsNotEmpty } from 'class-validator';
import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class MovieInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  synopsis: string;

  @Field(() => [AllowedCategories])
  @IsNotEmpty()
  genre: AllowedCategories[];

  @Field(() => Int)
  @IsNotEmpty()
  ranked: number;

  @Field(() => Float)
  @IsNotEmpty()
  score: number;

  @Field(() => Int)
  @IsNotEmpty()
  userId: number;
}
