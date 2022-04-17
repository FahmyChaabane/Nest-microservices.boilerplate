import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TCP_CLIENT } from '../config/tcpClient.config';
import { LoginInput } from './input/login.input';
import { RegisterInput } from './input/register.input';

@Injectable()
export class AuthService {
  constructor(@Inject(TCP_CLIENT.name) private tcp_client: ClientProxy) {}

  loginUser(loginInput: LoginInput): Observable<string> {
    return this.tcp_client.send<string, LoginInput>('user.login', loginInput);
  }

  registerUser(registerInput: RegisterInput): Observable<string> {
    return this.tcp_client.send<string, RegisterInput>(
      'user.register',
      registerInput,
    );
  }
}
