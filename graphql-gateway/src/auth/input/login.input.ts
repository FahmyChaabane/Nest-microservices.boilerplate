import { IsEmail, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
