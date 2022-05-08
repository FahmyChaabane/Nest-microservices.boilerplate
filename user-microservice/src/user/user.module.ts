import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get('jsonwebtoken');
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
