import { User } from './../../dist/user/user.entity.d';
import { UserService } from './user.service';
import { ClientProxy } from '@nestjs/microservices';
import { userMicroserviceClientName } from './../config/app.config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

describe('AnimeResolver', () => {
  let userService: UserService;
  let tcp_client: ClientProxy;

  const mockedUser: User = {
    id: 102,
    firstName: 'Jhon',
    lastName: 'Doe',
    birth: new Date(),
    email: 'jhon.Doe@email.com',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockedClientProxy = {
    send: jest.fn().mockImplementation(() => of(mockedUser)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: userMicroserviceClientName, useValue: mockedClientProxy },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    tcp_client = module.get<ClientProxy>(userMicroserviceClientName);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(userService).toBeDefined();
      expect(tcp_client).toBeDefined();
    });
  });

  describe('getUserById method', () => {
    const mockedInput = {
      id: 100,
    };
    it('should call getUserById method successfully', () => {
      userService.getUserById(mockedInput);
      expect(tcp_client.send).toHaveBeenCalledWith(
        'user.getUserById',
        mockedInput,
      );
    });
    it('should return user successfully', async () => {
      const user = await userService.getUserById(mockedInput);
      expect(user).toEqual(mockedUser);
    });
  });
});
