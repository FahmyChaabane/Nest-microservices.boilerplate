import { User } from './../user/user.entity';
import { userMicroserviceClientName } from './../config/app.config';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { LoginInput } from './input/login.input';
import { RegisterInput } from './input/register.input';

@Injectable()
export class AuthService {
  constructor(
    @Inject(userMicroserviceClientName) private tcp_client: ClientProxy,
  ) {}

  async registerUser(registerInput: RegisterInput): Promise<User> {
    return await firstValueFrom(
      this.tcp_client.send<User, RegisterInput>('user.register', registerInput),
    );
  }

  async loginUser(loginInput: LoginInput): Promise<string> {
    return await firstValueFrom(
      this.tcp_client.send<string, LoginInput>('user.login', loginInput),
    );
  }
}
