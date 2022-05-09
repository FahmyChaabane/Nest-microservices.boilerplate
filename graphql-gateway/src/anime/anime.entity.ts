import { AllowedCategories } from '../common/category.enum';

export interface Anime {
  title: string;
  synopsis: string;
  genre: AllowedCategories[];
  ranked: number;
  score: number;
  episodes: number;
  IsMovie: boolean;
  created_at: string;
  updated_at: string;
}
