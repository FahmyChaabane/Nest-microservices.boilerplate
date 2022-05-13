import { WatchInput } from '../../common/watch.input';
import { InputType } from '@nestjs/graphql';

@InputType()
export class MovieInput extends WatchInput {}
