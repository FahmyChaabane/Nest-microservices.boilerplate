import { InputType } from '@nestjs/graphql';
import { WatchInput } from 'src/common/watch.input';

@InputType()
export class MovieInput extends WatchInput {}
