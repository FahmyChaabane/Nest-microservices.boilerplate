import { UserService } from './user.service';
import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { GetUserByIdDto } from './dto/getUserById.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern('user.login')
  async loginUser(loginDto: LoginDto): Promise<string> {
    return await this.userService.loginUser(loginDto);
  }

  @MessagePattern('user.register')
  async registerUser(registerDto: RegisterDto): Promise<User> {
    return await this.userService.registerUser(registerDto);
  }

  @MessagePattern('user.getUserById')
  async getUserById(getUserByIdDto: GetUserByIdDto): Promise<User> {
    return await this.userService.getUserById(getUserByIdDto);
  }
}
