import { JwtPayload } from './jwtPayload';
import { User } from './user.entity';
import { RpcException } from '@nestjs/microservices';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { GetUserByIdDto } from './dto/getUserById.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async loginUser(loginDto: LoginDto): Promise<string> {
    const user = await this.userRepository.fetchUserAndVerifyPassword(loginDto);
    if (!user) {
      throw new RpcException('Invalid credentials');
      // throw new UnauthorizedException('Invalid credentials'); //C-02
    }

    const payload: JwtPayload = { id: user.id, email: user.email };
    const accessToken = await this.jwtService.sign(payload);

    return accessToken;
  }

  async registerUser(registerDto: RegisterDto): Promise<string> {
    return await this.userRepository.registerUser(registerDto);
  }

  getUserById(getUserByIdDto: GetUserByIdDto): Promise<User> {
    const { id } = getUserByIdDto;
    return this.userRepository.findOne(id);
  }
}
