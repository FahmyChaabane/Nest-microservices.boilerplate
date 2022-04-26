import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  birth: string;

  @Field()
  email?: string;

  @Field()
  created_at?: string;

  @Field()
  updated_at?: string;
}
