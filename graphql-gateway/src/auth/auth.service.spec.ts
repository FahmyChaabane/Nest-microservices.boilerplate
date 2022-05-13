import { User } from './../../dist/user/user.entity.d';
import { RegisterInput } from './input/register.input';
import { AuthService } from './auth.service';
import { LoginInput } from './input/login.input';
import { ClientProxy } from '@nestjs/microservices';
import { userMicroserviceClientName } from './../config/app.config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

describe('AnimeResolver', () => {
  let authService: AuthService;
  let rabbit_client: ClientProxy;

  const mockedUser: User = {
    id: 0,
    firstName: 'Jhon',
    lastName: 'Doe',
    birth: new Date(),
    email: 'Jhon.Doe@email.com',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockedClientProxy = {
    send: jest.fn().mockImplementation(() => of(null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: userMicroserviceClientName, useValue: mockedClientProxy },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    rabbit_client = module.get<ClientProxy>(userMicroserviceClientName);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
      expect(rabbit_client).toBeDefined();
    });
  });

  describe('registerUser method', () => {
    const mockedRegisterInput: RegisterInput = {
      firstName: 'Jhon',
      lastName: 'Doe',
      birth: new Date(),
      email: 'sssjhon.doess@gmail.com',
      password: 'Wxc123..',
    };

    it('should call registerUser method successfully', async () => {
      await authService.registerUser(mockedRegisterInput);
      expect(rabbit_client.send).toHaveBeenCalledWith(
        'user.register',
        mockedRegisterInput,
      );
    });
    it('should return user successfully', async () => {
      rabbit_client.send = jest.fn().mockImplementation(() => of(mockedUser));
      const user = await authService.registerUser(mockedRegisterInput);
      expect(user).toEqual(mockedUser);
    });
  });

  describe('loginUser method', () => {
    const mockedLoginInput: LoginInput = {
      email: 'Jhon.Doe@email.com',
      password: 'Wxc123..',
    };
    const mockedToken = 'XXXxXXX';

    it('should call loginUser method successfully', () => {
      authService.loginUser(mockedLoginInput);
      expect(rabbit_client.send).toHaveBeenCalledWith(
        'user.login',
        mockedLoginInput,
      );
    });

    it('should return token successfully', async () => {
      mockedClientProxy.send = jest
        .fn()
        .mockImplementation(() => of(mockedToken));
      const user = await authService.loginUser(mockedLoginInput);
      expect(user).toEqual(mockedToken);
    });
  });
});
