import { AllowedCategories } from './category.enum';

export interface Movie {
  title: string;
  synopsis: string;
  genre: AllowedCategories[];
  ranked: number;
  score: number;
  created_at: string;
  updated_at: string;
}
