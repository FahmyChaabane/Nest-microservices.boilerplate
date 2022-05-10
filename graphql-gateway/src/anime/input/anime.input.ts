import { InputType, Int, Field } from '@nestjs/graphql';
import { WatchInput } from 'src/common/watch.input';

@InputType()
export class AnimeInput extends WatchInput {
  @Field(() => Int, { defaultValue: 0 })
  episodes: number;

  @Field({ nullable: true })
  IsMovie: boolean;
}
