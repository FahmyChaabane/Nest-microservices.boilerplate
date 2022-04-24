import { RpcException } from '@nestjs/microservices';
import { User } from './user.entity';
import { Repository, EntityRepository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async fetchUserAndVerifyPassword(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.findOne({ email });

    if (user && (await user.verifyPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  async registerUser(registerDto): Promise<User> {
    const { firstName, lastName, birth, email, password } = registerDto;
    // const user = new User();
    const user = this.create(); // this is testable
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.birth = new Date(birth);
    const salt = await bcrypt.genSalt(8);
    user.password = await this.hashPassword(password, salt);

    try {
      return await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new RpcException('Email already exists');
        // throw new ConflictException('Username already exists'); //C-01
      } else {
        throw new InternalServerErrorException(); // 500
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
