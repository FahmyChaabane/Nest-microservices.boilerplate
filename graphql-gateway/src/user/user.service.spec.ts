import { UserService } from './user.service';
import { ClientProxy } from '@nestjs/microservices';
import { userMicroserviceClientName } from './../config/app.config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

describe('AnimeResolver', () => {
  let userService: UserService;
  let rabbit_client: ClientProxy;

  const mockedClientProxy = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: userMicroserviceClientName, useValue: mockedClientProxy },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    rabbit_client = module.get<ClientProxy>(userMicroserviceClientName);
  });

  describe('Init', () => {
    it('should be defined', () => {
      expect(userService).toBeDefined();
      expect(rabbit_client).toBeDefined();
    });
  });

  describe('registerUser method', () => {
    it('should call registerUser method successfully', () => {});
    it('should return anime list successfully', async () => {});
  });
});
