import { TCP_CLIENT } from 'src/config/tcpClient.config';
import { ClientsModule } from '@nestjs/microservices';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ClientsModule.register([TCP_CLIENT]),
    UserModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
