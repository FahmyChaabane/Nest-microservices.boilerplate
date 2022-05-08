import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsNotEmpty()
  birth: Date;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
