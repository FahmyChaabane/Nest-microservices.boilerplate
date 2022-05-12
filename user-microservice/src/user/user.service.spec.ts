import { RpcException } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { GetUserByIdDto } from './dto/getUserById.dto';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  const mockedUser: User = new User();
  mockedUser.id = 1;
  mockedUser.firstName = 'Jhon';
  mockedUser.lastName = 'Doe';
  mockedUser.birth = new Date();
  mockedUser.email = 'Jhon.Doe@email.com';
  mockedUser.created_at = new Date();
  mockedUser.updated_at = new Date();

  const jwt_token = 'jwt_token_mock';

  const mockedUserRepository = {
    fetchUserAndVerifyPassword: jest.fn(),
    registerUser: jest.fn().mockResolvedValue(mockedUser),
    findOne: jest.fn(),
  };

  const mockedJwtService = {
    sign: jest.fn().mockResolvedValue('jwt_token_mock'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository, JwtService],
    })
      .overrideProvider(UserRepository)
      .useValue(mockedUserRepository)
      .overrideProvider(JwtService)
      .useValue(mockedJwtService)
      .compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(userService).toBeDefined();
      expect(userRepository).toBeDefined();
      expect(jwtService).toBeDefined();
    });
  });

  describe('loginUser method', () => {
    const loginDto: LoginDto = {
      email: mockedUser.email,
      password: 'Wxc123..',
    };
    it('should call loginUser method successfully', async () => {
      mockedUserRepository.fetchUserAndVerifyPassword = jest
        .fn()
        .mockResolvedValue(mockedUser);
      await userService.loginUser(loginDto);
      await expect(
        userRepository.fetchUserAndVerifyPassword,
      ).toHaveBeenCalledWith(loginDto);
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: mockedUser.id,
        email: mockedUser.email,
      });
    });

    it('should throw RpcException if user and password are not valid', async () => {
      mockedUserRepository.fetchUserAndVerifyPassword = jest
        .fn()
        .mockResolvedValue(null);
      await expect(userService.loginUser(loginDto)).rejects.toThrow(
        RpcException,
      );
    });

    it('should return jwt token successfully', async () => {
      mockedUserRepository.fetchUserAndVerifyPassword = jest
        .fn()
        .mockResolvedValue(mockedUser);
      const token = await userService.loginUser(loginDto);
      expect(token).toBe(jwt_token);
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
    it('should call registerUser method successfully', () => {
      userService.registerUser(registerDto);
      expect(userRepository.registerUser).toHaveBeenCalledWith(registerDto);
    });

    it('should return registred user successfully', async () => {
      const registredUser = await userService.registerUser(registerDto);
      expect(registredUser).toEqual(mockedUser);
    });
  });

  describe('getUserById method', () => {
    const getUserByIdDto: GetUserByIdDto = {
      id: mockedUser.id,
    };
    it('should call getUserById method successfully', () => {
      userService.getUserById(getUserByIdDto);
      expect(userRepository.findOne).toHaveBeenCalledWith(getUserByIdDto.id);
    });

    it('should return user by its id successfully', async () => {
      mockedUserRepository.findOne = jest.fn().mockResolvedValue(mockedUser);
      const user = await userService.getUserById(getUserByIdDto);
      expect(user).toEqual(mockedUser);
    });

    it('should throw RpcException if user not found', async () => {
      mockedUserRepository.findOne = jest.fn().mockRejectedValue(RpcException);
      await expect(userService.getUserById(getUserByIdDto)).rejects.toThrow(
        RpcException,
      );
    });
  });
});
