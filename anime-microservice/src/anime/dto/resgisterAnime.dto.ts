import { AllowedCategories } from './../categories.enum';
import { IsArray, IsInt, IsNumber, IsString } from 'class-validator';

export class RegisterAnimeDto {
  @IsString()
  title: string;
  @IsString()
  synopsis: string;
  @IsArray()
  genre: AllowedCategories[];
  @IsInt()
  ranked: number;
  @IsNumber()
  score: number;
  @IsInt()
  userId: number;
  @IsInt()
  episodes: number;
}
