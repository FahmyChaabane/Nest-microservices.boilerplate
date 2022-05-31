import { AllowedCategories } from '../common/category.enum';

export interface Movie {
  title: string;
  synopsis: string;
  genre: AllowedCategories[];
  ranked: number;
  score: number;
  userId: number;
  created_at: string;
  updated_at: string;
}
