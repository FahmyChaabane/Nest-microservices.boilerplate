import { userMicroserviceClientName } from './../config/app.config';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(userMicroserviceClientName) private tcp_client: ClientProxy,
  ) {}

  async getUserById(userIDobj: { id: number }): Promise<User> {
    return await firstValueFrom(
      this.tcp_client.send<User, { id: number }>('user.getUserById', userIDobj),
    );
  }
}
