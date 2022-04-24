import { User } from './../user/user.type';
import { User as Userman } from './../user/user.entity';
import { CurrentUser } from './getUser.decorator';
import { GqlAuthGuard } from './guards/gqlAuth.guard';
import { LoginInput } from './input/login.input';
import { AuthService } from './auth.service';
import { RegisterInput } from './input/register.input';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { firstValueFrom } from 'rxjs';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Query(() => String)
  @UseGuards(GqlAuthGuard)
  sayJavascript(@CurrentUser() user: User): string {
    console.log('the current user: ', user);

    return 'Hello Javascript!';
  }

  @Mutation(() => User)
  async registerUser(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<Userman> {
    try {
      const result = await firstValueFrom(
        this.authService.registerUser(registerInput),
      );
      return result;
    } catch (error) {
      // i guess, for the exceptions to be "catched" by graphql-nest, they gotta be inside the resolver and not in services
      throw new UserInputError(error.message);
      // throw new ConflictException('Username already exists'); //C-01
    }
  }

  @Mutation(() => String)
  async loginUser(@Args('loginInput') loginInput: LoginInput): Promise<string> {
    try {
      const result = await firstValueFrom(
        this.authService.loginUser(loginInput),
      );
      return result;
    } catch (error) {
      throw new AuthenticationError(error.message);
      // throw new UnauthorizedException('Invalid credentials'); //C-02
    }
  }
}
