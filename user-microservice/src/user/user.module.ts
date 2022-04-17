import { JwtConfig } from './../config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register(JwtConfig),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
