import { ClientsModule } from '@nestjs/microservices';
import { TCP_CLIENT } from 'src/config/tcpClient.config';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [ClientsModule.register([TCP_CLIENT])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
