import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { LoginInput } from './input/login.input';
import { User } from './../../dist/user/user.entity.d';
import { RegisterInput } from './input/register.input';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;
  let authService: AuthService;

  const mockedAuthService = {
    registerUser: jest.fn(),
    loginUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthResolver, AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockedAuthService)

      .compile();

    authResolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(authResolver).toBeDefined();
      expect(authService).toBeDefined();
    });
  });

  describe('registerUser method', () => {
    const mockedUser: User = {
      id: 0,
      firstName: 'Jhon',
      lastName: 'Doe',
      birth: new Date(),
      email: 'Joe.Doe@email.com',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const mockedRegisterInput: RegisterInput = {
      firstName: 'Jhon',
      lastName: 'Doe',
      birth: new Date(),
      email: 'sssjhon.doess@gmail.com',
      password: 'Wxc123..',
    };
    it('should call registerUser method successfully', () => {
      authResolver.registerUser(mockedRegisterInput);
      expect(authService.registerUser).toHaveBeenCalledWith(
        mockedRegisterInput,
      );
    });

    it('should return user successfully', async () => {
      mockedAuthService.registerUser = jest.fn().mockResolvedValue(mockedUser);
      const user = await authResolver.registerUser(mockedRegisterInput);
      expect(user).toEqual(mockedUser);
    });

    it('should throw UserInputError if registerUser method crushes', async () => {
      mockedAuthService.registerUser = jest
        .fn()
        .mockRejectedValue(UserInputError);
      await expect(
        authResolver.registerUser(mockedRegisterInput),
      ).rejects.toThrow(UserInputError);
    });
  });

  describe('loginUser method', () => {
    const mockedLoginInput: LoginInput = {
      email: 'Jhon.Doe@email.com',
      password: 'Wxc123..',
    };
    const mockedToken = 'XXXxXXX';
    it('should call loginUser method successfully', () => {
      authResolver.loginUser(mockedLoginInput);
      expect(authService.loginUser).toHaveBeenCalledWith(mockedLoginInput);
    });
    it('should return token successfully', async () => {
      mockedAuthService.loginUser = jest.fn().mockResolvedValue(mockedToken);
      const token = await authResolver.loginUser(mockedLoginInput);
      expect(token).toEqual(mockedToken);
    });

    it('should throw UserInputError if registerUser method crushes', async () => {
      mockedAuthService.loginUser = jest
        .fn()
        .mockRejectedValue(AuthenticationError);
      await expect(authResolver.loginUser(mockedLoginInput)).rejects.toThrow(
        AuthenticationError,
      );
    });
  });
});
