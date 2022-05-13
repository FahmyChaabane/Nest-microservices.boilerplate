import { WatchInput } from '../../common/watch.input';
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class AnimeInput extends WatchInput {
  @Field(() => Int, { defaultValue: 0 })
  episodes: number;

  @Field({ nullable: true })
  IsMovie: boolean;
}
