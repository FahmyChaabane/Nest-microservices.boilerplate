import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TCP_CLIENT } from '../config/tcpClient.config';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@Inject(TCP_CLIENT.name) private tcp_client: ClientProxy) {}

  getUserById(sa: { id: number }): Observable<User> {
    return this.tcp_client.send<User, { id: number }>('user.getUserById', sa);
  }
}
