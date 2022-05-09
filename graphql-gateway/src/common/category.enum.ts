import { registerEnumType } from '@nestjs/graphql';

export enum AllowedCategories {
  COMEDY = 'COMEDY',
  SPORTS = 'SPORTS',
  DRAMA = 'DRAMA',
  SCHOOL = 'SCHOOL',
  MUSIC = 'MUSIC',
  ROMANCE = 'ROMANCE',
  ADVENTURE = 'ADVENTURE',
  SCI_FICT = 'SCI_FICT',
  MYSTERY = 'MYSTERY',
  FANTASY = 'FANTASY',
  ACTION = 'ACTION',
  MAGIC = 'MAGIC',
  HISTORICAL = 'HISTORICAL',
  PARODY = 'PARODY',
}

registerEnumType(AllowedCategories, {
  name: 'AllowedCategories',
});
