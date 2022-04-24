import { User } from './../user/user.entity';
import { userMicroserviceClientName } from './../config/app.config';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoginInput } from './input/login.input';
import { RegisterInput } from './input/register.input';

@Injectable()
export class AuthService {
  constructor(
    @Inject(userMicroserviceClientName) private tcp_client: ClientProxy,
  ) {}

  loginUser(loginInput: LoginInput): Observable<string> {
    return this.tcp_client.send<string, LoginInput>('user.login', loginInput);
  }

  registerUser(registerInput: RegisterInput): Observable<User> {
    return this.tcp_client.send<User, RegisterInput>(
      'user.register',
      registerInput,
    );
  }
}
