import { InternalServerErrorException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  const mockedUser: User = new User();
  mockedUser.id = 1;
  mockedUser.firstName = 'Jhon';
  mockedUser.lastName = 'Doe';
  mockedUser.birth = new Date();
  mockedUser.email = 'Jhon.Doe@email.com';
  mockedUser.password = 'password123';
  mockedUser.created_at = new Date();
  mockedUser.updated_at = new Date();
  mockedUser.verifyPassword = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(userRepository).toBeDefined();
    });
  });

  describe('fetchUserAndVerifyPassword method', () => {
    const loginDto: LoginDto = {
      email: mockedUser.email,
      password: 'Wxc123..',
    };

    beforeEach(() => {
      userRepository.findOne = jest.fn().mockResolvedValue(mockedUser);
    });

    it('should call fetchUserAndVerifyPassword method successfully', () => {
      userRepository.fetchUserAndVerifyPassword(loginDto);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        email: loginDto.email,
      });
    });
    it('should return user when password verified went successfully', async () => {
      mockedUser.verifyPassword = jest.fn().mockResolvedValue(true);
      const verifiedUser = await userRepository.fetchUserAndVerifyPassword(
        loginDto,
      );
      expect(verifiedUser).toEqual(mockedUser);
    });
    it('should return user when password was not verified', async () => {
      mockedUser.verifyPassword = jest.fn().mockResolvedValue(false);
      const verifiedUser = await userRepository.fetchUserAndVerifyPassword(
        loginDto,
      );
      expect(verifiedUser).toEqual(null);
    });
  });

  describe('registerUser method', () => {
    const registerDto: RegisterDto = {
      firstName: 'Jhon',
      lastName: 'Doe',
      birth: new Date(),
      email: 'Jhon.Doe@email.com',
      password: 'Wxc123..',
    };

    const save = jest.fn();
    beforeEach(() => {
      userRepository.create = jest.fn().mockReturnValue({
        save,
      });
    });

    it('should call registerUser method successfully', () => {
      userRepository.registerUser(registerDto);
      expect(userRepository.create).toHaveBeenCalled();
    });

    it('should return registred user successfully', async () => {
      save.mockResolvedValue(mockedUser);
      const registeredUser = await userRepository.registerUser(registerDto);
      expect(registeredUser).toEqual(mockedUser);
    });

    it('should throws a RpcException exception as email already exists', async () => {
      save.mockRejectedValue({ code: '23505' });
      await expect(userRepository.registerUser(registerDto)).rejects.toThrow(
        RpcException,
      );
    });

    it('should throws a InternalServerErrorException exception', async () => {
      save.mockRejectedValue({ code: '123456' });
      await expect(userRepository.registerUser(registerDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
